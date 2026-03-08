import { PILLAR_POSTS } from "./blog-posts";

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
  body: string; // HTML for article page
  headings?: { id: string; text: string; level: 2 | 3 }[];
  author?: string;
  authorBio?: string;
  credentials?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mca-reconciliation-request-how-to",
    title: "How to Reconcile Your MCA Payments Without Paying Anyone",
    excerpt:
      "Your MCA contract already gives you the right to lower your daily payments when revenue drops. Here's the legal basis, the email template, and how to do it yourself for free.",
    category: "borrower-rights",
    date: "2026-03-06",
    readTimeMinutes: 14,
    readCount: 0,
    author: "FundingWatch Editorial Team",
    authorBio:
      "FundingWatch analyzes MCA contracts, court rulings, and borrower rights so small business owners have the facts they need to exercise their rights and make informed decisions.",
    credentials: "Original legal education content with primary source citations",
    headings: [
      { id: "what-reconciliation-is", text: "What Reconciliation Actually Is", level: 2 },
      { id: "what-courts-have-said", text: "What Courts Have Said About Funders Who Ignore Reconciliation Requests", level: 2 },
      { id: "why-this-matters-before-default", text: "Why This Matters Before You Default", level: 2 },
      { id: "step-by-step", text: "Step by Step: How to Submit a Reconciliation Request", level: 2 },
      { id: "step-1", text: "Step 1: Pull Your Contract and Find the Reconciliation Clause", level: 3 },
      { id: "step-2", text: "Step 2: Pull Three Months of Bank Statements", level: 3 },
      { id: "step-3", text: "Step 3: Calculate What Your Daily Payment Should Be", level: 3 },
      { id: "step-4", text: "Step 4: Send the Email", level: 3 },
      { id: "step-5", text: "Step 5: Document Everything", level: 3 },
      { id: "step-6", text: "Step 6: If They Ignore You", level: 3 },
      { id: "what-about-companies", text: "What About the Companies Offering to Do This for You?", level: 2 },
      { id: "when-you-need-lawyer", text: "When You Do Need a Lawyer", level: 2 },
      { id: "the-bottom-line", text: "The Bottom Line", level: 2 },
      { id: "primary-sources", text: "Primary Sources", level: 2 },
    ],
    body: `
<p>If you are currently struggling to make daily MCA payments, there is a good chance someone has already called you offering to help, for a fee. Debt relief companies, settlement firms, and "MCA consultants" have built entire businesses around the premise that reconciliation is a complicated service requiring professional expertise.</p>
<p>It is not. Reconciliation is a clause in your contract. It is a right you already paid for when you signed the agreement. And the way you exercise it is by sending your funder an email with three months of bank statements attached.</p>
<p>What follows is the legal basis for that right, what courts have said about funders who ignore it, and the exact steps including template language to invoke it yourself.</p>

<h2 id="what-reconciliation-is">What Reconciliation Actually Is</h2>
<p>A merchant cash advance is, in legal theory, a purchase of your future receivables, not a loan. The funder buys a fixed dollar amount of your future sales and collects it as a percentage of your actual daily revenue. When business is good, you pay faster. When business slows, the daily pull shrinks proportionally.</p>
<p>That is the product as it is supposed to work. The reconciliation provision is the mechanism that makes it work. It requires the funder to periodically, or upon request, adjust the daily payment amount based on your actual revenue so that the effective collection rate stays at the agreed percentage of receivables.</p>
<p>If your revenue is down 40%, your daily payment should be down 40%. That adjustment is not a favor. It is what you contracted for.</p>
<p>In practice, many MCA funders treat the reconciliation clause as boilerplate, language inserted to satisfy the legal definition of a receivables purchase, never intended to be honored. That practice has become the single most litigated issue in MCA case law, and courts have consistently ruled against funders who operate that way.</p>

<h2 id="what-courts-have-said">What Courts Have Said About Funders Who Ignore Reconciliation Requests</h2>
<p>The legal record on reconciliation is now extensive and unambiguous.</p>
<p>In <em>People v. Richmond Capital Group LLC</em>, New York Commercial Division Justice Andrew Borrok held that Richmond's reconciliation provisions were, in his words, a "complete sham." The funder had included the clause in its contracts to satisfy the legal definition of a receivables purchase but had no intention of honoring it in practice. Justice Borrok found that Richmond's actual goal was to engineer defaults, not accommodate revenue fluctuations. The court held the agreements were usurious loans, not receivables purchases, in part because the reconciliation right was illusory.</p>
<p>The Second Circuit reached the same conclusion in <em>Fleetwood Services LLC v. Richmond Capital Group LLC</em> in 2023, finding that payment obligations were absolute and the funder bore no real risk of the merchant's business failure. An agreement where the funder ignores revenue performance entirely is a loan, not a purchase, and a criminally usurious one when the effective APR exceeds New York's 25% cap.</p>
<p>In multiple bankruptcy court decisions, including the 2025 ruling in <em>In re Williams Land Clearing</em>, courts found that funders who refused to honor reconciliation while keeping daily debits fixed regardless of actual receivables had their agreements voided entirely as usurious loans, with prior payments ordered returned to the debtor.</p>
<p>A funder who refuses a documented, legitimate reconciliation request is not just being difficult. They are potentially converting a legal receivables purchase into an illegal loan, creating usury liability and voiding their own agreement.</p>

<h2 id="why-this-matters-before-default">Why This Matters Before You Default</h2>
<p>The documentation you create when you submit a reconciliation request has legal significance that extends well beyond the immediate question of whether your daily payment gets reduced.</p>
<p>If your funder honors the request, you get payment relief proportional to your revenue decline, exactly what the contract promised. If your funder ignores the request, you have created a dated, written record that: you invoked the reconciliation right, you provided supporting documentation, and the funder declined to comply.</p>
<p>That record is the factual foundation for a recharacterization argument, the legal theory that your agreement was a loan, not a receivables purchase, because the funder treated it as one. Courts in New York, the Second Circuit, and bankruptcy courts across the country have found exactly this pattern to support recharacterization.</p>
<p>Submitting the request is not just about getting payment relief today. It is about building the record that protects you if this ends in litigation.</p>

<h2 id="step-by-step">Step by Step: How to Submit a Reconciliation Request</h2>

<h3 id="step-1">Step 1: Pull Your Contract and Find the Reconciliation Clause</h3>
<p>Look for language describing the "specified percentage" or "purchased percentage" of receivables, typically in the first two pages of the agreement. It will describe the collection rate as a percentage of your daily or weekly receipts. Note the exact percentage stated. This is the number your funder is legally obligated to collect, not a fixed daily dollar amount.</p>

<h3 id="step-2">Step 2: Pull Three Months of Bank Statements</h3>
<p>You need documentation showing your actual revenue decline. Three months of complete business bank statements showing all deposits is the standard. If your business uses a point-of-sale system, daily sales reports corroborate the bank data. The more specific the documentation, the harder the request is to ignore.</p>

<h3 id="step-3">Step 3: Calculate What Your Daily Payment Should Be</h3>
<p>Take your average monthly deposits over the three-month period, divide by the number of business days, and multiply by your contracted receivables percentage. That number is your correct daily payment under the agreement. Compare it to what is currently being debited. The difference is what you are demanding be corrected.</p>

<h3 id="step-4">Step 4: Send the Email</h3>
<p>Email the funder's servicing or collections address. CC any address you have for your account representative. Subject line should include your account or contract number. Keep the tone professional and factual. Do not threaten legal action in the initial request. State your right, provide your documentation, and request written confirmation of the adjustment.</p>
<p><strong>Template language:</strong></p>
<div style="background: var(--color-bg-surface); border: 1px solid var(--color-border-default); border-radius: 8px; padding: 1rem 1.25rem; margin: 1rem 0; font-family: ui-monospace, monospace; font-size: 0.9rem; white-space: pre-wrap;">Subject: Reconciliation Request, Account #[YOUR ACCOUNT NUMBER]

To Whom It May Concern,

I am writing to formally request reconciliation of my daily payment amount under the Receivables Purchase Agreement dated [DATE], Account Number [NUMBER].

Section [X] of our agreement specifies that daily remittances shall represent [X]% of my daily receivables. My actual average daily receivables for the period [START DATE] through [END DATE] are $[AMOUNT], as documented in the attached bank statements.

The correct daily remittance under our agreement is therefore $[CALCULATED AMOUNT]. I am requesting that you adjust my daily ACH debit to this amount, effective immediately, and confirm this adjustment in writing.

I am attaching three months of business bank statements in support of this request. Please confirm receipt and provide written confirmation of the adjusted daily amount within five business days.

Regards,
[YOUR NAME]
[BUSINESS NAME]
[CONTACT INFORMATION]</div>

<h3 id="step-5">Step 5: Document Everything</h3>
<p>Save the sent email with timestamp. Save delivery receipts. If the funder calls you instead of responding in writing, follow up the call with an email summarizing what was discussed and asking for written confirmation. The written record is what matters legally. A phone conversation that leaves no trace does not exist in litigation.</p>

<h3 id="step-6">Step 6: If They Ignore You</h3>
<p>Wait five business days. If you receive no response or a denial without explanation, send a follow-up email referencing the initial request by date and asking for the specific contractual basis for the denial. This creates a second timestamp and forces the funder to either comply, explain their refusal in writing, or ignore a second documented request.</p>
<p>A funder who ignores two documented reconciliation requests, supported by bank statement documentation, while continuing to debit a fixed daily amount that does not reflect your actual receivables percentage, has created the factual record that courts in New York and the Second Circuit have used to void MCA agreements and impose usury liability.</p>

<h2 id="what-about-companies">What About the Companies Offering to Do This for You?</h2>
<p>There is an entire industry of companies, operating under names like "MCA relief," "merchant debt solutions," and variations thereof, that offer to negotiate reconciliation on your behalf, typically for upfront fees ranging from hundreds to thousands of dollars.</p>
<p>The FTC's own rules on debt relief services state that a company cannot collect any fees until at least one debt has been successfully settled or reduced, the borrower has agreed to the terms, and the company has shown a written agreement from the creditor. Many of the companies operating in this space collect fees before doing any of that.</p>
<p>Consumer review records show borrowers paying five and six figures to companies that sent a single email, or in some cases, made no documented contact with the funder at all, before the borrower's account went to collections and they faced lawsuits from the original MCA company on top of having lost money to the relief company.</p>
<p>What these companies charge thousands for is the email template above. The reconciliation right belongs to you. The documentation is yours to gather. The email takes twenty minutes to write. No one can negotiate a contractual right more effectively than the party who holds it.</p>

<h2 id="when-you-need-lawyer">When You Do Need a Lawyer</h2>
<p>Reconciliation is something you can and should handle yourself. There are situations, however, where legal representation is appropriate and necessary.</p>
<ul>
<li><strong>Your funder has already sued you.</strong> Once litigation is filed, you are in a legal proceeding. Reconciliation requests become evidence in that proceeding and should be coordinated with counsel.</li>
<li><strong>Your funder has filed a <a href="/blog/confession-of-judgment-danger">Confession of Judgment</a> against you.</strong> COJs bypass the court process entirely and can result in bank account freezes and asset seizure with no advance notice. Vacating a COJ requires a lawyer.</li>
<li><strong>You are considering bankruptcy.</strong> The interaction between MCA obligations, preference periods, and recharacterization in bankruptcy is a legal analysis that requires a qualified bankruptcy attorney.</li>
<li><strong>Your funder's agreement has rates exceeding 100% APR.</strong> If your effective APR approaches or exceeds New York's 25% criminal usury threshold, an attorney can evaluate whether the agreement is voidable as a matter of law, separate from any reconciliation issue.</li>
</ul>
<p>In those situations, what you want is a licensed attorney who handles MCA defense, not a debt settlement company. The distinction matters because only an attorney can represent you in litigation, file legal motions, and take legal positions on your behalf. A settlement company cannot do any of those things.</p>

<h2 id="the-bottom-line">The Bottom Line</h2>
<p>Reconciliation is not a mystery. It is not a specialized service. It is a provision in a contract you signed, grounded in the legal definition of what an MCA is supposed to be: a revenue-contingent receivables purchase, not a fixed-payment loan.</p>
<p>Courts at every level, from New York trial courts to the Second Circuit Court of Appeals, have validated the reconciliation right and penalized funders who treat it as a sham. The legal record supports you. The contractual language supports you. The documentation process is straightforward.</p>
<p>If your revenue is down, send the email. Do it in writing. Attach your bank statements. Keep the confirmation. And if your funder ignores a documented, legitimate reconciliation request, that is not your problem. Under the case law developed over the last five years, it is theirs.</p>
<p>Upload your MCA contract at fundingwatch.org for a free analysis that identifies your reconciliation clause, flags your lender's enforcement history, and tells you exactly where you stand before you make another payment.</p>

<h2 id="primary-sources">Primary Sources</h2>
<ul>
<li><em>People v. Richmond Capital Group LLC</em>, Justice Borrok ruling on reconciliation as "sham" (NY Commercial Division 2023) — <a href="https://www.nycdebtlawyers.com/debt-defense-blog/2023/october/new-york-state-judge-rules-that-merchant-cash-ad/" target="_blank" rel="noopener noreferrer">nycdebtlawyers.com</a></li>
<li><em>Fleetwood Services LLC v. Richmond Capital Group LLC</em>, Second Circuit (2023) — <a href="https://www.clm.com/second-circuit-brings-federal-rico-caselaw-in-line-with-new-york-state-merchant-cash-advance-decisions/" target="_blank" rel="noopener noreferrer">clm.com</a></li>
<li><em>In re Williams Land Clearing</em>, reconciliation failure and agreement voided ab initio (Bankr. E.D.N.C. 2025) — <a href="https://www.lplegal.com/content/recharacterization-merchant-cash-advance-agreements-bankruptcy/" target="_blank" rel="noopener noreferrer">lplegal.com</a></li>
<li>NY AG v. <a href="/blog/new-york-mca-settlement-534m">Yellowstone Capital</a>, reconciliation provisions as false representations (NYAG Official Page) — <a href="https://ag.ny.gov/resources/individuals/credit-debt-lending/yellowstone-settlement" target="_blank" rel="noopener noreferrer">ag.ny.gov</a></li>
<li>FTC Debt Relief Rules, fee prohibition before settlement — <a href="https://www.ftc.gov/debt-relief" target="_blank" rel="noopener noreferrer">ftc.gov</a></li>
</ul>

<p><strong>This article is for educational purposes only and does not constitute legal or financial advice.</strong> If you are dealing with an MCA contract dispute or considering your legal options, consult a licensed attorney in your jurisdiction.</p>
<p><em>Last reviewed: March 2026.</em></p>
    `.trim(),
  },
  {
    slug: "what-is-factor-rate",
    title: "What Is a Factor Rate on a Merchant Cash Advance?",
    excerpt:
      "A factor rate of 1.35 sounds like a 35% fee. It is not. Learn how factor rates hide the true cost of your MCA and how to convert yours to a real APR.",
    category: "mca-basics",
    date: "2025-02-15",
    readTimeMinutes: 9,
    readCount: 12400,
    author: "Alex Tchogorian",
    authorBio:
      "Alex Tchogorian holds a Bachelor of Science in Finance and has spent more than five years analyzing distressed debt, predatory lending structures, and business restructuring. He founded FundingWatch after seeing how many small business owners signed MCA contracts without understanding what they were actually agreeing to pay.",
    credentials: "Bachelor of Science in Finance • 5+ years analyzing distressed debt, predatory lending, and business restructuring",
    headings: [
      { id: "what-factor-rate-is", text: "What a Factor Rate Actually Is", level: 2 },
      { id: "compare-interest-rates", text: "How Factor Rates Compare to Interest Rates", level: 2 },
      { id: "conversion-formula", text: "The Factor Rate to APR Conversion Formula", level: 2 },
      { id: "why-lenders-use", text: "Why Lenders Use Factor Rates Instead of APR", level: 2 },
      { id: "high-factor-signals", text: "What a High Factor Rate Actually Signals", level: 2 },
      { id: "what-to-do-have-mca", text: "What to Do If You Already Have an MCA", level: 2 },
      { id: "state-disclosure-laws", text: "State Disclosure Laws and Your Rights", level: 2 },
      { id: "faq", text: "Frequently Asked Questions", level: 2 },
      { id: "faq-same-as-interest", text: "Is a factor rate the same as an interest rate?", level: 3 },
      { id: "faq-good-factor-rate", text: "What is a good factor rate for a merchant cash advance?", level: 3 },
      { id: "faq-negotiate", text: "Can I negotiate my factor rate?", level: 3 },
      { id: "faq-states-apr", text: "What states require MCA lenders to disclose APR?", level: 3 },
      { id: "faq-no-disclosure", text: "What happens if my MCA lender did not disclose my APR?", level: 3 },
    ],
    body: `
<p>When an MCA provider quotes you a factor rate of 1.35, it sounds like a simple fee. A 35% charge on your advance. Reasonable, even. But a factor rate on a merchant cash advance is not an interest rate, and that distinction is where billions of dollars in hidden costs live every year.</p>
<p>This article explains exactly what a factor rate is, how it converts to a real annual percentage rate, why lenders use factor rates instead of APR, and what state laws now require lenders to disclose before you sign.</p>
<p>If you have an MCA contract in front of you right now, the most important number is not the factor rate. It is the effective APR once you account for your actual repayment term. That number is almost always significantly higher than what you were quoted.</p>

<h2 id="what-factor-rate-is">What a Factor Rate Actually Is</h2>
<p>A factor rate is a multiplier applied once to the total advance amount. If you borrow $50,000 at a factor rate of 1.35, you repay $67,500. The $17,500 difference is the lender's fee. It does not compound. It does not change based on how quickly you repay.</p>
<p>That sounds straightforward. The problem is what happens when you compare that $17,500 fee to the time it takes you to pay it back.</p>
<p>A $17,500 fee on a $50,000 advance repaid over 12 months works out to roughly a 35% annual cost. That is expensive but within a range that many businesses can evaluate.</p>
<p>The same $17,500 fee repaid over 4 months is closer to 105% annualized. Over 90 days, you are looking at 140% or higher.</p>
<p>MCA providers almost never quote repayment terms in months. They quote in daily payment amounts. That makes it nearly impossible to calculate what you are actually paying on an annual basis without doing the math yourself, which is exactly why factor rates exist as a pricing mechanism.</p>

<h2 id="compare-interest-rates">How Factor Rates Compare to Interest Rates</h2>
<p>Interest rates on traditional loans work very differently. A 10% annual interest rate on a $50,000 loan means you pay approximately $5,000 in interest over one year, and that interest accrues on the declining balance as you pay down principal.</p>
<p>A factor rate has no declining balance. You owe the full fee amount from day one, regardless of whether you pay early. If you take a $50,000 advance at 1.35 and pay it off in 60 days instead of 120, you still owe $67,500. There is no interest savings from early repayment in the traditional sense, though some lenders offer a prepayment discount that reduces the total cost if you pay early. Always check whether your contract includes this provision. The article on <a href="/blog/reconciliation-clause-why-you-need-it">how to read your MCA reconciliation clause</a> covers what to look for in your contract terms.</p>

<h2 id="conversion-formula">The Factor Rate to APR Conversion Formula</h2>
<p>Converting a factor rate to APR requires knowing three things: the advance amount, the factor rate, and the repayment term in days.</p>
<p>The formula is:</p>
<p>APR = ((Total Repayment Amount minus Advance Amount) divided by Advance Amount) multiplied by (365 divided by Repayment Term in Days)</p>
<p>Using the $50,000 advance at 1.35 example across different repayment terms:</p>
<ul>
<li>Repayment term of 90 days: effective APR of approximately 142%</li>
<li>Repayment term of 120 days: effective APR of approximately 106%</li>
<li>Repayment term of 180 days: effective APR of approximately 71%</li>
<li>Repayment term of 270 days: effective APR of approximately 47%</li>
<li>Repayment term of 365 days: effective APR of approximately 35%</li>
</ul>
<p>The factor rate stays the same in every scenario. The APR changes dramatically based on how fast you repay. Most MCA repayment terms run between 90 and 180 days, which puts the effective APR for a 1.35 factor rate between 71% and 142% in most cases.</p>
<p>A factor rate of 1.49 on a 90-day term produces an APR of approximately 199%. A 1.49 factor rate on a 180-day term produces roughly 99% APR. These are not edge cases. Rates in this range are common across the MCA industry.</p>

<h2 id="why-lenders-use">Why Lenders Use Factor Rates Instead of APR</h2>
<p>The answer is straightforward: factor rates make the cost of the advance look smaller and harder to compare.</p>
<p>A business owner hearing "factor rate 1.35" and mentally translating that to "35% fee" is unlikely to connect that to a 100%+ annual cost. A business owner hearing "annual percentage rate of 106%" would immediately recognize that they are paying more than a credit card at its penalty rate.</p>
<p>The Consumer Financial Protection Bureau (CFPB) has noted that the lack of standardized APR disclosure in commercial lending is a significant consumer protection gap. Unlike personal loans and mortgages, business financing products are not subject to federal Truth in Lending Act disclosure requirements, which means lenders have no federal obligation to show you an APR before you sign.</p>
<p>California changed this at the state level. Senate Bill 1235 (California DFPI), which took full effect in December 2022, requires MCA providers operating in California to disclose an estimated APR before funding. New York passed similar disclosure legislation in 2023. If you are in either state and your lender did not provide an APR disclosure, you may have legal grounds worth discussing with an attorney.</p>
<p>The FTC has issued small business financing guidance that also addresses transparency in commercial financing.</p>

<h2 id="high-factor-signals">What a High Factor Rate Actually Signals</h2>
<p>Not all factor rates signal predatory lending. Some small businesses with poor credit history, seasonal revenue patterns, or urgent capital needs genuinely have limited financing options and accept higher costs as a trade-off for speed and access.</p>
<p>The problem is when the true cost is obscured rather than disclosed.</p>
<p>A factor rate above 1.40 combined with a repayment term under 120 days should prompt serious questions before you sign. A factor rate above 1.49 on any term produces APRs that exceed 100% annualized and sits in territory that multiple state attorneys general have characterized as predatory pricing.</p>
<p>Questions to ask any MCA provider before signing include: what is my effective APR, is there a reconciliation clause that adjusts my payments if revenue drops, is there a prepayment discount, and what happens if I miss a payment. The article on <a href="/blog/stacking-mcas-danger">MCA stacking danger</a> explains what happens when businesses take additional advances to cover payments on existing ones, which is one of the most common patterns that leads to financial distress.</p>

<h2 id="what-to-do-have-mca">What to Do If You Already Have an MCA</h2>
<p>If you have an existing MCA and you are not sure what your effective APR is, the first step is to gather your contract and your last 30 days of bank statements showing the daily debit amounts.</p>
<p>Calculate your total repayment obligation by multiplying the advance amount by the factor rate. Then divide that fee by the advance amount to get the percentage cost. Divide 365 by your total repayment term in days to annualize it. Multiply the two numbers together.</p>
<p>If the number surprises you, you are not alone. Many business owners who used FundingWatch's contract analyzer discovered their effective APR was significantly higher than what they had mentally calculated from the factor rate alone.</p>

<h2 id="state-disclosure-laws">State Disclosure Laws and Your Rights</h2>
<p>Beyond California and New York, Virginia, Utah, and several other states have introduced or passed commercial financing disclosure laws that apply to MCAs. Texas HB 700, which took effect in September 2025, expanded disclosure requirements for Texas-based borrowers.</p>
<p>If you are in a disclosure-law state and your lender did not provide a standardized APR disclosure before funding, document that failure. It may be relevant if you later pursue a legal challenge to the contract terms.</p>
<p>The California DFPI maintains a public register of licensed commercial financing providers. If your lender is not on it and they funded you in California, that is a significant compliance issue worth raising with an attorney. For more on California's requirements, see our guide to the <a href="/blog/california-apr-disclosure-law">California APR disclosure law</a>.</p>

<h2 id="faq">Frequently Asked Questions</h2>
<h3 id="faq-same-as-interest">Is a factor rate the same as an interest rate?</h3>
<p>No. A factor rate is a flat multiplier applied to the advance amount at origination. An interest rate accrues on a declining balance over time. Factor rates make comparison to traditional loans difficult because they do not annualize naturally.</p>
<h3 id="faq-good-factor-rate">What is a good factor rate for a merchant cash advance?</h3>
<p>There is no universally good factor rate because the cost depends heavily on your repayment term. A 1.20 factor rate on a 90-day term produces a higher APR than a 1.35 factor rate on a 270-day term. Always calculate the effective APR, not just the factor rate.</p>
<h3 id="faq-negotiate">Can I negotiate my factor rate?</h3>
<p>Some lenders have flexibility, particularly if you have strong monthly revenue, a long operating history, or multiple offers in hand. Negotiating from a position of having competing offers is more effective than negotiating blind.</p>
<h3 id="faq-states-apr">What states require MCA lenders to disclose APR?</h3>
<p>As of 2025, California, New York, Virginia, and Utah have the most developed commercial financing disclosure laws that apply to MCAs. Texas passed disclosure legislation effective September 2025. Federal disclosure requirements do not currently apply to commercial MCA transactions.</p>
<h3 id="faq-no-disclosure">What happens if my MCA lender did not disclose my APR in a disclosure-law state?</h3>
<p>The remedy depends on the state and the specific violation. In some cases it may create grounds to challenge the contract terms or seek modification. Consult with an attorney who handles MCA defense in your state.</p>

<p><strong>This article is for educational purposes only and does not constitute legal or financial advice.</strong> If you are dealing with an MCA contract dispute or considering your legal options, consult a licensed attorney in your jurisdiction.</p>
    `.trim(),
  },
  {
    slug: "confession-of-judgment-danger",
    title: "Confession of Judgment in MCA Contracts: What It Means",
    excerpt:
      "A confession of judgment lets an MCA lender get a court judgment against you without warning. Learn what it is, how it works, and what states have banned it.",
    category: "contract-analysis",
    date: "2025-02-10",
    readTimeMinutes: 10,
    readCount: 18900,
    author: "Alex Tchogorian",
    authorBio:
      "Alex Tchogorian holds a Bachelor of Science in Finance and has spent more than five years analyzing distressed debt, predatory lending structures, and business restructuring. He founded FundingWatch after seeing how many small business owners signed MCA contracts without understanding what they were actually agreeing to pay.",
    credentials: "Bachelor of Science in Finance • 5+ years analyzing distressed debt, predatory lending, and business restructuring",
    headings: [
      { id: "what-is-coj", text: "What Is a Confession of Judgment?", level: 2 },
      { id: "how-coj-works", text: "How a Confession of Judgment Works Step by Step", level: 2 },
      { id: "ny-reform", text: "The New York Reform and What It Actually Covers", level: 2 },
      { id: "identify-clause", text: "How to Identify a COJ Clause in Your Contract", level: 2 },
      { id: "account-frozen", text: "What Happens If Your Account Gets Frozen", level: 2 },
      { id: "coj-usury", text: "COJs and the Usury Defense", level: 2 },
      { id: "contract-has-coj", text: "What to Do If Your Contract Has a COJ Clause", level: 2 },
      { id: "faq", text: "Frequently Asked Questions", level: 2 },
      { id: "faq-cross-out", text: "Can I cross out a confession of judgment clause?", level: 3 },
      { id: "faq-credit", text: "Does a COJ affect my personal credit?", level: 3 },
      { id: "faq-difference", text: "What is the difference between a COJ and a regular lawsuit?", level: 3 },
      { id: "faq-vacated", text: "Can a COJ judgment be vacated?", level: 3 },
      { id: "faq-enforceable", text: "Is a COJ clause always enforceable?", level: 3 },
    ],
    body: `
<p>A confession of judgment is one of the most powerful legal weapons an MCA lender can hold over a small business owner, and most borrowers do not realize they signed one until their bank account is already frozen.</p>
<p>This article explains exactly what a confession of judgment is, what it allows a lender to do, which states still permit enforcement against out-of-state borrowers, how New York's 2019 reform changed the landscape, and what your options are if your contract contains one.</p>

<h2 id="what-is-coj">What Is a Confession of Judgment?</h2>
<p>A confession of judgment (COJ) is a contractual clause in which you, as the borrower, agree in advance to allow a lender to obtain a court judgment against you without filing a lawsuit, without notifying you, and without giving you an opportunity to defend yourself.</p>
<p>When you sign a contract containing a COJ, you are pre-authorizing the lender to walk into a courthouse clerk's office, file paperwork stating that you defaulted, and receive a legally enforceable judgment against you on the spot. No judge reviews the claim. No hearing is scheduled. You are not served with papers. The first time most borrowers learn a judgment has been entered against them is when their bank account is frozen or their payment processor is seized.</p>
<p>This is not a theoretical risk. It is a documented pattern across the MCA industry. The New York Attorney General's office documented extensive COJ abuse in its case against Yellowstone Capital, which resulted in a <a href="/blog/new-york-mca-settlement-534m">$534 million settlement in 2023</a>. That case involved COJs used systematically to freeze business accounts of borrowers who disputed their contracts or tried to negotiate repayment terms.</p>

<h2 id="how-coj-works">How a Confession of Judgment Works Step by Step</h2>
<p>Understanding the mechanics helps you understand why this clause is so dangerous.</p>
<p><strong>Step one:</strong> You sign an MCA contract that contains a COJ provision. This language is often buried several pages into the agreement under headings like "Remedies Upon Default" or "Borrower Acknowledgments." It is frequently written in dense legal language that is difficult to parse on a first read.</p>
<p><strong>Step two:</strong> You miss a payment, your bank account balance drops below the daily debit amount, or the lender claims you defaulted for any reason permitted under the contract. Many MCA contracts define default broadly enough that a lender can declare default even if you have not actually failed to make a payment.</p>
<p><strong>Step three:</strong> The lender's attorney files the COJ affidavit with a state court clerk, usually in a state that permits COJ enforcement. Historically, MCA lenders filed most COJs in New York state courts because New York's CPLR Section 3218 permitted them. The filing is ministerial, meaning no judge reviews it for merit.</p>
<p><strong>Step four:</strong> A judgment is entered against your business, and often against you personally if you signed a personal guarantee. The lender can immediately begin collection actions including bank levies, payment processor seizures, and UCC lien enforcement.</p>
<p><strong>Step five:</strong> You discover the judgment. At this point you must hire an attorney and file an emergency motion to vacate the judgment while simultaneously trying to keep your business operational. Even if the underlying COJ was improperly filed or the default was disputed, vacating a judgment takes time and legal fees.</p>

<h2 id="ny-reform">The New York Reform and What It Actually Covers</h2>
<p>In 2019, New York amended its CPLR to prohibit enforcement of confessions of judgment entered against out-of-state residents. This was a significant reform driven directly by documented MCA industry abuse.</p>
<p><strong>What the reform does:</strong> it prevents MCA lenders from using New York courts to enter and enforce COJ judgments against borrowers located outside New York state.</p>
<p><strong>What the reform does not do:</strong> it does not ban COJ clauses from MCA contracts. Lenders continue to include them. A borrower outside New York who signs a contract with a COJ clause may still face enforcement in states where COJs remain fully legal. It does not retroactively void COJ judgments entered before the reform. It does not prevent a lender from filing suit in a state other than New York that still permits COJ enforcement.</p>
<p>States where confessions of judgment are still broadly permitted include Pennsylvania, Virginia, Ohio, and several others. Florida law does not recognize cognovit notes (the equivalent mechanism) but has other enforcement tools that serve similar purposes for lenders.</p>
<p>If your MCA contract contains a COJ clause and specifies a venue state that still permits enforcement, the New York reform does not protect you.</p>

<h2 id="identify-clause">How to Identify a COJ Clause in Your Contract</h2>
<p>Look for the following language patterns in your MCA agreement. Any of these should prompt immediate attention:</p>
<ul>
<li>Language referencing "confession of judgment," "cognovit note," or "warrant of attorney" is the most direct indicator.</li>
<li>Language stating that you "waive your right to notice," "consent to the jurisdiction of" a specific court, or "authorize entry of judgment without prior notice" serves the same function even without using the term "confession of judgment."</li>
<li>Language stating that the lender's attorney may appear on your behalf in any legal proceeding and confess judgment is the classic COJ formulation.</li>
<li>Venue selection clauses that specify New York, Pennsylvania, or another COJ-permitting state as the exclusive venue for disputes, even when your business is located elsewhere, are often paired with COJ provisions.</li>
</ul>

<h2 id="account-frozen">What Happens If Your Account Gets Frozen</h2>
<p>If you discover that an MCA lender has obtained a judgment against you and frozen your bank account, the sequence of actions matters enormously.</p>
<p>The first thing to do is not to call the lender. Contact a business litigation attorney or MCA defense attorney immediately. Filing an emergency motion to vacate the judgment is time-sensitive. In most jurisdictions there are deadlines for challenging a judgment after it is entered, and missing those deadlines can limit your options significantly.</p>
<p>Document everything before the account freeze if possible: copies of all correspondence with the lender, your bank statements showing payment history, any communications where the lender claimed default. This documentation is the foundation of any challenge to the judgment.</p>
<p>Understand that disputing the underlying debt and challenging the COJ are two separate legal arguments. An attorney may challenge the COJ on procedural grounds (improper venue, failure to meet filing requirements, the New York reform) independently of whether you actually owe the debt.</p>

<h2 id="coj-usury">COJs and the Usury Defense</h2>
<p>One reason COJ enforcement has attracted so much legal scrutiny is its relationship to the broader question of whether MCAs are actually loans.</p>
<p>If a court finds that an MCA is a loan rather than a purchase of future receivables, it becomes subject to state usury laws. A COJ filed in connection with a usurious loan may itself be unenforceable depending on the jurisdiction. New York courts have developed a three-factor test for determining whether an MCA is a loan, and several decisions have found that MCAs with fixed daily payments and no genuine reconciliation provision have loan-like characteristics.</p>
<p>The $534 million Yellowstone Capital settlement is the most prominent example of how these arguments play out at scale. The New York AG successfully argued that Yellowstone's practices, including systematic COJ abuse, constituted deceptive and illegal lending. The <a href="/blog/reconciliation-clause-why-you-need-it">reconciliation clause article</a> on this site discusses how courts have used reconciliation as a key factor in the MCA-versus-loan analysis.</p>

<h2 id="contract-has-coj">What to Do If Your Contract Has a COJ Clause</h2>
<p>If you have an MCA contract with a COJ clause and you are currently in default or approaching default, the time to act is before the lender files the COJ, not after.</p>
<p>Proactively engaging the lender through counsel often produces better outcomes than waiting for enforcement action. Lenders have incentives to negotiate because litigation is expensive and time-consuming even when they have a COJ. A structured settlement, a modified payment plan, or a reconciliation request can sometimes be achieved before a COJ is filed.</p>
<p>If you are current on payments but have seen the COJ clause in your contract and want to understand your exposure, that is worth discussing with an attorney before any default occurs. The clause itself does not harm you unless the lender files it. But knowing it exists means knowing exactly what the lender can do if things go wrong.</p>
<p>For context on how factor rates and total cost work in your contract, see <a href="/blog/what-is-factor-rate">what is a factor rate</a>.</p>

<h2 id="faq">Frequently Asked Questions</h2>
<h3 id="faq-cross-out">Can I cross out a confession of judgment clause before signing?</h3>
<p>You can attempt to negotiate the removal of any contract clause before signing. Whether the lender agrees is a different matter. MCA contracts are generally presented as standard form agreements, but some lenders will negotiate terms, particularly for larger advances or borrowers with strong financials.</p>
<h3 id="faq-credit">Does a COJ affect my personal credit?</h3>
<p>If you signed a personal guarantee, a judgment entered via COJ can affect your personal credit and allow the lender to pursue your personal assets. MCA contracts frequently include personal guarantees. Review your contract carefully for personal guarantee language.</p>
<h3 id="faq-difference">What is the difference between a COJ and a regular lawsuit?</h3>
<p>A regular lawsuit requires the lender to serve you with legal papers, wait for a response period, and potentially go through discovery and a hearing before obtaining a judgment. A COJ bypasses all of that. The judgment is entered at the clerk's office without judicial review of the underlying claim.</p>
<h3 id="faq-vacated">Can a COJ judgment be vacated?</h3>
<p>Yes, judgments can be challenged and vacated, but the process requires legal action and is not guaranteed. Common grounds include: the COJ was filed in a state that does not recognize the borrower's home state as a valid venue, the filing did not meet technical requirements under the applicable state statute, or the underlying default was improperly declared.</p>
<h3 id="faq-enforceable">Is a COJ clause always enforceable?</h3>
<p>No. Enforceability depends on the laws of the state where the COJ was filed, whether the lender followed proper procedures, and in some cases whether the underlying MCA has characteristics that courts might classify as a loan rather than a purchase of receivables. An attorney familiar with MCA defense in your jurisdiction can assess enforceability in your specific situation.</p>

<p><strong>This article is for educational purposes only and does not constitute legal or financial advice.</strong> If you are dealing with an MCA contract dispute, a frozen account, or a confession of judgment filing, consult a licensed attorney in your jurisdiction immediately.</p>
    `.trim(),
  },
  {
    slug: "reconciliation-clause-why-you-need-it",
    title: "MCA Reconciliation Clause: What It Is and Why It Matters",
    excerpt:
      "A reconciliation clause requires your MCA lender to adjust payments when revenue drops. Without one, your MCA may legally be a loan subject to usury caps.",
    category: "borrower-rights",
    date: "2025-02-05",
    readTimeMinutes: 9,
    readCount: 8200,
    author: "Alex Tchogorian",
    authorBio:
      "Alex Tchogorian holds a Bachelor of Science in Finance and has spent more than five years analyzing distressed debt, predatory lending structures, and business restructuring. He founded FundingWatch after seeing how many small business owners signed MCA contracts without understanding what they were actually agreeing to pay.",
    credentials: "Bachelor of Science in Finance • 5+ years analyzing distressed debt, predatory lending, and business restructuring",
    headings: [
      { id: "what-reconciliation-means", text: "What Reconciliation Means in an MCA Context", level: 2 },
      { id: "fixed-vs-true", text: "Fixed Payments Versus True Reconciliation", level: 2 },
      { id: "find-clause", text: "How to Find the Reconciliation Clause in Your Contract", level: 2 },
      { id: "request-reconciliation", text: "How to Request Reconciliation", level: 2 },
      { id: "lenders-refuse", text: "When Lenders Refuse Reconciliation", level: 2 },
      { id: "legal-stakes", text: "The Legal Stakes: Usury Recharacterization", level: 2 },
      { id: "faq", text: "Frequently Asked Questions", level: 2 },
      { id: "faq-no-clause", text: "What if my contract has no reconciliation clause?", level: 3 },
      { id: "faq-request-anyway", text: "Can I request reconciliation if revenue has not dropped?", level: 3 },
      { id: "faq-more-aggressive", text: "Will requesting reconciliation make the lender more aggressive?", level: 3 },
      { id: "faq-specified-percentage", text: "What is the specified percentage?", level: 3 },
      { id: "faq-other-states", text: "Do all states recognize the recharacterization argument?", level: 3 },
    ],
    body: `
<p>A reconciliation clause is one of the most legally significant provisions in any merchant cash advance agreement. It is also one of the most frequently violated, misrepresented, or quietly omitted by MCA providers who prefer the certainty of fixed daily withdrawals over the variable collection structure that reconciliation requires.</p>
<p>Understanding what a reconciliation clause is, what it should say, and what it means legally when a lender ignores it can fundamentally change your position if you are struggling with MCA payments or considering a legal challenge to your contract.</p>

<h2 id="what-reconciliation-means">What Reconciliation Means in an MCA Context</h2>
<p>The legal premise of a merchant cash advance is that the lender is purchasing a percentage of your future receivables, not making a loan. This distinction matters enormously because loans are subject to state usury laws and interest rate caps. A purchase of receivables, in theory, is not a loan and therefore not subject to those caps.</p>
<p>The reconciliation clause is the mechanism that makes the purchase-of-receivables structure legally coherent. If an MCA lender is truly buying a percentage of your future sales, then when your sales drop, your payments should drop proportionally. That adjustment process is reconciliation.</p>
<p>A contract that includes a genuine reconciliation clause might say something like: "Seller may request a reconciliation of the daily remittance amount at any time. Upon request and verification of actual receipts, Purchaser shall adjust the daily amount to equal the Specified Percentage of Seller's actual daily receipts."</p>
<p>That language, if the lender actually honors it, means your MCA payment adjusts up when revenue is strong and down when revenue is weak. It behaves like a percentage of sales rather than a fixed debt obligation.</p>

<h2 id="fixed-vs-true">Fixed Payments Versus True Reconciliation</h2>
<p>Here is where the gap between what MCA contracts claim and what MCA lenders actually do becomes legally important.</p>
<p>The overwhelming majority of MCA lenders collect fixed daily or weekly ACH debits regardless of what your actual revenue is on any given day. They set a fixed dollar amount at origination based on projected sales and debit that amount every business day regardless of whether you made $500 or $5,000 in sales that day.</p>
<p>This fixed-payment structure is operationally simpler for lenders and dramatically more profitable. It also arguably converts what was structured as a purchase of receivables into something that looks much more like a fixed-obligation loan.</p>
<p>Courts in New York have increasingly scrutinized this gap. In a series of decisions beginning around 2018 and accelerating through 2023, New York courts developed a framework for determining whether an MCA is a genuine purchase of receivables or a disguised loan. The three primary factors courts examine are whether the transaction has absolute repayment terms, whether the merchant assumes the risk of the business's receivables, and whether there is a genuine reconciliation mechanism.</p>
<p>If a lender collects fixed daily payments regardless of actual sales, refuses reconciliation requests, and has no meaningful mechanism for adjusting payments based on real revenue, courts have found those arrangements to have loan-like characteristics that may subject them to New York usury law. The consequences of recharacterization as a loan at a usurious rate can include voiding the contract entirely.</p>

<h2 id="find-clause">How to Find the Reconciliation Clause in Your Contract</h2>
<p>Not all MCA contracts include a genuine reconciliation clause. Some include language that appears to provide for reconciliation but contains conditions that make it practically impossible to invoke. Some contracts have no reconciliation provision at all.</p>
<p>When reviewing your contract, look for sections titled "Reconciliation," "Adjustment of Remittance," or "True-Up." The absence of any such section is itself significant information.</p>
<p>If a reconciliation clause is present, evaluate it on these dimensions:</p>
<ul>
<li><strong>Is it automatic or request-based?</strong> Automatic reconciliation adjusts your payments without you having to do anything. Request-based reconciliation requires you to initiate the process. Request-based is far more common, which means you need to know it exists and how to trigger it.</li>
<li><strong>What documentation does the lender require?</strong> Most contracts require you to provide bank statements and sales records to support a reconciliation request. Understanding what you need to produce before you are in financial distress makes the process significantly easier if and when you need it.</li>
<li><strong>What is the timeline for the lender to respond?</strong> A reconciliation clause that gives the lender 60 days to respond to your request while your business hemorrhages cash at the original daily payment level is substantially less useful than one requiring a 5-business-day response.</li>
<li><strong>Is there a cap on how much the payment can be adjusted?</strong> Some contracts limit how much reconciliation can reduce your daily payment regardless of how far your revenue has fallen. A clause that will only reduce your payment by 20% even if your revenue drops by 60% provides limited protection.</li>
</ul>

<h2 id="request-reconciliation">How to Request Reconciliation</h2>
<p>If your revenue has dropped and you believe your contract includes a reconciliation clause, the process for requesting adjustment typically works as follows.</p>
<p><strong>First,</strong> pull your contract and locate the exact reconciliation language. Read it carefully for the specific documentation requirements and any notice provisions.</p>
<p><strong>Second,</strong> gather your bank statements and sales records for the most recent 30 days. Calculate your actual average daily receipts. Compare that number to the daily payment your lender is currently taking. If your daily payment represents significantly more than the specified percentage of your actual daily receipts, you have a legitimate reconciliation basis.</p>
<p><strong>Third,</strong> send a written reconciliation request to your lender by certified mail and email simultaneously. Include your documentation. State specifically that you are requesting reconciliation under Section [X] of your MCA agreement and provide the calculation showing the discrepancy between your daily payment and the specified percentage of your actual receipts.</p>
<p><strong>Fourth,</strong> document every communication. If the lender ignores your request, delays unreasonably, or claims your contract does not provide for reconciliation when it does, those facts become significant if you later pursue legal remedies.</p>

<h2 id="lenders-refuse">When Lenders Refuse Reconciliation</h2>
<p>The most common response small business owners receive when they request reconciliation is either silence or a denial claiming that the contract does not provide for it. Both responses warrant legal review if you have identified genuine reconciliation language in your agreement.</p>
<p>A lender that contractually agreed to reconciliation and then refuses to honor that obligation may have breached the contract. More significantly, a lender that structured the MCA as a purchase of receivables to avoid usury laws but then refuses to operate it as a purchase of receivables may have undermined their own legal foundation for claiming the transaction is not a loan.</p>
<p>This is not a simple or guaranteed legal argument. MCA litigation is complex and outcomes depend heavily on jurisdiction, the specific contract language, and the judge or arbitrator involved. But the reconciliation issue is one of the more developed areas of MCA defense law, and there are attorneys who have successfully used reconciliation refusal as part of broader contract challenges.</p>

<h2 id="legal-stakes">The Legal Stakes: Usury Recharacterization</h2>
<p>The reason reconciliation matters beyond your monthly cash flow is what it means for the legal classification of your MCA.</p>
<p>If a court decides your MCA is actually a loan, New York's criminal usury cap of 25% per year applies to commercial transactions. An MCA charging an effective APR of 100% or more would be unenforceable under that standard. The contract could be voided entirely, and you might owe nothing beyond what you have already paid or perhaps only the principal amount advanced.</p>
<p>That is an extreme outcome and not one that applies in every case. But it is the legal theory that has driven some of the most significant MCA settlements and enforcement actions, including the <a href="/blog/new-york-mca-settlement-534m">$534 million Yellowstone Capital settlement</a> with the New York Attorney General. That case involved, among other things, allegations that Yellowstone structured transactions as MCA purchases while operating them as fixed-payment loans with none of the genuine receivables-purchase characteristics that the legal framework requires.</p>
<p>Understanding your <a href="/blog/what-is-factor-rate">factor rate and effective APR</a> is also relevant when assessing whether your deal may be usurious.</p>

<h2 id="faq">Frequently Asked Questions</h2>
<h3 id="faq-no-clause">What should I do if my MCA contract has no reconciliation clause?</h3>
<p>The absence of a reconciliation clause strengthens the argument that your MCA may legally be a loan rather than a purchase of receivables. Document this and discuss it with an MCA defense attorney, particularly if you are in financial distress or the lender has taken aggressive collection action.</p>
<h3 id="faq-request-anyway">Can I request reconciliation even if my revenue has not dropped significantly?</h3>
<p>Reconciliation provisions are typically triggered by a discrepancy between actual revenue and the implied revenue assumption in your daily payment. If your current daily payment accurately reflects your specified percentage of actual daily receipts, there is no reconciliation basis to assert.</p>
<h3 id="faq-more-aggressive">Will requesting reconciliation make the lender more aggressive?</h3>
<p>It can. Some lenders treat a reconciliation request as a signal of financial distress and escalate collection efforts or declare default. This is one reason why involving an attorney before making a reconciliation request is often advisable in situations where your financial position is already precarious.</p>
<h3 id="faq-specified-percentage">What is the "specified percentage" in an MCA contract?</h3>
<p>This is the percentage of your daily receipts that the lender is contractually purchasing. It might be 12% or 15% or another figure stated in the contract. Your daily payment should, in theory, equal that percentage multiplied by your actual daily receipts. If it does not, you have a reconciliation basis.</p>
<h3 id="faq-other-states">Do all states recognize the MCA recharacterization argument?</h3>
<p>No. The recharacterization doctrine is most developed in New York. Other states including California and Illinois have begun developing case law in this area, but the strength of the argument varies significantly by jurisdiction. An attorney in your state can assess how courts there have treated similar cases.</p>

<p><strong>This article is for educational purposes only and does not constitute legal or financial advice.</strong> MCA law varies by jurisdiction and the analysis of any specific contract depends on its precise terms. Consult a licensed attorney before making legal decisions based on your MCA agreement.</p>
    `.trim(),
  },
  {
    slug: "new-york-mca-settlement-534m",
    title: "Yellowstone Capital $534M MCA Settlement: Full Breakdown",
    excerpt:
      "New York's $534 million settlement with Yellowstone Capital exposed systematic MCA abuses. Here is what happened, what borrowers received, and what it means now.",
    category: "industry-news",
    date: "2025-01-28",
    readTimeMinutes: 8,
    readCount: 22100,
    author: "Alex Tchogorian",
    authorBio:
      "Alex Tchogorian holds a Bachelor of Science in Finance and has spent more than five years analyzing distressed debt, predatory lending structures, and business restructuring. He founded FundingWatch after seeing how many small business owners signed MCA contracts without understanding what they were actually agreeing to pay.",
    credentials: "Bachelor of Science in Finance • 5+ years analyzing distressed debt, predatory lending, and business restructuring",
    headings: [
      { id: "who-yellowstone", text: "Who Is Yellowstone Capital?", level: 2 },
      { id: "what-ag-alleged", text: "What the New York AG Alleged", level: 2 },
      { id: "settlement-required", text: "What the Settlement Required", level: 2 },
      { id: "other-borrowers", text: "What It Means for Other MCA Borrowers", level: 2 },
      { id: "other-states", text: "What Other States Are Doing", level: 2 },
      { id: "faq", text: "Frequently Asked Questions", level: 2 },
      { id: "faq-shut-down", text: "Was Yellowstone shut down?", level: 3 },
      { id: "faq-eligible", text: "Am I eligible for settlement relief?", level: 3 },
      { id: "faq-different-lender", text: "Does the settlement help if my MCA is with a different lender?", level: 3 },
      { id: "faq-same-tactics", text: "What if my lender is using the same tactics?", level: 3 },
    ],
    body: `
<p>In November 2023, the New York Attorney General announced a $534 million settlement with Yellowstone Capital, one of the largest merchant cash advance providers in the country. It is the largest MCA enforcement action in United States history. Understanding what Yellowstone was accused of, what the settlement required, and what it signals about the broader MCA industry is essential context for any small business owner who has taken an advance or is considering one.</p>

<h2 id="who-yellowstone">Who Is Yellowstone Capital?</h2>
<p>Yellowstone Capital is a New York-based MCA company that has funded billions of dollars in advances to small businesses across the country since its founding in 2009. At its peak it was one of the most active MCA originators in the country, funding thousands of small businesses in industries including restaurants, retail, trucking, healthcare, and professional services.</p>
<p>The company is not a bank and is not subject to bank regulatory oversight. Like most MCA providers, it operates as a commercial finance company, which historically placed it outside the scope of consumer protection laws and state usury statutes, at least under the company's own interpretation of its business model.</p>

<h2 id="what-ag-alleged">What the New York AG Alleged</h2>
<p>The New York Attorney General's investigation, which ran for several years before the settlement, alleged a systematic pattern of deceptive and illegal conduct. The core allegations included several distinct categories of misconduct.</p>
<p><strong>On pricing and disclosure:</strong> the AG alleged that Yellowstone systematically misrepresented the true cost of its advances to borrowers. This included marketing materials and sales representations that described the factor rate cost in ways that obscured the effective annual cost, and in some cases outright misrepresented the total repayment obligation.</p>
<p><strong>On reconciliation:</strong> the AG alleged that Yellowstone structured its contracts to include reconciliation provisions but then routinely refused to honor reconciliation requests from borrowers experiencing revenue declines. The effect was that what was presented as a flexible purchase of future receivables operated in practice as a fixed-payment obligation with no downside adjustment for the borrower.</p>
<p><strong>On confession of judgment:</strong> the AG alleged that Yellowstone systematically used COJ clauses to obtain judgments against borrowers who disputed their contracts, fell behind on payments, or attempted to negotiate modified terms. This included using COJ filings against out-of-state borrowers in ways that New York's 2019 reform was specifically designed to prevent. For more on COJs, see our article on <a href="/blog/confession-of-judgment-danger">confession of judgment in MCA contracts</a>.</p>
<p><strong>On stacking:</strong> the AG alleged that Yellowstone encouraged and participated in advance stacking, funding second and third positions knowing that borrowers were already stretched thin by existing MCA obligations, and that this practice contributed systematically to business failures among its borrower population.</p>

<h2 id="settlement-required">What the Settlement Required</h2>
<p>The $534 million settlement included both restitution to harmed borrowers and prospective compliance requirements imposed on Yellowstone going forward.</p>
<p><strong>On restitution:</strong> the settlement required Yellowstone to provide relief to borrowers who had been harmed by the alleged practices. The structure of the relief included debt forgiveness for certain borrowers with outstanding balances and direct payments to borrowers whose businesses had failed in connection with the conduct described in the complaint.</p>
<p><strong>On compliance:</strong> Yellowstone was required to implement new disclosure practices including providing borrowers with the effective APR of advances before funding, to honor reconciliation requests consistent with the terms of its contracts, and to cease using COJ clauses against out-of-state borrowers in violation of the 2019 reform.</p>
<p><strong>On monitoring:</strong> the settlement included provisions for ongoing compliance monitoring by the AG's office, with specific reporting requirements designed to ensure that Yellowstone's post-settlement practices actually conformed to the agreement.</p>

<h2 id="other-borrowers">What It Means for Other MCA Borrowers</h2>
<p>The Yellowstone settlement is significant beyond the specific borrowers who received direct relief because of what it established as the standard for acceptable MCA industry conduct in New York.</p>
<p>The settlement definitively established that using COJ filings against out-of-state borrowers after the 2019 reform is illegal under New York law. Any MCA lender that continued this practice after 2019 and before your advance was funded may have engaged in conduct that New York regulators view as actionable.</p>
<p>The settlement established that promising reconciliation while systematically refusing to honor it is deceptive. If your contract has a <a href="/blog/reconciliation-clause-why-you-need-it">reconciliation clause</a> and your lender has ignored or denied your reconciliation requests without basis, that pattern mirrors what the AG successfully prosecuted against Yellowstone.</p>
<p>The settlement established that systematically obscuring the true cost of advances through misleading disclosure practices is actionable under New York consumer and business protection law. This has implications for any borrower who was materially misled about their repayment obligation.</p>

<h2 id="other-states">What Other States Are Doing</h2>
<p>New York was not alone in pursuing MCA enforcement. California's Department of Financial Protection and Innovation has been increasingly active in examining MCA provider conduct under SB 1235 and broader consumer protection authority. The California AG has separately examined MCA practices in connection with broader investigations of small business lending.</p>
<p>The Federal Trade Commission has authority over deceptive practices in commercial lending and has signaled increased attention to the MCA industry as part of its broader focus on small business financial products.</p>
<p>Illinois, New Jersey, and Connecticut have all seen state-level MCA enforcement actions or legislative activity targeting disclosure practices and collection conduct since 2022. The regulatory momentum that the Yellowstone settlement exemplifies is not limited to New York.</p>
<p>For the dangers of taking multiple advances at once, see <a href="/blog/stacking-mcas-danger">MCA stacking</a>.</p>

<h2 id="faq">Frequently Asked Questions</h2>
<h3 id="faq-shut-down">Was Yellowstone Capital shut down as a result of the settlement?</h3>
<p>No. The settlement required compliance reforms and restitution but did not shut down Yellowstone Capital's operations. The company continues to operate under the terms of the settlement agreement.</p>
<h3 id="faq-eligible">Am I eligible for settlement relief if I had a Yellowstone advance?</h3>
<p>Eligibility for direct relief under the settlement depends on the timing of your advance, the specific conduct you experienced, and whether your situation falls within the categories covered by the settlement agreement. Contact the New York Attorney General's office directly or consult with an MCA defense attorney to assess your specific situation.</p>
<h3 id="faq-different-lender">Does the Yellowstone settlement help me if my MCA is with a different lender?</h3>
<p>Not directly. But it establishes legal and regulatory standards that apply broadly to MCA conduct in New York and that other state AGs and regulatory bodies are watching. If your lender engaged in similar conduct including COJ abuse, reconciliation refusal, or deceptive cost disclosure, the Yellowstone framework gives attorneys and regulators a strong precedent to reference.</p>
<h3 id="faq-same-tactics">What should I do if I think my MCA lender is using the same tactics described in the Yellowstone case?</h3>
<p>Document everything. Save your contract, all communications with your lender, your bank statements showing daily debits, and any reconciliation requests you made and the responses you received. Then consult with an MCA defense attorney who can assess your specific contract and conduct against the legal framework the Yellowstone case established.</p>

<p><strong>This article is for educational purposes only and does not constitute legal or financial advice.</strong> Details of the Yellowstone Capital settlement are drawn from publicly available New York Attorney General filings and press releases. Consult a licensed attorney for advice specific to your situation.</p>
    `.trim(),
  },
  {
    slug: "stacking-mcas-danger",
    title: "MCA Stacking: Why Multiple Advances Destroy Cash Flow",
    excerpt:
      "MCA stacking means taking a second or third advance while repaying the first. Learn how it drives combined APRs above 200% and what to do if you are already stacked.",
    category: "mca-basics",
    date: "2025-01-20",
    readTimeMinutes: 9,
    readCount: 9500,
    author: "Alex Tchogorian",
    authorBio:
      "Alex Tchogorian holds a Bachelor of Science in Finance and has spent more than five years analyzing distressed debt, predatory lending structures, and business restructuring. He founded FundingWatch after seeing how many small business owners signed MCA contracts without understanding what they were actually agreeing to pay.",
    credentials: "Bachelor of Science in Finance • 5+ years analyzing distressed debt, predatory lending, and business restructuring",
    headings: [
      { id: "how-stacking-happens", text: "How MCA Stacking Happens", level: 2 },
      { id: "real-cost", text: "The Real Cost of Stacked Advances", level: 2 },
      { id: "lenders-fund-stackers", text: "How MCA Lenders Identify and Still Fund Stackers", level: 2 },
      { id: "ucc-liens", text: "UCC Liens and What Happens When Things Go Wrong", level: 2 },
      { id: "dangerous-position", text: "How to Know If You Are Already in a Dangerous Stacking Position", level: 2 },
      { id: "already-stacked", text: "What to Do If You Are Already Stacked", level: 2 },
      { id: "avoid-stacking", text: "How to Avoid Stacking in the First Place", level: 2 },
      { id: "faq", text: "Frequently Asked Questions", level: 2 },
      { id: "faq-illegal", text: "Is MCA stacking illegal?", level: 3 },
      { id: "faq-bankruptcy", text: "Can I get out of stacked MCA debt through bankruptcy?", level: 3 },
      { id: "faq-pay-early", text: "Will paying off one MCA early help?", level: 3 },
      { id: "faq-consolidate", text: "Can I negotiate consolidation of stacked positions?", level: 3 },
    ],
    body: `
<p>MCA stacking is the practice of taking a second, third, or fourth merchant cash advance while still repaying existing ones. Each new advance adds another daily debit to your bank account. The combined daily payments across stacked positions can consume 40%, 50%, or more of a business's total daily revenue, leaving nothing for payroll, inventory, or operations.</p>
<p>Stacking is one of the most common patterns that precedes MCA-related business failures. It is also actively encouraged by many MCA providers, who have financial incentives to fund second and third positions knowing that a borrower is already stretched thin.</p>

<h2 id="how-stacking-happens">How MCA Stacking Happens</h2>
<p>The mechanics of stacking follow a predictable pattern. A business owner takes an initial MCA, typically to cover a cash flow gap or fund a growth opportunity. The daily payment is manageable at first. Then business slows, an unexpected expense hits, or the daily MCA payment itself starts straining cash flow.</p>
<p>The natural response for many business owners is to seek additional capital to cover the gap. A second MCA provider, unencumbered by loyalty to the first, sees a business with revenue and offers another advance. The second advance brings immediate cash. It also brings a second daily debit on top of the first.</p>
<p>If the underlying cash flow problem is not resolved, the cycle continues. A third position becomes tempting when the combined daily payments on positions one and two are squeezing the business. By the time a business has three stacked positions, the combined daily payment often represents a percentage of revenue that makes sustainable operation mathematically impossible.</p>

<h2 id="real-cost">The Real Cost of Stacked Advances</h2>
<p>The cost analysis of stacked positions is not simply additive. It compounds in ways that are not obvious until you lay out the numbers.</p>
<p>Consider a business taking three MCA positions over six months:</p>
<ul>
<li><strong>Position one:</strong> $50,000 advance at factor rate 1.35, 120-day term. Daily payment of approximately $562. Effective APR approximately 106%.</li>
<li><strong>Position two:</strong> $30,000 advance at factor rate 1.40, 90-day term. Daily payment of approximately $467. Effective APR approximately 192%.</li>
<li><strong>Position three:</strong> $20,000 advance at factor rate 1.45, 90-day term. Daily payment of approximately $322. Effective APR approximately 215%.</li>
</ul>
<p>Combined daily payment at peak stacking: approximately $1,351.</p>
<p>For a business doing $5,000 in daily revenue, that is 27% of gross revenue going to MCA payments before a single operating expense is paid. For a business doing $3,000 in daily revenue, which is typical for a small restaurant or retail store, that is 45% of revenue.</p>
<p>At that debt service level, almost no business generates enough margin to survive. The result is usually a declaration of default on one or more positions, triggering collection actions including COJ filings, bank levies, and UCC lien enforcement across multiple lenders simultaneously.</p>
<p>Understanding your <a href="/blog/what-is-factor-rate">factor rate and effective APR</a> for each position is essential when evaluating stacking risk.</p>

<h2 id="lenders-fund-stackers">How MCA Lenders Identify and Still Fund Stackers</h2>
<p>Most MCA lenders pull UCC-1 financing statement filings before underwriting a new advance. A UCC-1 filing against your business is public record and reveals which MCA lenders already have a lien on your receivables.</p>
<p>A lender that sees two or three existing UCC-1 filings from other MCA providers knows you are already stacked. Many lenders fund the advance anyway. Some specifically market second and third position products. Their reasoning is that additional positions carry higher risk and therefore justify higher factor rates, which improves their returns if the business survives.</p>
<p>The borrower's reasoning, which many lenders actively encourage, is that the new advance will solve the cash flow problem that the existing advances created. It rarely does, because the new daily payment adds to the burden rather than replacing it.</p>

<h2 id="ucc-liens">UCC Liens and What Happens When Things Go Wrong</h2>
<p>Every MCA advance typically results in a UCC-1 financing statement filed against your business by the lender. This filing creates a public record of the lender's interest in your receivables and puts other creditors on notice.</p>
<p>When a stacked borrower defaults on one or more positions, the UCC lien priority framework determines who gets paid first from available business assets. The general rule is first-in-time, first-in-right: the lender who filed their UCC-1 first has priority over later filers.</p>
<p>In practice, multiple MCA lenders fighting over the same pool of receivables simultaneously can freeze a business's ability to operate. Each lender may instruct your payment processor to redirect funds to them. Multiple simultaneous bank levies from competing MCA judgments can leave a business account with nothing to pay employees, suppliers, or rent.</p>
<p>This is not a hypothetical scenario. It is documented in MCA litigation across multiple states and was part of the conduct described in the New York AG's Yellowstone Capital case. Our article on <a href="/blog/confession-of-judgment-danger">confession of judgment</a> explains the legal mechanism lenders use to pursue collection simultaneously.</p>

<h2 id="dangerous-position">How to Know If You Are Already in a Dangerous Stacking Position</h2>
<p>The warning signs that stacking has reached a dangerous level are specific and measurable.</p>
<ul>
<li>If your combined MCA daily payments exceed 20% of your average daily revenue, you are in a stressed position. Above 30%, you are in a critically stressed position where a single bad week can trigger default.</li>
<li>If you have taken a new MCA within 90 days of taking a previous one, you are in a stacking pattern regardless of whether the daily payments feel manageable right now.</li>
<li>If you have had any MCA lender contact you about a "renewal" or "additional funding" before your current advance is more than 50% repaid, that is a stacking sales call. The lender's motivation is to generate a new advance fee, not to improve your financial position.</li>
<li>If you cannot identify from your bank statements exactly which daily debits correspond to which MCA advance, you have lost visibility into your own debt position. This level of complexity almost always indicates a dangerous stacking situation.</li>
</ul>

<h2 id="already-stacked">What to Do If You Are Already Stacked</h2>
<p>The options for a business already in a deep stacking situation depend on how far the situation has progressed and which states the lenders operate under.</p>
<p>If you are current on all payments but the combined burden is clearly unsustainable, proactive negotiation with one or more lenders may produce a modified payment structure. Lenders generally prefer modified payments to default and litigation. The <a href="/blog/reconciliation-clause-why-you-need-it">reconciliation clause article</a> explains how to approach that process through your contract terms.</p>
<p>If you are in default on one or more positions, the sequence of who is pursuing you matters. The lender in first UCC position has the strongest legal standing. A lender in third position has less leverage but may be the most aggressive in litigation because they know they will recover nothing if they wait. Understanding the priority structure helps you and an attorney prioritize which relationships to resolve first.</p>
<p>If the situation has progressed to frozen accounts or COJ filings, the time for self-help negotiation has passed. You need an MCA defense attorney immediately.</p>

<h2 id="avoid-stacking">How to Avoid Stacking in the First Place</h2>
<p>The single most effective way to avoid dangerous stacking is to calculate your daily payment as a percentage of actual daily revenue before taking any advance, and to refuse any advance where the combined daily payment across all positions would exceed 15% of your average daily revenue.</p>
<p>That threshold gives you a margin for revenue fluctuation. Above 20%, you have eliminated your buffer. Above 30%, you are in the danger zone.</p>
<p>Before taking a second advance, run the numbers honestly. Add the proposed new daily payment to your existing daily MCA payments. Divide that total by your actual average daily revenue from the last 30 days. If the number exceeds 15%, the new advance is likely to make your position worse, not better.</p>

<h2 id="faq">Frequently Asked Questions</h2>
<h3 id="faq-illegal">Is MCA stacking illegal?</h3>
<p>No, stacking is not illegal. But certain practices around stacking, including misrepresenting to a second lender that no existing MCA positions exist, may create problems. Lenders who knowingly fund into an obviously unsustainable stacking situation may face regulatory scrutiny in states that have enacted strong MCA oversight.</p>
<h3 id="faq-bankruptcy">Can I get out of stacked MCA debt through bankruptcy?</h3>
<p>Business bankruptcy is an option that some stacked borrowers pursue, but it is complex and the outcome depends heavily on your business structure, asset position, and the specific lenders involved. Chapter 11 reorganization allows restructuring of business debt obligations. Chapter 7 liquidation may be appropriate in some cases. Consult a bankruptcy attorney with MCA experience before making this decision.</p>
<h3 id="faq-pay-early">Will paying off one MCA early help my stacking situation?</h3>
<p>It depends on whether the contract has a meaningful prepayment discount that reduces your total obligation. If paying off one position early reduces your daily payment burden sufficiently to make the remaining positions manageable, it may make sense. Run the numbers before paying off any position early.</p>
<h3 id="faq-consolidate">Can I negotiate a consolidation of my stacked MCA positions?</h3>
<p>Some MCA resolution firms and attorneys pursue consolidation or global settlement of multiple MCA positions simultaneously. This is complex because each lender is a separate party with its own contract and legal rights. But it is sometimes achievable, particularly when the alternative for all lenders is a defaulted borrower who can pay no one.</p>

<p><strong>This article is for educational purposes only and does not constitute legal or financial advice.</strong> If you are dealing with multiple MCA positions and financial distress, consult a licensed attorney or financial advisor with experience in MCA debt resolution.</p>
    `.trim(),
  },
  {
    slug: "california-apr-disclosure-law",
    title: "California MCA Disclosure Law SB 1235: What Borrowers Must Know",
    excerpt:
      "California SB 1235 requires MCA lenders to disclose APR before funding. Learn what the law requires, what lenders must show you, and what to do if they did not.",
    category: "state-guides",
    date: "2025-01-12",
    readTimeMinutes: 8,
    readCount: 6100,
    author: "Alex Tchogorian",
    authorBio:
      "Alex Tchogorian holds a Bachelor of Science in Finance and has spent more than five years analyzing distressed debt, predatory lending structures, and business restructuring. He founded FundingWatch after seeing how many small business owners signed MCA contracts without understanding what they were actually agreeing to pay.",
    credentials: "Bachelor of Science in Finance • 5+ years analyzing distressed debt, predatory lending, and business restructuring",
    headings: [
      { id: "what-sb1235-requires", text: "What SB 1235 Actually Requires", level: 2 },
      { id: "dfpi-calculates", text: "How the DFPI Calculates the Annualized Rate", level: 2 },
      { id: "what-providers-give", text: "What Providers Are Required to Give You", level: 2 },
      { id: "lender-did-not-comply", text: "What Happens If Your Lender Did Not Comply", level: 2 },
      { id: "california-compares", text: "How California Compares to Other States", level: 2 },
      { id: "california-borrower", text: "What to Do If You Are a California Borrower", level: 2 },
      { id: "faq", text: "Frequently Asked Questions", level: 2 },
      { id: "faq-out-of-state", text: "Does SB 1235 apply if my provider is in another state?", level: 3 },
      { id: "faq-before-2022", text: "What if my MCA was funded before December 2022?", level: 3 },
      { id: "faq-get-out", text: "Can I get out of my MCA if disclosure was not provided?", level: 3 },
      { id: "faq-dfpi", text: "What is the DFPI and does it regulate MCA providers?", level: 3 },
      { id: "faq-other-states", text: "Are other states' disclosure laws as strong as California's?", level: 3 },
    ],
    body: `
<p>California Senate Bill 1235 is the most comprehensive merchant cash advance disclosure law in the United States. It requires MCA providers to disclose the true cost of an advance in a standardized format before funding, including an annualized rate that allows comparison to traditional loan products.</p>
<p>If you took an MCA in California and your lender did not provide these disclosures, you have rights worth understanding. If you are considering an MCA in California right now, you are entitled to specific information by law before you sign anything.</p>

<h2 id="what-sb1235-requires">What SB 1235 Actually Requires</h2>
<p>California SB 1235 was signed into law in 2018 and its implementing regulations, developed by the California Department of Financial Protection and Innovation, took full effect in December 2022. The law applies to commercial financing transactions including merchant cash advances offered to California-based businesses.</p>
<p>The core disclosure requirement is that before a borrower executes a financing agreement, the provider must give the borrower a written disclosure containing specific information in a standardized format designed by the DFPI.</p>
<p>The required disclosures include the total amount of funds provided to the borrower, the total dollar cost of the financing including all fees and charges, the term or estimated term of the financing, the method and frequency of payment, a description of prepayment policies, and critically, an annualized rate calculated using a specific methodology established by the DFPI.</p>
<p>That last element is what makes SB 1235 transformative compared to the pre-2022 status quo. Before the law took effect, MCA providers in California were under no obligation to translate their factor rate into anything resembling an annual percentage rate. A provider could quote a 1.40 factor rate without any disclosure that this represented a 200%+ annualized cost on a 90-day advance.</p>
<p>For how factor rates convert to APR, see <a href="/blog/what-is-factor-rate">what is a factor rate</a>.</p>

<h2 id="dfpi-calculates">How the DFPI Calculates the Annualized Rate</h2>
<p>The DFPI's methodology for calculating the annualized rate disclosure differs from the standard APR formula used for consumer loans under the federal Truth in Lending Act. This distinction matters because the numbers produced can differ, and comparing a DFPI-method disclosure to a consumer loan APR requires understanding the difference.</p>
<p>The DFPI method starts with the total repayment amount minus the advance amount, which produces the total dollar cost of the financing. It then divides that cost by the advance amount to produce a ratio. It then applies an annualization factor based on the estimated repayment term.</p>
<p>For a $50,000 advance with a 1.35 factor rate and a 120-day estimated term, the DFPI method produces an annualized rate in the range of 106% to 110% depending on the specific repayment schedule. This number must appear on the pre-contract disclosure form and the borrower must receive it before signing.</p>

<h2 id="what-providers-give">What Providers Are Required to Give You</h2>
<p>Under SB 1235 and the DFPI regulations, you are entitled to receive a written disclosure document before signing your MCA agreement. The disclosure must:</p>
<ul>
<li>Be in the language in which negotiations were conducted. If your MCA was marketed to you in Spanish, the disclosure must be in Spanish.</li>
<li>Use the standardized format specified by the DFPI. The format is designed to make comparison across different financing products easier by presenting information in a consistent layout.</li>
<li>Clearly identify the annualized rate, the total payment amount, the total cost amount, and the estimated term.</li>
<li>Be provided before execution of the financing agreement. A disclosure handed to you simultaneously with the contract and signature page does not satisfy the requirement.</li>
</ul>
<p>The provider must retain a copy of the signed disclosure and make it available to the DFPI upon request.</p>

<h2 id="lender-did-not-comply">What Happens If Your Lender Did Not Comply</h2>
<p>The SB 1235 regulations give the DFPI authority to take action against providers who fail to comply with disclosure requirements. Violations can result in enforcement actions, fines, and in some cases suspension or revocation of a provider's ability to offer commercial financing in California.</p>
<p>From a borrower's perspective, the practical question is what a disclosure failure means for your specific contract. This is not a simple or uniform answer. The law does not automatically void contracts where disclosures were not provided. But a disclosure failure can be relevant in several ways.</p>
<p>It may be a factor in a broader legal challenge to the contract, particularly if combined with other issues such as misrepresentation of terms, refusal to reconcile, or use of a <a href="/blog/confession-of-judgment-danger">COJ</a>. A lender who failed to comply with California law has weakened their position in any dispute about the fairness of the transaction.</p>
<p>It may also support a complaint to the DFPI, which has authority to investigate and take action against non-compliant providers. The DFPI maintains a public license database for commercial financing providers. If your MCA provider is not registered with the DFPI and they conducted business in California, that is a separate compliance issue beyond the disclosure requirement.</p>

<h2 id="california-compares">How California Compares to Other States</h2>
<p>California SB 1235 was the first state law of its kind and served as the template for disclosure legislation in other states.</p>
<p>New York enacted its own commercial financing disclosure law in 2023, with regulations developed by the Department of Financial Services. New York's law is similar in structure to SB 1235 but with some differences in the annualized rate calculation methodology and the specific formatting requirements.</p>
<p>Utah passed commercial financing disclosure legislation that took effect in 2023. Virginia enacted a similar law the same year. Texas House Bill 700, which took effect in September 2025, extended disclosure requirements to Texas-based borrowers, making Texas one of the most recent major states to act on MCA transparency.</p>
<p>The federal government has not enacted equivalent requirements for commercial financing. The federal Truth in Lending Act applies to consumer loans, not business financing transactions. Federal disclosure requirements for commercial MCA products remain absent as of 2025, making state laws the primary protection mechanism for small business borrowers.</p>
<p>For a major enforcement example that pushed disclosure and other reforms, see the <a href="/blog/new-york-mca-settlement-534m">Yellowstone Capital settlement</a>.</p>

<h2 id="california-borrower">What to Do If You Are a California Borrower</h2>
<p>If you are a California-based business owner who took an MCA after December 2022 and did not receive the required disclosure before signing, several steps are worth taking.</p>
<p><strong>First,</strong> check whether your provider is registered with the DFPI. The DFPI maintains a searchable database of licensed commercial financing providers at dfpi.ca.gov. If your provider is not listed and is not exempt from registration, that is significant.</p>
<p><strong>Second,</strong> review your contract documents for a disclosure form. It should be a separate document from the main MCA agreement, presented in the DFPI's standardized format. If no such document exists in your contract package, document that fact.</p>
<p><strong>Third,</strong> if you are in a dispute with your lender or are experiencing financial distress related to your MCA, bring the disclosure issue to the attention of an attorney who handles MCA defense in California. The disclosure failure does not automatically void your contract, but it is a factor that an experienced attorney can assess in the context of your overall situation.</p>
<p><strong>Fourth,</strong> consider filing a complaint with the DFPI at dfpi.ca.gov/file-a-complaint. The DFPI takes disclosure complaints seriously and your complaint contributes to the agency's enforcement picture for the industry.</p>

<h2 id="faq">Frequently Asked Questions</h2>
<h3 id="faq-out-of-state">Does SB 1235 apply to my MCA if my business is in California but the MCA provider is based in another state?</h3>
<p>Yes. SB 1235 applies to commercial financing transactions with California-based recipients regardless of where the provider is located. An out-of-state MCA provider offering advances to California businesses is subject to California's disclosure requirements.</p>
<h3 id="faq-before-2022">What if my MCA was funded before December 2022 when the regulations took full effect?</h3>
<p>The disclosure requirements apply to transactions executed after the regulations took effect. If your advance predates December 2022, the SB 1235 disclosure requirements do not directly apply, though earlier versions of the law may have imposed some requirements on your transaction depending on timing.</p>
<h3 id="faq-get-out">Can I get out of my MCA contract if my lender did not provide the required disclosure?</h3>
<p>Non-disclosure does not automatically void the contract under current California law. But it is a relevant factor in any legal dispute and a basis for regulatory complaint. An attorney can advise on whether the disclosure failure, combined with other aspects of your situation, provides grounds to challenge the contract.</p>
<h3 id="faq-dfpi">What is the DFPI and does it regulate MCA providers?</h3>
<p>The California Department of Financial Protection and Innovation is the state's primary financial services regulator. It has authority over commercial financing providers operating in California under the California Consumer Financial Protection Law and the commercial financing statutes. MCA providers offering advances to California businesses are subject to DFPI oversight including registration requirements and the SB 1235 disclosure rules.</p>
<h3 id="faq-other-states">Are other states' disclosure laws as strong as California's?</h3>
<p>California and New York have the most developed and actively enforced commercial financing disclosure frameworks as of 2025. Texas, Utah, and Virginia have enacted disclosure laws that are still developing in terms of regulatory implementation and enforcement. Federal disclosure requirements for commercial MCA products do not currently exist.</p>

<p><strong>This article is for educational purposes only and does not constitute legal or financial advice.</strong> California law on commercial financing disclosure is developed through statute and DFPI regulation. Consult a licensed California attorney for advice specific to your situation and contract.</p>
    `.trim(),
  },
  ...PILLAR_POSTS,
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
