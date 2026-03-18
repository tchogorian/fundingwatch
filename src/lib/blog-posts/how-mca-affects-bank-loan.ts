import type { BlogPost } from "../blog";
import { AUTHOR_BIO, AUTHOR_NAME, CREDENTIALS } from "./constants";

export const post: BlogPost = {
  slug: "how-mca-affects-bank-loan",
  title: "How a Merchant Cash Advance Affects Your Ability to Get a Bank Loan",
  excerpt:
    "An active MCA creates real obstacles when you apply for bank financing. Here's exactly how MCA debt shows up during underwriting, what banks look for, and how to position yourself for approval.",
  metaDescription:
    "Taking a merchant cash advance can block you from getting a bank loan. Learn how MCA debt affects SBA loans, business credit lines, and conventional financing — and how to recover.",
  category: "borrower-rights",
  date: "2026-03-18",
  readTimeMinutes: 9,
  author: AUTHOR_NAME,
  authorBio: AUTHOR_BIO,
  credentials: CREDENTIALS,
  headings: [
    { id: "how-banks-see-mca", text: "How Banks View MCA Debt During Underwriting", level: 2 },
    { id: "ucc-lien-problem", text: "The UCC Lien Problem: First-Position Claims and Collateral", level: 2 },
    { id: "cash-flow-impact", text: "How Daily MCA Draws Crush Your Debt Service Coverage Ratio", level: 2 },
    { id: "sba-loans", text: "MCAs and SBA Loan Eligibility: What the Rules Actually Say", level: 2 },
    { id: "business-credit", text: "How MCAs Appear on Business Credit Reports", level: 2 },
    { id: "recovery-path", text: "The Path From MCA to Bank Financing", level: 2 },
    { id: "timing", text: "How Long You Need to Wait After MCA Payoff", level: 2 },
    { id: "faq", text: "Frequently Asked Questions", level: 2 },
  ],
  body: `
<p>Merchant cash advances and bank loans occupy opposite ends of the business financing spectrum — and for good reason. Taking an MCA does not permanently disqualify you from bank financing, but it creates specific, concrete obstacles that most borrowers do not discover until the bank declines their application. Understanding how MCA debt looks to an underwriter lets you plan around it.</p>

<h2 id="how-banks-see-mca">How Banks View MCA Debt During Underwriting</h2>

<p>Banks evaluate business loan applications on four core dimensions: creditworthiness, cash flow, collateral, and character (business history). An active MCA creates problems in at least the first three.</p>

<p><strong>Cash flow.</strong> Your MCA's daily draw appears as a fixed expense when the bank analyzes your bank statements. A $1,200 daily MCA draw on a business with $30,000 monthly revenue represents 4% of gross revenue leaving the account every business day — roughly 84% of revenue annualized. Banks typically require debt service coverage ratios of 1.25x or higher, meaning your cash flow after all debt payments must exceed 125% of the proposed new loan payment. An active MCA daily draw makes this math difficult or impossible.</p>

<p><strong>Creditworthiness signals.</strong> Banks underwriting SBA loans and conventional business loans routinely pull Dun &amp; Bradstreet and Experian Business reports, which show active UCC filings. Multiple active UCC liens from MCA funders are a direct signal that the business relies on high-cost short-term capital — which banks interpret as a liquidity risk indicator.</p>

<p><strong>Character and judgment.</strong> Loan officers with MCA experience know the industry. Seeing MCA draws on your bank statements triggers questions about why you used that funding source, whether you have explored lower-cost options, and whether the business model can sustain the cost structure. It does not disqualify you, but it requires explanation.</p>

<h2 id="ucc-lien-problem">The UCC Lien Problem: First-Position Claims and Collateral</h2>

<p>When you took your MCA, your funder filed a UCC-1 financing statement — likely with a blanket "all assets" collateral description. This filing gives your MCA funder first-priority lien on your business assets. Banks that want to take a security interest in those same assets (accounts receivable, inventory, equipment) are now in second position.</p>

<p>Most banks will not lend against collateral where another creditor has first-priority claim, unless the prior lienholder agrees to subordinate their interest. MCA funders almost never subordinate voluntarily — doing so weakens their collection position if you default.</p>

<p>The practical result: if you want an SBA loan or a secured business line of credit while an MCA UCC lien is active, you will typically need to pay off the MCA and get the UCC-1 formally terminated first. Even then, allow 30 to 60 days for the termination to appear in state records before applying, so the bank's lien search comes back clean.</p>

<p>See our guide on <a href="/blog/ucc-1-filing-what-it-means-for-your-business">UCC-1 filings</a> for how to find and terminate liens against your business.</p>

<h2 id="cash-flow-impact">How Daily MCA Draws Crush Your Debt Service Coverage Ratio</h2>

<p>The debt service coverage ratio (DSCR) is the single most important number in business loan underwriting. It measures how much cash flow you have available to service new debt. Most bank lenders require a minimum DSCR of 1.25; SBA lenders typically require 1.15 to 1.25.</p>

<p>The formula is: Net Operating Income ÷ Total Debt Service = DSCR</p>

<p>An MCA daily draw inflates your total debt service significantly. Example:</p>

<ul>
  <li>Business monthly net operating income: $15,000</li>
  <li>Existing MCA daily draw: $800 × 22 business days = $17,600/month</li>
  <li>Current DSCR (MCA only): $15,000 ÷ $17,600 = 0.85 — already below 1.0</li>
</ul>

<p>Adding a bank loan payment of even $2,000/month to this picture produces a DSCR of 0.74 — far below any bank's minimum. The bank does not decline you because of the MCA relationship specifically; they decline because your cash flow math fails. The MCA daily draw is the cause.</p>

<h2 id="sba-loans">MCAs and SBA Loan Eligibility: What the Rules Actually Say</h2>

<p>The SBA does not explicitly prohibit MCA borrowers from receiving SBA loans — but SBA lenders apply their own credit standards on top of SBA eligibility requirements. Most SBA lenders will require:</p>

<ul>
  <li>No active MCA obligations at time of closing (the MCA must be paid off)</li>
  <li>All UCC liens from prior MCA funders formally terminated</li>
  <li>Bank statements showing at least three to six months without MCA daily draws</li>
  <li>Satisfactory explanation in the credit memo for why MCA financing was used</li>
</ul>

<p>Some SBA lenders will use proceeds from the SBA loan itself to pay off an active MCA at closing — essentially using cheaper debt to retire expensive debt. This works if your DSCR holds up after the MCA payoff and the new SBA payment, and if the SBA lender is willing to make the payoff a condition of funding.</p>

<p>If you are pursuing an SBA loan and have an active MCA, disclose it upfront. Hiding it is not an option — bank statement analysis will surface it within minutes.</p>

<h2 id="business-credit">How MCAs Appear on Business Credit Reports</h2>

<p>MCA funders do not report to personal credit bureaus (Equifax, Experian, TransUnion personal). They do, however, affect your business credit profile in two ways:</p>

<p><strong>UCC filings on D&amp;B and Experian Business.</strong> Active UCC-1 filings appear on Dun &amp; Bradstreet's PAYDEX report and Experian's business credit file. Multiple active liens from MCA funders lower your business credit score and flag you as a high-leverage borrower in automated underwriting systems.</p>

<p><strong>Bank statement analysis.</strong> Banks and SBA lenders analyze 12 months of business bank statements as part of underwriting. Daily MCA withdrawals are visible, identifiable, and specifically evaluated. Loan officers are trained to recognize MCA draw patterns.</p>

<p>One completed MCA with a clean payoff history is generally not disqualifying. Multiple concurrent MCAs, or a history of MCA usage without corresponding revenue growth, creates a credit narrative that banks view negatively.</p>

<h2 id="recovery-path">The Path From MCA to Bank Financing</h2>

<p>The path from active MCA borrower to bank loan approval is straightforward but requires discipline and time:</p>

<ol>
  <li><strong>Pay off existing MCA(s) in full.</strong> Do not renew early. Complete payoff eliminates the daily draw and gives you the basis for UCC termination.</li>
  <li><strong>Demand UCC-1 termination in writing.</strong> Send a formal termination demand to each funder within 30 days of payoff. Give them 20 days to file the UCC-3 termination. Verify the termination in your state's UCC database.</li>
  <li><strong>Allow 90 days of clean bank statements.</strong> Three months of statements with no MCA draws demonstrates normalized cash flow. Six months is better for SBA underwriting.</li>
  <li><strong>Build your business credit profile.</strong> Apply for a business credit card and a small net-30 trade account. Pay both on time. These report to D&amp;B and Experian Business and improve your PAYDEX score.</li>
  <li><strong>Apply for bank financing with clean documentation.</strong> Two years of tax returns, three to six months of bank statements, a business credit report showing terminated UCC liens, and a brief narrative explaining your MCA history (and why you no longer need it) gives a bank loan officer what they need to approve.</li>
</ol>

<h2 id="timing">How Long You Need to Wait After MCA Payoff</h2>

<p>There is no fixed waiting period — it depends on the lender and the loan type:</p>

<ul>
  <li><strong>SBA 7(a) loan:</strong> Most lenders want to see three to six months of clean bank statements after MCA payoff, plus terminated UCC liens. Total timeline from payoff to funded: four to eight months.</li>
  <li><strong>Business line of credit (bank):</strong> Similar requirements. Some online bank lenders (not MCA providers) will underwrite faster with two to three months of clean statements.</li>
  <li><strong>Equipment financing:</strong> The specific equipment serves as collateral, which reduces lender concern about prior UCC liens — but you still need terminated blanket liens before most equipment lenders will proceed. Timeline: 30 to 60 days post-termination.</li>
  <li><strong>Invoice factoring:</strong> No waiting period typically required, as the factor takes a first-priority lien on specific invoices and can negotiate subordination with MCA funders or require payoff at first settlement.</li>
</ul>

<h2 id="faq">Frequently Asked Questions</h2>

<p><strong>Will an MCA affect my personal credit score?</strong> Not directly — MCA funders do not report to personal credit bureaus. However, if you signed a personal guarantee, a default can result in a lawsuit and judgment that does appear on personal credit. And if you used the MCA to pay personal expenses and those show in your business statements, underwriters notice.</p>

<p><strong>Can I get a bank loan while an MCA is still active?</strong> It is difficult but not impossible. You would need the MCA funder to subordinate their UCC lien (uncommon), your DSCR to hold above the lender's minimum including the MCA daily draw (usually impossible), and a loan officer willing to approve despite the lien. In practice, the answer is usually no until the MCA is paid off.</p>

<p><strong>Does using Debtura's lender matching affect my ability to get a bank loan later?</strong> No. Debtura's lender matching is not a loan application and does not generate credit inquiries. It matches you with MCA lenders based on your profile. Any credit pulls happen only if you proceed with a specific lender.</p>

<p><strong>I have an MCA from a lender with a bad rating. Does that matter to banks?</strong> Banks do not evaluate which MCA funder you used — they evaluate the debt structure itself. However, lenders with predatory reputations (F-grade on the <a href="/lender-risk-index">Debtura Lender Risk Index</a>) are more likely to refuse UCC termination after payoff, which creates the downstream bank loan problem described above.</p>

<p><em>This article is for educational purposes only and does not constitute legal or financial advice. Consult a licensed financial advisor or attorney for advice specific to your business situation.</em></p>
`.trim(),
};
