import type { BlogPost } from "../blog";
import { AUTHOR_BIO, CREDENTIALS } from "./constants";

export const post: BlogPost = {
  slug: "mca-lender-profiles-overview",
  title: "MCA Lender Profiles: CFPB Complaints, Tactics, and Borrower Reviews",
  excerpt:
    "A data-driven analysis of the largest MCA lenders including complaint histories, known contract terms, and what borrowers report about their experience.",
  category: "lender-profiles",
  date: "2025-03-01",
  readTimeMinutes: 10,
  author: "Debtura Intelligence Team",
  authorBio: AUTHOR_BIO,
  credentials: CREDENTIALS,
  headings: [
    { id: "evaluate-any-lender", text: "How to Evaluate Any MCA Lender Before Signing", level: 2 },
    { id: "yellowstone-capital", text: "Yellowstone Capital", level: 2 },
    { id: "everest-business-funding", text: "Everest Business Funding", level: 2 },
    { id: "research-your-lender", text: "What to Look For When Researching Your Specific Lender", level: 2 },
    { id: "faq", text: "Frequently Asked Questions", level: 2 },
  ],
  body: `<p>Not all MCA lenders operate the same way. This guide profiles major MCA lenders using publicly available data including CFPB complaint filings, BBB records, and court documents.</p><h2 id="evaluate-any-lender">How to Evaluate Any MCA Lender Before Signing</h2><p>Check the CFPB complaint database, the Better Business Bureau, CourtListener for federal court filings, and your state attorney general's enforcement database.</p><h2 id="yellowstone-capital">Yellowstone Capital</h2><p>Yellowstone Capital's <a href="/blog/new-york-mca-settlement-534m">$534 million settlement</a> with the New York AG in 2023 is the largest MCA enforcement action ever recorded. The NY AG alleged misrepresentation of cost, systematic refusal of <a href="/blog/reconciliation-clause-why-you-need-it">reconciliation</a> requests, and use of <a href="/blog/confession-of-judgment-danger">COJ</a> filings against out-of-state borrowers.</p><h2 id="faq">Frequently Asked Questions</h2><p><strong>How do I find out if my MCA lender has been subject to regulatory action?</strong> Search the New York AG's enforcement database, your state AG's database, and the CFPB enforcement actions database.</p><p><em>This article is for educational purposes only. The information is based on publicly available records. Nothing in this article constitutes legal advice.</em></p>`,
};
