import { NextRequest, NextResponse } from "next/server";

const OPS_API = "https://ops.fundingwatch.org/api/lenders";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const res = await fetch(`${OPS_API}/${params.slug}`, { next: { revalidate: 300 } });
  if (res.status === 404) return NextResponse.json({ error: "Lender not found" }, { status: 404 });
  const data = await res.json();
  return NextResponse.json(data);
}
