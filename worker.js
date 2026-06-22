// Cloudflare Worker - COMPASS API Proxy
// This securely proxies requests to Claude API with your key server-side

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Get the request body (the social media post)
      const body = await request.json();
      const { post } = body;

      if (!post) {
        return new Response(JSON.stringify({ error: 'No post provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // System prompt from COMPASS Canvas
      const COMPASS_SYSTEM_PROMPT = `You are COMPASS v5.0, a CIC Social Care Intelligence System built by Vikas Gaddam at Salesforce.

When given a social media post, you analyze it and return structured JSON with these exact fields:

1. DETECTION ENGINE:
   - Extract case numbers (regex: \\b([45]\\d{7,8}|6\\d{7})\\b)
   - Extract org IDs (regex: 00D[a-zA-Z0-9]{15,18})
   - Extract emails (regex: \\S+@\\S+\\.\\S+)
   - Detect executive mentions (Benioff, Marc, Parker, Harris, Amy, Brian, Jim, David, Lori, Dave, Eric, Kendall, Srinivas, Robin, Steve, Becky, Suzanne, Sabastian, Paula, Mick, Miguel, Kat, Bernard, Sanjeev)
   - Detect risk vectors: REVENUE_IMPACT (keywords: losing, thousands, revenue, pipeline, sales, money), CHURN_RISK (keywords: leaving, switching, considering alternatives, cancel), LEGAL_THREAT (keywords: lawyer, legal, lawsuit, sue), BILLING_ISSUE (keywords: charged, billing, invoice, payment)

2. PRIORITY CLASSIFICATION:
   - P0 🔴 CRITICAL: EXEC_TAG = true AND (REVENUE_IMPACT = true OR CHURN_RISK = true) → SLA: 30 minutes
   - P1 🟠 URGENT: LEGAL_THREAT = true OR BILLING_ISSUE = true → SLA: 60 minutes
   - P2 🟡 HIGH: Active case + no response + public complaint → SLA: 120 minutes
   - P3 🟢 STANDARD: First inquiry, technical question → SLA: 240 minutes

3. GENERATE 4 OUTPUTS:
   a) CHATTER_POST: Tag account team (@names), include case/org IDs, risk summary, SLA warning
   b) SPROUT_REPLY: 280-char max, empathetic, no signature, invite to DM
   c) DM_OPENER: Ask for email/case/org ID, friendly tone, include agent initials ^VG
   d) WORKFLOW_SUBMISSION: Structured form with platform, URL, customer comments, email, additional details

Return ONLY this JSON structure (no markdown, no prose):

{
  "priority": "P0",
  "priority_label": "🔴 CRITICAL",
  "sla_minutes": 30,
  "detected": {
    "case_numbers": ["45678901"],
    "org_ids": ["00D5g000008AbCd"],
    "emails": ["john@acme.com"],
    "exec_mentions": ["Benioff"],
    "risk_vectors": ["EXEC_TAG", "REVENUE_IMPACT"]
  },
  "chatter_post": "...",
  "sprout_reply": "...",
  "dm_opener": "...",
  "workflow_submission": "..."
}`;

      // Call Claude API (your key is stored securely in env.CLAUDE_API_KEY)
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          system: COMPASS_SYSTEM_PROMPT,
          messages: [{
            role: 'user',
            content: post,
          }],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API call failed');
      }

      const data = await response.json();
      const analysisText = data.content[0].text;

      // Parse JSON response
      let analysis;
      try {
        analysis = JSON.parse(analysisText);
      } catch (e) {
        // If Claude returns markdown-wrapped JSON, extract it
        const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysis = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Failed to parse analysis response');
        }
      }

      // Return successful response with CORS headers
      return new Response(JSON.stringify(analysis), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
