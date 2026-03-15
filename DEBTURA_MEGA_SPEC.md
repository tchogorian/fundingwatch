# Debtura — Full Implementation Spec (Mega Prompt)

Fix ALL of the following in one pass. Do not skip any item.

---

## 1. LENDER RISK INDEX — Connect to live API

The backend API is live at `https://ops.fundingwatch.org/api/lenders` and returns JSON:
```json
{"count":16,"lenders":[{"id":11,"name":"Kapitus","slug":"kapitus","fw_risk_score":100,"fw_rating":"avoid","lawsuit_count_verified":39,"complaint_count":0,"coj_usage":"contested","litigation_pattern":"...","headquarters":null,"lender_type":"direct","status":"active"}, ...]}
```

Update the `/lender-risk-index` page to:
- Fetch from `https://ops.fundingwatch.org/api/lenders` (NOT a local API, NOT a relative path)
- Display each lender in a table with columns: Lender Name, Grade, Risk Score (0-100), Lawsuits, Complaints, Rating Tier
- Map `fw_risk_score` to a letter grade using this scale:
  - 0-5 → A+ (Certified, green)
  - 6-15 → A (Certified, green)
  - 16-25 → B+ (Standard, blue)
  - 26-35 → B (Standard, blue)
  - 36-50 → C+ (Caution, yellow)
  - 51-65 → C (Warning, orange)
  - 66-80 → D (Warning, orange)
  - 81-100 → F (Avoid, red)
- The `fw_rating` field from the API maps to filter tabs: certified, caution, warning, avoid
- Display the letter grade prominently with its color
- Each lender row should link to `/lender-risk-index/[slug]` (detail page, can be placeholder for now)
- At the bottom of the page, add a single line link: "How we score lenders →" linking to `/lender-risk-index/methodology`
- Do NOT put the full methodology explanation on the LRI page itself
- Remove the old blue gradient hero. Match the `/intelligence` page layout: nav → content on white

---

## 2. METHODOLOGY PAGE

Create `/lender-risk-index/methodology` page with:
- Title: "How We Score Lenders"
- Debtura Trust Grade scale (A+ through F, same table as above with colors and tier names)
- Six scoring dimensions with descriptions:
  1. Complaint Density (25%) — CFPB and state AG complaints relative to filing volume
  2. Regulatory Exposure (25%) — AG actions, consent orders, state investigations
  3. Contract Risk Signals (20%) — COJ clauses, reconciliation terms, hidden fees, factor rate transparency
  4. Litigation Aggressiveness (15%) — Frequency of lawsuits against borrowers, default judgment rate
  5. Transparency (10%) — APR disclosure, clear terms, responsiveness to disputes
  6. Stacking Behavior (5%) — Pattern of funding on top of existing MCAs
- Data sources section: CourtListener federal dockets, state AG databases, CFPB complaint database, UCC filing records, direct contract analysis
- Disclaimer: "Debtura Trust Grades represent the independent analytical opinion of the Debtura Intelligence Team. Grades are based on publicly available data and are updated as new information becomes available."
- Match `/intelligence` page layout style: nav → content on white, Playfair Display headline, IBM Plex Sans body

---

## 3. INNER PAGE LAYOUTS

Every page EXCEPT the homepage must follow the `/intelligence` layout pattern:
- White nav bar + black subnav with dropdowns
- Then straight into content on white background
- Red marker label → Playfair Display headline → description → content
- NO dark hero, NO blue gradient, NO background images on inner pages

Remove the blue gradient hero from ALL inner pages:
- `/products/merchant-cash-advance`
- `/products/mortgage`
- `/products/sba-loans`
- `/tools/contract-analyzer`
- `/tools/lender-matching`
- `/tools/mca-calculator`
- `/tools/quick-assessment`
- `/lender-risk-index`

Only the homepage gets the dark hero with the iStock background image.

---

## 4. TOOLS PAGES — Fix routing

These pages MUST be standalone pages, NOT redirects or anchor links to the homepage:
- `/tools/contract-analyzer` — own page with upload dropzone and contract analysis UI
- `/tools/lender-matching` — own page with the application/matching form
- `/tools/mca-calculator` — own page with the MCA calculator
- `/tools/quick-assessment` — own page with the questionnaire form

If any of these are currently defined as redirects to `/#something`, change them to real page routes with real content. Move existing functionality from the homepage sections to these dedicated pages.

---

## 5. AUTHOR REBRAND — ALL CONTENT

Do a global search across the entire codebase for "Alex Tchogorian" (case-insensitive). Replace ALL instances with:
- Author name: "Debtura Intelligence Team"
- Author bio: "Independent research and analysis from Debtura's team of commercial lending analysts."
- Remove any personal photos, LinkedIn links, or individual author profiles

This applies to ALL of these specific files and pages:

**Intelligence articles:**
- `/src/app/intelligence/page.tsx` (listing page)
- `/src/app/intelligence/borrower-complaints-analysis/page.tsx`
- `/src/app/intelligence/factor-rate-vs-apr/page.tsx`
- `/src/app/intelligence/ucc-filing-analysis/page.tsx`
- `/src/app/intelligence/[slug]/page.tsx`
- `/src/app/intelligence/layout.tsx`

**Blog / lender review articles:**
- `/src/app/blog/page.tsx`
- `/src/app/blog/[slug]/page.tsx`
- `/src/app/blog/layout.tsx`
- `/src/lib/blog-posts/coastal-capital-mca-contract-review.ts`
- `/src/lib/blog-posts/kapitus-mca-contract-review.ts`
- `/src/lib/blog-posts/lendora-mca-contract-review.ts`
- `/src/lib/blog-posts/regal-capital-mca-contract-review.ts`

Also check meta tags, JSON-LD structured data, OG tags, and any component that renders author info.

---

## 6. FUNDINGWATCH PURGE

Global search for "FundingWatch" (case-insensitive) across the entire codebase. Replace with "Debtura" EXCEPT:
- Do NOT change `ops.fundingwatch.org` — that is the backend API URL and stays as-is
- Do NOT change database connection strings
- Do NOT change PM2 process names
- Change all user-facing text, page titles, meta tags, breadcrumbs, back links

Specifically fix `/questionnaire` which still says "← Back to FundingWatch" — change to "← Back to Debtura"

---

## 7. FAQ REWRITE

Replace the current FAQ section on the homepage with these 6 questions. Use a single-column accordion layout (NOT a 2-column grid). Each item is full-width with the question on the left and +/− toggle on the right.

Q: How is Debtura different from other MCA brokers?
A: Most brokers route your application to whichever lender pays the highest commission. We built an independent lender rating system — every lender in our network is scored on contract terms, complaint history, and transparency before they can receive a single application.

Q: What does the Lender Risk Index measure?
A: We score every MCA lender on litigation history, regulatory actions, contract fairness, reconciliation compliance, and borrower complaints. Grades range from A+ (transparent, fair terms) to F (documented predatory behavior).

Q: Is the contract analyzer really free?
A: Yes. Upload any MCA contract and our AI extracts the true APR, identifies hidden fees, flags confession of judgment clauses, and scores your lender — no signup, no credit check, completely private.

Q: How do you make money if the tools are free?
A: We earn a commission from vetted lenders when we match you with better funding. You never pay a fee. Our incentive is to move you away from bad deals and into better ones.

Q: I already have an MCA — can you help?
A: Upload your current contract. If you're overpaying or your lender scores poorly, we can connect you with refinancing options from higher-rated lenders in our network.

Q: How fast can I get funded?
A: Some lending partners in our network approve and fund in as little as 2 hours. Timeline depends on your business profile and the amount requested.

---

## 8. ARTICLES — Move all 30 from /blog/ to /intelligence/

There are 30 articles in `/src/lib/blog-posts/` rendered via `/blog/[slug]`. Debtura does NOT have a `/blog/` route. ALL articles live under `/intelligence/`.

**Do the following:**
- Move all 30 blog post files from `/src/lib/blog-posts/` into a new `/src/lib/intelligence-articles/` directory (or rename the existing directory)
- Update the index file (`index.ts`) to export from the new location
- Make `/intelligence/[slug]` the canonical route that renders ALL 30 articles
- 301 redirect `/blog/` and `/blog/[slug]` to `/intelligence/` and `/intelligence/[slug]`
- Delete the hardcoded sub-pages (`/intelligence/borrower-complaints-analysis/page.tsx`, `/intelligence/factor-rate-vs-apr/page.tsx`, `/intelligence/ucc-filing-analysis/page.tsx`) — these should render through the dynamic `[slug]` route like everything else
- The `/intelligence/` listing page should show all 30 articles sorted by date (newest first), with tag, title, date, and excerpt
- Change author on ALL 30 articles from "Alex Tchogorian" to "Debtura Intelligence Team"
- Remove any personal author bio, photo, or LinkedIn link from all articles
- Replace any "FundingWatch" text with "Debtura" in all article content
- Add a link from lender review articles (coastal-capital, kapitus, lendora, regal-capital) to the corresponding lender page at `/lender-risk-index/[slug]`
- Match Debtura design system on all article pages: Playfair Display headlines, IBM Plex Sans body, red marker labels, white background, no blue gradient

**Categorize articles with these tags:**
- **LENDER REVIEW:** coastal-capital-mca-contract-review, kapitus-mca-contract-review, lendora-mca-contract-review, regal-capital-mca-contract-review, mca-lender-profiles-overview
- **BORROWER GUIDE:** mca-debt-relief-guide, mca-default-consequences, i-defaulted-on-my-mca-what-are-my-options, what-is-personal-guarantee-mca, can-my-mca-lender-freeze-my-bank-account, before-signing-mca-10-things, how-to-analyze-mca-contract, free-mca-contract-analysis, mca-alternatives, mca-vs-sba-loan-which-is-right-for-your-business, small-business-cash-flow-mca, business-debt-restructuring-mca, merchant-cash-advance-defense
- **INDUSTRY REPORT:** mca-industry-20-billion-market-borrowers, mca-factoring-scam-history-usury-evasion, mca-industry-specific-guide, mca-scams-predatory-lenders, merchant-cash-advances-small-business-bankruptcies, 1700-borrower-complaints-responsible-vs-predatory-mca
- **REGULATORY:** mca-laws-by-state, mca-laws-new-york-recent-enforcement-actions, mca-laws-new-york-borrower-rights-and-remedies, mca-laws-new-york-laws-overview, cfpb-merchant-cash-advance-crackdown, my-mca-has-300-percent-apr-is-that-legal
