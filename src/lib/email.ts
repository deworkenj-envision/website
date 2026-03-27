import { Resend } from "resend";
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
export async function sendEmail(args: { to: string; subject: string; html: string }) {
  if (!resend) return { skipped: true };
  return resend.emails.send({
    from: process.env.MARKETING_FROM_EMAIL || "PrintLux <noreply@example.com>",
    to: args.to, subject: args.subject, html: args.html,
  });
}
