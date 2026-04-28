import HeroSection from "./components/homepage/hero-section";
import MarqueeStrip from "./components/effects/marquee-strip";
import MercedesFeature from "./components/homepage/mercedes-feature";
import HorizontalWork from "./components/homepage/horizontal-work";
import Experience from "./components/homepage/experience";
import LearnMoreCTA from "./components/homepage/learn-more-cta";
import ContactSection from "./components/homepage/contact";

const ROLE_TITLES = [
  "Builder",
  "CS @ Georgia State",
  "ARCTIC HPC",
  "Mercedes-Benz USA",
  "CreateX",
  "Genesis Spring Batch",
  "AI · Cloud · Enterprise",
  "Atlanta, GA",
];

export default function Home() {
  return (
    <div suppressHydrationWarning>
      <HeroSection />

      <div className="bleed my-12 lg:my-16">
        <MarqueeStrip items={ROLE_TITLES} direction="left" speed={42} variant="display" />
      </div>

      <MercedesFeature />

      <HorizontalWork />

      <Experience />
      <LearnMoreCTA />
      <ContactSection />
    </div>
  );
}
