interface WorkshopEmailData {
  full_name: string
  email: string
  organization_name: string | null
  role: string | null
  submitted_at: string
}

function escapeHtml(value: string | null | undefined): string {
  if (!value) return ''
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function fieldRow(label: string, value: string | null | undefined, isLink = false): string {
  const content = isLink && value
    ? `<a href="mailto:${escapeHtml(value)}" style="color:#ca3726;text-decoration:none;">${escapeHtml(value)}</a>`
    : `<span style="color:${value ? '#1a1a1a' : '#aaaaaa'};">${value ? escapeHtml(value) : 'Not provided'}</span>`
  return `
    <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f0f0f0;">
      <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:4px;">${label}</span>
      <span style="display:block;font-size:14px;line-height:1.6;">${content}</span>
    </div>`
}

export function buildWorkshopEmail(data: WorkshopEmailData): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Free Workshop Signup</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #f0f0f0;">

            <tr>
              <td style="padding:32px;">
                <div style="font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#ca3726;margin-bottom:8px;">
                  FREE WORKSHOP SIGNUP
                </div>
                <div style="font-size:24px;font-weight:700;color:#1a1a1a;margin-bottom:24px;">
                  ${escapeHtml(data.full_name)} wants to attend the orientation.
                </div>

                ${fieldRow('REPLY TO', data.email, true)}
                ${fieldRow('ORGANIZATION', data.organization_name)}
                ${fieldRow('ROLE', data.role)}
                <div style="margin-bottom:14px;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:4px;">RECEIVED</span>
                  <span style="display:block;font-size:14px;color:#1a1a1a;line-height:1.6;">${escapeHtml(data.submitted_at)}</span>
                </div>

                <div style="text-align:center;margin-top:32px;">
                  <a
                    href="https://bbtx.ai/admin/assessments"
                    style="background:#ca3726;color:#ffffff;padding:14px 28px;border-radius:4px;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;"
                  >
                    View Full Assessment →
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
