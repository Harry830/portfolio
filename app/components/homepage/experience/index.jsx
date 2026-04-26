import { experiences } from "@/utils/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="relative my-20 lg:my-28">
      <header className="reveal reveal-up mb-12 lg:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">Experience</p>
          <h2 className="mt-4 display-xl text-[var(--ink)]">
            Where I&apos;m <span className="editorial-italic text-[var(--amber-deep)]">building</span>.
          </h2>
        </div>
        <p className="lg:col-span-5 text-base lg:text-lg text-[var(--ink-muted)] leading-relaxed">
          Enterprise systems, research HPC, and hands-on technical work — places
          where things have to actually work, every day.
        </p>
      </header>

      <ol className="relative">
        {/* vertical rail */}
        <span
          aria-hidden
          className="absolute left-3 lg:left-1/2 top-2 bottom-2 w-px bg-[var(--line)]"
        />

        {experiences.map((exp, i) => {
          const featured = exp.isFeatured;
          return (
            <li
              key={exp.id}
              className={`reveal reveal-up relative pl-10 lg:pl-0 lg:grid lg:grid-cols-12 lg:gap-10 mb-12 lg:mb-16 ${i === 0 ? "" : ""}`}
            >
              {/* node dot */}
              <span
                aria-hidden
                className={`absolute left-2 lg:left-[calc(50%-7px)] top-3 h-3.5 w-3.5 rounded-full ${
                  featured ? "bg-[var(--amber-deep)]" : "bg-[var(--ink)]"
                }`}
                style={{
                  boxShadow: "0 0 0 4px var(--bg-cream)",
                }}
              />

              {/* timeline label (left side on desktop) */}
              <div className="lg:col-span-5 lg:text-right lg:pr-12">
                <p className="mono text-xs uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                  {exp.duration}
                </p>
                <p className="mt-1 text-sm text-[var(--ink-muted)]">
                  {exp.location}
                </p>
              </div>

              {/* card (right side on desktop) */}
              <div className="lg:col-span-7 lg:pl-12 mt-3 lg:mt-0">
                <div
                  className={`${
                    featured ? "surface-ink p-6 lg:p-8" : "surface-paper lift p-6 lg:p-8"
                  }`}
                >
                  {featured && (
                    <p className="mono text-[10px] tracking-[0.22em] uppercase text-[var(--chrome-2)] mb-3">
                      Featured
                    </p>
                  )}
                  <h3
                    className={`display-md ${
                      featured ? "chrome-text" : "text-[var(--ink)]"
                    }`}
                  >
                    {exp.title}
                  </h3>
                  <p
                    className={`mt-2 text-base font-medium ${
                      featured ? "text-[var(--chrome-1)]" : "text-[var(--amber-deep)]"
                    }`}
                  >
                    {exp.company}
                  </p>
                  {exp.summary ? (
                    <p
                      className={`mt-4 text-[15px] leading-relaxed ${
                        featured ? "text-[var(--chrome-1)]/80" : "text-[var(--ink-muted)]"
                      }`}
                    >
                      {exp.summary}
                    </p>
                  ) : null}

                  {exp.bullets?.length ? (
                    <ul className="mt-5 space-y-2.5">
                      {exp.bullets.map((b) => (
                        <li
                          key={b}
                          className={`flex items-start gap-3 text-sm leading-relaxed ${
                            featured ? "text-[var(--chrome-1)]/85" : "text-[var(--ink-soft)]"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`mt-2 h-1 w-3 flex-none rounded-full ${
                              featured ? "bg-[var(--chrome-1)]" : "bg-[var(--amber)]"
                            }`}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
