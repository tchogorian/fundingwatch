import type { BlogPost } from "../blog";
import { AUTHOR_BIO, CREDENTIALS } from "./constants";

export const post: BlogPost = {
  slug: "how-to-analyze-mca-contract",
  title: "How to Analyze a Merchant Cash Advance Contract: Complete Guide",
  excerpt:
    "Know what to look for before you sign an MCA contract. This guide covers the 12 most dangerous clauses, how to calculate your true APR, and every red flag to find.",
  category: "mca-basics",
  date: "2025-03-01",
  readTimeMinutes: 14,
  author: "Alex Tchogorian",
  authorBio: AUTHOR_BIO,
  credentials: CREDENTIALS,
  headings: [
    { id: "get-full-contract", text: "Before You Start: Get the Full Contract in Advance", level: 2 },
    { id: "clause-advance-purchased", text: "Clause One: The Advance Amount and Purchased Amount", level: 2 },
    { id: "clause-specified-percentage", text: "Clause Two: The Specified Percentage", level: 2 },
    { id: "clause-payment-mechanism", text: "Clause Three: The Payment Mechanism and Frequency", level: 2 },
    { id: "clause-default", text: "Clause Four: The Default Provisions", level: 2 },
    { id: "clause-reconciliation", text: "Clause Five: The Reconciliation Provision", level: 2 },
    { id: "clause-coj", text: "Clause Six: The Confession of Judgment", level: 2 },
    { id: "after-review", text: "After the Contract Review: What to Do With What You Find", level: 2 },
    { id: "faq", text: "Frequently Asked Questions", level: 2 },
  ],
  body: `<p>Most small business owners spend less than an hour reviewing an MCA contract before signing. This guide walks through every significant clause and identifies red flags.</p><h2 id="get-full-contract">Before You Start: Get the Full Contract in Advance</h2><p>Request the full agreement by email. In California and other disclosure-law states, you are entitled to a pre-contract disclosure.</p><h2 id="clause-advance-purchased">Clause One: The Advance Amount and Purchased Amount</h2><p>The ratio of purchased amount to advance amount is the factor rate. The <a href="/blog/what-is-factor-rate">factor rate article</a> covers APR conversion.</p><h2 id="clause-reconciliation">Clause Five: The Reconciliation Provision</h2><p>Look for "Reconciliation," "Adjustment of Remittance," or "True-Up." The absence of a reconciliation provision is the most significant red flag.</p><h2 id="clause-coj">Clause Six: The Confession of Judgment</h2><p>Search for "confession," "cognovit," or "warrant of attorney." The <a href="/blog/confession-of-judgment-danger">COJ article</a> explains the mechanics.</p><h2 id="faq">Frequently Asked Questions</h2><p><strong>Should I have an attorney review my MCA contract before signing?</strong> For advances above $50,000 or where the contract contains a COJ provision, attorney review is money well spent.</p><p><em>This article is for educational purposes only and does not constitute legal or financial advice.</em></p>`,
};
