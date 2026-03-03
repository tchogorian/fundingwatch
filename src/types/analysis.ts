export type RedFlagSeverity = "critical" | "warning" | "info";

export interface RedFlag {
  severity: RedFlagSeverity;
  title: string;
  description: string;
}

export interface AnalysisResult {
  lender_name: string;
  advance_amount: number;
  repayment_amount: number;
  factor_rate: number;
  payment_amount: number;
  payment_frequency: string;
  estimated_term_days: number;
  effective_apr: number;
  has_personal_guarantee: boolean;
  has_reconciliation_clause: boolean;
  has_confession_of_judgment: boolean;
  has_ucc_filing: boolean;
  red_flags: RedFlag[];
  summary: string;
  confidence: "high" | "medium" | "low";
}
