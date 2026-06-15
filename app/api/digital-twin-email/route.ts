import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

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
    const { email, name, websiteUrl, timestamp } = (await req.json()) as {
      email?: string;
      name?: string;
      websiteUrl?: string;
      timestamp?: string;
    };

    if (!email || typeof email !== "string" || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Log payload cleanly for debugging / future CRM integration
    console.log("[digital-twin-email]", {
      email,
      name: name || "(not provided)",
      websiteUrl: websiteUrl || "(not provided)",
      timestamp: timestamp || new Date().toISOString(),
    });

    // Notify Grant
    const notifyTo = process.env.GRANT_NOTIFICATION_EMAIL;
    const notifyFrom = process.env.RESEND_FROM_EMAIL;

    if (notifyTo && notifyFrom) {
      const displayName = name ? `${name} (${email})` : email;
      const analyzedUrl = websiteUrl || "not provided";

      await getResend().emails.send({
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
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name || "—"}</td>
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
                <td style="padding: 10px 0;">${timestamp ? new Date(timestamp).toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" }) : "—"}</td>
              </tr>
            </table>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[digital-twin-email]", error);
    // Still return 200 — log it, but don't block the user experience
    return NextResponse.json({ success: true });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
