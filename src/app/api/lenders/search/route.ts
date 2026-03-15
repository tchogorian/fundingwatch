import { NextRequest, NextResponse } from "next/server";

const OPS_API = "https://ops.fundingwatch.org/api/lenders/search";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || "";
  if (!q.trim()) return NextResponse.json({ error: "q param required" }, { status: 400 });
  const res = await fetch(`${OPS_API}?q=${encodeURIComponent(q)}`, { next: { revalidate: 60 } });
  const data = await res.json();
  return NextResponse.json(data);
}
