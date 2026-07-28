export function buildWhitepaperDownloadEmail({
  name,
  title,
  pdfUrl,
}: {
  name?: string
  title: string
  pdfUrl: string
}): string {
  const greeting = name ? `Hi ${name},` : 'Hi,'

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
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
                  ${title}
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background:#ffffff;padding:36px 40px;border-left:1px solid #eeeeee;border-right:1px solid #eeeeee;">
                <p style="font-size:15px;color:#333333;line-height:1.7;margin:0 0 18px;">
                  ${greeting}
                </p>
                <p style="font-size:15px;color:#555555;line-height:1.7;margin:0 0 28px;">
                  Thanks for your interest. Your copy of <strong style="color:#222222;">${title}</strong> is ready.
                </p>

                <table cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="border-radius:8px;background:#ca3726;">
                      <a href="${pdfUrl}" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                        Download the PDF
                      </a>
                    </td>
                  </tr>
                </table>

                <div style="height:1px;background:#f0f0f0;margin:32px 0 24px;"></div>

                <p style="font-size:13px;color:#888888;line-height:1.7;margin:0;">
                  If the button doesn't work, copy this link into your browser:<br />
                  <a href="${pdfUrl}" style="color:#ca3726;text-decoration:none;word-break:break-all;">${pdfUrl}</a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f7f7f7;padding:20px 40px;border-radius:0 0 8px 8px;border:1px solid #eeeeee;border-top:none;">
                <p style="font-size:11px;color:#bbbbbb;line-height:1.6;margin:0;">
                  BBTx Consulting · <a href="https://bbtx.ai" style="color:#bbbbbb;text-decoration:none;">bbtx.ai</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}
