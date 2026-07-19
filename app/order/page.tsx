import type { Metadata } from "next";
import { OrderSection } from "@/components/order/OrderSection";
import { getInitialLocale } from "@/lib/i18n/get-locale";
import { buildPageMetadata } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getInitialLocale();
  return buildPageMetadata({
    path: "/order",
    locale,
    en: {
      title: "Request a Sample — Order",
      description:
        "Request a Grade 1 premium cocoa sample from Green Commodities: choose your format, preferred origin, and volume, and hear back from our team.",
    },
    fr: {
      title: "Demander un Échantillon — Commander",
      description:
        "Demandez un échantillon de cacao Grade 1 premium auprès de Green Commodities : choisissez votre format, votre origine et votre volume, et recevez une réponse de notre équipe.",
    },
  });
}

export default function OrderPage() {
  return <OrderSection />;
}
