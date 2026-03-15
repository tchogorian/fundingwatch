import { NextRequest, NextResponse } from "next/server";

const OPS_API = "https://ops.fundingwatch.org/api/lenders";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = new URLSearchParams();
  if (searchParams.get("rating")) params.set("rating", searchParams.get("rating")!);
  if (searchParams.get("type"))   params.set("type",   searchParams.get("type")!);

  const url = params.toString() ? `${OPS_API}?${params}` : OPS_API;
  const res = await fetch(url, { next: { revalidate: 300 } });
  const data = await res.json();
  return NextResponse.json(data);
}
