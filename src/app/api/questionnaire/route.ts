import { NextRequest, NextResponse } from "next/server";
import { matchLenderNames } from "@/lib/lenders";
import { computeQuestionnaireScore } from "@/lib/questionnaire-scoring";
import { buildAssessment } from "@/lib/questionnaire-assessment";

const BLUE_API_URL = process.env.OPS_API_URL || "https://ops.fundingwatch.org";

export interface QuestionnaireRequestBody {
  name: string;
  businessName: string;
  businessDescription: string;
  state: string;
  phone: string;
  email: string;
  lenderNames: string;
  lenderCount: number;
  totalPayment: number;
  paymentFrequency: "daily" | "weekly";
  totalOwedRange: string;
  paymentStatus: string;
  consideringAnotherMca?: string | null;
  cardPaymentPercentage?: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuestionnaireRequestBody;
    const {
      name,
      businessName,
      businessDescription,
      state,
      phone,
      email,
      lenderNames,
      lenderCount,
      totalPayment,
      paymentFrequency,
      totalOwedRange,
      paymentStatus,
      consideringAnotherMca,
      cardPaymentPercentage,
    } = body;

    if (!name?.trim() || !businessName?.trim() || !state || !phone?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Missing required contact fields" }, { status: 400 });
    }
    if (!lenderNames?.trim() || lenderCount == null || totalPayment == null || !totalOwedRange || !paymentStatus) {
      return NextResponse.json({ error: "Missing required MCA situation fields" }, { status: 400 });
    }

    const matchedLenders = matchLenderNames(lenderNames);
    const maxSeverity = matchedLenders.length > 0
      ? Math.max(...matchedLenders.map((l) => l.severity_score))
      : 0;

    const { score, riskLevel } = computeQuestionnaireScore({
      maxLenderSeverity: maxSeverity,
      lenderCount: typeof lenderCount === "number" ? lenderCount : 5,
      state,
      paymentStatus: paymentStatus as "current" | "behind" | "missed" | "legal_threat",
      totalOwedRange: totalOwedRange as "10k-25k" | "25k-50k" | "50k-100k" | "100k-250k" | "250k+",
    });

    const assessment = buildAssessment({
      name,
      state,
      matchedLenders,
      lenderCount: typeof lenderCount === "number" ? lenderCount : 5,
      totalPayment: Number(totalPayment) || 0,
      paymentFrequency: paymentFrequency || "daily",
      riskLevel,
    });

    const sessionId = crypto.randomUUID?.() ?? `q-${Date.now()}`;

    // Optional: persist to ops (questionnaire_sessions). When ops implements POST /portal/questionnaire-sessions, wire here.
    try {
      await fetch(`${BLUE_API_URL}/portal/questionnaire-sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          contact_name: name.trim(),
          business_name: businessName.trim(),
          business_description: businessDescription?.trim() || null,
          state,
          phone: phone.trim(),
          email: email.trim(),
          lender_names: lenderNames.trim().split(/\s*[,;]\s*|\s+and\s+/).filter(Boolean),
          matched_lender_ids: matchedLenders.map((l) => l.id),
          lender_count: typeof lenderCount === "number" ? lenderCount : 5,
          total_daily_weekly_payment: totalPayment,
          payment_frequency: paymentFrequency,
          total_owed_range: totalOwedRange,
          payment_status: paymentStatus,
          considering_another_mca: consideringAnotherMca || null,
          card_payment_percentage: cardPaymentPercentage || null,
          questionnaire_score: score,
          risk_level: riskLevel,
          source: "questionnaire",
        }),
      });
    } catch {
      // Ops may not have this endpoint yet; continue without failing
    }

    return NextResponse.json({
      sessionId,
      assessment,
      contact: {
        name: name.trim(),
        businessName: businessName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        state,
      },
    });
  } catch (e) {
    console.error("/api/questionnaire error:", e);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}
