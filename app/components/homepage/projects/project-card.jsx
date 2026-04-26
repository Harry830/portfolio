import Link from "next/link";

export default function ProjectCard({ project, index = 0 }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="reveal reveal-up group relative">
      <div className="surface-paper lift relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left: meta */}
          <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start justify-between gap-4 lg:gap-6">
            <div className="flex items-baseline gap-3">
              <span className="mono text-xs text-[var(--ink-faint)]">{number}</span>
              <span className="hidden lg:inline-block h-px w-10 bg-[var(--line)]" />
            </div>
            <p className="mono text-xs uppercase tracking-[0.18em] text-[var(--ink-faint)]">
              {project.year}
            </p>
            {project.role ? (
              <p className="text-xs text-[var(--ink-muted)] hidden lg:block">
                {project.role}
              </p>
            ) : null}
          </div>

          {/* Center: content */}
          <div className="lg:col-span-6">
            <h3 className="display-md text-[var(--ink)]">{project.name}</h3>
            {project.tagline ? (
              <p className="mt-2 text-base text-[var(--amber-deep)] editorial-italic">
                {project.tagline}
              </p>
            ) : null}
            <p className="mt-5 text-[15px] lg:text-base text-[var(--ink-muted)] leading-[1.7]">
              {project.description}
            </p>

            {project.impact?.length ? (
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {project.impact.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 text-sm text-[var(--ink-soft)]"
                  >
                    <span
                      className="mt-2 h-1 w-3 flex-none rounded-full bg-[var(--amber)]"
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {project.tools?.length ? (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--line)] bg-[var(--bg-cream-soft)] px-2.5 py-1 text-[11px] text-[var(--ink-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {/* Right: actions */}
          <div className="lg:col-span-3 flex flex-col gap-3 lg:items-end">
            {project.demo ? (
              <Link
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-primary no-underline w-fit"
              >
                Live demo <span aria-hidden>↗</span>
              </Link>
            ) : (
              <span className="btn-ghost cursor-default opacity-60 w-fit">
                In progress
              </span>
            )}
            {project.code ? (
              <Link
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost no-underline w-fit"
              >
                Source <span aria-hidden>↗</span>
              </Link>
            ) : null}
            {project.role ? (
              <p className="text-xs text-[var(--ink-faint)] mt-2 lg:hidden">
                {project.role}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
