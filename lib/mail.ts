import { Resend } from "resend";

/**
 * Mail Helper for AI-Recruite
 * Dispatches transactional emails using Resend SDK
 */

interface SendVerificationEmailParams {
  to: string;
  name: string;
  token: string;
}

// Lazy-initialize Resend client
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
};

/**
 * Generates responsive dark-mode HTML email template for verification
 */
export function getVerificationHtmlTemplate(name: string, verifyUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Account - AI Recruite</title>
</head>
<body style="margin: 0; padding: 40px 10px; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
    <!-- Header -->
    <tr>
      <td align="center" style="padding: 40px 30px 20px 30px;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; color: #f59e0b; text-transform: uppercase;">
          AI RECRUITE
        </h2>
        <h1 style="margin: 16px 0 0 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
          Verify Your Account
        </h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 10px 40px 30px 40px; color: #9ca3af; font-size: 15px; line-height: 1.6;">
        <p style="margin: 0 0 16px 0; color: #e5e7eb; font-size: 16px;">
          Hi <strong style="color: #ffffff;">${name || "there"}</strong>,
        </p>
        <p style="margin: 0 0 24px 0;">
          Welcome to <strong style="color: #f3f4f6;">AI Recruite</strong>! To activate your account, access your personalized dashboard, and connect with top opportunities, please verify your email address by clicking the button below.
        </p>

        <!-- CTA Button -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 32px auto;">
          <tr>
            <td align="center" style="border-radius: 10px; background: linear-gradient(135deg, #d97706 0%, #b45309 100%);">
              <a href="${verifyUrl}" target="_blank" style="display: inline-block; padding: 14px 36px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 10px;">
                Verify Email Address
              </a>
            </td>
          </tr>
        </table>

        <p style="margin: 24px 0 16px 0; font-size: 13px; color: #6b7280; text-align: center;">
          This verification link will expire in 24 hours.
        </p>
        <p style="margin: 0 0 24px 0; font-size: 13px; color: #6b7280;">
          If you did not create an account with AI Recruite, you can safely ignore this email.
        </p>

        <p style="margin: 0; color: #9ca3af; font-size: 14px;">
          Regards,<br>
          <strong style="color: #f59e0b;">The AI Recruite Team</strong>
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #0b0f19; padding: 24px 30px; text-align: center; border-top: 1px solid #1f2937; color: #4b5563; font-size: 12px;">
        <p style="margin: 0 0 6px 0;">
          © ${new Date().getFullYear()} AI Recruite Inc. All rights reserved.
        </p>
        <p style="margin: 0;">
          Next-Gen AI Powered Recruitment Platform
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Dispatches verification email via Resend SDK
 */
export async function sendVerificationEmail({ to, name, token }: SendVerificationEmailParams) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    "http://localhost:3000";

  const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;
  const htmlContent = getVerificationHtmlTemplate(name, verifyUrl);

  // 1. In development, always print the direct link to the terminal console for easy testing
  console.log("\n=======================================================");
  console.log(`✉️  [EMAIL VERIFICATION DISPATCHED] to: ${to}`);
  console.log(`👤 Name: ${name}`);
  console.log(`🔗 Click/Paste link to verify:`);
  console.log(`   ${verifyUrl}`);
  console.log("=======================================================\n");

  // 2. Dispatch email via Resend SDK
  const resend = getResendClient();
  if (resend) {
    try {
      const fromAddress =
        process.env.EMAIL_FROM || "AI Recruite <onboarding@resend.dev>";

      const { data, error } = await resend.emails.send({
        from: fromAddress,
        to: [to],
        subject: "Verify Your Account - AI Recruite",
        html: htmlContent,
      });

      if (error) {
        console.error("[MailHelper:Resend] Error sending email:", error);
      } else {
        console.log(`[MailHelper:Resend] Email sent successfully, ID: ${data?.id}`);
      }
    } catch (err) {
      console.error("[MailHelper:Resend] Unexpected exception:", err);
    }
  } else {
    console.log(
      "ℹ️ [MailHelper] RESEND_API_KEY is not configured in .env. Email link printed above for testing."
    );
  }

  return { success: true, verifyUrl };
}
