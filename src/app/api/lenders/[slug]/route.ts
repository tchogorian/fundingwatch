import { NextRequest, NextResponse } from "next/server";

const OPS_API = "https://ops.fundingwatch.org";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }
    const url = `${OPS_API}/api/lenders/${encodeURIComponent(slug)}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: "Lender not found" }, { status: 404 });
      }
      const text = await res.text();
      console.error("Ops lender detail API error:", res.status, text);
      return NextResponse.json(
        { error: "Failed to load lender" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("/api/lenders/[slug] error:", e);
    return NextResponse.json(
      { error: "Failed to load lender" },
      { status: 500 }
    );
  }
}
