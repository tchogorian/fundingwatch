import { NextRequest, NextResponse } from "next/server";

const BLUE_API_URL = "https://ops.fundingwatch.org";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { session_id, name, email, phone, business, consent } = body;

    if (!consent) {
      return NextResponse.json(
        { error: "Consent required" },
        { status: 400 }
      );
    }

    if (!name || !email || !phone || !business) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    try {
      const blueResponse = await fetch(`${BLUE_API_URL}/portal/optin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: session_id || null,
          name,
          email,
          phone,
          business,
          consent: true,
        }),
      });

      if (!blueResponse.ok) {
        console.error("Ops API opt-in error:", blueResponse.status);
      }
    } catch (opsErr) {
      console.error("Ops API unreachable:", opsErr);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("/api/opt-in error:", e);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}
