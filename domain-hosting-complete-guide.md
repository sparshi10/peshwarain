# Domain & Hosting: A Complete Guide
### Written for the PeshWarain ~ Wari project — but designed so you can reuse it for every future project

---

# PART 0 — THE CONCEPT THAT FIXES EVERYTHING

Most people say "domain hosting" as one word. It's actually **three separate things** you buy (sometimes from three different companies):

| # | Thing | What it is | Analogy | Typical cost/year |
|---|---|---|---|---|
| 1 | **Domain name** | The address: `peshwarain.com` | Your street address | $10–15 (৳1,200–1,800) |
| 2 | **DNS** | The phonebook that points the address to a server | The postal directory | Usually free |
| 3 | **Hosting** | The actual computer running your code | The building itself | $0–20/month |

You can buy all three from one company (convenient, often worse) or split them (slightly more setup, much better and cheaper). **Splitting is what professionals do.**

### Why this matters for you specifically

Your site is a **modern JavaScript app** (React/Vite, built with AI tools, with an admin panel that needs a database). It is **not** a PHP/WordPress site.

Almost every Bangladeshi hosting company's headline product is **cPanel shared hosting**. That product was designed for PHP and WordPress in the 2000s. It is technically possible to force a React app onto it, but you lose everything that makes modern deployment good: no Git auto-deploy, no build pipeline, no preview URLs, no serverless functions, no rollback.

> **Rule to remember:** Don't buy cPanel shared hosting for a React/Next.js/Vue/Svelte app. Buy a *platform* (Vercel, Netlify, Cloudflare) instead. Shared hosting is for WordPress.

---

# PART 1 — MUST-HAVE HOSTING FEATURES FOR THIS TECHNOLOGY

When evaluating any host for a modern JS app, these are non-negotiable. If a host is missing items 1–6, walk away.

### Absolutely required
1. **Node.js build environment** — the host must run `npm install && npm run build` for you. Shared hosting usually can't.
2. **Git-based continuous deployment** — you push to GitHub, the site rebuilds and goes live automatically. This is the single biggest quality-of-life feature in modern hosting.
3. **Free automatic SSL (HTTPS)** with auto-renewal — never pay for an SSL certificate in 2026. Let's Encrypt made it free.
4. **Custom domain support + DNS management** — obvious, but some free tiers restrict it.
5. **Environment variables / secrets management** — your admin panel will have database keys and API keys. These must NEVER be hardcoded in your repo. The host needs a secure place to store them.
6. **SPA rewrite rules / catch-all routing** — critical and often forgotten. A React single-page app needs all routes (`/admin`, `/menu`) redirected to `index.html`, or refreshing a page gives a 404.

### Strongly recommended
7. **Serverless / edge functions** — small backend code without running a server. Your admin panel's save/delete actions may need this.
8. **Global CDN** — your files cached worldwide so the site loads fast everywhere.
9. **Preview deployments** — every Git branch gets its own temporary URL. Test changes before they go live.
10. **Instant rollback** — one click to revert to a previous working version when a deploy breaks.
11. **Build logs & analytics** — see what failed and how much traffic you get.

### For the admin panel specifically (this is the part people forget)
Your admin panel needs a **backend** — a database, authentication, and file storage. Static hosting alone won't do it. You need one of:
- **Supabase** (Postgres + auth + storage + realtime) — generous free tier, open source, my default recommendation
- **Firebase** (Firestore + auth + storage) — Google's, integrates well if you built in AI Studio
- **Appwrite** or **PocketBase** — open-source alternatives if you want to self-host later

**This is a separate service from your hosting.** Frontend on Cloudflare/Netlify, database on Supabase. That's normal and correct.

### The "future-proof" checklist
You asked for something that works with any future framework. The test is simple:

- ✅ Does it deploy from a **Git repo** with a **build command**? → future-proof
- ✅ Does it support **Node.js** and **standard web APIs**? → future-proof
- ❌ Does it require FTP upload of finished files to a cPanel `public_html` folder? → dead end
- ❌ Is it tied to one framework only? → risky

Vercel, Netlify, and Cloudflare all pass. They've each added support for every major framework that's appeared in the last decade (Next.js, Astro, SvelteKit, Remix, Nuxt) usually within weeks of release. That track record *is* the future-proofing.

---

# PART 2 — RECOMMENDED HOSTING PROVIDERS

## Tier 1: The modern platforms (use one of these)

### 🥇 Cloudflare Pages + Workers — best overall value
- **Free plan:** unlimited bandwidth, unlimited sites, 500 builds/month, free SSL, free CDN across 300+ cities, commercial use allowed
- **Paid:** Workers Paid at **$5/month** for 10M requests — the cheapest serious compute in the industry
- **Strengths:** The unlimited bandwidth is genuine and unique — no other major host does it. Excellent latency to Bangladesh/South Asia. Also the best DNS provider, so you can consolidate. No surprise bills.
- **Weaknesses:** Developer experience is rougher than Vercel. Framework support is slightly less seamless for Next.js specifically. Free tier allows only 1 concurrent build.
- **Best for you if:** you want lowest cost, predictable billing, and you're hosting a restaurant site that might get traffic spikes.

### 🥈 Netlify — best for beginners
- **Free plan:** 100GB bandwidth, 300 build minutes, functions, forms, identity/auth, deploy previews — the most feature-complete free tier
- **Paid:** Personal ~$9/month, Pro ~$19–20/user/month (1TB bandwidth)
- **Strengths:** Easiest onboarding of the three. Built-in **Forms** (would handle your "Ask about a table" submissions with zero backend code) and **Identity** (could handle admin login). Genuinely beginner-friendly dashboard.
- **Weaknesses:** Bandwidth overages get expensive. Fewer free build minutes.
- **Best for you if:** you want the fastest path to working, and want form handling built in.

### 🥉 Vercel — best developer experience
- **Free (Hobby):** 100GB bandwidth, 1M function invocations, 4 hrs CPU/month — **but Hobby is explicitly non-commercial**
- **Paid (Pro):** $20/month per deploying seat, includes $20 of usage credit and 1TB transfer
- **Strengths:** The most polished dashboard, CLI, and GitHub integration. Best-in-class if you use Next.js. Excellent image optimization.
- **⚠️ Important caveat for you:** A restaurant's business website is a **commercial project**. Vercel's Hobby plan prohibits commercial use, so you'd need Pro at $20/month. Also, Vercel bills by usage with no automatic stop on Pro — a traffic spike becomes a real bill.
- **Best for you if:** budget isn't a concern and you want the smoothest workflow.

### Quick comparison

| | Cloudflare Pages | Netlify | Vercel |
|---|---|---|---|
| Free tier bandwidth | **Unlimited** | 100 GB | 100 GB |
| Commercial use on free | ✅ Yes | ✅ Yes | ❌ **No** |
| Cheapest paid tier | **$5/mo** | ~$9/mo | $20/mo |
| Ease of use | Medium | **Easiest** | Easy |
| Overage risk | **Lowest** | Medium | Highest |
| South Asia speed | **Best** | Good | Good |

## Tier 2: If you need a real server (VPS)
Only relevant later, if you outgrow serverless or need a persistent backend:
- **Hetzner** — best price-to-performance in the world, ~€4/month. No South Asia datacenter though.
- **DigitalOcean** — ~$6/month droplets, Singapore/Bangalore regions (good latency to Dhaka), excellent documentation
- **Railway / Render / Fly.io** — "VPS made easy," deploy from Git without managing Linux

## Tier 3: Bangladeshi hosting (for the domain, mainly)
Local providers are genuinely useful for **.bd domain registration** and if you want **BDIX-connected** hosting (traffic stays on the local exchange = very fast inside Bangladesh). Reputable names: **XeonBD**, **Hostever**, **Alpha Net**, **HostSeba**, **Exonhost**, **HostingBangladesh**.

All of them accept **bKash, Nagad, Rocket, and local bank transfer** — which solves the biggest practical problem for Bangladeshi developers (no international card needed).

**My honest advice:** use them for the domain if you want a `.com.bd`, but host the app on Cloudflare/Netlify. Local shared hosting isn't built for React apps.

---

# PART 3 — WHERE TO BUY THE DOMAIN

### For international domains (.com, .net, .app, .restaurant)

| Registrar | Why | Notes |
|---|---|---|
| **Cloudflare Registrar** | **At-cost pricing, zero markup, free WHOIS privacy forever** | The cheapest way to own a domain long-term. No gimmick first-year discounts. Requires international card. Can't be your first registrar for a brand-new domain in some cases — you transfer in. |
| **Porkbun** | Cheap, honest pricing, free privacy, good UI | Great all-rounder |
| **Namecheap** | Popular, reliable, free privacy first year | Renewal prices higher than first year — watch this |
| **Cloudflare/Porkbun > GoDaddy** | GoDaddy has cheap first years then expensive renewals, aggressive upsells | Avoid unless you have a reason |

**The single most important domain-buying rule:** ignore the first-year promotional price. **Look at the renewal price.** A domain at $1 first year and $22/year after is worse than one at $11/year forever.

### For Bangladeshi domains (.com.bd, .bd)

`.bd` domains are controlled by **BTCL** (Bangladesh Telecommunications Company Limited), the government registry. You register either directly at BTCL's portal or through an authorized reseller.

**Good news on price:** BTCL cut `.bd` domain prices by 36% in January 2026 — third-level domains (`.com.bd`) dropped from ৳1,100 to **৳700**, and second-level (`.bd`) from ৳2,000 to **৳1,280**. Add 15% VAT.

**Documents required** (this catches people out):
- **Personal registration:** your NID — and the domain name should match the name on your NID
- **Business registration (this is you):** scanned **trade licence** + NID of the authorized representative — and the **domain name should align with the registered business name**
- Approval takes anywhere from a few days to several weeks, depending on BTCL processing

**Why use a reseller instead of BTCL directly:** a reseller checks your documents before submission (avoiding rejection), compresses BTCL's multi-step process into one flow, and lets you pay with bKash/Nagad instead of BTCL's own payment system.

### `.com` or `.com.bd` for a restaurant?
Neither has an inherent SEO ranking advantage. A `.com.bd` sends a geographic signal that can help for Bangladesh-specific searches and signals genuine local presence to Bangladeshi customers. A `.com` is neutral and works globally.

**For a Wari restaurant serving local customers:** `.com.bd` is a good trust signal — but `.com` is simpler, faster to get (instant vs. weeks), needs no paperwork, and is what most people type by habit. If budget allows, buy both and redirect one to the other.

**Naming suggestions:** `peshwarain.com`, `peshwarainwari.com`, `peshwarain.com.bd`

---

# PART 4 — RECOMMENDED SETUP FOR YOUR PROJECT

Here's what I'd actually do, in order of what I'd recommend:

### 🏆 Option A — The value setup (recommended)
| Component | Service | Cost |
|---|---|---|
| Domain | Porkbun or Namecheap (`.com`) | ~$11/year |
| DNS | Cloudflare (free) | $0 |
| Frontend + Admin hosting | Cloudflare Pages | $0 |
| Database + Auth + Storage | Supabase free tier | $0 |
| **Total** | | **~$11/year (৳1,300)** |

Upgrade path: add Workers Paid ($5/mo) if you need more compute; Supabase Pro ($25/mo) only when you outgrow the free database.

### Option B — The easiest setup
| Component | Service | Cost |
|---|---|---|
| Domain | Namecheap | ~$11/year |
| Everything else | Netlify free (hosting + Forms + Identity) | $0 |
| Database | Supabase free tier | $0 |
| **Total** | | **~$11/year** |

Netlify Forms handles your table-request inbox with no backend code at all.

### Option C — The local setup
| Component | Service | Cost |
|---|---|---|
| Domain | `.com.bd` via XeonBD/Alpha Net (bKash) | ~৳805/year incl. VAT |
| Hosting | Cloudflare Pages | $0 |
| Database | Supabase | $0 |
| **Total** | | **~৳805/year** |

Pay entirely in BDT with bKash. Requires your trade licence.

**Reality check:** a neighbourhood restaurant's website will not come close to any free-tier limit. You genuinely do not need to pay for hosting. Budget for the domain only.

---

# PART 5 — HOW TO DEPLOY, STEP BY STEP

This is the full workflow from "code on Replit" to "live on my domain." I'll use **Cloudflare Pages + Supabase** as the example, but the shape is identical for Netlify and Vercel.

---

## Step 1 — Get your code into GitHub

Git-based deploys are the whole point. Your host watches a GitHub repo and rebuilds when you push.

1. Create a free account at **github.com**
2. Create a new repository — name it `peshwarain-website`, set it to **Private**
3. From Replit: open your project → **Version Control** tab (git icon in the sidebar) → **Connect to GitHub** → select your new repo → **Push**
   - *Alternative:* download the ZIP from Replit, then upload via GitHub's web interface or `git push` from your computer
4. Confirm your code appears on GitHub

**Before you push, check for secrets.** Open your project and make sure no API keys, database passwords, or tokens are written directly in the code. If they are, replace them with environment variables (see Step 4). Create a `.gitignore` file containing at minimum:
```
node_modules
.env
.env.local
dist
build
```

---

## Step 2 — Set up your database (Supabase)

1. Sign up at **supabase.com** → **New Project**
2. Choose a region — **Singapore** or **Mumbai** for best latency to Dhaka
3. Set a strong database password and save it somewhere safe
4. Once created, go to **Project Settings → API** and copy two values:
   - `Project URL`
   - `anon public` key
   (You'll paste these into your host as environment variables in Step 4)
5. Use the **Table Editor** or **SQL Editor** to create your tables (`menu_items`, `reviews`, `business_info`, etc. — the data model from your admin panel prompt)
6. Go to **Authentication** → enable Email/Password, and create your admin user
7. **Turn on Row Level Security (RLS)** on every table and write policies — public read for menu/reviews, authenticated-only write. Skipping this leaves your database open to the world. This is the most commonly skipped step and the most important one.

---

## Step 3 — Connect the repo to your host

**On Cloudflare Pages:**
1. Sign up at **dash.cloudflare.com**
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Authorize GitHub, select your `peshwarain-website` repo
4. Configure the build:
   - **Framework preset:** Vite (or React, or whatever matches your project)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist` (Vite) or `build` (Create React App) — check which folder your build actually produces
5. Click **Save and Deploy**

Your site goes live in 1–3 minutes at a temporary URL like `peshwarain-website.pages.dev`.

**On Netlify:** Add new site → Import from Git → same three settings.
**On Vercel:** Add New Project → Import Git Repository → it usually auto-detects everything.

---

## Step 4 — Add environment variables

Your Supabase keys go here, **not** in your code.

1. In Cloudflare Pages: **Settings → Environment variables → Add variable**
2. Add (names depend on your framework — Vite requires the `VITE_` prefix):
   ```
   VITE_SUPABASE_URL      = https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGci...
   ```
3. Set them for both **Production** and **Preview** environments
4. **Redeploy** — environment variables only take effect on a fresh build

---

## Step 5 — Fix SPA routing (don't skip this)

If your site uses client-side routing (React Router), visiting `yoursite.com/admin` directly will 404 without this.

**Cloudflare Pages:** create a file named `_redirects` in your `public/` folder:
```
/*    /index.html   200
```

**Netlify:** same `_redirects` file, or a `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel:** create `vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Commit, push, and it redeploys automatically.

---

## Step 6 — Buy and connect your domain

**Buying:**
1. Go to Porkbun/Namecheap, search your name, check the **renewal** price, buy it
2. Enable **WHOIS privacy** (free at both) so your personal details aren't public
3. Enable **auto-renew** and **domain lock**

**Connecting (two approaches):**

**Approach A — Move DNS to Cloudflare (recommended):**
1. In Cloudflare: **Add a site** → enter your domain → choose the Free plan
2. Cloudflare scans your existing DNS records and gives you **two nameservers**
3. Go to your registrar → **Domain → Nameservers → Custom DNS** → paste Cloudflare's two nameservers → save
4. Wait for propagation (usually 15 minutes to a few hours, occasionally up to 48)
5. Back in Cloudflare Pages: **Custom domains → Set up a domain** → enter `peshwarain.com` → it configures itself automatically
6. Repeat for `www.peshwarain.com`

**Approach B — Keep DNS at your registrar:**
1. In Cloudflare Pages: **Custom domains → Set up a domain** → it shows you records to add
2. At your registrar's DNS panel, add:
   - `CNAME` record: name `www`, value `peshwarain-website.pages.dev`
   - For the root domain, add the `A`/`ALIAS`/`ANAME` record the host specifies
3. Wait for propagation

**SSL:** Automatic. Cloudflare/Netlify/Vercel all issue and renew a free certificate within minutes of the domain connecting. You never touch it. If you see a certificate warning, wait — it usually resolves within an hour of DNS propagating.

---

## Step 7 — Verify everything works

Walk through this checklist on the live domain:
- [ ] `https://peshwarain.com` loads (note the **s**)
- [ ] `http://` automatically redirects to `https://`
- [ ] `www.` and non-`www.` both work
- [ ] Refreshing on `/admin` doesn't 404 (SPA routing works)
- [ ] Admin login works and can read/write to Supabase
- [ ] Menu edits in the admin panel appear on the public site
- [ ] Site works on a phone
- [ ] Images load and aren't enormous (compress anything over ~300KB)
- [ ] Phone number, address, and hours are correct everywhere

---

## Step 8 — After launch

**Make future updates easy:** From now on, your workflow is just — edit code → `git push` → live in 2 minutes. No FTP, no manual uploads.

**Worth doing in the first week:**
- Submit your site to **Google Search Console** (verify ownership, submit sitemap)
- Claim/update the **Google Business Profile** — for a restaurant this drives more traffic than the website itself. Your Maps listing says "Claim this business," so this is unclaimed and is the highest-value thing on this list.
- Add analytics — **Cloudflare Web Analytics** (free, privacy-friendly, no cookie banner needed) or Google Analytics
- Add Open Graph meta tags so the link previews nicely when shared on Facebook/WhatsApp — important in Bangladesh where Facebook drives most restaurant discovery
- Add **schema.org Restaurant structured data** (name, address, hours, price range, menu) so Google can show rich results

---

# PART 6 — BUYING DOMAINS & HOSTING IN FUTURE: THE RULES

A condensed checklist you can apply to any project from now on.

### Choosing a domain
1. **Short, memorable, easy to spell out loud over a phone**
2. **Avoid hyphens and numbers** — they're lost in verbal communication
3. **Check the renewal price, not the first-year price**
4. **Check trademark conflicts** before buying
5. **Buy the .com if it's available** and affordable, even if you use something else primarily
6. **Enable:** auto-renew, WHOIS privacy, domain lock, 2FA on the registrar account
7. **The domain is the one thing you must never lose.** Losing hosting costs you a weekend. Losing the domain can cost you the business. Keep the registrar account secure and the renewal card valid.

### Choosing a host
1. **Match the host to the technology.** Static/JS app → Vercel/Netlify/Cloudflare. WordPress → shared hosting or a managed WP host. Custom backend/long-running processes → VPS (Hetzner, DigitalOcean) or Railway/Render.
2. **Start on the free tier.** All three platforms let you launch, connect a domain, and get SSL for $0. Upgrade only when a real limit is hit.
3. **Check the commercial-use clause on free tiers.** (Vercel Hobby prohibits it; Cloudflare and Netlify don't.)
4. **Check the overage behavior**, not just the price. Ask: *what happens when I exceed the limit?* Cloudflare/Netlify free tiers stop or throttle. Vercel Pro keeps billing. "Stops" is safer for a small business than "bills."
5. **Never pay for SSL.** It's free everywhere in 2026.
6. **Never pay extra for a "site builder"** if you're writing your own code.
7. **Keep DNS separate from hosting** where you can. It makes changing hosts painless — you just repoint records instead of migrating a domain.
8. **Prefer Git-deploy over FTP-upload.** Always.

### Red flags in a hosting offer
- 🚩 "Unlimited everything" on a ৳200/month plan — there's always a fair-use cap buried in the terms
- 🚩 Charging separately for SSL certificates
- 🚩 No clear refund policy
- 🚩 Only FTP/cPanel access with no Git or Node.js support (for a JS app)
- 🚩 Locked-in multi-year prepayment as the only way to get the advertised price
- 🚩 No status page and no visible uptime history

### Things that are *not* worth paying for early
- Premium DNS (Cloudflare free is excellent)
- SSL certificates
- "SEO packages" bundled with hosting
- Dedicated IP address
- Website backup add-ons (your code is in Git; your data is in Supabase — both already backed up)

---

# QUICK REFERENCE CARD

**Your recommended stack:**
```
Domain:    Porkbun / Namecheap (.com)  ~$11/yr
           or XeonBD / Alpha Net (.com.bd, bKash)  ~৳805/yr
DNS:       Cloudflare (free)
Hosting:   Cloudflare Pages (free) — or Netlify (free) if you want easier
Backend:   Supabase (free tier)
Repo:      GitHub (free, private)
Analytics: Cloudflare Web Analytics (free)

Total year one: roughly ৳1,300 — the domain, and nothing else.
```

**Deploy flow, memorized:**
`Code → GitHub → Host watches repo → npm run build → Live → Connect domain → Free SSL → Done`

---

*Prices verified September 2026. Hosting pricing changes frequently — always confirm on the provider's own pricing page before purchasing, and re-check the renewal price on any domain before you commit.*
