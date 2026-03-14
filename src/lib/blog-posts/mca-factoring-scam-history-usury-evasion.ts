import type { BlogPost } from "../blog";
import { AUTHOR_BIO, CREDENTIALS } from "./constants";

export const post: BlogPost = {
  slug: "mca-factoring-scam-history-usury-evasion",
  title: "The Oldest Con in Lending: How Merchant Cash Advances Revived a Century-Old Scam",
  excerpt:
    "The merchant cash advance industry did not invent a new product. It resurrected a legal fiction that predatory lenders have used since the 1890s — calling a loan a 'purchase' to escape usury law. Courts are finally catching on.",
  metaDescription:
    "Merchant cash advances use the same 'purchase of future receivables' legal fiction that predatory lenders used in the 1890s to evade usury caps. Here's the documented history, the case law, and why it matters now.",
  category: "industry-news",
  date: "2026-03-13",
  readTimeMinutes: 12,
  author: "Alex Tchogorian",
  authorBio: AUTHOR_BIO,
  credentials: CREDENTIALS,
  headings: [
    { id: "the-original-scam", text: "The Original Scam: Salary Lenders and the Purchase Fiction", level: 2 },
    { id: "russell-sage-documents-it", text: "The Russell Sage Foundation Documents It", level: 2 },
    { id: "how-the-fiction-works", text: "How the Legal Fiction Works — Then and Now", level: 2 },
    { id: "courts-examine-mca", text: "Courts Start Examining the Structure", level: 2 },
    { id: "the-ucc-contradiction", text: "The UCC-1 Contradiction", level: 2 },
    { id: "states-respond", text: "States Begin to Respond", level: 2 },
    { id: "what-this-means", text: "What History Tells Borrowers Now", level: 2 },
  ],
  body: `<p>In 1898, a worker in a Chicago meatpacking plant needed $20 to cover rent after a slow week. A man with a desk near the factory gates offered it — not as a loan, he was careful to say, but as a purchase. He would buy the worker's next two weeks of wages for $20 today. When payday came, $28 would flow directly to the desk man. The worker never saw a contract. He never heard the word "interest." He understood only that he owed the money and that the man near the gate had friends.</p>

<p>This was salary lending. It consumed the working poor of industrial America for three decades, extracting annualized rates that routinely exceeded 300%. Its practitioners called themselves factors, purchasers, discount agents — anything but lenders. The distinction was not semantic. It was the entire business model. In most American states at the turn of the century, lending money at more than 6% to 12% annually was a criminal offense. Purchasing future wages was not lending. It was commerce. The law, if read literally, did not apply.</p>

<p>One hundred and twenty years later, a merchant cash advance company in New York will tell a restaurant owner in Tampa the same thing, using nearly identical language, in contracts drafted by attorneys who know exactly what they are doing.</p>

<h2 id="the-original-scam">The Original Scam: Salary Lenders and the Purchase Fiction</h2>

<p>The mechanics of historical salary lending and modern merchant cash advances are not analogous. They are identical. Both involve an upfront payment in exchange for a claim on future income. Both use a fixed repayment amount regardless of what that future income actually looks like. Both are structured as purchases rather than loans specifically to avoid the legal consequences of being classified as loans. The only differences are the target — factory workers then, small business owners now — and the scale of the take.</p>

<p>The salary lender of 1900 would advance $10 against a $15 paycheck due in two weeks. The implicit annualized rate on that transaction, a $5 fee on a two-week $10 advance, is approximately 1,300%. The lender did not call it interest. He called it a discount. He called the transaction a sale of future wages, not a loan against them. He filed an "assignment of wages" with the employer — the equivalent of a UCC-1 lien — which directed the employer to pay him directly on payday. The borrower had no right of reconciliation if they got sick and missed shifts. The obligation was fixed and absolute.</p>

<p>Read any merchant cash advance contract written in the last fifteen years and you will find the same structure translated into modern legal language. The advance is called a "purchased amount." The total repayment is called the "purchased price." Daily ACH debits are called "remittances." The factor rate — say, 1.40 — is never converted to an APR because APR is a concept that applies to loans, and this, the contract insists, is not a loan. The UCC-1 lien filed against all business assets the day after funding is, according to the same contract, merely a security interest in purchased receivables rather than collateral for a debt.</p>

<h2 id="russell-sage-documents-it">The Russell Sage Foundation Documents It</h2>

<p>The Russell Sage Foundation, established in 1907 with a mandate to improve social conditions in the United States, assigned a researcher named Arthur Ham to investigate the small-loan industry. His 1909 report, "Remedial Loans," and subsequent publications through 1916 produced the most comprehensive contemporaneous documentation of predatory lending in American history. Ham's central finding was not that lenders were charging too much — it was that lenders had constructed an elaborate legal architecture specifically designed to make it impossible to charge them with charging too much.</p>

<p>Ham documented how salary lenders in New York, Chicago, and Philadelphia operated through a web of corporate structures that separated the "purchaser" of wages from any affiliated entity that held a state lending license. The purchaser entity had no license because it was not, technically, lending. It was buying. The fact that the "purchase price" was always precisely calibrated to yield 200% to 400% annualized returns was described in contracts as a negotiated discount reflecting the risk of the purchased asset — language that modern MCA contracts reproduce almost verbatim when they justify factor rates by reference to "the risk profile of future receivables."</p>

<p>Ham's work led directly to the Uniform Small Loan Law of 1916, drafted by the National Consumer League and adopted in modified form by most states over the following two decades. The law's key insight — one that state legislatures have had to rediscover with each generation of predatory lenders — was that the legal form of a transaction does not determine its economic substance. If the economic reality is that someone is receiving money now and repaying more money later under compulsion, that is a loan, regardless of what the contract calls it.</p>

<h2 id="how-the-fiction-works">How the Legal Fiction Works — Then and Now</h2>

<p>The "purchase of future receivables" structure survives today because the MCA industry has successfully argued in court after court that it does not meet the legal definition of a loan. The argument has three pillars. First: a loan requires an absolute obligation to repay, and MCA repayment is contingent on the merchant generating receivables. Second: a loan requires a specified return date, and MCA has no fixed term. Third: a lender bears no risk of the borrower's business failure, while an MCA provider, as a purchaser of receivables, theoretically bears that risk.</p>

<p>Each pillar is structurally hollow. On the first: MCA contracts almost universally contain covenants requiring merchants to maintain bank accounts, continue operating, avoid "material adverse changes," and not block ACH debits — covenants that, taken together, create an obligation to generate sufficient cash flow to service the advance or face immediate default. That is not contingent repayment. That is an absolute repayment obligation wrapped in contingency language. On the second: while no specific end date appears in most MCA contracts, the daily debit structure means the effective term is precisely calculable from day one. On the third: every MCA contract includes a personal guarantee, which means the provider has full recourse to the merchant's personal assets if the business fails. An investor bearing full recourse against the seller of an asset is not purchasing that asset. He is making a secured loan and calling it something else.</p>

<p>Courts have not always seen through this. For most of MCA's existence — the industry emerged in recognizable form around 2009 — state and federal courts accepted the industry's characterization of its own product. The "purchase fiction," as some courts have begun calling it, worked for the same reason it worked in 1900: judges read contracts, and the contracts said what they needed to say.</p>

<h2 id="courts-examine-mca">Courts Start Examining the Structure</h2>

<p>The legal landscape began shifting around 2020. In <em>LG Funding LLC v. United Senior Properties of Olathe, LLC</em> (N.Y. App. Div. 2019), a New York appellate court articulated a multi-factor test for determining whether an MCA is actually a loan: whether repayment is truly contingent on business performance; whether the provider has reconciliation rights that adjust payments to actual revenue; and whether the provider bears a genuine risk of loss if the business fails rather than simply the merchant's inability to generate receivables through deliberate action. The court found that when these factors point toward an absolute repayment obligation, the transaction is a loan subject to usury law regardless of how the contract describes it.</p>

<p>In <em>Fleetwood Services, LLC v. RAM Capital Funding LLC</em> (S.D.N.Y. 2022), a federal district court went further, examining whether the reconciliation clauses that MCA providers typically include in contracts — provisions theoretically allowing merchants to request lower daily payments if revenue drops — were genuine or illusory. The court found that when reconciliation requires the merchant to provide months of documentation, submit to weeks of review, and can be denied at the provider's sole discretion, the reconciliation right is a contractual fiction that does not convert a fixed repayment obligation into a contingent one. The transaction is a loan.</p>

<p>In <em>Lateral Recovery LLC v. Queen Funding LLC</em> (S.D.N.Y. 2022), the court examined a collection of MCA contracts and found that the combination of personal guarantees, UCC-1 blanket liens, default-on-revenue-decline clauses, and ACH authorization provisions created what was, in economic substance, a fully secured loan at usurious rates. The court did not mince language: the purchase characterization was a "formalistic label" that did not change the underlying legal reality.</p>

<p>The Fourth Circuit, in <em>Principis Capital LLC v. I Do, Inc.</em> (4th Cir. 2022), declined to reach the usury question but acknowledged that the "true nature" of an MCA depends on its specific terms and that courts should not simply defer to the industry's self-characterization. That standard — look at the terms, not the label — is the same standard that Arthur Ham argued for in 1909.</p>

<h2 id="the-ucc-contradiction">The UCC-1 Contradiction</h2>

<p>There is a structural contradiction embedded in every MCA transaction that the industry has never satisfactorily explained. On the day a merchant cash advance is funded, the MCA provider files a UCC-1 financing statement with the secretary of state. This filing places a public lien on all of the merchant's business assets — receivables, equipment, inventory, intellectual property, sometimes the business name itself.</p>

<p>The UCC-1 financing statement is a creature of Article 9 of the Uniform Commercial Code, which governs secured transactions. Article 9 exists to perfect a creditor's security interest in collateral that a debtor has pledged against an obligation. It is the legal mechanism by which a lender protects itself if the borrower fails to repay.</p>

<p>The MCA industry cannot have it both ways. If the MCA is truly a purchase of receivables — if there is no debt, no loan, no obligation to repay — then there is nothing to secure, no collateral to pledge, and no legal basis for a UCC-1 filing. The filing would be meaningless. The fact that every MCA provider files one anyway, and that courts have consistently treated these filings as valid perfected security interests, is an implicit acknowledgment that the underlying transaction is a secured debt. The purchase language is in the contract. The lien is in the public record. One of them is a lie.</p>

<p>This contradiction was present in salary lending as well. Historical salary lenders filed wage assignments with employers — the functional equivalent of a UCC-1 filing — while simultaneously insisting they were not lenders subject to usury law. The Russell Sage Foundation's researchers identified this contradiction in 1912. It remains unresolved in MCA contracts in 2026.</p>

<h2 id="states-respond">States Begin to Respond</h2>

<p>The legislative response to MCA has followed almost exactly the same arc as the legislative response to salary lending — with a one-hundred-year lag. The Uniform Small Loan Law of 1916 worked by requiring any entity making small loans, regardless of the label it applied to the transaction, to obtain a license and comply with rate caps. The law's drafters understood that without a substance-over-form rule, every predatory lender would simply rename its product.</p>

<p>California's SB 1235, signed into law in 2018 and implemented through regulations finalized in 2022, took a similar approach for commercial financing. It requires MCA providers operating in California to disclose an annualized cost of capital — not necessarily APR in the TILA sense, but a number that allows comparison — before a merchant signs. The California Department of Financial Protection and Innovation has authority to enforce these disclosures and has begun doing so.</p>

<p>New York's Commercial Finance Disclosure Law, which took effect in 2023, imposes similar requirements. MCA providers doing business in New York must disclose the total cost of financing, the disbursement amount, the total repayment amount, and an annualized rate. The New York Department of Financial Services has adopted implementing regulations under 23 N.Y.C.R.R. Part 600.</p>

<p>Utah enacted the Commercial Financing Registration and Disclosure Act in 2023. Virginia passed similar legislation in 2022. These statutes share a common feature: they do not cap rates, but they require disclosure of the rate. The theory — the same theory behind TILA in 1968 — is that markets function better when borrowers know what they are paying.</p>

<p>What they do not do, yet, is address the usury question directly. An MCA provider in New York can disclose a 350% annualized rate in full compliance with the Commercial Finance Disclosure Law and then charge that rate lawfully. Disclosure without a rate cap solves the information problem. It does not solve the exploitation problem.</p>

<p>New York's 2019 restriction on confessions of judgment against out-of-state borrowers was a more direct intervention. The confession of judgment — a clause by which a borrower pre-authorizes a court judgment against himself without trial — was the enforcement mechanism that made MCA's aggressive collection model possible. Without it, a lender who wanted to freeze a merchant's accounts had to file suit, serve process, and wait for a judgment. With it, the judgment could be obtained and the account frozen in 48 hours. New York's restriction removed this tool for transactions with out-of-state defendants, but it did not eliminate COJ clauses for New York-based merchants, and many contracts route jurisdiction through states that still permit them.</p>

<h2 id="what-this-means">What History Tells Borrowers Now</h2>

<p>The history documented here is not ancient. The salary lending crisis of 1900 destroyed working-class families in every industrial city in America for thirty years before legislatures acted. The resolution — mandatory licensing, rate disclosure, substance-over-form analysis — did not emerge from the industry's conscience. It emerged from documented harm, organized advocacy, and eventually legislative will. The harm had to be large enough and visible enough that ignoring it became politically untenable.</p>

<p>The MCA industry is at an earlier stage of that same arc. Courts are beginning to apply substance-over-form analysis. State legislatures are imposing disclosure requirements. A small number of state AG offices have opened investigations. The CFPB, which lacks clear jurisdiction because MCA targets businesses rather than consumers, has been watching without acting. Congress has not moved.</p>

<p>What has changed since 1900 is the speed at which harm accumulates. A salary lender could process dozens of transactions per week. An MCA operation can process thousands, nationwide, using automated underwriting and electronic ACH. The scale of capital extraction is correspondingly larger. Estimates of the MCA industry's annual volume run between $15 billion and $20 billion. That is not a marginal phenomenon. It is a significant channel through which capital flows from small business owners — who have no other financing options — to a small number of funders who have structured their products specifically to avoid the legal constraints that govern every other form of credit.</p>

<p>If a borrower with an active MCA recognizes the structure described here in their own contract — absolute repayment obligation, personal guarantee, UCC-1 lien, reconciliation clause that requires 90 days of documentation — they are holding a document that courts in New York, Maryland, and the Fourth Circuit have begun treating as a loan. That classification matters. It determines what defenses are available, what damages can be sought, and whether the rate being charged exceeds what state law permits.</p>

<p>The con is old. The contracts are new. The underlying question is the same one Arthur Ham asked in 1909: when a transaction looks like a loan, functions like a loan, and extracts interest like a loan, at what point does the law stop deferring to whatever the lender decided to name it?</p>

<hr />

<p><em>Case citations: LG Funding LLC v. United Senior Properties of Olathe, LLC, 173 A.D.3d 1018 (N.Y. App. Div. 2019). Fleetwood Services, LLC v. RAM Capital Funding LLC, 2022 WL 1997207 (S.D.N.Y. 2022). Lateral Recovery LLC v. Queen Funding LLC, 2022 WL 4080645 (S.D.N.Y. 2022). Principis Capital LLC v. I Do, Inc., 2022 WL 972284 (4th Cir. 2022). Regulatory citations: Cal. Financial Code §§ 22800–22805 (SB 1235, 2018). 23 N.Y.C.R.R. Part 600 (NY CFDL implementing regulations, 2023). N.Y. CPLR § 3218(b) (COJ restriction, 2019). Historical sources: Arthur H. Ham, "Remedial Loans: A Constructive Program" (Russell Sage Foundation, 1909). Uniform Small Loan Law, drafted by the American Association of Personal Finance Companies and the Russell Sage Foundation (1916).</em></p>`,
};
