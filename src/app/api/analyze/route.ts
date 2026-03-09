import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `You are a financial contract analyst specializing in Merchant Cash Advance (MCA) agreements.
Your job is to extract and explain key terms from MCA contracts in plain English for small business owners.
Be accurate, thorough, and explain things in a way that a non-lawyer business owner can understand.
Always respond with valid JSON matching the requested schema.`;

const ANALYSIS_PROMPT = `Analyze this Merchant Cash Advance (MCA) contract and extract the following information.
Return ONLY valid JSON with this exact structure:

{
  "summary": "2-3 sentence plain English summary of what this contract is",
  "funded_amount": number or null,
  "payback_amount": number or null,
  "factor_rate": number or null,
  "effective_apr": number or null,
  "daily_payment": number or null,
  "weekly_payment": number or null,
  "estimated_term_months": number or null,
  "lender_name": "string or null",
  "business_name": "string or null",
  "signing_date": "YYYY-MM-DD or null",
  "red_flags": [
    {
      "severity": "high|medium|low",
      "flag": "short name",
      "description": "plain English explanation"
    }
  ],
  "key_terms": [
    {
      "term": "term name",
      "value": "value or explanation"
    }
  ],
  "confession_of_judgment": {
    "present": true|false,
    "explanation": "plain English explanation if present, null if not"
  },
  "personal_guarantee": {
    "present": true|false,
    "explanation": "plain English explanation if present, null if not"
  },
  "reconciliation_clause": {
    "present": true|false,
    "explanation": "plain English explanation if present, null if not"
  },
  "stacking_prohibition": {
    "present": true|false,
    "explanation": "plain English explanation if present, null if not"
  },
  "overall_risk_score": number between 1-10,
  "overall_risk_label": "Low Risk|Moderate Risk|High Risk|Very High Risk",
  "recommended_actions": ["action 1", "action 2"]
}

Red flag examples to look for:
- Confession of Judgment (COJ) clause — allows lender to collect without notice
- No reconciliation clause — can't adjust payments if revenue drops
- Personal guarantee with unlimited liability
- Prepayment penalty or no prepayment discount
- Broad default triggers (missing a payment, taking another advance, etc.)
- Arbitration clause that waives class action rights
- High effective APR (>100% annualized)
- Factor rate >1.5 (50%+ cost of capital)
- Daily ACH debits with no flexibility

If you can calculate effective APR: APR = (payback_amount - funded_amount) / funded_amount / term_days * 365 * 100
If the contract states daily payment but no end date, estimate term_days = (payback_amount - funded_amount) / daily_payment, then calculate APR from that.`;

export async function POST(request: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Analysis service not configured" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Please upload a PDF or image of your contract.",
        },
        { status: 400 }
      );
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 20MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    let fileContent: Record<string, unknown>;
    if (file.type === "application/pdf") {
      fileContent = {
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: base64,
        },
      };
    } else {
      fileContent = {
        type: "image",
        source: {
          type: "base64",
          media_type: file.type,
          data: base64,
        },
      };
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-6",
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              fileContent,
              {
                type: "text",
                text: ANALYSIS_PROMPT,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Claude API error:", response.status, errText);
      return NextResponse.json(
        { error: "Analysis failed. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();

    const textContent = data.content?.find(
      (c: { type: string }) => c.type === "text"
    );
    if (!textContent?.text) {
      return NextResponse.json(
        { error: "No analysis returned" },
        { status: 500 }
      );
    }

    const cleaned = textContent.text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    const analysis = JSON.parse(cleaned);

    return NextResponse.json(analysis);
  } catch (e: unknown) {
    console.error("/api/analyze error:", e);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
