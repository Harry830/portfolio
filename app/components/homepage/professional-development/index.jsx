import { professionalDevelopmentSections } from "@/utils/data/professional-development";

export default function ProfessionalDevelopment() {
  return (
    <section
      id="professional-development"
      className="relative my-20 lg:my-28"
    >
      <header className="reveal reveal-up mb-10 lg:mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">Leadership &amp; Practice</p>
          <h2 className="mt-4 display-lg text-[var(--ink)]">
            How I show up <span className="editorial-italic text-[var(--amber-deep)]">in community</span>.
          </h2>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
        {professionalDevelopmentSections.map((section) => {
          const isInterests = section.title?.toLowerCase() === "interests";
          return (
            <div
              key={section.title}
              className={`reveal reveal-up surface-paper lift p-6 lg:p-7 ${
                isInterests ? "md:col-span-3" : ""
              }`}
            >
              <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--amber-deep)] mb-4">
                {section.title}
              </p>
              {isInterests ? (
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <span
                      key={`${section.title}-${item.name}`}
                      className="rounded-full border border-[var(--line)] bg-[var(--bg-cream-soft)] px-3 py-1.5 text-xs text-[var(--ink-soft)]"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li
                      key={`${section.title}-${item.name}`}
                      className="border-t border-[var(--line-soft)] pt-3 first:border-t-0 first:pt-0"
                    >
                      <p className="text-sm font-semibold text-[var(--ink)] leading-snug">
                        {item.name}
                      </p>
                      {item.role ? (
                        <p className="text-xs text-[var(--ink-muted)] mt-0.5">
                          {item.role}
                        </p>
                      ) : null}
                      {item.timeline ? (
                        <p className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-faint)] mt-1">
                          {item.timeline}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
