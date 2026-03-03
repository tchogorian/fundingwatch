import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      business_name,
      state,
      consent_timestamp,
      analysis_data,
    } = body;

    // Placeholder: log for now; wire up email sending later
    console.log("Opt-in submission:", {
      name,
      email,
      phone,
      business_name,
      state,
      consent_timestamp,
      analysis_data,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("/api/opt-in error:", e);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}
