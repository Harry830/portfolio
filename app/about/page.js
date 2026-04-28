import AboutSection from "../components/homepage/about";
import Programs from "../components/homepage/programs";
import ProfessionalDevelopment from "../components/homepage/professional-development";
import Skills from "../components/homepage/skills";
import Education from "../components/homepage/education";
import Awards from "../components/homepage/awards";

export const metadata = {
  title: "About — Hardik Saini",
  description:
    "More about Hardik Saini — programs, leadership, skills, education, and recognition.",
};

export default function AboutPage() {
  return (
    <div suppressHydrationWarning>
      <AboutSection />
      <Programs />
      <ProfessionalDevelopment />
      <Skills />
      <Education />
      <Awards />
    </div>
  );
}
