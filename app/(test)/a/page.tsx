import FixtureSection from "@/components/test/a/FixtureSection";
import HeroSection from "@/components/test/a/HeroSection";
import MeasurementSection from "@/components/test/a/MeasurementSection";
import PreconditionsSection from "@/components/test/a/PreconditionsSection";
import ProofSection from "@/components/test/a/ProofSection";
import SpecCheckSection from "@/components/test/a/SpecCheckSection";

export default function TestAPage() {
  return (
    <main>
      <HeroSection />
      <PreconditionsSection />
      <ProofSection />
      <MeasurementSection />
      <FixtureSection />
      <SpecCheckSection />
    </main>
  );
}
