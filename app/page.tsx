import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";

export default function Home() {
  return (
    <HorizontalScrollSections>
      <HeroSection />
      <StatsSection />
    </HorizontalScrollSections>
  );
}
