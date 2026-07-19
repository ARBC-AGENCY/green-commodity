export type OrderFormData = {
  companyName: string;
  structureType: string;
  fullName: string;
  position: string;
  email: string;
  phone: string;
  sampleFormat: "discovery" | "aromatic";
  origins: string[];
  annualVolume: string;
  requirements: string;
  locale: "fr" | "en";
};

const COLORS = {
  green: "#0b573e",
  orange: "#f39116",
  heading: "#2d2d2d",
  body: "#5d5d5d",
  cream: "#f7ece0",
  border: "#e5d8c8",
};

const SAMPLE_FORMAT_LABEL: Record<
  OrderFormData["locale"],
  Record<OrderFormData["sampleFormat"], string>
> = {
  fr: {
    discovery: "Format Découverte & Labo (0.50 kg)",
    aromatic: "Format Profil Aromatique (1.00 kg)",
  },
  en: {
    discovery: "Discovery & Lab Format (0.50 kg)",
    aromatic: "Aromatic Profile Format (1.00 kg)",
  },
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Shared HTML shell so both emails look like they came from the same brand. */
function emailShell(options: {
  preheader: string;
  bodyHtml: string;
  accentColor?: string;
}) {
  const { preheader, bodyHtml, accentColor = COLORS.green } = options;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Green Commodities</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f0e5d6;font-family:Georgia,'Times New Roman',serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0e5d6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background-color:${accentColor};padding:24px 32px;">
                <span style="font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#ffffff;letter-spacing:0.02em;">Green Commodities</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;font-family:'Helvetica Neue',Arial,sans-serif;color:${COLORS.body};font-size:14px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:${COLORS.cream};border-top:1px solid ${COLORS.border};font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:${COLORS.body};">
                Green Commodities &middot; Cameroun
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function fieldRow(label: string, value: string) {
  return `<tr>
    <td style="padding:6px 12px 6px 0;font-weight:bold;color:${COLORS.heading};white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:${COLORS.body};">${escapeHtml(value) || "—"}</td>
  </tr>`;
}

/** Internal notification sent to the Green Commodities sales inbox. */
export function buildNotificationEmail(data: OrderFormData) {
  const sampleFormatLabel = SAMPLE_FORMAT_LABEL[data.locale][data.sampleFormat];

  const bodyHtml = `
    <h1 style="font-family:Georgia,serif;font-size:20px;color:${COLORS.heading};margin:0 0 16px;">
      New sample evaluation request
    </h1>
    <p style="margin:0 0 24px;">${escapeHtml(data.companyName)} just submitted a sample request through the website.</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${fieldRow("Company", data.companyName)}
      ${fieldRow("Structure type", data.structureType)}
      ${fieldRow("Contact name", data.fullName)}
      ${fieldRow("Role", data.position)}
      ${fieldRow("Email", data.email)}
      ${fieldRow("Phone", data.phone)}
      ${fieldRow("Sample format", sampleFormatLabel)}
      ${fieldRow("Preferred origin(s)", data.origins.join(", "))}
      ${fieldRow("Estimated annual volume", data.annualVolume)}
    </table>

    <p style="font-weight:bold;color:${COLORS.heading};margin:0 0 6px;">Requirements / specifications</p>
    <p style="margin:0;white-space:pre-wrap;">${escapeHtml(data.requirements) || "—"}</p>
  `;

  return {
    subject: `New sample request — ${data.companyName}`,
    html: emailShell({
      preheader: `New sample request from ${data.companyName}`,
      bodyHtml,
      accentColor: COLORS.green,
    }),
    text: `New sample evaluation request from ${data.companyName}
Contact: ${data.fullName} (${data.position})
Email: ${data.email}
Phone: ${data.phone}
Structure type: ${data.structureType}
Sample format: ${sampleFormatLabel}
Preferred origin(s): ${data.origins.join(", ")}
Estimated annual volume: ${data.annualVolume}
Requirements: ${data.requirements || "—"}`,
  };
}

const CONFIRMATION_COPY = {
  fr: {
    subject: "Nous avons bien reçu votre demande d'échantillon",
    preheader: "Votre demande d'échantillon Green Commodities est confirmée.",
    heading: "Merci pour votre demande !",
    greeting: (name: string) => `Bonjour ${name},`,
    intro:
      "Nous avons bien reçu votre demande d'échantillon et notre équipe commerciale l'examine dès à présent.",
    summaryHeading: "Récapitulatif de votre demande",
    format: "Format",
    origin: "Origine souhaitée",
    volume: "Volume annuel estimé",
    nextStepsHeading: "Prochaines étapes",
    nextSteps:
      "Un membre de notre équipe vous contactera sous peu à l'adresse ou au numéro fournis afin de finaliser la préparation et l'expédition de votre échantillon.",
    guaranteeHeading: "Garantie de conformité",
    guaranteeText:
      "Vos échantillons sont rigoureusement sélectionnés, triés manuellement et expédiés par fret express (DHL / UPS) accompagnés de leurs fiches techniques.",
    signOff: "À très bientôt,",
    team: "L'équipe Green Commodities",
  },
  en: {
    subject: "We've received your sample request",
    preheader: "Your Green Commodities sample request is confirmed.",
    heading: "Thank you for your request!",
    greeting: (name: string) => `Hello ${name},`,
    intro:
      "We've received your sample request and our sales team is reviewing it now.",
    summaryHeading: "Your request summary",
    format: "Format",
    origin: "Preferred origin",
    volume: "Estimated annual volume",
    nextStepsHeading: "Next steps",
    nextSteps:
      "A member of our team will reach out shortly at the email or phone number you provided to finalize the preparation and shipping of your sample.",
    guaranteeHeading: "Compliance guarantee",
    guaranteeText:
      "Your samples are rigorously selected, manually sorted and shipped by express freight (DHL / UPS) along with their technical data sheets.",
    signOff: "Talk soon,",
    team: "The Green Commodities Team",
  },
} as const;

/** Confirmation sent to the person who submitted the form. */
export function buildConfirmationEmail(data: OrderFormData) {
  const copy = CONFIRMATION_COPY[data.locale];
  const sampleFormatLabel = SAMPLE_FORMAT_LABEL[data.locale][data.sampleFormat];

  const bodyHtml = `
    <h1 style="font-family:Georgia,serif;font-size:20px;color:${COLORS.heading};margin:0 0 16px;">
      ${copy.heading}
    </h1>
    <p style="margin:0 0 4px;">${escapeHtml(copy.greeting(data.fullName))}</p>
    <p style="margin:0 0 24px;">${copy.intro}</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cream};border-radius:8px;margin-bottom:24px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="font-weight:bold;color:${COLORS.green};margin:0 0 10px;">${copy.summaryHeading}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${fieldRow(copy.format, sampleFormatLabel)}
            ${fieldRow(copy.origin, data.origins.join(", "))}
            ${fieldRow(copy.volume, data.annualVolume)}
          </table>
        </td>
      </tr>
    </table>

    <p style="font-weight:bold;color:${COLORS.heading};margin:0 0 6px;">${copy.nextStepsHeading}</p>
    <p style="margin:0 0 24px;">${copy.nextSteps}</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid ${COLORS.orange};margin-bottom:24px;">
      <tr>
        <td style="padding:4px 0 4px 16px;">
          <p style="font-weight:bold;color:${COLORS.orange};margin:0 0 4px;">${copy.guaranteeHeading}</p>
          <p style="margin:0;">${copy.guaranteeText}</p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 2px;">${copy.signOff}</p>
    <p style="margin:0;font-weight:bold;color:${COLORS.heading};">${copy.team}</p>
  `;

  return {
    subject: copy.subject,
    html: emailShell({
      preheader: copy.preheader,
      bodyHtml,
      accentColor: COLORS.orange,
    }),
    text: `${copy.heading}

${copy.greeting(data.fullName)}
${copy.intro}

${copy.summaryHeading}
${copy.format}: ${sampleFormatLabel}
${copy.origin}: ${data.origins.join(", ")}
${copy.volume}: ${data.annualVolume}

${copy.nextStepsHeading}
${copy.nextSteps}

${copy.guaranteeHeading}
${copy.guaranteeText}

${copy.signOff}
${copy.team}`,
  };
}
