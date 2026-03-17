export type AssessmentData = {
  full_name?: string
  role?: string
  organization_name?: string
  industry?: string
  organization_size?: string
  currently_using_ai?: string
  ai_target_areas?: string[]
  ai_strategy_status?: string
  biggest_challenges?: string[]
  other_challenge?: string
  primary_need?: string
  timeline?: string
}

function row(label: string, value: string | undefined): string {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:6px 0;width:180px;vertical-align:top;color:#555555;font-size:13px;font-family:Arial,sans-serif;">${label}</td>
      <td style="padding:6px 0;color:#1a1a1a;font-size:13px;font-family:Arial,sans-serif;">${value}</td>
    </tr>`
}

function sectionHeader(title: string): string {
  return `
    <tr>
      <td colspan="2" style="padding:20px 0 8px;font-size:11px;font-family:Arial,sans-serif;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ca3726;border-bottom:1px solid #e5e5e5;">${title}</td>
    </tr>`
}

export function buildAssessmentEmail(data: AssessmentData): string {
  const orgName = data.organization_name || 'Unknown Organization'
  const aiAreas = data.ai_target_areas?.join(', ') || '—'
  const challenges = data.biggest_challenges?.join(', ') || '—'

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
              <h1 style="margin:8px 0 0;font-size:20px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">New Assessment Submission</h1>
              <p style="margin:4px 0 0;font-size:14px;color:#aaaaaa;font-family:Arial,sans-serif;">${orgName}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">

                ${sectionHeader('Step 1 — Organization')}
                ${row('Name', data.full_name)}
                ${row('Role', data.role)}
                ${row('Organization', data.organization_name)}
                ${row('Industry', data.industry)}
                ${row('Org Size', data.organization_size)}

                ${sectionHeader('Step 2 — AI Situation')}
                ${row('Using AI?', data.currently_using_ai)}
                ${row('AI Areas', aiAreas)}
                ${row('AI Strategy', data.ai_strategy_status)}

                ${sectionHeader('Step 3 — Challenges')}
                ${row('Challenges', challenges)}
                ${row('Other Notes', data.other_challenge)}

                ${sectionHeader('Step 4 — Needs & Timeline')}
                ${row('Primary Need', data.primary_need)}
                ${row('Timeline', data.timeline)}

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
