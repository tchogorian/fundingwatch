import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const BLUE_API_URL = "https://ops.fundingwatch.org";
const resend = new Resend(process.env.RESEND_API_KEY);

function buildConfirmationEmail(data: {
  name: string;
  lender_name: string | null;
  risk_score: number | null;
  risk_label: string | null;
  effective_apr: number | null;
  red_flag_count: number | null;
  high_flag_count: number | null;
  has_coj: boolean | null;
  has_personal_guarantee: boolean | null;
}): string {
  const firstName = data.name.split(" ")[0] || "there";
  const lender = data.lender_name || "your MCA lender";
  const apr = data.effective_apr != null ? `${data.effective_apr.toFixed(1)}%` : null;
  const flagCount = data.high_flag_count ?? data.red_flag_count ?? 0;

  const findings: string[] = [];
  if (apr) findings.push(`An effective APR of <strong style="color:#c62828;">${apr}</strong>`);
  if (data.has_coj) findings.push(`A <strong>confession of judgment clause</strong> that lets the lender seize assets without notice`);
  if (data.has_personal_guarantee) findings.push(`A <strong>personal guarantee</strong> putting your personal assets at risk`);
  if (flagCount > 0 && findings.length < 3) findings.push(`<strong>${flagCount} serious red flag${flagCount !== 1 ? "s" : ""}</strong> that need professional attention`);

  const findingsHtml = findings
    .map(
      (f) =>
        `<tr><td style="padding:8px 0 8px 0;vertical-align:top;">
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:10px;vertical-align:top;color:#c62828;font-size:16px;line-height:20px;">&#9632;</td>
        <td style="font-size:14px;color:#374151;line-height:20px;">${f}</td>
      </tr></table>
    </td></tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f7f9fc;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f9fc;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background-color:#1a1a2e;padding:28px 40px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="padding-right:12px;vertical-align:middle;">
                <div style="width:32px;height:32px;background-color:#2e75b6;border-radius:8px;text-align:center;line-height:32px;">
                  <span style="font-size:18px;color:#ffffff;">&#x1F6E1;</span>
                </div>
              </td>
              <td style="vertical-align:middle;">
                <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">
                  <span style="color:#2e75b6;">Funding</span>Watch
                </span>
              </td>
            </tr></table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 16px 0;font-size:22px;font-weight:700;color:#1a1a2e;">
              ${firstName}, we've reviewed your ${lender} contract.
            </h1>
            <p style="margin:0 0 24px 0;font-size:15px;color:#374151;line-height:1.6;">
              Our team has completed an initial review of your merchant cash advance agreement${data.lender_name ? ` with <strong>${data.lender_name}</strong>` : ""}. Here's what we found:
            </p>

            ${data.risk_score != null ? `
            <!-- Risk Score -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="padding:20px;background-color:${data.risk_score >= 7 ? "#fef2f2" : data.risk_score >= 5 ? "#fff7ed" : "#f0fdf4"};border-radius:10px;border-left:4px solid ${data.risk_score >= 7 ? "#c62828" : data.risk_score >= 5 ? "#e65100" : "#2e7d32"};">
                  <p style="margin:0 0 4px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:${data.risk_score >= 7 ? "#c62828" : data.risk_score >= 5 ? "#e65100" : "#2e7d32"};">
                    Risk Assessment: ${data.risk_label || "Elevated"}
                  </p>
                  <p style="margin:0;font-size:28px;font-weight:800;color:${data.risk_score >= 7 ? "#c62828" : data.risk_score >= 5 ? "#e65100" : "#2e7d32"};">
                    ${data.risk_score}/10
                  </p>
                </td>
              </tr>
            </table>
            ` : ""}

            ${findings.length > 0 ? `
            <!-- Findings -->
            <p style="margin:0 0 12px 0;font-size:14px;font-weight:600;color:#1a1a2e;">
              Key concerns identified:
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              ${findingsHtml}
            </table>
            ` : ""}

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="border-top:1px solid #e5e7eb;"></td></tr>
            </table>

            <!-- Next Steps -->
            <h2 style="margin:0 0 16px 0;font-size:16px;font-weight:700;color:#1a1a2e;">
              What happens next
            </h2>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="padding:12px 16px;background-color:#f0f7ff;border-radius:8px;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="padding-right:14px;vertical-align:top;">
                      <div style="width:28px;height:28px;background-color:#2e75b6;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:13px;font-weight:700;">1</div>
                    </td>
                    <td style="vertical-align:top;">
                      <p style="margin:0;font-size:14px;font-weight:600;color:#1a1a2e;">Case assigned</p>
                      <p style="margin:4px 0 0 0;font-size:13px;color:#6b7280;">Your contract has been flagged for professional review and assigned to a licensed attorney.</p>
                    </td>
                  </tr></table>
                </td>
              </tr>
              <tr><td style="height:8px;"></td></tr>
              <tr>
                <td style="padding:12px 16px;background-color:#f0f7ff;border-radius:8px;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="padding-right:14px;vertical-align:top;">
                      <div style="width:28px;height:28px;background-color:#2e75b6;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:13px;font-weight:700;">2</div>
                    </td>
                    <td style="vertical-align:top;">
                      <p style="margin:0;font-size:14px;font-weight:600;color:#1a1a2e;">You'll hear from us</p>
                      <p style="margin:4px 0 0 0;font-size:13px;color:#6b7280;">Expect a call or email within 1–2 business days to discuss your options.</p>
                    </td>
                  </tr></table>
                </td>
              </tr>
              <tr><td style="height:8px;"></td></tr>
              <tr>
                <td style="padding:12px 16px;background-color:#f0f7ff;border-radius:8px;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="padding-right:14px;vertical-align:top;">
                      <div style="width:28px;height:28px;background-color:#2e75b6;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:13px;font-weight:700;">3</div>
                    </td>
                    <td style="vertical-align:top;">
                      <p style="margin:0;font-size:14px;font-weight:600;color:#1a1a2e;">No cost, no obligation</p>
                      <p style="margin:4px 0 0 0;font-size:13px;color:#6b7280;">The initial consultation is completely free. You decide if you want to move forward.</p>
                    </td>
                  </tr></table>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
              <strong>In the meantime:</strong> Keep a record of all payments and communications with ${data.lender_name || "your lender"}. If anything urgent comes up — unexpected debits, threatening calls, or legal notices — reply to this email immediately.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 4px 0;font-size:12px;color:#9ca3af;">
              <span style="font-weight:600;color:#6b7280;">FundingWatch</span> · Miami, FL
            </p>
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              Helping small business owners understand their merchant cash advance agreements.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, name, email, phone, business, consent } = body;

    if (!consent) {
      return NextResponse.json({ error: "Consent required" }, { status: 400 });
    }

    if (!name || !email || !phone || !business) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Forward to ops server
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

    // Send confirmation email (personalized, professional — no AI/automated language)
    if (email && process.env.RESEND_API_KEY) {
      try {
        const subject = body.lender_name
          ? `Your ${body.lender_name} contract — case review started`
          : "We received your contract — case review started";
        await resend.emails.send({
          from: "FundingWatch <hello@fundingwatch.org>",
          to: email,
          subject,
          html: buildConfirmationEmail({
            name,
            lender_name: body.lender_name ?? null,
            risk_score: body.risk_score ?? null,
            risk_label: body.risk_label ?? null,
            effective_apr: body.effective_apr ?? null,
            red_flag_count: body.red_flag_count ?? null,
            high_flag_count: body.high_flag_count ?? null,
            has_coj: body.has_coj ?? null,
            has_personal_guarantee: body.has_personal_guarantee ?? null,
          }),
        });
      } catch (emailErr) {
        console.error("Confirmation email failed:", emailErr);
      }
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
