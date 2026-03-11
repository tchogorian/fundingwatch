/**
 * Lender severity data for questionnaire scoring (Pipeline A).
 * Replace with API call to ops.fundingwatch.org when available.
 */

export interface LenderRecord {
  id: number;
  name: string;
  /** 0-100 severity scale */
  severity_score: number;
  /** e.g. "24 court filings" */
  headline_stat: string;
  /** Primary issue for messaging */
  primary_violation: string;
  /** Lawsuit count for copy */
  lawsuit_count: number;
}

/** Normalize for matching: lowercase, trim, collapse spaces */
export function normalizeLenderName(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/g, "")
    .trim();
}

/** Known lenders — match user input against these */
export const LENDERS: LenderRecord[] = [
  {
    id: 1,
    name: "Yellowstone Capital",
    severity_score: 95,
    headline_stat: "subject to a $534M New York AG settlement",
    primary_violation: "misrepresentation of cost, systematic refusal of reconciliation, and use of confession of judgment against out-of-state borrowers",
    lawsuit_count: 50,
  },
  {
    id: 2,
    name: "Lendora",
    severity_score: 100,
    headline_stat: "18 active lawsuits from borrowers",
    primary_violation: "deceptive practices, contract manipulation, confession of judgment, and reconciliation clauses that allow retroactive payment changes",
    lawsuit_count: 18,
  },
  {
    id: 3,
    name: "Coastal Capital",
    severity_score: 100,
    headline_stat: "30 active lawsuits",
    primary_violation: "confession of judgment and personal guarantees that strip borrowers of fundamental legal protections",
    lawsuit_count: 30,
  },
  {
    id: 4,
    name: "Regal Capital",
    severity_score: 100,
    headline_stat: "24 court filings involving merchant cash advance agreements",
    primary_violation: "aggressive contract structures with multiple clauses designed to trap borrowers in payment cycles",
    lawsuit_count: 24,
  },
  {
    id: 5,
    name: "Pearl Capital",
    severity_score: 85,
    headline_stat: "multiple court filings",
    primary_violation: "confession of judgment and aggressive collection practices",
    lawsuit_count: 12,
  },
];

/**
 * Match user-entered lender names (e.g. "Yellowstone, Pearl") to LENDERS.
 * Returns matched records (by normalized name containing or being contained).
 */
export function matchLenderNames(userInput: string): LenderRecord[] {
  const normalized = normalizeLenderName(userInput);
  if (!normalized) return [];
  const parts = normalized.split(/\s*[,;]\s*|\s+and\s+/).filter(Boolean);
  const seen = new Set<number>();
  const out: LenderRecord[] = [];
  for (const part of parts) {
    const p = part.trim();
    if (p.length < 2) continue;
    for (const lender of LENDERS) {
      const ln = normalizeLenderName(lender.name);
      if (seen.has(lender.id)) continue;
      if (ln.includes(p) || p.includes(ln) || ln.split(" ").some((w) => w.startsWith(p) || p.startsWith(w))) {
        seen.add(lender.id);
        out.push(lender);
      }
    }
  }
  return out;
}
