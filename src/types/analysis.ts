export interface RedFlag {
  severity: "high" | "medium" | "low";
  flag: string;
  description: string;
}

export interface KeyTerm {
  term: string;
  value: string;
}

export interface ClauseInfo {
  present: boolean;
  explanation: string | null;
}

export interface AnalysisResult {
  summary: string;
  funded_amount: number | null;
  payback_amount: number | null;
  factor_rate: number | null;
  effective_apr: number | null;
  daily_payment: number | null;
  weekly_payment: number | null;
  estimated_term_months: number | null;
  lender_name: string | null;
  business_name: string | null;
  signing_date: string | null;
  red_flags: RedFlag[];
  key_terms: KeyTerm[];
  confession_of_judgment: ClauseInfo;
  personal_guarantee: ClauseInfo;
  reconciliation_clause: ClauseInfo;
  stacking_prohibition: ClauseInfo;
  overall_risk_score: number;
  overall_risk_label: "Low Risk" | "Moderate Risk" | "High Risk" | "Very High Risk";
  recommended_actions: string[];
}

export interface OptInData {
  session_id?: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  consent: boolean;
}
