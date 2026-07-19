import type { Metadata } from "next";
import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { GallerySection } from "@/components/gallery/GallerySection";
import { getInitialLocale } from "@/lib/i18n/get-locale";
import { buildPageMetadata } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getInitialLocale();
  return buildPageMetadata({
    path: "/gallery",
    locale,
    en: {
      title: "Gallery",
      description:
        "A look at Green Commodities' cocoa production, from harvest and drying to sorting and export, across our partner communities in Cameroon.",
    },
    fr: {
      title: "Galerie",
      description:
        "Un aperçu de la production de cacao Green Commodities, de la récolte au séchage jusqu'au triage et à l'export, au sein de nos communautés partenaires au Cameroun.",
    },
  });
}

export default function GalleryPage() {
  return (
    <HorizontalScrollSections>
      <GallerySection />
    </HorizontalScrollSections>
  );
}
