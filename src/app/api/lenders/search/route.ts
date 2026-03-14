import { NextRequest, NextResponse } from "next/server";

const OPS_API = "https://ops.fundingwatch.org";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") ?? "";
    const url = `${OPS_API}/api/lenders/search?q=${encodeURIComponent(q)}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Ops lenders search API error:", res.status, text);
      return NextResponse.json(
        { error: "Search failed" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("/api/lenders/search error:", e);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
