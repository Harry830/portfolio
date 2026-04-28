import Link from "next/link";
import { awards } from "@/utils/data/awards";

export default function Awards() {
  return (
    <section id="awards" className="relative my-20 lg:my-28">
      <header className="reveal reveal-up mb-10 lg:mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">Recognition</p>
          <h2 className="mt-4 display-lg text-[var(--ink)]">
            Awards &amp; <span className="editorial-italic text-[var(--amber-deep)]">scholarships</span>.
          </h2>
        </div>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
        {awards.map((a) => (
          <li
            key={a.id}
            className="reveal reveal-up surface-paper lift p-6 lg:p-7"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                {a.date || a.issuer || "—"}
              </p>
              {a.link ? (
                <Link
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[var(--amber-deep)] hover:underline no-underline"
                >
                  View ↗
                </Link>
              ) : null}
            </div>
            <h3 className="mt-3 text-xl lg:text-2xl editorial text-[var(--ink)] leading-tight">
              {a.title}
            </h3>
            {a.issuer && a.date ? (
              <p className="mt-1 text-sm text-[var(--amber-deep)]">{a.issuer}</p>
            ) : null}
            {a.description ? (
              <p className="mt-3 text-[15px] text-[var(--ink-muted)] leading-relaxed">
                {a.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
