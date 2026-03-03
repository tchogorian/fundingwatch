import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Placeholder: real integration will process the file with Claude API
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 100));

    const mockAnalysis = {
      lender_name: "Sample MCA Lender LLC",
      advance_amount: 50000,
      repayment_amount: 72500,
      factor_rate: 1.45,
      payment_amount: 1450,
      payment_frequency: "daily",
      estimated_term_days: 50,
      effective_apr: 127.4,
      has_personal_guarantee: true,
      has_reconciliation_clause: true,
      has_confession_of_judgment: true,
      has_ucc_filing: true,
      red_flags: [
        {
          severity: "critical" as const,
          title: "Confession of judgment",
          description:
            "Your contract may allow the lender to obtain a judgment against you without notice or a court hearing, which can lead to immediate seizure of assets.",
        },
        {
          severity: "warning" as const,
          title: "Personal guarantee",
          description:
            "You are personally liable for repayment. If your business cannot pay, your personal assets may be at risk.",
        },
        {
          severity: "info" as const,
          title: "Reconciliation clause",
          description:
            "If your daily revenue drops, your payment amount may stay the same while the term extends, increasing total cost.",
        },
      ],
      summary:
        "This advance has an effective APR over 100%. Key concerns include confession of judgment, personal guarantee, and a reconciliation clause that may extend the term.",
      confidence: "high" as const,
    };

    return NextResponse.json(mockAnalysis);
  } catch (e) {
    console.error("/api/analyze error:", e);
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
