interface AssessmentEmailData {
  full_name: string
  email: string
  role: string | null
  organization_name: string | null
  industry: string | null
  organization_size: string | null
  currently_using_ai: string | null
  ai_usage_visibility: string | null
  ai_guidelines_status: string | null
  leadership_ai_training: string | null
  ai_strategy_owner: string | null
  ai_strategy_status: string | null
  has_strategic_plan: string | null
  biggest_challenges: string[] | null
  other_challenge: string | null
  primary_need: string | null
  timeline: string | null
  wants_orientation_workshop: boolean
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

function sectionLabel(title: string): string {
  return `
    <div style="background:#f9f9f9;padding:8px 0;font-size:10px;color:#ca3726;letter-spacing:3px;text-transform:uppercase;font-weight:700;border-bottom:1px solid #f0f0f0;margin-bottom:12px;margin-top:24px;">
      ${title}
    </div>`
}

export function buildAssessmentEmail(data: AssessmentEmailData): string {
  const challengesList = data.biggest_challenges?.length
    ? data.biggest_challenges.map(c => `<div style="margin-bottom:4px;">· ${escapeHtml(c)}</div>`).join('')
    : '<span style="color:#aaaaaa;">Not provided</span>'

  const workshopDisplay = data.wants_orientation_workshop
    ? `<span style="color:#ca3726;font-weight:700;">Yes, signed up</span>`
    : `<span style="color:#888888;">Not interested</span>`

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Assessment Submission</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #f0f0f0;">

            <tr>
              <td style="padding:32px;">
                <div style="font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#ca3726;margin-bottom:8px;">
                  NEW ASSESSMENT SUBMISSION
                </div>
                <div style="font-size:24px;font-weight:700;color:#1a1a1a;margin-bottom:24px;">
                  ${escapeHtml(data.full_name)} is ready to talk.
                </div>

                ${sectionLabel('ABOUT THEM')}
                ${fieldRow('REPLY TO', data.email, true)}
                ${fieldRow('ROLE', data.role)}
                ${fieldRow('ORGANIZATION', data.organization_name)}
                ${fieldRow('INDUSTRY', data.industry)}
                ${fieldRow('SIZE', data.organization_size)}

                ${sectionLabel('AI USAGE')}
                ${fieldRow('CURRENTLY USING AI', data.currently_using_ai)}
                ${fieldRow('EMPLOYEE AI VISIBILITY', data.ai_usage_visibility)}
                ${fieldRow('AI GUIDELINES STATUS', data.ai_guidelines_status)}
                ${fieldRow('LEADERSHIP AI TRAINING', data.leadership_ai_training)}

                ${sectionLabel('AI STRATEGY')}
                ${fieldRow('STRATEGY OWNER', data.ai_strategy_owner)}
                ${fieldRow('CURRENT AI STRATEGY', data.ai_strategy_status)}
                ${fieldRow('FOLLOWING STRATEGIC PLAN', data.has_strategic_plan)}

                ${sectionLabel('CHALLENGES')}
                <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:8px;">BIGGEST CHALLENGES</span>
                  <div style="font-size:14px;line-height:1.8;color:#1a1a1a;">${challengesList}</div>
                </div>
                ${data.other_challenge ? fieldRow('OTHER', data.other_challenge) : ''}

                ${sectionLabel('WHAT THEY NEED')}
                <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:8px;">PRIMARY NEED</span>
                  <div style="background:#f9f9f9;border-left:3px solid #ca3726;padding:16px;font-size:14px;line-height:1.6;color:#1a1a1a;">
                    ${data.primary_need ? escapeHtml(data.primary_need) : '<span style="color:#aaaaaa;">Not provided</span>'}
                  </div>
                </div>
                ${fieldRow('TIMELINE', data.timeline)}
                <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888888;margin-bottom:4px;">ORIENTATION WORKSHOP</span>
                  <span style="display:block;font-size:14px;line-height:1.6;">${workshopDisplay}</span>
                </div>

                ${sectionLabel('RECEIVED')}
                <div style="font-size:14px;color:#1a1a1a;margin-bottom:24px;">${escapeHtml(data.submitted_at)}</div>

                <div style="text-align:center;margin-top:32px;">
                  <a
                    href="https://bbtx.ai/admin/assessments"
                    style="background:#ca3726;color:#ffffff;padding:14px 28px;border-radius:4px;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;"
                  >
                    Review Assessment →
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
