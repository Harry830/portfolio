import { programsData } from "@/utils/data/programs";

export default function Programs() {
  return (
    <section id="programs" className="relative my-20 lg:my-28">
      <header className="reveal reveal-up mb-10 lg:mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">Builder Programs</p>
          <h2 className="mt-4 display-xl text-[var(--ink)]">
            Inside the <span className="editorial-italic text-[var(--amber-deep)]">startup ecosystem</span>.
          </h2>
        </div>
        <p className="lg:col-span-5 text-base lg:text-lg text-[var(--ink-muted)] leading-relaxed">
          Programs that pushed my ideas through customer discovery, mentorship,
          and demo milestones — the kind of pressure that turns sketches into
          products.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {programsData.map((p) => {
          const isCurrent = p.status === "current";
          return (
            <article
              key={p.id}
              className="reveal reveal-up surface-paper lift relative overflow-hidden p-7 lg:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* placeholder logo plate */}
                  <div
                    className="grid place-items-center w-14 h-14 rounded-xl border border-[var(--line)] bg-[var(--bg-cream-soft)]"
                    aria-hidden
                  >
                    <span className="editorial text-lg text-[var(--ink)]">
                      {p.asset.placeholderInitials}
                    </span>
                  </div>
                  <div>
                    <h3 className="display-md text-[var(--ink)] text-[1.5rem]">
                      {p.name}
                    </h3>
                    <p className="text-sm text-[var(--ink-muted)] mt-0.5">
                      {p.affiliation} · {p.timeline}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    isCurrent
                      ? "bg-[var(--amber-tint)] text-[var(--amber-deep)] border border-[var(--amber-deep)]/20"
                      : "bg-[var(--bg-cream-soft)] text-[var(--ink-muted)] border border-[var(--line)]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isCurrent ? "bg-[var(--amber-deep)]" : "bg-[var(--ink-faint)]"
                    }`}
                    aria-hidden
                  />
                  {p.statusLabel}
                </span>
              </div>

              <p className="mt-5 text-[15px] text-[var(--ink-muted)] leading-relaxed">
                {p.description}
              </p>

              <p className="mt-4 mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink-ghost)]">
                Logo placeholder · drop asset → {p.asset.suggestedFile}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
