import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Coursework from "./components/homepage/coursework";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Awards from "./components/homepage/awards";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import ProfessionalDevelopment from "./components/homepage/professional-development";

export default async function Home() {

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Coursework />
      <Awards />
      <Projects />
      <Education />
      <ProfessionalDevelopment />
      <ContactSection />
    </div>
  )
};