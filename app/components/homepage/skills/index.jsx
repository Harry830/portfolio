import { skillsData } from "@/utils/data/skills";

export default function Skills() {
  // Duplicate the array for a seamless marquee loop.
  const track = [...skillsData, ...skillsData];

  return (
    <section id="skills" className="relative my-20 lg:my-28">
      <div className="reveal reveal-up grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-8 lg:mb-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">Toolkit</p>
          <h2 className="mt-4 display-lg text-[var(--ink)]">
            What I <span className="editorial-italic text-[var(--amber-deep)]">reach for</span>.
          </h2>
        </div>
        <p className="lg:col-span-5 text-base text-[var(--ink-muted)] leading-relaxed">
          Languages, frameworks, and infrastructure I work with day-to-day across
          full-stack products and HPC.
        </p>
      </div>

      <div
        className="reveal reveal-up relative overflow-hidden surface-cream py-8"
        aria-hidden={false}
      >
        {/* fade edges */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{
            background:
              "linear-gradient(to right, var(--bg-cream-soft), transparent)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{
            background:
              "linear-gradient(to left, var(--bg-cream-soft), transparent)",
          }}
        />

        <ul className="marquee-track" role="list">
          {track.map((skill, i) => (
            <li
              key={`${skill}-${i}`}
              className="flex items-center gap-3 px-5 py-2 rounded-full border border-[var(--line)] bg-[var(--paper)] mono text-sm text-[var(--ink-soft)] whitespace-nowrap"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-[var(--amber)]"
                aria-hidden
              />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
