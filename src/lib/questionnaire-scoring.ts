/**
 * Questionnaire risk scoring (Path B).
 * Uses lender severity, stacking, state tier, payment status, and total owed.
 */

export const STATE_TIER_1 = ["New York", "California", "Florida", "Illinois", "Texas"];
export const STATE_TIER_2 = ["Virginia", "Connecticut", "Maryland", "New Jersey", "Massachusetts", "Washington", "North Dakota"];

export type PaymentStatus = "current" | "behind" | "missed" | "legal_threat";
export type TotalOwedRange = "10k-25k" | "25k-50k" | "50k-100k" | "100k-250k" | "250k+";
export type RiskLevel = "low" | "moderate" | "high" | "critical";

export interface QuestionnaireScoreInput {
  maxLenderSeverity: number; // 0-100
  lenderCount: number;
  state: string;
  paymentStatus: PaymentStatus;
  totalOwedRange: TotalOwedRange;
}

export function computeQuestionnaireScore(input: QuestionnaireScoreInput): { score: number; riskLevel: RiskLevel } {
  let score = 0;

  // Lender severity (max 40)
  score += (input.maxLenderSeverity / 100) * 40;

  // Stacking (max 20)
  if (input.lenderCount >= 4) score += 20;
  else if (input.lenderCount === 3) score += 15;
  else if (input.lenderCount === 2) score += 10;
  else if (input.lenderCount === 1) score += 5;

  // State tier (max 10)
  if (STATE_TIER_1.includes(input.state)) score += 10;
  else if (STATE_TIER_2.includes(input.state)) score += 5;

  // Payment status (max 15)
  switch (input.paymentStatus) {
    case "current":
      score += 5;
      break;
    case "behind":
      score += 10;
      break;
    case "missed":
      score += 12;
      break;
    case "legal_threat":
      score += 15;
      break;
    default:
      score += 5;
  }

  // Case value / total owed (max 15)
  switch (input.totalOwedRange) {
    case "250k+":
      score += 15;
      break;
    case "100k-250k":
      score += 12;
      break;
    case "50k-100k":
      score += 10;
      break;
    case "25k-50k":
      score += 7;
      break;
    case "10k-25k":
    default:
      score += 3;
      break;
  }

  const rounded = Math.round(Math.min(100, Math.max(0, score)));
  let riskLevel: RiskLevel = "low";
  if (rounded >= 76) riskLevel = "critical";
  else if (rounded >= 56) riskLevel = "high";
  else if (rounded >= 31) riskLevel = "moderate";

  return { score: rounded, riskLevel };
}
