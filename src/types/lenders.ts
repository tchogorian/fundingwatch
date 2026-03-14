/** Types for ops.fundingwatch.org/api/lenders responses (via our proxy) */

export type FWRating = "certified" | "caution" | "warning" | "avoid" | string;

export interface LenderListItem {
  slug: string;
  name: string;
  rating?: string;
  fw_rating?: FWRating;
  risk_score?: number | null;
  fw_risk_score?: number | null;
  severity_score?: number | null;
  headline_stat?: string;
  headquarters?: string | null;
  lender_type?: string | null;
  complaint_count?: number | null;
  ucc_filing_count?: number | null;
  red_flags?: string[];
  [key: string]: unknown;
}

export interface LendersResponse {
  lenders?: LenderListItem[];
  data?: LenderListItem[];
}

export interface LenderDetail extends LenderListItem {
  description?: string;
  top_red_flags?: string[];
  primary_violation?: string;
  lawsuit_count?: number;
  [key: string]: unknown;
}
