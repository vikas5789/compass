# COMPASS v5.0 - Website

**Intelligence System by Vikas Gaddam**

A beautiful, Linear/Stripe-inspired website showcasing the COMPASS social media escalation analysis system powered by Claude API.

---

## 🚀 **Quick Start**

### **1. Open the website locally:**

```bash
cd ~/compass-website
open index.html
```

### **2. Get a Claude API key:**

1. Visit https://console.anthropic.com
2. Create a free account
3. Generate an API key (starts with `sk-ant-api03-...`)
4. Paste it into the website's API key field

### **3. Test the demo:**

Paste this example post:

```
Our entire sales team can't log into Agentforce this morning. We've had Case #45678901 open for 6 hours with no response. This is costing us thousands in pipeline during Q4 close. @benioff can someone please help us?
```

Click **"Analyze with COMPASS"** and watch it work! 🔥

---

## 📦 **Deploy to GitHub Pages**

### **Step 1: Create a GitHub repo**

```bash
cd ~/compass-website
git init
git add .
git commit -m "Initial commit - COMPASS website"
```

### **Step 2: Push to GitHub**

```bash
# Create repo on GitHub first at github.com/new
git remote add origin https://github.com/YOUR_USERNAME/compass.git
git branch -M main
git push -u origin main
```

### **Step 3: Enable GitHub Pages**

1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/compass/`

### **Step 4 (Optional): Add custom domain**

1. Buy a domain (e.g., `compass.vikasgaddam.com`)
2. Add a `CNAME` file to the repo:
   ```bash
   echo "compass.vikasgaddam.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```
3. Configure DNS at your domain provider:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`

---

## 🎨 **What's Included**

### **Design Features:**
- ✅ **Linear-style aurora background** (animated gradient)
- ✅ **Dark mode** (#0A0A0A true black)
- ✅ **Glassmorphism cards** (backdrop blur effects)
- ✅ **Gradient text animations** (purple → cyan → white)
- ✅ **Live stats** (98.3% efficiency, $1.7M value, 14.4 FTE saved)
- ✅ **Responsive layout** (mobile-friendly)
- ✅ **Premium typography** (Inter font family)

### **Functionality:**
- ✅ **Claude API integration** (real-time analysis)
- ✅ **System prompt from COMPASS Canvas** (all logic preserved)
- ✅ **4 outputs**: Chatter, Sprout, DM, Workflow
- ✅ **Copy buttons** (with fallback for older browsers)
- ✅ **Priority classification** (P0/P1/P2/P3 with badges)
- ✅ **Detection summary** (case numbers, org IDs, execs, risk vectors)
- ✅ **API key storage** (localStorage, never sent to server)

---

## 🔧 **Technical Stack**

- **Frontend**: Pure HTML + CSS + JavaScript (no frameworks!)
- **AI**: Claude API (Anthropic)
- **Hosting**: GitHub Pages (free, fast, global CDN)
- **Domain**: Custom domain ready (optional)
- **Cost**: $0 to host + ~$0.01 per analysis with Claude API

---

## 🎯 **System Prompt**

The website uses your COMPASS Canvas content as the Claude API system prompt. It includes:

1. **Detection Engine**:
   - Case numbers (regex: `\b([45]\d{7,8}|6\d{7})\b`)
   - Org IDs (regex: `00D[a-zA-Z0-9]{15,18}`)
   - Emails (regex: `\S+@\S+\.\S+`)
   - 24 executive names (Benioff, Parker, Amy, etc.)
   - Risk vectors (revenue, churn, legal, billing)

2. **Priority Classification**:
   - **P0** 🔴 CRITICAL: Exec + (Revenue OR Churn) → 30 min SLA
   - **P1** 🟠 URGENT: Legal OR Billing → 60 min SLA
   - **P2** 🟡 HIGH: Case + No response → 120 min SLA
   - **P3** 🟢 STANDARD: First inquiry → 240 min SLA

3. **Output Generation**:
   - Chatter post (tags, case IDs, risk summary)
   - Sprout reply (280 chars, empathetic)
   - DM opener (asks for details)
   - Workflow submission (structured form)

---

## 💡 **Usage Notes**

### **Demo Mode vs. Live Mode:**

This website is **DEMO MODE** - it shows what COMPASS can do but:
- ✅ Full analysis logic works
- ✅ Priority classification works
- ✅ All 4 outputs generated
- ❌ Cannot query live Org CS/Org 62/GUS (requires Salesforce internal access)
- ❌ No real account team names (uses placeholders)

The **LIVE MODE** is the Slackbot skill running inside Salesforce Slack - that has real MCP tool access to internal systems.

### **Security:**

- API key stored in browser's localStorage only
- Never sent to any server except Anthropic
- HTTPS required for clipboard API to work
- No backend, no database, no tracking

---

## 📊 **Performance**

- **Page load**: <1 second (pure HTML/CSS/JS)
- **Analysis time**: 2-5 seconds (depends on Claude API)
- **Hosting**: 100% uptime (GitHub Pages SLA)
- **Cost**: ~$0.01 per analysis (Claude API pricing)

---

## 🔗 **Links**

- **Claude API Docs**: https://docs.anthropic.com/claude/reference/getting-started-with-the-api
- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Linear Design Inspiration**: https://linear.app
- **Stripe Design Inspiration**: https://stripe.com

---

## 👤 **Credits**

**Built by Vikas Gaddam**
- Operations Analyst → AI Builder
- Salesforce CIC Social Care
- LinkedIn: [linkedin.com/in/vikasgaddam](https://linkedin.com/in/vikasgaddam)

**Powered by:**
- Claude (Anthropic)
- COMPASS Canvas (Slackbot skill)
- GitHub Pages

---

## 🎉 **Next Steps**

1. ✅ **Test locally** (open `index.html`)
2. ✅ **Push to GitHub** (follow deploy instructions above)
3. ✅ **Share on LinkedIn** (show your work!)
4. ✅ **Present to leadership** (beautiful demo site)
5. ✅ **Add to resume** (portfolio piece)

---

**LET'S GOOOOO!!! 🚀🔥**
