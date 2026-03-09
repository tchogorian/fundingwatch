import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const BLUE_API_URL = "https://ops.fundingwatch.org";
const resend = new Resend(process.env.RESEND_API_KEY);

function buildConfirmationEmail(name: string): string {
  const firstName = name.split(" ")[0] || "there";
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
            <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">
              <span style="color:#2e75b6;">Funding</span>Watch
            </span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 8px 0;font-size:22px;font-weight:700;color:#1a1a2e;">
              We've got your contract, ${firstName}.
            </h1>
            <p style="margin:0 0 24px 0;font-size:15px;color:#6b7280;line-height:1.5;">
              Here's what happens next.
            </p>

            <!-- Steps -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding:14px 16px;background-color:#f0f7ff;border-radius:8px;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="padding-right:14px;vertical-align:top;">
                      <div style="width:28px;height:28px;background-color:#2e75b6;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:13px;font-weight:700;">1</div>
                    </td>
                    <td style="vertical-align:top;">
                      <p style="margin:0;font-size:14px;font-weight:600;color:#1a1a2e;">Contract analyzed</p>
                      <p style="margin:4px 0 0 0;font-size:13px;color:#6b7280;">Our AI has already reviewed your agreement and identified potential issues.</p>
                    </td>
                  </tr></table>
                </td>
              </tr>
              <tr><td style="height:8px;"></td></tr>
              <tr>
                <td style="padding:14px 16px;background-color:#f0f7ff;border-radius:8px;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="padding-right:14px;vertical-align:top;">
                      <div style="width:28px;height:28px;background-color:#2e75b6;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:13px;font-weight:700;">2</div>
                    </td>
                    <td style="vertical-align:top;">
                      <p style="margin:0;font-size:14px;font-weight:600;color:#1a1a2e;">Professional review</p>
                      <p style="margin:4px 0 0 0;font-size:13px;color:#6b7280;">A licensed attorney will review your contract and reach out within 1–2 business days.</p>
                    </td>
                  </tr></table>
                </td>
              </tr>
              <tr><td style="height:8px;"></td></tr>
              <tr>
                <td style="padding:14px 16px;background-color:#f0f7ff;border-radius:8px;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="padding-right:14px;vertical-align:top;">
                      <div style="width:28px;height:28px;background-color:#2e75b6;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:13px;font-weight:700;">3</div>
                    </td>
                    <td style="vertical-align:top;">
                      <p style="margin:0;font-size:14px;font-weight:600;color:#1a1a2e;">Free consultation</p>
                      <p style="margin:4px 0 0 0;font-size:13px;color:#6b7280;">They'll explain your options clearly — no jargon, no cost, no obligation.</p>
                    </td>
                  </tr></table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 4px 0;font-size:14px;color:#374151;line-height:1.6;">
              In the meantime, keep a record of all payments and communications with your lender. If anything urgent comes up, just reply to this email.
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
              Free MCA contract intelligence for small business owners.
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

    // Send confirmation email
    if (email && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "FundingWatch <hello@fundingwatch.org>",
          to: email,
          subject: "We received your contract — here's what happens next",
          html: buildConfirmationEmail(name),
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
