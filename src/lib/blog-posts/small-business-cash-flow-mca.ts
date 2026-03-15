import type { BlogPost } from "../blog";
import { AUTHOR_BIO, CREDENTIALS } from "./constants";

export const post: BlogPost = {
  slug: "small-business-cash-flow-mca",
  title: "Small Business Cash Flow: How MCAs Destroy It and How to Recover",
  excerpt:
    "MCA daily payments can consume 30% or more of your revenue before you pay a single bill. Learn how to diagnose your cash flow problem and build a recovery plan.",
  category: "mca-basics",
  date: "2025-03-01",
  readTimeMinutes: 10,
  author: "Debtura Intelligence Team",
  authorBio: AUTHOR_BIO,
  credentials: CREDENTIALS,
  headings: [
    { id: "diagnosing-cash-flow", text: "Diagnosing Your Cash Flow Position", level: 2 },
    { id: "cascading-effect", text: "The Cascading Effect of MCA Payments on Business Operations", level: 2 },
    { id: "immediate-stabilization", text: "Immediate Stabilization Steps", level: 2 },
    { id: "recovery-plan", text: "Building a Cash Flow Recovery Plan", level: 2 },
    { id: "faq", text: "Frequently Asked Questions", level: 2 },
  ],
  body: `<p>Cash flow is the circulatory system of a small business. A merchant cash advance disrupts this system by claiming a fixed portion of incoming revenue before any of it reaches the business owner.</p><h2 id="diagnosing-cash-flow">Diagnosing Your Cash Flow Position</h2><p>Calculate your MCA debt service ratio: total daily MCA payments divided by your actual average daily revenue from the last 30 days. Below 15%: manageable. 15% to 20%: stressed. Above 30%: critical. See the <a href="/blog/mca-debt-relief-guide">MCA debt relief guide</a>.</p><h2 id="immediate-stabilization">Immediate Stabilization Steps</h2><p>File a <a href="/blog/reconciliation-clause-why-you-need-it">reconciliation request</a> if your contract includes a reconciliation clause and your revenue has declined. Conduct a comprehensive expense audit. Accelerate revenue collection.</p><h2 id="recovery-plan">Building a Cash Flow Recovery Plan</h2><p>Reduce the MCA obligation through negotiation or legal defense, replace MCA capital with <a href="/blog/mca-alternatives">cheaper alternatives</a> as the balance declines, and build cash reserves.</p><h2 id="faq">Frequently Asked Questions</h2><p><strong>Can I reduce MCA payments without my lender's agreement?</strong> No. Unilaterally reducing payments is a default under virtually every MCA contract.</p><p><em>This article is for educational purposes only and does not constitute legal or financial advice.</em></p>`,
};
