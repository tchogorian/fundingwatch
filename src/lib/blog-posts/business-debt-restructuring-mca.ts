import type { BlogPost } from "../blog";
import { AUTHOR_BIO, CREDENTIALS } from "./constants";

export const post: BlogPost = {
  slug: "business-debt-restructuring-mca",
  title: "Business Debt Restructuring: Options When MCA Debt Becomes Unmanageable",
  excerpt:
    "When MCA debt reaches a level your business cannot sustain, restructuring through negotiation, bankruptcy, or legal defense may be the path forward. Here is how each option works.",
  category: "borrower-rights",
  date: "2025-03-01",
  readTimeMinutes: 10,
  author: "Alex Tchogorian",
  authorBio: AUTHOR_BIO,
  credentials: CREDENTIALS,
  headings: [
    { id: "when-restructuring-necessary", text: "When Restructuring Becomes Necessary", level: 2 },
    { id: "out-of-court", text: "Out-of-Court Restructuring: Negotiated Settlement", level: 2 },
    { id: "subchapter-v", text: "Small Business Restructuring Act Chapter 11", level: 2 },
    { id: "regular-chapter-11", text: "Regular Chapter 11", level: 2 },
    { id: "abc", text: "Assignment for Benefit of Creditors", level: 2 },
    { id: "faq", text: "Frequently Asked Questions", level: 2 },
  ],
  body: `<p>Business debt restructuring is the process of renegotiating, reorganizing, or legally modifying debt obligations to bring them into alignment with what a business can actually sustain.</p><h2 id="when-restructuring-necessary">When Restructuring Becomes Necessary</h2><p>Formal restructuring becomes necessary when the total debt burden exceeds what any combination of negotiation and cash flow improvement can address. If your combined MCA payments, after every available reduction through <a href="/blog/reconciliation-clause-why-you-need-it">reconciliation</a> and negotiation, still consume more than 30% of revenue, restructuring is appropriate.</p><h2 id="out-of-court">Out-of-Court Restructuring: Negotiated Settlement</h2><p>Individual settlements involve negotiating with each MCA lender separately. Global settlements address all active MCA positions simultaneously through a third party—typically an attorney or restructuring professional.</p><h2 id="subchapter-v">Small Business Restructuring Act Chapter 11</h2><p>Subchapter V of Chapter 11 streamlines the process for small businesses. The automatic stay goes into effect upon filing and immediately stops all collection actions including bank levies, COJ enforcement, and payment processor restraints.</p><h2 id="faq">Frequently Asked Questions</h2><p><strong>Can I restructure MCA debt while the business is still operating?</strong> Yes. Out-of-court restructuring and Chapter 11 are both designed to allow continued business operation during the restructuring process.</p><p><em>This article is for educational purposes only and does not constitute legal or financial advice.</em></p>`,
};
