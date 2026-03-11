import type { LenderRecord } from "./lenders";
import type { RiskLevel } from "./questionnaire-scoring";

export interface QuestionnaireAssessment {
  riskLevel: RiskLevel;
  firstName: string;
  /** Lender-specific block (if any matched) */
  lenderSection: string | null;
  /** Stacking block (if 2+ lenders) */
  stackingSection: string | null;
  /** State-specific line (if tier 1 or 2) */
  stateSection: string | null;
  /** Payment stress line */
  paymentStressSection: string;
  /** Matched lender for CTA/email */
  primaryLenderName: string | null;
}

const STATE_PROTECTION: Record<string, string> = {
  "New York": "strong MCA oversight and usury limits that can affect how agreements are enforced",
  California: "commercial financing disclosure laws and regulatory enforcement that apply to MCA providers",
  Florida: "consumer protection and court procedures that can affect collection actions",
  Illinois: "increasing court scrutiny of MCA structures and recharacterization arguments",
  Texas: "disclosure requirements and regulatory attention to commercial financing",
  Virginia: "commercial financing disclosure and regulatory oversight",
  Connecticut: "consumer and commercial lending oversight",
  Maryland: "state financial regulations that can apply to MCA activity",
  "New Jersey": "strong consumer protection and court treatment of confessions of judgment",
  Massachusetts: "consumer protection and lending regulations",
  Washington: "commercial financing disclosure requirements",
  "North Dakota": "state lending and collection laws",
};

export function buildAssessment(params: {
  name: string;
  state: string;
  matchedLenders: LenderRecord[];
  lenderCount: number;
  totalPayment: number;
  paymentFrequency: "daily" | "weekly";
  riskLevel: RiskLevel;
}): QuestionnaireAssessment {
  const firstName = params.name.trim().split(" ")[0] || "there";
  const monthlyEquivalent =
    params.paymentFrequency === "daily"
      ? `$${Math.round(params.totalPayment * 30).toLocaleString()}`
      : `$${Math.round(params.totalPayment * 4.33).toLocaleString()}`;

  let lenderSection: string | null = null;
  let primaryLenderName: string | null = null;
  if (params.matchedLenders.length > 0) {
    const lender = params.matchedLenders[0];
    primaryLenderName = lender.name;
    const filingWord = lender.lawsuit_count === 1 ? "court filing" : "court filings";
    lenderSection = `${lender.name} has appeared in ${lender.lawsuit_count} ${filingWord} involving merchant cash advance agreements. Common issues reported include ${lender.primary_violation}.`;
  }

  let stackingSection: string | null = null;
  if (params.lenderCount >= 2) {
    stackingSection = `Having ${params.lenderCount} active MCAs at the same time significantly increases your risk. When multiple lenders are pulling ${params.paymentFrequency} payments from the same account, it creates a compounding cash flow problem that gets worse, not better.`;
  }

  let stateSection: string | null = null;
  const stateProtection = STATE_PROTECTION[params.state];
  if (stateProtection) {
    stateSection = `${params.state} has ${stateProtection}. A licensed professional can determine if your agreements comply with state requirements.`;
  }

  const freqLabel = params.paymentFrequency === "daily" ? "day" : "week";
  const paymentStressSection = `At $${params.totalPayment.toLocaleString()} per ${freqLabel}, you're paying roughly ${monthlyEquivalent}/month in MCA obligations alone.`;

  return {
    riskLevel: params.riskLevel,
    firstName,
    lenderSection,
    stackingSection,
    stateSection,
    paymentStressSection,
    primaryLenderName,
  };
}

/** Generic message when no lender matched */
export const NO_LENDER_MATCH_MESSAGE =
  "We don't have court filing data for this lender yet, but the other factors in your situation suggest a review would be worthwhile.";
