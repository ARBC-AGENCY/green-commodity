import { NextResponse } from "next/server";
import { transporter, EMAIL_FROM } from "@/lib/email";
import {
  buildConfirmationEmail,
  buildNotificationEmail,
  type OrderFormData,
} from "@/lib/order-email-templates";

const REQUIRED_STRING_FIELDS = [
  "companyName",
  "fullName",
  "position",
  "email",
  "phone",
] as const satisfies readonly (keyof OrderFormData)[];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPayload(body: unknown): body is OrderFormData {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;

  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof data[field] !== "string" || !data[field].trim()) return false;
  }

  if (data.sampleFormat !== "discovery" && data.sampleFormat !== "aromatic") {
    return false;
  }

  if (!Array.isArray(data.origins) || data.origins.length === 0) return false;

  if (typeof data.annualVolume !== "string" || !data.annualVolume.trim()) {
    return false;
  }

  if (data.locale !== "fr" && data.locale !== "en") return false;

  return EMAIL_PATTERN.test((data.email as string).trim());
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { success: false, error: "Missing or invalid fields" },
      { status: 400 },
    );
  }

  const data: OrderFormData = {
    ...body,
    structureType:
      typeof body.structureType === "string" ? body.structureType : "",
    requirements:
      typeof body.requirements === "string" ? body.requirements : "",
  };

  const notificationInbox = process.env.ORDER_NOTIFICATION_EMAIL;
  if (!notificationInbox) {
    console.error("ORDER_NOTIFICATION_EMAIL is not configured");
    return NextResponse.json(
      { success: false, error: "Server is not configured" },
      { status: 500 },
    );
  }

  try {
    const notification = buildNotificationEmail(data);
    const confirmation = buildConfirmationEmail(data);

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: notificationInbox,
      replyTo: data.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: data.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send order emails", error);
    return NextResponse.json(
      { success: false, error: "Failed to send emails" },
      { status: 502 },
    );
  }
}
