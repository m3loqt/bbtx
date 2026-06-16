export function buildSnapshotUserEmail({
  name,
  orgName,
  websiteUrl,
}: {
  name?: string;
  orgName: string;
  websiteUrl: string;
}): string {
  const greeting = name ? `Hi ${name},` : "Hi,";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your Strategic Snapshot — ${orgName}</title>
  </head>
  <body style="margin:0;padding:0;background:#f7f7f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f7f7f7;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;">

            <!-- Header -->
            <tr>
              <td style="background:#111111;padding:28px 40px;border-radius:8px 8px 0 0;">
                <div style="font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:10px;">
                  BBTx Consulting
                </div>
                <div style="font-size:20px;font-weight:600;color:#ffffff;line-height:1.3;">
                  Strategic Snapshot
                </div>
                <div style="font-size:13px;color:rgba(255,255,255,0.5);margin-top:4px;">
                  ${orgName}
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background:#ffffff;padding:36px 40px;border-left:1px solid #eeeeee;border-right:1px solid #eeeeee;">
                <p style="font-size:15px;color:#333333;line-height:1.7;margin:0 0 18px;">
                  ${greeting}
                </p>
                <p style="font-size:15px;color:#555555;line-height:1.7;margin:0 0 18px;">
                  Your Strategic Snapshot for <strong style="color:#222222;">${orgName}</strong> is attached as a PDF.
                </p>
                <p style="font-size:15px;color:#555555;line-height:1.7;margin:0 0 28px;">
                  The analysis is based on publicly available information from <a href="${websiteUrl}" style="color:#ca3726;text-decoration:none;">${websiteUrl}</a> and external research. It is designed to surface strategic hypotheses worth examining — not to provide definitive conclusions.
                </p>

                <!-- Divider -->
                <div style="height:1px;background:#f0f0f0;margin:0 0 28px;"></div>

                <!-- What's inside -->
                <div style="font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#aaaaaa;margin-bottom:14px;">
                  What's Inside
                </div>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  ${[
                    "Public Positioning — what the market sees",
                    "Market & Competitive Signals — where gaps exist",
                    "Strategic Tensions — where legitimate commitments pull against each other",
                    "Leverage Points — where one change creates disproportionate impact",
                    "Questions Worth Asking — for leadership conversations",
                    "Investigate Further — what public data cannot answer",
                    "If We Had To Bet — a specific hypothesis about the core constraint",
                  ].map(item => `
                  <tr>
                    <td style="padding:6px 0;border-bottom:1px solid #f5f5f5;">
                      <span style="display:inline-block;width:6px;height:6px;background:#ca3726;border-radius:50%;vertical-align:middle;margin-right:10px;"></span>
                      <span style="font-size:13px;color:#555555;">${item}</span>
                    </td>
                  </tr>`).join("")}
                </table>

                <!-- Divider -->
                <div style="height:1px;background:#f0f0f0;margin:28px 0;"></div>

                <p style="font-size:13px;color:#888888;line-height:1.7;margin:0 0 20px;">
                  This snapshot is a starting point. The questions it surfaces — about strategic tension, competitive positioning, and internal assumptions — can only be answered through internal access: leadership conversations, operational review, and organizational context.
                </p>
                <p style="font-size:13px;color:#888888;line-height:1.7;margin:0;">
                  If any of what you read prompts a conversation, you can reach us at <a href="https://bbtx.ai" style="color:#ca3726;text-decoration:none;">bbtx.ai</a>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f7f7f7;padding:20px 40px;border-radius:0 0 8px 8px;border:1px solid #eeeeee;border-top:none;">
                <p style="font-size:11px;color:#bbbbbb;line-height:1.6;margin:0;">
                  BBTx Consulting · <a href="https://bbtx.ai" style="color:#bbbbbb;text-decoration:none;">bbtx.ai</a><br />
                  This analysis was generated based on publicly available information and is intended for strategic exploration only.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
