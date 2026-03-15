import type { BlogPost } from "../blog";
import { AUTHOR_BIO, CREDENTIALS } from "./constants";

export const post: BlogPost = {
  slug: "mca-laws-by-state",
  title: "MCA Laws by State: Borrower Protections Across the US (2025)",
  excerpt:
    "State MCA laws vary dramatically. New York, California, Florida, Texas, and Illinois each have different usury rules, disclosure laws, and borrower protections. Know yours.",
  category: "state-guides",
  date: "2025-03-01",
  readTimeMinutes: 12,
  author: "Debtura Intelligence Team",
  authorBio: AUTHOR_BIO,
  credentials: CREDENTIALS,
  headings: [
    { id: "new-york", text: "New York: The Most Developed MCA Legal Framework", level: 2 },
    { id: "california", text: "California: Disclosure Law Leadership", level: 2 },
    { id: "florida", text: "Florida: A Complex Landscape", level: 2 },
    { id: "texas", text: "Texas: Recent and Growing Protections", level: 2 },
    { id: "illinois", text: "Illinois: Legislative Activity", level: 2 },
    { id: "file-complaint", text: "How to File a Regulatory Complaint in Your State", level: 2 },
    { id: "faq", text: "Frequently Asked Questions", level: 2 },
  ],
  body: `
<p>The legal landscape for merchant cash advance borrowers varies more by state than almost any other area of commercial lending. This guide covers the states with the most developed MCA regulatory frameworks and the key protections available in each.</p>
<h2 id="new-york">New York: The Most Developed MCA Legal Framework</h2>
<p>New York has more MCA enforcement history and stronger borrower protections than any other state. The 2019 COJ reform prohibits enforcement of confessions of judgment against out-of-state residents. New York's usury law applies to commercial transactions; the criminal usury cap is 25% per year. New York enacted commercial financing disclosure legislation in 2023. The <a href="/blog/new-york-mca-settlement-534m">$534 million Yellowstone Capital settlement</a> is the most prominent enforcement outcome. See also <a href="/blog/confession-of-judgment-danger">confession of judgment</a> and <a href="/blog/merchant-cash-advance-defense">MCA defense</a>.</p>
<h2 id="california">California: Disclosure Law Leadership</h2>
<p>California enacted <a href="/blog/california-apr-disclosure-law">SB 1235</a> in 2018, making it the first state to require standardized APR disclosure for MCAs. Before executing an MCA agreement, California borrowers must receive a written disclosure showing advance amount, total repayment amount, total cost, payment frequency, annualized rate, and prepayment policies. The DFPI maintains a registration system for commercial financing providers. California's Unfair Competition Law provides broad bases for claims against MCA providers who engaged in deceptive practices.</p>
<h2 id="florida">Florida: A Complex Landscape</h2>
<p>Florida has no MCA-specific usury statute applied to recharacterize MCAs with the consistency seen in New York. Florida does permit confession of judgment under its own procedures; the 2019 New York reform protects Florida borrowers from COJ enforcement in New York courts. Florida's Deceptive and Unfair Trade Practices Act provides a basis for claims involving misrepresentation. Florida has no state-level MCA disclosure law equivalent to California's SB 1235.</p>
<h2 id="texas">Texas: Recent and Growing Protections</h2>
<p>Texas House Bill 700, effective September 2025, extended commercial financing disclosure requirements to Texas-based borrowers. Texas HB 700 requires providers to disclose total amount of funds provided, total amount owed, term, method and frequency of payment, and an annualized rate. Lenders who originated advances to Texas businesses after HB 700 without providing required disclosures have created a documented compliance failure.</p>
<h2 id="illinois">Illinois: Legislative Activity</h2>
<p>Illinois has seen significant legislative activity around commercial financing and MCA products. The state's interest rate cap on commercial loans is more restrictive than many states. Illinois borrowers should consult with an Illinois attorney current on the rapidly evolving state regulatory landscape.</p>
<h2 id="file-complaint">How to File a Regulatory Complaint in Your State</h2>
<p>In California, file a complaint with the DFPI at dfpi.ca.gov/file-a-complaint. In New York, file with the New York Department of Financial Services at dfs.ny.gov. Every state Attorney General's consumer protection division accepts complaints about deceptive business practices. Federal complaints can be filed with the FTC and CFPB.</p>
<h2 id="faq">Frequently Asked Questions</h2>
<p><strong>Does it matter which state law governs my MCA contract?</strong> Yes, significantly. The governing law specified in your contract determines which usury statutes, disclosure requirements, and case law precedents apply.</p>
<p><strong>Are there any federal protections for MCA borrowers?</strong> Federal protection is limited for commercial borrowers. State laws are the primary protection mechanism for most MCA borrowers.</p>
<p><em>This article is for educational purposes only and does not constitute legal or financial advice. Consult a licensed attorney in your jurisdiction for advice current to your situation.</em></p>
<p><em>Independent research and analysis from Debtura&apos;s team of commercial lending analysts.</em></p>
`.trim(),
};
