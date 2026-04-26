"use client";

import { useMemo, useState } from "react";
import { courseworkData } from "@/utils/data/coursework";

function GradePill({ grade }) {
  if (!grade) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--bg-cream-soft)] px-2 py-0.5 text-[10px] tracking-wide text-[var(--ink-muted)]">
      {grade}
    </span>
  );
}

function CourseRow({ name, grade, dot = "var(--amber)" }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--line-soft)] py-2.5 last:border-b-0">
      <div className="flex items-center gap-3 min-w-0">
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full flex-none"
          style={{ backgroundColor: dot }}
        />
        <span className="text-sm text-[var(--ink-soft)] truncate">{name}</span>
      </div>
      <GradePill grade={grade} />
    </div>
  );
}

export default function Coursework() {
  const { inProgress, completed, nonMajor } = courseworkData;
  const [showNonMajor, setShowNonMajor] = useState(false);

  const today = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date()),
    []
  );

  return (
    <section id="coursework" className="relative my-20 lg:my-28">
      <header className="reveal reveal-up mb-10 lg:mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">Coursework</p>
          <h2 className="mt-4 display-lg text-[var(--ink)]">
            What I&apos;ve <span className="editorial-italic text-[var(--amber-deep)]">studied</span>.
          </h2>
        </div>
        <div className="lg:col-span-5 surface-paper px-5 py-4 w-fit lg:ml-auto">
          <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
            GPA · {today}
          </p>
          <p className="mt-1 display-md text-[var(--ink)]">4.28 <span className="text-[var(--ink-faint)] text-base">/ 4.30</span></p>
        </div>
      </header>

      <div className="reveal reveal-up grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="surface-paper p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="h-2 w-2 rounded-full bg-[var(--amber)]"
              aria-hidden
            />
            <p className="text-sm font-semibold text-[var(--ink)] tracking-wide uppercase">
              In progress
            </p>
          </div>
          <div>
            {inProgress.map((c) => (
              <CourseRow key={c} name={c} dot="var(--amber)" />
            ))}
          </div>
        </div>

        <div className="surface-paper p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-2 w-2 rounded-full bg-[var(--ink)]" aria-hidden />
            <p className="text-sm font-semibold text-[var(--ink)] tracking-wide uppercase">
              Completed
            </p>
          </div>
          <div>
            {completed.map((c) => (
              <CourseRow
                key={c.name}
                name={c.name}
                grade={c.grade}
                dot="var(--ink)"
              />
            ))}
          </div>
        </div>
      </div>

      {nonMajor &&
      (nonMajor.inProgress?.length || nonMajor.completed?.length) ? (
        <div className="reveal reveal-up mt-6 surface-cream p-6 lg:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--ink)] tracking-wide uppercase">
                Non-major coursework
              </p>
              <p className="text-sm text-[var(--ink-muted)] mt-1">
                Electives and supporting courses
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowNonMajor((v) => !v)}
              className="btn-ghost text-xs"
            >
              {showNonMajor ? "Hide" : "Show"}
            </button>
          </div>
          {showNonMajor && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
              <div>
                {(nonMajor.inProgress || []).map((c) => (
                  <CourseRow key={`nm-i-${c}`} name={c} dot="var(--amber)" />
                ))}
              </div>
              {[0, 1].map((col) => {
                const items = (nonMajor.completed || []).filter((_, i) =>
                  col === 0
                    ? i < Math.ceil((nonMajor.completed || []).length / 2)
                    : i >= Math.ceil((nonMajor.completed || []).length / 2)
                );
                return (
                  <div key={`nm-c-col-${col}`}>
                    {items.map((c) => (
                      <CourseRow
                        key={`nm-c-${c.name}`}
                        name={c.name}
                        grade={c.grade}
                        dot="var(--ink-muted)"
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
