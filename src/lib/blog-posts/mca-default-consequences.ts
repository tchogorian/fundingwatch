import type { BlogPost } from "../blog";
import { AUTHOR_BIO, CREDENTIALS } from "./constants";

export const post: BlogPost = {
  slug: "mca-default-consequences",
  title: "What Happens When You Default on a Merchant Cash Advance",
  excerpt:
    "MCA default can trigger frozen accounts, UCC liens, COJ judgments, and payment processor seizures within days. Here is exactly what happens and what to do immediately.",
  category: "contract-analysis",
  date: "2025-03-01",
  readTimeMinutes: 12,
  author: "Debtura Intelligence Team",
  authorBio: AUTHOR_BIO,
  credentials: CREDENTIALS,
  headings: [
    { id: "what-triggers-default", text: "What Triggers a Default", level: 2 },
    { id: "window-after-default", text: "The 24 to 72 Hour Window After Default", level: 2 },
    { id: "account-frozen", text: "What to Do If Your Account Is Frozen", level: 2 },
    { id: "collection-tools", text: "Collection Tools Available to MCA Lenders After Default", level: 2 },
    { id: "ucc-and-default", text: "How Default Interacts With UCC Liens", level: 2 },
    { id: "options-after-default", text: "Options After Default", level: 2 },
    { id: "avoid-default", text: "How to Avoid Default", level: 2 },
    { id: "faq", text: "Frequently Asked Questions", level: 2 },
  ],
  body: `<p>Defaulting on a merchant cash advance sets in motion a sequence of events that moves faster than default on almost any other business obligation.</p><h2 id="what-triggers-default">What Triggers a Default</h2><p>Many MCA contracts define default broadly: failed ACH, change in bank account without consent, material decline in average daily balance, or applying for additional financing without consent.</p><h2 id="window-after-default">The 24 to 72 Hour Window After Default</h2><p>With a <a href="/blog/confession-of-judgment-danger">COJ</a> provision, the lender's attorney can file the COJ affidavit the same day. Once the judgment is entered, the lender can immediately begin bank levies. A bank levy freezes your accounts.</p><h2 id="account-frozen">What to Do If Your Account Is Frozen</h2><p>The first call is to an MCA defense attorney. Do not call the lender's collection department without an attorney advising you.</p><h2 id="faq">Frequently Asked Questions</h2><p><strong>Can a lender declare default if I have not missed a payment?</strong> Yes, under many MCA contracts. If your contract includes balance thresholds or bank account change restrictions, the lender may have contractual grounds to declare default.</p><p><em>This article is for educational purposes only and does not constitute legal or financial advice.</em></p>`,
};
