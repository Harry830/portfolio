import { professionalDevelopmentSections } from "@/utils/data/professional-development";

/**
 * 2-column layout:
 *   Left  (col-span-5): Leadership / Professional Practice / Interests stacked
 *   Right (col-span-7): Hackathons & Conferences as a tall vertical timeline
 *
 * Mobile collapses to single column with the same source order.
 */
export default function ProfessionalDevelopment() {
  // pull each section out by title — easier than positional indexing
  const byTitle = (t) =>
    professionalDevelopmentSections.find(
      (s) => s.title?.toLowerCase() === t.toLowerCase()
    );

  const leadership = byTitle("Leadership");
  const practice = byTitle("Professional Practice");
  const interests = byTitle("Interests");
  const hackathons = byTitle("Hackathons & Conferences");

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
        {/* LEFT COLUMN — three stacked cards */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-7">
          {leadership && <SimpleListCard section={leadership} />}
          {practice && <SimpleListCard section={practice} />}
          {interests && <InterestsCard section={interests} />}
        </div>

        {/* RIGHT COLUMN — Hackathons timeline */}
        <div className="lg:col-span-7">
          {hackathons && <HackathonsCard section={hackathons} />}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */

function SimpleListCard({ section }) {
  return (
    <article className="reveal reveal-up surface-paper lift p-6 lg:p-7">
      <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--amber-deep)] mb-4">
        ◆ {section.title}
      </p>
      <ul className="flex flex-col">
        {section.items.map((item, i) => (
          <li
            key={`${section.title}-${item.name}`}
            className={`${i === 0 ? "" : "border-t border-[var(--line-soft)] pt-3 mt-3"}`}
          >
            <p className="text-base font-semibold text-[var(--ink)] leading-snug">
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
    </article>
  );
}

function InterestsCard({ section }) {
  return (
    <article className="reveal reveal-up surface-paper lift p-6 lg:p-7">
      <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--amber-deep)] mb-4">
        ◆ {section.title}
      </p>
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
    </article>
  );
}

function HackathonsCard({ section }) {
  return (
    <article className="reveal reveal-up surface-paper lift p-6 lg:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--amber-deep)]">
          ◆ {section.title}
        </p>
        <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
          {String(section.items.length).padStart(2, "0")} events
        </p>
      </div>

      <ul className="flex-1 flex flex-col">
        {section.items.map((item, i) => {
          const isWinner = /winner/i.test(item.name);
          // Strip trailing "| WINNER 👑" / similar markup so the title reads cleanly
          const cleanName = item.name
            .replace(/\s*\|\s*winner.*$/i, "")
            .replace(/[👑🏆🥇]/gu, "")
            .trim();

          return (
            <li
              key={`${section.title}-${item.name}`}
              className={[
                "grid grid-cols-[6.5rem_1fr_auto] sm:grid-cols-[8rem_1fr_auto] items-center gap-3 sm:gap-5 -mx-3 px-3",
                isWinner
                  ? "py-4 my-1 rounded-xl bg-[var(--amber-tint)] shadow-[0_8px_30px_-20px_rgba(162,100,37,0.5)]"
                  : "py-4 first:pt-0 last:pb-0",
                i === 0 || isWinner ? "" : "border-t border-[var(--line-soft)]",
              ].join(" ")}
            >
              {/* timeline / year column */}
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                {item.timeline || "—"}
              </span>

              {/* name column */}
              <span className="editorial text-lg lg:text-xl text-[var(--ink)] leading-snug">
                {cleanName}
              </span>

              {/* status column */}
              <span className="justify-self-end">
                {isWinner ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--amber-deep)] text-[var(--paper)] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase">
                    <span aria-hidden>★</span>
                    Winner
                  </span>
                ) : (
                  <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
                    {item.role || "Attended"}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
