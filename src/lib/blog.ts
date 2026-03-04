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
    readTimeMinutes: 6,
    readCount: 12400,
    headings: [
      { id: "what-it-means", text: "What a factor rate actually means", level: 2 },
      { id: "convert-apr", text: "Converting factor rate to APR", level: 2 },
      { id: "compare", text: "How to compare offers", level: 2 },
    ],
    body: `
<p>When an MCA provider quotes you a factor rate of 1.35, it sounds reasonable — like a 35% fee. But factor rates aren't interest rates. A factor rate of 1.35 on a $50,000 advance means you repay $67,500 — that's $17,500 in fees.</p>

<p>If your repayment term is 6 months, your effective APR is closer to 70%. If it's 3 months, you're looking at 140% or higher. Factor rates compress what would be a shocking annual rate into a small-sounding decimal. That's by design.</p>

<h2 id="what-it-means">What a factor rate actually means</h2>
<p>Unlike an interest rate, a factor rate is a multiplier applied once to your advance amount. There's no compounding, no annualization — which makes it hard to compare to a bank loan or SBA product.</p>

<h2 id="convert-apr">Converting factor rate to APR</h2>
<p>Our free tool converts your factor rate into a true APR so you can see what you're actually paying — and compare it to other financing options on equal terms. Upload your contract to get your number in under 30 seconds.</p>

<h2 id="compare">How to compare offers</h2>
<p>Always ask for the effective APR, not just the factor rate. If a lender won't provide it, that's a red flag. Use our APR calculator to model different advance amounts and terms before you sign.</p>
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
