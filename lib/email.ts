import nodemailer from "nodemailer";

/**
 * Brevo's SMTP relay (smtp-relay.brevo.com:587, STARTTLS) authenticated with
 * an SMTP key — not a Brevo API key. See Settings > SMTP & API in Brevo.
 */
export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
});

export const EMAIL_FROM = `"${process.env.BREVO_FROM_NAME}" <${process.env.BREVO_FROM_EMAIL}>`;
