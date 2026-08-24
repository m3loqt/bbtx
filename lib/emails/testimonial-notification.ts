interface TestimonialEmailData {
  full_name: string
  role_company: string | null
  testimonial: string
  photo_url: string | null
  permission_to_publish: boolean
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

export function buildTestimonialEmail(data: TestimonialEmailData): string {
  const roleCompany = data.role_company ?? "Not specified"
  const safeTestimonial = escapeHtml(data.testimonial)
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br />")

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Testimonial Submission</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #f0f0f0;">
            <tr>
              <td style="background:#ffffff;padding:32px 40px;">
                <div style="font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#ca3726;margin-bottom:8px;">
                  NEW TESTIMONIAL SUBMISSION
                </div>

                <div style="font-size:24px;font-weight:700;color:#1a1a1a;margin:0 0 16px;">
                  ${escapeHtml(data.full_name)} shared a testimonial.
                </div>

                <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:4px;">
                    Role / Company
                  </span>
                  <span style="display:block;font-size:15px;color:#1a1a1a;line-height:1.6;">
                    ${escapeHtml(roleCompany)}
                  </span>
                </div>

                <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:4px;">
                    Testimonial
                  </span>
                  <div style="background:#f9f9f9;border-left:3px solid #ca3726;padding:16px;border-radius:0 4px 4px 0;font-size:15px;line-height:1.7;color:#333333;">
                    ${safeTestimonial}
                  </div>
                </div>

                ${data.photo_url ? `<div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:8px;">
                    Photo
                  </span>
                  <img src="${escapeHtml(data.photo_url)}" alt="" width="88" height="88" style="border-radius:50%;object-fit:cover;display:block;" />
                </div>` : ""}

                <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:4px;">
                    Permission to Publish
                  </span>
                  <span style="display:block;font-size:15px;color:${data.permission_to_publish ? "#1a7f37" : "#ca3726"};font-weight:600;line-height:1.6;">
                    ${data.permission_to_publish ? "Yes" : "No"}
                  </span>
                </div>

                <div style="margin-bottom:16px;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:4px;">
                    Submitted
                  </span>
                  <span style="display:block;font-size:15px;color:#1a1a1a;line-height:1.6;">
                    ${escapeHtml(data.submitted_at)}
                  </span>
                </div>

                <div style="text-align:center;margin-top:32px;">
                  <a
                    href="https://www.bbtx.ai/admin/testimonials"
                    style="background:#ca3726;color:#ffffff;padding:14px 28px;border-radius:4px;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;"
                  >
                    Review in Admin
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
