export type ContactData = {
  full_name: string
  email: string
  inquiry_type: string
  message: string
}

export function buildContactEmail(data: ContactData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a1a;padding:28px 32px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#ca3726;font-family:Arial,sans-serif;">BBTx Consulting</p>
              <h1 style="margin:8px 0 0;font-size:20px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">New Contact Form Submission</h1>
              <p style="margin:4px 0 0;font-size:14px;color:#aaaaaa;font-family:Arial,sans-serif;">${data.inquiry_type}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="padding:6px 0;width:120px;vertical-align:top;color:#555555;font-size:13px;font-family:Arial,sans-serif;">Name</td>
                  <td style="padding:6px 0;color:#1a1a1a;font-size:13px;font-family:Arial,sans-serif;">${data.full_name}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;width:120px;vertical-align:top;color:#555555;font-size:13px;font-family:Arial,sans-serif;">Email</td>
                  <td style="padding:6px 0;color:#1a1a1a;font-size:13px;font-family:Arial,sans-serif;"><a href="mailto:${data.email}" style="color:#ca3726;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding:6px 0;width:120px;vertical-align:top;color:#555555;font-size:13px;font-family:Arial,sans-serif;">Inquiry Type</td>
                  <td style="padding:6px 0;color:#1a1a1a;font-size:13px;font-family:Arial,sans-serif;">${data.inquiry_type}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:20px 0 8px;font-size:11px;font-family:Arial,sans-serif;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ca3726;border-bottom:1px solid #e5e5e5;">Message</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:16px 0;color:#1a1a1a;font-size:14px;line-height:1.6;font-family:Arial,sans-serif;white-space:pre-wrap;">${data.message}</td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7f7f7;padding:20px 32px;border-top:1px solid #e5e5e5;">
              <p style="margin:0;font-size:12px;color:#888888;font-family:Arial,sans-serif;">Log in to Supabase to view all submissions.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
