import type { BlogPost } from "../blog";
import { AUTHOR_BIO, CREDENTIALS } from "./constants";

export const post: BlogPost = {
  slug: "mca-scams-predatory-lenders",
  title: "MCA Scams and Predatory Lending: How to Identify and Avoid Them",
  excerpt:
    "Not every MCA problem is a scam, but some practices cross clear legal lines. Learn how to identify predatory MCA lenders, double-funding fraud, and misleading sales tactics.",
  category: "contract-analysis",
  date: "2025-03-01",
  readTimeMinutes: 10,
  author: "Debtura Intelligence Team",
  authorBio: AUTHOR_BIO,
  credentials: CREDENTIALS,
  headings: [
    { id: "expensive-vs-predatory", text: "The Difference Between Expensive and Predatory", level: 2 },
    { id: "double-funding-fraud", text: "Double-Funding Fraud", level: 2 },
    { id: "misrepresentation", text: "Misrepresentation of Contract Terms", level: 2 },
    { id: "predatory-collection", text: "Predatory Collection Practices", level: 2 },
    { id: "debt-settlement-scam", text: "The Debt Settlement Scam Within the MCA Industry", level: 2 },
    { id: "report-fraud", text: "How to Report MCA Fraud", level: 2 },
    { id: "faq", text: "Frequently Asked Questions", level: 2 },
  ],
  body: `<p>There is a spectrum of conduct in the MCA industry. At one end are lenders who price expensively but disclose costs honestly. At the other end are lenders who commit outright fraud and use collection tactics that cross clear legal lines.</p><h2 id="expensive-vs-predatory">The Difference Between Expensive and Predatory</h2><p>Predatory lending involves actively deceiving borrowers about cost or terms, refusing to honor contractual obligations while enforcing the borrower's obligations, and using collection tactics that violate the law.</p><h2 id="double-funding-fraud">Double-Funding Fraud</h2><p>Double-funding occurs when a lender or broker arranges multiple advances on the same receivables without disclosing the existence of other funding to subsequent lenders. Double-funding involving material misrepresentations may constitute wire fraud under federal law.</p><h2 id="report-fraud">How to Report MCA Fraud</h2><p>Report to the FTC at reportfraud.ftc.gov, the CFPB at consumerfinance.gov/complaint, your state attorney general's office, and the FBI's IC3 at ic3.gov for fraud involving electronic communications.</p><h2 id="faq">Frequently Asked Questions</h2><p><strong>How do I know if my MCA situation involves fraud or just bad terms?</strong> Fraud generally involves intentional misrepresentation of material facts. If you were told something materially different from what the contract says, you may have fraud or regulatory violation claims.</p><p><em>This article is for educational purposes only and does not constitute legal or financial advice.</em></p>`,
};
