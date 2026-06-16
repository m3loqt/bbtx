import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { getResend } from "@/lib/resend";
import { SnapshotPDF, type SnapshotForPDF } from "@/lib/emails/snapshot-pdf";
import { buildSnapshotUserEmail } from "@/lib/emails/snapshot-user-email";

// ── Rate limiting ──────────────────────────────────────────
const emailIpStore = new Map<string, { count: number; resetAt: number }>();
const EMAIL_MAX    = 3;
const EMAIL_WINDOW = 60 * 60 * 1000; // 1 hour per IP

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkEmailRateLimit(ip: string): boolean {
  const now = Date.now();
  let entry = emailIpStore.get(ip);
  if (!entry || now > entry.resetAt) {
    emailIpStore.set(ip, { count: 1, resetAt: now + EMAIL_WINDOW });
    return true;
  }
  if (entry.count >= EMAIL_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  if (!checkEmailRateLimit(getIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { email, name, websiteUrl, timestamp, snapshot } = (await req.json()) as {
      email?: string;
      name?: string;
      websiteUrl?: string;
      timestamp?: string;
      snapshot?: SnapshotForPDF;
    };

    if (!email || typeof email !== "string" || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const notifyFrom = process.env.RESEND_FROM_EMAIL;
    const notifyTo   = process.env.GRANT_NOTIFICATION_EMAIL;

    if (!notifyFrom) {
      console.warn("[digital-twin-email] RESEND_FROM_EMAIL not set");
      return NextResponse.json({ success: true });
    }

    const orgName = snapshot
      ? snapshot.snapshotTitle.replace(/^Strategic Snapshot:\s*/i, "") || snapshot.snapshotTitle
      : (websiteUrl ?? "Your Organization");

    const generatedAt = timestamp
      ? new Date(timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const resend = getResend();

    // ── Generate PDF and send to submitter ──────────────
    if (snapshot) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfBuffer = await renderToBuffer(
        React.createElement(SnapshotPDF, {
          snapshot,
          websiteUrl: websiteUrl ?? "",
          generatedAt,
        }) as any
      );

      const safeOrgSlug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
      const filename = `strategic-snapshot-${safeOrgSlug}.pdf`;

      await resend.emails.send({
        from: notifyFrom,
        to: email,
        subject: `Your Strategic Snapshot — ${orgName}`,
        html: buildSnapshotUserEmail({ name, orgName, websiteUrl: websiteUrl ?? "" }),
        attachments: [
          {
            filename,
            content: Buffer.from(pdfBuffer),
          },
        ],
      });
    }

    // ── Notify Grant ─────────────────────────────────────
    if (notifyTo) {
      const displayName = name ? `${name} (${email})` : email;
      const analyzedUrl = websiteUrl ?? "not provided";

      await resend.emails.send({
        from: notifyFrom,
        to: notifyTo,
        subject: `Digital Twin Snapshot — Email Capture: ${displayName}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #222222;">
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #999; margin-bottom: 24px;">BBTx — Strategic Digital Twin Snapshot</p>
            <h2 style="font-size: 22px; font-weight: 500; margin: 0 0 24px;">New Email Capture</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; width: 140px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name ?? "—"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #ca3726;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">Analyzed URL</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="${analyzedUrl}" style="color: #ca3726;">${analyzedUrl}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #555;">Submitted</td>
                <td style="padding: 10px 0;">${generatedAt}</td>
              </tr>
            </table>
          </div>
        `,
      });
    }

    console.log("[digital-twin-email] sent", { email, orgName, websiteUrl, generatedAt });
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("[digital-twin-email]", error);
    return NextResponse.json({ success: true });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
