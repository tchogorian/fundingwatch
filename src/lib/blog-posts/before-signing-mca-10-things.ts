import type { BlogPost } from "../blog";
import { AUTHOR_BIO, CREDENTIALS } from "./constants";

export const post: BlogPost = {
  slug: "before-signing-mca-10-things",
  title: "Before Signing a Merchant Cash Advance: 10 Things Every Business Owner Must Know",
  excerpt:
    "A restaurant owner in Tampa signed what she thought was a $50,000 loan. Nine months later, she had repaid $84,500 and still owed a balance. She is not an outlier. Here are 10 contract terms every business owner must understand before signing.",
  metaDescription:
    "Before signing a merchant cash advance, understand factor rates, confession of judgment clauses, UCC liens, and 7 other contract terms that could cost your business everything.",
  category: "contract-analysis",
  date: "2026-03-13",
  readTimeMinutes: 7,
  author: "Debtura Intelligence Team",
  authorBio: AUTHOR_BIO,
  credentials: CREDENTIALS,
  headings: [
    { id: "factor-rate", text: "The Factor Rate Is Designed to Hide the True Cost", level: 2 },
    { id: "confession-of-judgment", text: "The Confession of Judgment Clause Can End Your Business Overnight", level: 2 },
    { id: "daily-remittance", text: "Daily Remittance Creates a Cash Flow Stranglehold", level: 2 },
    { id: "personal-guarantee", text: "Your Personal Guarantee Means Your Home Is on the Table", level: 2 },
    { id: "stacking-prohibition", text: "The Stacking Prohibition Locks You Into One Provider", level: 2 },
    { id: "reconciliation-rights", text: "You May Have Reconciliation Rights — But Nobody Will Mention Them", level: 2 },
    { id: "ucc-lien", text: "The UCC-1 Lien Covers Everything Your Business Owns", level: 2 },
    { id: "default-triggers", text: "Default Triggers Go Far Beyond Missing a Payment", level: 2 },
    { id: "renewal-traps", text: "Renewal Traps Keep You in a Permanent Debt Cycle", level: 2 },
    { id: "litigation-history", text: "Search the Funder's Litigation History Before You Sign Anything", level: 2 },
  ],
  body: `<p>A restaurant owner in Tampa signed what she thought was a $50,000 loan last March. Nine months later, she had repaid $84,500 and still owed a balance. Her bookkeeper finally did the math: the effective annual percentage rate exceeded 350%. She is not an outlier. She is the norm.</p>

<p>Merchant cash advances have flooded the small-business financing market, growing into an estimated $19 billion annual industry with virtually no federal lending regulation. They are not technically loans — which is precisely how providers avoid usury caps and Truth in Lending disclosures. That legal distinction does not make the money cheaper. It makes it more dangerous.</p>

<p>Before you sign a single page, here are ten things you must understand.</p>

<h2 id="factor-rate">The Factor Rate Is Designed to Hide the True Cost</h2>

<p>MCA providers quote a "factor rate" — typically between 1.20 and 1.50 — rather than an annual percentage rate. A factor rate of 1.40 on a $50,000 advance means you repay $70,000. That sounds like 40% interest. It is not. Because repayment occurs over four to eight months through daily debits, the effective APR ranges from 60% to well over 350%, depending on the term. The factor rate exists for one reason: it makes triple-digit borrowing costs look like single-digit ones.</p>

<p>Ask any provider to state the APR in writing. Most will refuse. That refusal tells you everything.</p>

<h2 id="confession-of-judgment">The Confession of Judgment Clause Can End Your Business Overnight</h2>

<p>Buried in many MCA contracts is a Confession of Judgment, or COJ. By signing it, you authorize the funder to obtain a court judgment against you — without notifying you and without a trial. New York banned the use of COJs against out-of-state borrowers in 2019, but many contracts still route jurisdiction through states where the clause remains enforceable. If your agreement contains a COJ, the funder can freeze your bank accounts the moment it alleges a default. You will find out when your payroll bounces.</p>

<h2 id="daily-remittance">Daily Remittance Creates a Cash Flow Stranglehold</h2>

<p>Most MCAs require daily ACH debits from your business bank account, typically ranging from $250 to $1,500 per business day. That structure means your operating cash is reduced every morning before you serve a single customer or ship a single order. Some providers offer weekly remittance, but charge a higher factor rate for the privilege. A $500 daily debit equals $10,500 per month. If your net monthly revenue is $40,000, you are surrendering more than 25% of it before covering rent, payroll, or inventory.</p>

<h2 id="personal-guarantee">Your Personal Guarantee Means Your Home Is on the Table</h2>

<p>Nearly every MCA contract includes a personal guarantee. This is not a formality. It means that if the business cannot repay, the funder can pursue your personal bank accounts, your car, your house, and any other asset in your name. Some guarantees extend to spouses. Read the guarantee clause word by word. If it says "unlimited" or "unconditional," understand that your personal financial life is collateral — in full.</p>

<h2 id="stacking-prohibition">The Stacking Prohibition Locks You Into One Provider</h2>

<p>Most agreements contain a covenant prohibiting "stacking" — taking a second MCA from another provider while the first is still outstanding. Violating this clause typically triggers an immediate default. That means if cash gets tighter and you seek a second advance to bridge the gap, you have not found a lifeline. You have detonated the first contract. The stacking prohibition ensures the funder is first in line and that you have no leverage to refinance.</p>

<h2 id="reconciliation-rights">You May Have Reconciliation Rights — But Nobody Will Mention Them</h2>

<p>Because an MCA is structured as a purchase of future receivables, the daily debit is supposed to represent a fixed percentage of actual revenue. If your revenue drops, you theoretically have the right to request a reconciliation — a downward adjustment in the daily payment. In practice, many funders make reconciliation nearly impossible, requiring 60 to 90 days of bank statements, tax documents, and weeks of review. Know whether your contract includes reconciliation and what the process demands before you sign. It may be your only pressure valve.</p>

<h2 id="ucc-lien">The UCC-1 Lien Covers Everything Your Business Owns</h2>

<p>Upon funding, most MCA providers file a UCC-1 financing statement, placing a blanket lien on all business assets — equipment, inventory, receivables, intellectual property, and sometimes the business name itself. This lien remains on public record even after repayment unless you demand a termination filing. It will appear in any due diligence by a bank, an investor, or a potential buyer. One MCA can quietly make your business unfundable by any other source.</p>

<h2 id="default-triggers">Default Triggers Go Far Beyond Missing a Payment</h2>

<p>You might assume default means failing to repay. In most MCA contracts, default can be triggered by changing your bank account, experiencing a revenue decline, taking on other debt, failing to maintain a specific bank balance, or even losing a key customer. Some contracts include a "material adverse change" clause so broad that virtually any negative business development qualifies. Read every default trigger. Count them. In some contracts, there are more than a dozen.</p>

<h2 id="renewal-traps">Renewal Traps Keep You in a Permanent Debt Cycle</h2>

<p>Many providers contact borrowers around the 50% repayment mark offering a "renewal" — a new advance that pays off the remaining balance and provides a small amount of additional capital. This is not generosity. It is re-underwriting at a new factor rate applied to a new, larger principal. A business owner who took a $30,000 advance, repaid $20,000, and then renewed into a $50,000 contract has now committed to repaying approximately $70,000 — having received only $30,000 in net new capital. Some contracts include automatic renewal provisions. Check yours.</p>

<h2 id="litigation-history">Search the Funder's Litigation History Before You Sign Anything</h2>

<p>Court records are public. Use them. Search the funder's name in New York State court records, federal PACER filings, and your own state's court database. If a funder has dozens or hundreds of suits against small businesses, that is not a lender — it is a collection operation that happens to provide capital first. Multiple COJ filings, asset freezes, and aggressive judgments tell you exactly how that company treats borrowers who stumble. Past behavior predicts future behavior. This research takes thirty minutes. Skipping it can cost you everything.</p>

<p>Every clause in these contracts was drafted by attorneys working for the funder. None of them were written with your survival in mind. If you have an MCA contract in hand — signed or unsigned — upload it for a free confidential analysis at Debtura. The tool breaks down the true APR, flags predatory clauses, and identifies your risks in plain language.</p>`,
};
