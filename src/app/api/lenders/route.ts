import { NextRequest, NextResponse } from "next/server";

const OPS_API = "https://ops.fundingwatch.org";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rating = searchParams.get("rating");
    const type = searchParams.get("type");
    const params = new URLSearchParams();
    if (rating) params.set("rating", rating);
    if (type) params.set("type", type);
    const qs = params.toString();
    const url = `${OPS_API}/api/lenders${qs ? `?${qs}` : ""}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Ops lenders API error:", res.status, text);
      return NextResponse.json(
        { error: "Failed to load lenders" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("/api/lenders error:", e);
    return NextResponse.json(
      { error: "Failed to load lenders" },
      { status: 500 }
    );
  }
}
