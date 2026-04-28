import { educations } from "@/utils/data/educations";

export default function Education() {
  return (
    <section id="education" className="relative my-20 lg:my-28">
      <header className="reveal reveal-up mb-10 lg:mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">Education</p>
          <h2 className="mt-4 display-lg text-[var(--ink)]">
            Education &amp; <span className="editorial-italic text-[var(--amber-deep)]">credentials</span>.
          </h2>
        </div>
      </header>

      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {educations.map((e, i) => (
          <li
            key={e.id}
            className="reveal reveal-up surface-paper lift p-6 lg:p-7 flex flex-col"
          >
            <p className="mono text-xs text-[var(--ink-faint)]">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 mono text-[10px] uppercase tracking-[0.18em] text-[var(--amber-deep)]">
              {e.duration}
            </p>
            <h3 className="mt-3 text-lg editorial text-[var(--ink)] leading-snug">
              {e.title}
            </h3>
            <p className="mt-3 text-sm text-[var(--ink-muted)] mt-auto pt-4 border-t border-[var(--line)]">
              {e.institution}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
