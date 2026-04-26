import HeroSection from "./components/homepage/hero-section";
import MarqueeStrip from "./components/effects/marquee-strip";
import MercedesFeature from "./components/homepage/mercedes-feature";
import HorizontalWork from "./components/homepage/horizontal-work";
import Experience from "./components/homepage/experience";
import Programs from "./components/homepage/programs";
import AboutSection from "./components/homepage/about";
import Skills from "./components/homepage/skills";
import Awards from "./components/homepage/awards";
import Coursework from "./components/homepage/coursework";
import Education from "./components/homepage/education";
import ProfessionalDevelopment from "./components/homepage/professional-development";
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

const TOOLS_TICKER = [
  "Python",
  "Spring Boot",
  "Next.js",
  "Postgres",
  "Slurm",
  "Kubernetes",
  "Supabase",
  "Gemini",
  "AWS",
  "Linux",
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
      <Programs />
      <AboutSection />

      <div className="bleed my-12 lg:my-20">
        <MarqueeStrip items={TOOLS_TICKER} direction="right" speed={28} variant="label" separator="·" />
      </div>

      <Skills />
      <Awards />
      <Coursework />
      <Education />
      <ProfessionalDevelopment />
      <ContactSection />
    </div>
  );
}
