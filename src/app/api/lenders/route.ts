import { NextRequest, NextResponse } from "next/server";

const OPS_API = "https://ops.fundingwatch.org/api/lenders";

export const dynamic = "force-dynamic";

/** Fallback when ops API is unreachable; keeps LRI page useful. Data from public filings and contract reviews. */
const FALLBACK_LENDERS = [
  { id: 1, name: "Kapitus", slug: "kapitus", fw_risk_score: 100, fw_rating: "avoid", lawsuit_count_verified: 39, complaint_count: 0 },
  { id: 2, name: "Coastal Capital", slug: "coastal-capital", fw_risk_score: 100, fw_rating: "avoid", lawsuit_count_verified: 30, complaint_count: 0 },
  { id: 3, name: "Lendora", slug: "lendora", fw_risk_score: 100, fw_rating: "avoid", lawsuit_count_verified: 18, complaint_count: 0 },
  { id: 4, name: "Regal Capital", slug: "regal-capital", fw_risk_score: 100, fw_rating: "avoid", lawsuit_count_verified: 24, complaint_count: 0 },
];

function extractLenders(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "lenders" in data && Array.isArray((data as { lenders: unknown[] }).lenders)) {
    return (data as { lenders: unknown[] }).lenders;
  }
  if (data && typeof data === "object" && "data" in data && Array.isArray((data as { data: unknown[] }).data)) {
    return (data as { data: unknown[] }).data;
  }
  return [];
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params = new URLSearchParams();
    if (searchParams.get("rating")) params.set("rating", searchParams.get("rating")!);
    if (searchParams.get("type")) params.set("type", searchParams.get("type")!);

    const url = params.toString() ? `${OPS_API}?${params}` : OPS_API;
    const res = await fetch(url, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.warn(`Lenders API ${res.status}; using fallback.`);
      return NextResponse.json(FALLBACK_LENDERS, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
      });
    }

    const data = await res.json();
    const list = extractLenders(data);

    if (list.length > 0) {
      return NextResponse.json(list, {
        headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
      });
    }

    return NextResponse.json(FALLBACK_LENDERS, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.warn("Lenders API fetch error, using fallback:", error);
    return NextResponse.json(FALLBACK_LENDERS, {
      status: 200,
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  }
}
