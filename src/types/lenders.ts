/** Minimal types for ops.fundingwatch.org/api/lenders responses (via our proxy) */

export interface LenderListItem {
  slug: string;
  name: string;
  rating?: string;
  fw_rating?: string;
  risk_score?: number;
  severity_score?: number;
  headline_stat?: string;
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
