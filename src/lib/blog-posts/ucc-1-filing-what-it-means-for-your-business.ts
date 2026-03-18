import type { BlogPost } from "../blog";
import { AUTHOR_BIO, AUTHOR_NAME, CREDENTIALS } from "./constants";

export const post: BlogPost = {
  slug: "ucc-1-filing-what-it-means-for-your-business",
  title: "UCC-1 Filings Explained: What That Lien on Your Business Actually Means",
  excerpt:
    "When you take an MCA, your lender files a UCC-1 against your business assets. Here is what it means, what it covers, how to find yours, and when it becomes a serious problem.",
  metaDescription:
    "A UCC-1 filing gives your MCA lender a lien on your business assets. Learn what it covers, how to search for filings against your business, and how to get them removed.",
  category: "mca-basics",
  date: "2026-03-18",
  readTimeMinutes: 8,
  author: AUTHOR_NAME,
  authorBio: AUTHOR_BIO,
  credentials: CREDENTIALS,
  headings: [
    { id: "what-is-ucc-1", text: "What a UCC-1 Filing Actually Is", level: 2 },
    { id: "what-it-covers", text: "What the UCC-1 Covers — and What 'All Assets' Really Means", level: 2 },
    { id: "how-to-find-yours", text: "How to Find UCC Filings Against Your Business", level: 2 },
    { id: "why-it-matters", text: "Why It Matters: Bank Loans, Other Financing, and Asset Sales", level: 2 },
    { id: "stacking-and-ucc", text: "MCA Stacking and UCC Liens: A Hidden Danger", level: 2 },
    { id: "how-to-remove", text: "How to Get a UCC-1 Terminated After Payoff", level: 2 },
    { id: "what-happens-default", text: "What Happens to the UCC Lien If You Default", level: 2 },
    { id: "faq", text: "Frequently Asked Questions", level: 2 },
  ],
  body: `
<p>When you sign an MCA agreement, your funder files a document called a UCC-1 financing statement against your business at the state level. Most borrowers never see it, never look for it, and do not understand what it means until it blocks a bank loan or surfaces during a business sale. This guide explains exactly what that filing does and what to do about it.</p>

<h2 id="what-is-ucc-1">What a UCC-1 Filing Actually Is</h2>

<p>A UCC-1 financing statement is a public notice filed under Article 9 of the Uniform Commercial Code. By filing it, your MCA provider is telling the world: this business owes us money and we have a security interest in their assets. It is not a judgment. It is not a lawsuit. It is a lien — a legal claim against collateral that gives the funder priority over other creditors if you default or liquidate.</p>

<p>UCC-1 filings are public records, searchable by anyone. Banks, other lenders, potential buyers of your business, and landlords can all find them. They are filed with your state's Secretary of State office, typically within days of your advance funding.</p>

<p>The filing includes: the name and address of the debtor (your business), the name and address of the secured party (your MCA funder), and a description of the collateral — which for most MCA agreements is very broad.</p>

<h2 id="what-it-covers">What the UCC-1 Covers — and What 'All Assets' Really Means</h2>

<p>The most common collateral description in MCA-related UCC-1 filings is "all assets" or "all personal property." This is a blanket lien. It covers:</p>

<ul>
  <li>Accounts receivable and future revenue</li>
  <li>Inventory and equipment</li>
  <li>Bank accounts</li>
  <li>Intellectual property</li>
  <li>Contracts and purchase orders</li>
  <li>Proceeds from any asset sale</li>
</ul>

<p>Some MCA agreements specify "purchased receivables" as the collateral, which is narrower. But many funders file all-asset liens regardless of what the agreement says — because broader collateral gives them more leverage in a default scenario.</p>

<p>A blanket lien does not mean the funder owns your assets. It means that if you default and they pursue collection, they have a legal claim to those assets ahead of unsecured creditors.</p>

<h2 id="how-to-find-yours">How to Find UCC Filings Against Your Business</h2>

<p>You can search for UCC filings against your business for free through your state's Secretary of State website. Search under your exact business legal name. Common state search portals:</p>

<ul>
  <li><strong>New York:</strong> appext20.dos.ny.gov/pls/ucc_public</li>
  <li><strong>California:</strong> bizfileonline.sos.ca.gov/search/ucc</li>
  <li><strong>Florida:</strong> search.sunbiz.org</li>
  <li><strong>Texas:</strong> direct.sos.state.tx.us</li>
  <li><strong>All states:</strong> Search "[your state] UCC search Secretary of State"</li>
</ul>

<p>Pull your filing and look at three things: the secured party name (who filed it), the collateral description (what it covers), and the lapse date (when it expires — UCC-1s are valid for 5 years and can be renewed). If you see a filing from an MCA funder you have already paid off, that is a problem — see below on termination.</p>

<h2 id="why-it-matters">Why It Matters: Bank Loans, Other Financing, and Asset Sales</h2>

<p>An active UCC-1 blanket lien from an MCA funder creates three practical problems:</p>

<p><strong>Bank loan applications.</strong> When you apply for an SBA loan or conventional bank loan, the bank will search UCC filings. An active all-asset lien from an MCA funder signals that another creditor already has first-priority claim on your assets. Most banks will require the MCA lien to be released before funding — which means paying off the MCA first, or negotiating a subordination agreement with the MCA funder, which many will refuse.</p>

<p><strong>Equipment financing.</strong> Equipment lenders typically take a UCC lien on the specific equipment being financed. If an MCA funder already has a blanket lien that covers all assets including equipment, the equipment lender is in second position. Many equipment lenders will decline to fund or require the MCA funder to subordinate their lien to allow the equipment lien to take priority.</p>

<p><strong>Business sale.</strong> When you sell your business, the buyer's attorney will search UCC filings and require all liens to be released at closing. An open UCC-1 from an MCA you paid off two years ago — but never formally terminated — can delay or kill a closing. Termination is your responsibility, not the funder's.</p>

<h2 id="stacking-and-ucc">MCA Stacking and UCC Liens: A Hidden Danger</h2>

<p>When you take a second or third MCA while the first is outstanding, each funder files its own UCC-1. The result is a stack of liens against your business, each representing a claim on the same pool of assets. This creates several risks beyond the cost of the advances themselves:</p>

<ul>
  <li>Lenders in second or third position charge higher rates to compensate for subordinate priority</li>
  <li>Multiple active UCC liens make bank financing essentially impossible until all are cleared</li>
  <li>Cross-default provisions in some MCA agreements allow one funder's default to trigger all others simultaneously</li>
  <li>Lenders with first-priority liens can block settlement or restructuring efforts by second-position creditors</li>
</ul>

<p>Before taking any additional MCA, search your state's UCC database and count how many active liens exist against your business. If there are two or more, adding another is a significant risk escalation.</p>

<h2 id="how-to-remove">How to Get a UCC-1 Terminated After Payoff</h2>

<p>Paying off an MCA does not automatically terminate the UCC-1. The funder is legally required to file a UCC-3 termination statement within 20 days of receiving a written demand from you after payoff — but many do not do this proactively, and some are slow to respond even when asked.</p>

<p>The process:</p>

<ol>
  <li>Obtain written confirmation of payoff from the funder (a payoff letter or zero-balance statement)</li>
  <li>Send a written demand to the funder requesting UCC-3 termination, citing UCC Article 9-513</li>
  <li>Wait 20 days. If no termination is filed, you may be entitled to file a termination yourself in some states, or pursue damages under UCC 9-625</li>
  <li>Verify termination by searching the state UCC database again after 30 days</li>
</ol>

<p>Keep a copy of every payoff letter and termination demand. If you ever need to show a bank that a lien was properly released, the paper trail matters.</p>

<h2 id="what-happens-default">What Happens to the UCC Lien If You Default</h2>

<p>If you default on an MCA and the funder chooses to enforce their lien, they have the right to take possession of the collateral described in the UCC-1 — subject to legal process. In practice, MCA funders rarely take physical possession of inventory or equipment. Instead, they use the lien as leverage during collection negotiations, or as a basis for freezing bank accounts if they obtain a judgment.</p>

<p>The more immediate danger in default is the confession of judgment (COJ), which many MCA agreements include. A COJ allows the funder to file a court judgment instantly, without notice, which they can then use to levy bank accounts. The UCC lien and the COJ work together — the lien establishes the priority claim, and the COJ provides the enforcement mechanism. See our <a href="/analyze">free contract analysis tool</a> to detect both in your agreement before you sign.</p>

<h2 id="faq">Frequently Asked Questions</h2>

<p><strong>Does a UCC-1 affect my personal credit?</strong> UCC-1 filings are against your business entity, not your personal credit. They appear on business credit reports (Dun &amp; Bradstreet, Experian Business) but not personal credit reports — unless you signed a personal guarantee, which is a separate document.</p>

<p><strong>Can a funder file a UCC-1 even if I haven't defaulted?</strong> Yes. UCC-1 filings are filed at the start of the arrangement, not only upon default. They are notice filings, not enforcement actions.</p>

<p><strong>What if I find an old UCC-1 from a lender I paid off years ago?</strong> Send a written termination demand to the funder. If they are unresponsive or no longer operating, your state's UCC office may have a process for debtor-initiated termination with supporting documentation.</p>

<p><strong>Can I negotiate to prevent a UCC-1 from being filed?</strong> Rarely. Most MCA agreements require the debtor to authorize the UCC filing as a condition of funding. It is typically non-negotiable. The better approach is to understand what the lien covers and ensure it is promptly terminated upon payoff.</p>

<p><em>This article is for educational purposes only and does not constitute legal advice. Consult a licensed attorney for guidance specific to your situation.</em></p>
`.trim(),
};
