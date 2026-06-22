export default {
  async fetch(request, env) {

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    try {
      const { post } = await request.json();

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 4096,
          system: `You are COMPASS v5.0, a CIC Social Care Intelligence System built by Vikas Gaddam at Salesforce. Analyze social media posts and return ONLY a valid JSON object with this exact structure:
{
  "priority": "P0",
  "priority_label": "🔴 CRITICAL",
  "sla_minutes": 30,
  "detected": {
    "case_numbers": ["12345678"],
    "org_ids": ["00Dxxxxxxx"],
    "emails": ["user@example.com"],
    "exec_mentions": ["Benioff"],
    "risk_vectors": ["EXEC_TAG", "REVENUE_IMPACT"]
  },
  "chatter_post": "full chatter post text",
  "workflow_submission": "full workflow text",
  "sprout_reply": "public reply text",
  "dm_opener": "DM opener text"
}

Priority rules:
- P0 🔴 CRITICAL: exec mention + revenue/churn risk → SLA 30 min
- P1 🟠 URGENT: legal threat or billing issue → SLA 60 min
- P2 🟡 HIGH: active case + no response + complaint → SLA 120 min
- P3 🟢 STANDARD: general inquiry → SLA 240 min

Exec names to detect: Benioff, Marc, Parker, Harris, Amy, Brian, Jim, David, Lori, Dave, Eric, Kendall, Srinivas, Robin, Steve, Becky, Suzanne, Sebastian, Paula, Mick, Miguel, Kat, Bernard, Sanjeev

Extract case numbers (regex: \\b([45]\\d{7,8}|6\\d{7})\\b), org IDs (regex: 00D[a-zA-Z0-9]{15,18}), emails, and detect risk keywords: revenue, thousands, losing, pipeline (REVENUE_IMPACT), leaving, cancel, alternatives (CHURN_RISK), lawyer, legal, lawsuit (LEGAL_THREAT), billing, charged, invoice (BILLING_ISSUE).`,
          messages: [{
            role: 'user',
            content: `Analyze this social media post: ${post}`
          }]
        })
      });

      const data = await response.json();

      // Handle Anthropic API errors
      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: data.error?.message || 'API error' }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
      }

      const result = data.content[0].text;

      return new Response(result, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });

    } catch (err) {
      return new Response(
        JSON.stringify({ error: err.message }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
  }
};
