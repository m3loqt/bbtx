interface ContactEmailData {
  full_name: string
  email: string
  inquiry_type: string | null
  message: string | null
  submitted_at: string
  ip_address: string | null
}

function escapeHtml(value: string | null): string {
  if (!value) return ""
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

export function buildContactEmail(data: ContactEmailData): string {
  const inquiryType = data.inquiry_type ?? "Not specified"
  const safeMessage = escapeHtml(data.message)
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br />")

  const ipAddress = data.ip_address ?? "Unknown"

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Contact Submission</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #f0f0f0;">
            <!-- Body (no header/footer, all on white) -->
            <tr>
              <td style="background:#ffffff;padding:32px 40px;">
                <div style="font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#ca3726;margin-bottom:8px;">
                  NEW CONTACT SUBMISSION
                </div>

                <div style="font-size:24px;font-weight:700;color:#1a1a1a;margin:0 0 16px;">
                  ${escapeHtml(data.full_name)} wants to connect.
                </div>

                <!-- EMAIL -->
                <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:4px;">
                    Reply To
                  </span>
                  <a href="mailto:${data.email}" style="display:block;font-size:15px;color:#ca3726;line-height:1.6;text-decoration:none;">
                    ${escapeHtml(data.email)}
                  </a>
                </div>

                <!-- INQUIRY TYPE -->
                <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:4px;">
                    Inquiry Type
                  </span>
                  <span style="display:block;font-size:15px;color:#1a1a1a;line-height:1.6;">
                    ${escapeHtml(inquiryType)}
                  </span>
                </div>

                <!-- MESSAGE -->
                <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:4px;">
                    Message
                  </span>
                  <div style="background:#f9f9f9;border-left:3px solid #ca3726;padding:16px;border-radius:0 4px 4px 0;font-size:15px;line-height:1.7;color:#333333;">
                    ${safeMessage || "<em>No message provided.</em>"}
                  </div>
                </div>

                <!-- SUBMITTED AT -->
                <div style="margin-bottom:16px;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:4px;">
                    Received
                  </span>
                  <span style="display:block;font-size:15px;color:#1a1a1a;line-height:1.6;">
                    ${escapeHtml(data.submitted_at)}
                  </span>
                </div>

                <!-- Button -->
                <div style="text-align:center;margin-top:32px;">
                  <a
                    href="mailto:${data.email}"
                    style="background:#ca3726;color:#ffffff;padding:14px 28px;border-radius:4px;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;"
                  >
                    Reply
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}
