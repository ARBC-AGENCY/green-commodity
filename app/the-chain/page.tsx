import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { ChainHeroSection } from "@/components/the-chain/ChainHeroSection";
import { GreenFarmersSection } from "@/components/the-chain/GreenFarmersSection";

export default function TheChainPage() {
  return (
    <HorizontalScrollSections>
      <ChainHeroSection />
      <GreenFarmersSection />
    </HorizontalScrollSections>
  );
}
