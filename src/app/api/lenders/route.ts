import { NextRequest, NextResponse } from "next/server";

const OPS_API = "https://ops.fundingwatch.org/api/lenders";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = new URLSearchParams();
    if (searchParams.get("rating")) params.set("rating", searchParams.get("rating")!);
    if (searchParams.get("type"))   params.set("type",   searchParams.get("type")!);

    const url = params.toString() ? `${OPS_API}?${params}` : OPS_API;
    const res = await fetch(url, { 
      next: { revalidate: 300 },
      headers: {
        "Accept": "application/json",
      },
    });
    
    if (!res.ok) {
      console.error(`Lenders API error: ${res.status} ${res.statusText}`);
      return NextResponse.json({ error: "Failed to fetch lenders" }, { status: res.status });
    }
    
    const data = await res.json();
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return NextResponse.json(data);
    }
    if (data.lenders && Array.isArray(data.lenders)) {
      return NextResponse.json(data.lenders);
    }
    if (data.data && Array.isArray(data.data)) {
      return NextResponse.json(data.data);
    }
    
    return NextResponse.json([]);
  } catch (error) {
    console.error("Lenders API fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch lenders" }, { status: 500 });
  }
}
