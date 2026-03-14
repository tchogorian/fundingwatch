import { NextRequest, NextResponse } from "next/server";

const BLUE_API_URL = "https://ops.fundingwatch.org";
const CONSENT_VERSION = "v1-broker-2026";

export interface BrokerLeadPayload {
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  monthly_revenue: string;
  current_advance_balance?: string;
  looking_for: "refinance" | "new_capital" | "consolidation" | "just_comparing";
  consent: boolean;
  /** From results page: analysis context */
  lender_name?: string | null;
  risk_score?: number | null;
  effective_apr?: number | null;
  red_flag_count?: number | null;
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as BrokerLeadPayload;
    const {
      business_name,
      contact_name,
      email,
      phone,
      monthly_revenue,
      current_advance_balance,
      looking_for,
      consent,
      lender_name,
      risk_score,
      effective_apr,
      red_flag_count,
      source = "results",
    } = body;

    if (!consent) {
      return NextResponse.json({ error: "Consent required" }, { status: 400 });
    }

    if (!business_name?.trim() || !contact_name?.trim() || !email?.trim() || !phone?.trim() || !monthly_revenue || !looking_for) {
      return NextResponse.json(
        { error: "Required fields: business_name, contact_name, email, phone, monthly_revenue, looking_for" },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? null;
    const userAgent = request.headers.get("user-agent") ?? null;
    const timestamp = new Date().toISOString();

    const record = {
      business_name: business_name.trim(),
      contact_name: contact_name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      monthly_revenue,
      current_advance_balance: current_advance_balance?.trim() || null,
      looking_for,
      consent: true,
      consent_version: CONSENT_VERSION,
      ip,
      user_agent: userAgent,
      submitted_at: timestamp,
      lender_name: lender_name ?? null,
      risk_score: risk_score ?? null,
      effective_apr: effective_apr ?? null,
      red_flag_count: red_flag_count ?? null,
      source,
    };

    try {
      const blueResponse = await fetch(`${BLUE_API_URL}/portal/broker-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!blueResponse.ok) {
        console.error("Ops API broker-leads error:", blueResponse.status, await blueResponse.text());
      }
    } catch (opsErr) {
      console.error("Ops API broker-leads unreachable:", opsErr);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("/api/broker-leads error:", e);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}
