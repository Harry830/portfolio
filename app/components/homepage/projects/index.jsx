import { projectsData } from "@/utils/data/projects-data";
import ProjectCard from "./project-card";

export default function Projects() {
  return (
    <section id="work" className="relative my-20 lg:my-28">
      <header className="reveal reveal-up mb-10 lg:mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">Selected Work</p>
          <h2 className="mt-4 display-xl text-[var(--ink)]">
            Things I&apos;ve <span className="editorial-italic text-[var(--amber-deep)]">shipped</span>.
          </h2>
        </div>
        <p className="lg:col-span-5 text-base lg:text-lg text-[var(--ink-muted)] leading-relaxed">
          A small slice of what I build — products with real users, hackathon
          ideas that survived the weekend, and tools I keep coming back to.
        </p>
      </header>

      <div className="flex flex-col gap-6 lg:gap-8">
        {projectsData.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
