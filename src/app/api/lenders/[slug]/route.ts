import { NextRequest, NextResponse } from "next/server";

const OPS_API = "https://ops.fundingwatch.org/api/lenders";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const res = await fetch(`${OPS_API}/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) {
      return NextResponse.json({ error: "Lender not found" }, { status: 404 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch lender" }, { status: 500 });
  }
}
