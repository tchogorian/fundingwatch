export type BlogCategory =
  | "mca-basics"
  | "borrower-rights"
  | "lender-profiles"
  | "industry-news"
  | "contract-analysis"
  | "state-guides"
  | "tools-resources"
  | "case-studies";

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  "mca-basics": "MCA Basics",
  "borrower-rights": "Borrower Rights",
  "lender-profiles": "Lender Profiles",
  "industry-news": "Industry News",
  "contract-analysis": "Red Flag Alert",
  "state-guides": "State Guides",
  "tools-resources": "Tools & Resources",
  "case-studies": "Case Studies",
};

export const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "mca-basics": "#00D4A8",
  "borrower-rights": "#F5A623",
  "lender-profiles": "#9B6DFF",
  "industry-news": "#4DA6FF",
  "contract-analysis": "#FF3B5C",
  "state-guides": "#00C8E0",
  "tools-resources": "#56CF9E",
  "case-studies": "#FF7A45",
};

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // ISO
  readTimeMinutes: number;
  readCount?: number;
  body: string; // HTML or markdown-style content for article page
  headings?: { id: string; text: string; level: 2 | 3 }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-factor-rate",
    title: "What Is a Factor Rate — and Why It Hides the True Cost",
    excerpt:
      "When an MCA provider quotes you a factor rate of 1.35, it sounds reasonable. But factor rates aren't interest rates. Here's how to convert yours to a real APR.",
    category: "mca-basics",
    date: "2025-02-15",
    readTimeMinutes: 8,
    readCount: 12400,
    headings: [
      { id: "what-it-means", text: "What a factor rate actually means", level: 2 },
      { id: "factor-rate-apr-table", text: "Factor rate to APR at a glance", level: 2 },
      { id: "convert-apr", text: "Converting factor rate to APR", level: 2 },
      { id: "why-lenders-use", text: "Why lenders use factor rates instead of APR", level: 2 },
      { id: "predatory", text: "What makes a factor rate predatory", level: 2 },
      { id: "disclosure-laws", text: "California and New York disclosure laws", level: 2 },
      { id: "compare", text: "How to compare offers", level: 2 },
      { id: "faq", text: "Frequently asked questions", level: 2 },
      { id: "faq-1", text: "Is a 1.35 factor rate a good deal?", level: 3 },
      { id: "faq-2", text: "Why don't MCA contracts show APR?", level: 3 },
      { id: "faq-3", text: "Can I negotiate the factor rate?", level: 3 },
      { id: "faq-4", text: "What's a reasonable factor rate?", level: 3 },
      { id: "disclaimer", text: "Legal disclaimer", level: 2 },
    ],
    body: `
<p>When an MCA provider quotes you a factor rate of 1.35, it sounds reasonable — like a 35% fee. But factor rates aren't interest rates. A factor rate of 1.35 on a $50,000 advance means you repay $67,500 — that's $17,500 in fees.</p>

<p>If your repayment term is 6 months, your effective APR is closer to 70%. If it's 3 months, you're looking at 140% or higher. Factor rates compress what would be a shocking annual rate into a small-sounding decimal. That's by design.</p>

<h2 id="what-it-means">What a factor rate actually means</h2>
<p>Unlike an interest rate, a factor rate is a multiplier applied once to your advance amount. There's no compounding, no annualization — which makes it hard to compare to a bank loan or SBA product. You multiply your advance by the factor rate to get total repayment: a $50,000 advance at 1.35 means you owe $67,500, period. The shorter your term, the higher the effective annual cost. That's why the same factor rate can look "reasonable" in marketing but translate to triple-digit APR when you run the numbers.</p>

<h2 id="factor-rate-apr-table">Factor rate to APR at a glance</h2>
<p>Below are equivalent APRs for common factor rates at 3-, 6-, and 12-month terms. These use a simplified annualized formula: (factor rate − 1) ÷ term in years. Your actual contract may vary with fees and payment frequency.</p>
<table style="width:100%; border-collapse:collapse; font-size:0.9375rem; margin:1.5rem 0;">
  <thead>
    <tr style="background:#F7F9FC; border-bottom:2px solid #E5E7EB;">
      <th scope="col" style="padding:0.75rem; text-align:left; font-weight:600; color:#1A1A2E;">Factor rate</th>
      <th scope="col" style="padding:0.75rem; text-align:left; font-weight:600; color:#1A1A2E;">3-month term</th>
      <th scope="col" style="padding:0.75rem; text-align:left; font-weight:600; color:#1A1A2E;">6-month term</th>
      <th scope="col" style="padding:0.75rem; text-align:left; font-weight:600; color:#1A1A2E;">12-month term</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #E5E7EB;">
      <td style="padding:0.75rem; font-weight:500; color:#1A1A2E;">1.20</td>
      <td style="padding:0.75rem; color:#374151;">~80% APR</td>
      <td style="padding:0.75rem; color:#374151;">~40% APR</td>
      <td style="padding:0.75rem; color:#374151;">~20% APR</td>
    </tr>
    <tr style="border-bottom:1px solid #E5E7EB;">
      <td style="padding:0.75rem; font-weight:500; color:#1A1A2E;">1.35</td>
      <td style="padding:0.75rem; color:#374151;">~140% APR</td>
      <td style="padding:0.75rem; color:#374151;">~70% APR</td>
      <td style="padding:0.75rem; color:#374151;">~35% APR</td>
    </tr>
    <tr style="border-bottom:1px solid #E5E7EB;">
      <td style="padding:0.75rem; font-weight:500; color:#1A1A2E;">1.50</td>
      <td style="padding:0.75rem; color:#374151;">~200% APR</td>
      <td style="padding:0.75rem; color:#374151;">~100% APR</td>
      <td style="padding:0.75rem; color:#374151;">~50% APR</td>
    </tr>
  </tbody>
</table>
<p>Shorter terms make the same factor rate much more expensive on an annual basis. Always convert to APR and compare across the same term length.</p>

<h2 id="convert-apr">Converting factor rate to APR</h2>
<p>Our free tool converts your factor rate into a true APR so you can see what you're actually paying — and compare it to other financing options on equal terms. Upload your contract to get your number in under 30 seconds.</p>

<h2 id="why-lenders-use">Why lenders use factor rates instead of APR</h2>
<p>MCA providers often lead with factor rates for a few reasons. First, the number looks small: 1.35 sounds modest compared to "70% APR" or "140% APR," even though they can represent the same deal. Second, the industry has historically argued that MCAs are purchases of future receivables, not loans, so they aren't required to disclose APR in many states. Third, factor rates make cross-shopping harder. A business owner comparing a 1.30 from one provider and a 1.40 from another may not realize how much the term and payment frequency change the real cost. Leading with APR would make that comparison obvious — and would make high-cost deals harder to sell.</p>

<h2 id="predatory">What makes a factor rate predatory</h2>
<p>A factor rate itself isn't automatically predatory, but it becomes a red flag when it's combined with short terms, daily payments, and no reconciliation. For example, a 1.45 factor rate on a 4-month "daily pull" with no true reconciliation can push effective cost into the 200%+ APR range and leave the business with almost no flexibility if revenue dips. Other warning signs: pressure to take the advance without time to run the numbers, refusal to disclose an equivalent APR when asked, and contracts that lock in fixed daily amounts regardless of actual sales. If a lender won't put the cost in APR terms, that's a signal to slow down and get a second opinion.</p>

<h2 id="disclosure-laws">California and New York disclosure laws</h2>
<p>Regulators have started to require clearer cost disclosure. In California, the Department of Financial Protection and Innovation now requires MCA providers to disclose an equivalent APR before funding, so borrowers can compare offers on a level playing field. In New York, enforcement actions and settlement terms have pushed providers toward more transparent pricing and away from confessions of judgment. These changes don't eliminate high-cost advances, but they make it easier to see the true cost and to compare MCAs to loans and other options. If you're in California or New York, you have a right to see APR-style disclosures; use them.</p>

<h2 id="compare">How to compare offers</h2>
<p>Always ask for the effective APR, not just the factor rate. If a lender won't provide it, that's a red flag. Use our APR calculator to model different advance amounts and terms before you sign. And upload your contract to our free analyzer to see your true APR, red flags, and key terms in plain English.</p>

<h2 id="faq">Frequently asked questions</h2>
<h3 id="faq-1">Is a 1.35 factor rate a good deal?</h3>
<p>It depends on the term. At 12 months, 1.35 is roughly 35% APR — high but not unusual for alternative small-business funding. At 3 months, the same 1.35 is about 140% APR, which is very expensive. Always convert to APR and compare over the same term.</p>
<h3 id="faq-2">Why don't MCA contracts show APR?</h3>
<p>Many providers argue that an MCA is a purchase of receivables, not a loan, so they aren't required to disclose APR in every state. California and a growing number of states now require equivalent APR disclosure; others do not. That's why converting the factor rate yourself — or using a free tool like ours — is important.</p>
<h3 id="faq-3">Can I negotiate the factor rate?</h3>
<p>Sometimes. Strong revenue, clean bank statements, and existing relationships can give you leverage. It's also worth asking for a longer term or a reconciliation clause, which can reduce the effective cost even if the factor rate doesn't change much.</p>
<h3 id="faq-4">What's a reasonable factor rate?</h3>
<p>There's no single "reasonable" number — it depends on term, risk, and your alternatives. As a rough frame: factor rates in the 1.15–1.25 range on a 12-month term are on the lower end; 1.40+ on a short term can quickly exceed 100% APR. Run the numbers and compare to SBA or bank options when you can.</p>

<h2 id="disclaimer">Legal disclaimer</h2>
<p><strong>This article is for informational purposes only and does not constitute legal, tax, or financial advice.</strong> Factor rate and APR conversions are approximations; your actual contract may include fees, holdbacks, or payment structures that change the effective cost. Consult a licensed attorney or financial professional for advice specific to your situation. FundingWatch is not a law firm or financial advisor.</p>
    `.trim(),
  },
  {
    slug: "confession-of-judgment-danger",
    title: "Confession of Judgment: What It Is and Why It's Dangerous",
    excerpt:
      "A COJ lets a lender get a court judgment against you without notice or a hearing. New York banned enforcement against out-of-state borrowers — but many contracts still include it.",
    category: "contract-analysis",
    date: "2025-02-10",
    readTimeMinutes: 8,
    readCount: 18900,
    headings: [
      { id: "what-is-coj", text: "What is a Confession of Judgment?", level: 2 },
      { id: "why-dangerous", text: "Why COJs are dangerous", level: 2 },
      { id: "ny-ban", text: "New York's 2019 ban", level: 2 },
    ],
    body: `
<p>A Confession of Judgment (COJ) is a clause buried in many MCA contracts that allows the lender to obtain a court judgment against you without notice, without a hearing, and without giving you a chance to defend yourself.</p>

<h2 id="what-is-coj">What is a Confession of Judgment?</h2>
<p>When you sign a contract containing a COJ, you're pre-authorizing the lender to file a judgment in court if they claim you defaulted. You waive your right to be served, to appear, and to present a defense.</p>

<h2 id="why-dangerous">Why COJs are dangerous</h2>
<p>If you miss a payment — or if the lender claims you did — they can go directly to a court, get a judgment, and freeze your bank accounts before you even know what happened. Small businesses have lost everything this way.</p>

<h2 id="ny-ban">New York's 2019 ban</h2>
<p>New York banned COJ enforcement against out-of-state borrowers in 2019 after widespread abuse. But many MCA contracts still include this clause. If your contract has a Confession of Judgment, that's a serious red flag. Upload your contract to our free analyzer to see if you have one.</p>
    `.trim(),
  },
  {
    slug: "reconciliation-clause-why-you-need-it",
    title: "What Does 'Reconciliation' Mean — and Why You Need It",
    excerpt:
      "True reconciliation adjusts your payments when revenue drops. Many MCAs collect fixed daily payments anyway. Courts are starting to call those loans.",
    category: "borrower-rights",
    date: "2025-02-05",
    readTimeMinutes: 5,
    readCount: 8200,
    headings: [
      { id: "definition", text: "What reconciliation means", level: 2 },
      { id: "fixed-vs-true", text: "Fixed payments vs. true reconciliation", level: 2 },
      { id: "legal-shift", text: "The legal shift", level: 2 },
    ],
    body: `
<p>Reconciliation is a clause that requires the MCA provider to adjust your payments based on your actual sales. If your revenue drops, your payments should drop proportionally — that's the whole premise of a "purchase of future receivables."</p>

<h2 id="definition">What reconciliation means</h2>
<p>In theory, an MCA buys a percentage of your daily receipts. When sales are low, you pay less. When sales are high, you pay more. That's reconciliation.</p>

<h2 id="fixed-vs-true">Fixed payments vs. true reconciliation</h2>
<p>But many MCA providers collect fixed daily payments regardless of your sales volume. If your contract doesn't have a reconciliation clause — or if your lender never actually reconciles — you may be paying a fixed amount that doesn't reflect your real revenue.</p>

<h2 id="legal-shift">The legal shift</h2>
<p>Courts have found that MCAs without true reconciliation may actually be loans, which subjects them to usury laws and interest rate caps. Upload your contract to see whether yours includes a real reconciliation clause.</p>
    `.trim(),
  },
  {
    slug: "new-york-mca-settlement-534m",
    title: "New York's $534M MCA Settlement: What It Means for Borrowers",
    excerpt:
      "A major MCA provider agreed to a landmark settlement over deceptive practices. We break down what happened and what it means for your rights.",
    category: "industry-news",
    date: "2025-01-28",
    readTimeMinutes: 7,
    readCount: 22100,
    headings: [
      { id: "what-happened", text: "What happened", level: 2 },
      { id: "borrower-relief", text: "Borrower relief", level: 2 },
      { id: "takeaway", text: "Takeaway", level: 2 },
    ],
    body: `
<p>In November 2023, a major MCA provider agreed to a $534 million settlement with the New York Attorney General over allegations of deceptive lending practices. The case highlighted widespread issues with undisclosed fees, inflated factor rates, and aggressive collection tactics.</p>

<h2 id="what-happened">What happened</h2>
<p>The AG's office alleged that the provider misled small business owners about the true cost of advances, used confessions of judgment to seize assets without due process, and failed to reconcile payments when revenue dropped.</p>

<h2 id="borrower-relief">Borrower relief</h2>
<p>Part of the settlement includes direct relief to affected borrowers and new compliance requirements for the company. Other states are watching — and several have since introduced or passed similar enforcement actions.</p>

<h2 id="takeaway">Takeaway</h2>
<p>If you have an MCA contract, understanding your true APR and contract terms is more important than ever. Use our free analyzer to see what's in your agreement.</p>
    `.trim(),
  },
  {
    slug: "stacking-mcas-danger",
    title: "Why Stacking Multiple MCAs Is So Dangerous",
    excerpt:
      "Taking a second or third advance while repaying the first can push combined costs to 200–350% APR equivalent. Here's how to avoid the trap.",
    category: "mca-basics",
    date: "2025-01-20",
    readTimeMinutes: 6,
    readCount: 9500,
    headings: [
      { id: "what-stacking", text: "What is stacking?", level: 2 },
      { id: "costs", text: "The real combined cost", level: 2 },
      { id: "avoid", text: "How to avoid the trap", level: 2 },
    ],
    body: `
<p>Stacking happens when a business owner takes a second, third, or even fourth MCA while still repaying the first. Each new advance adds another daily payment pulled from your bank account.</p>

<h2 id="what-stacking">What is stacking?</h2>
<p>Multiple advances mean multiple daily debits. Your cash flow gets squeezed from every direction. Many providers know about stacking and some actively encourage it — a second provider might offer more cash knowing you're already stretched thin.</p>

<h2 id="costs">The real combined cost</h2>
<p>The combined cost can be devastating. We've seen businesses paying the equivalent of 200–350% APR across stacked advances. Each provider files a UCC lien against your business; if things go wrong, they'll fight each other — and you — over who gets paid first.</p>

<h2 id="avoid">How to avoid the trap</h2>
<p>Before taking another advance, run the numbers. Use our free tool to analyze your current contract and see your true APR. Then model what adding another advance would do to your daily payments and total cost.</p>
    `.trim(),
  },
  {
    slug: "california-apr-disclosure-law",
    title: "California's New MCA APR Disclosure Law: What Changed",
    excerpt:
      "California now requires MCA providers to disclose equivalent APR before funding. Here's what that means for borrowers in the state.",
    category: "state-guides",
    date: "2025-01-12",
    readTimeMinutes: 5,
    readCount: 6100,
    headings: [
      { id: "requirement", text: "What the law requires", level: 2 },
      { id: "format", text: "Standardized format", level: 2 },
      { id: "other-states", text: "Other states", level: 2 },
    ],
    body: `
<p>California's Department of Financial Protection and Innovation now requires MCA providers to disclose the equivalent annual percentage rate before funding. Providers must present total cost comparisons in standardized formats.</p>

<h2 id="requirement">What the law requires</h2>
<p>Before you sign, you're entitled to see an APR that reflects the true cost of the advance over its term. That puts MCAs on a more level playing field with loans when it comes to comparison shopping.</p>

<h2 id="format">Standardized format</h2>
<p>Disclosures must be in a format that allows apples-to-apples comparison. If you're in California and your lender didn't provide this, you may have rights under state law.</p>

<h2 id="other-states">Other states</h2>
<p>Texas, New York, and others have moved in similar directions. Check your state and always get your contract analyzed so you know exactly what you're signing.</p>
    `.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => (b.readCount ?? 0) - (a.readCount ?? 0))
    .slice(0, limit);
}

export function getCategoryCounts(): Record<BlogCategory, number> {
  const counts = {} as Record<BlogCategory, number>;
  const categories: BlogCategory[] = [
    "mca-basics", "borrower-rights", "lender-profiles", "industry-news",
    "contract-analysis", "state-guides", "tools-resources", "case-studies",
  ];
  categories.forEach((c) => {
    counts[c] = BLOG_POSTS.filter((p) => p.category === c).length;
  });
  return counts;
}

export function getPopularPosts(limit = 5): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => (b.readCount ?? 0) - (a.readCount ?? 0))
    .slice(0, limit);
}
