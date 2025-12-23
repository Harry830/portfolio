// @flow strict
"use client";

import { useMemo, useState } from "react";
import { courseworkData } from "@/utils/data/coursework";
import GlowCard from "../../helper/glow-card";

function Coursework() {
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
    <section id="coursework" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-10 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="absolute -bottom-28 -right-10 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl"></div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Coursework
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#1f223c] bg-gradient-to-br from-[#0f1024] via-[#0b0f24] to-[#0f1024] shadow-[0_20px_70px_-35px_rgba(0,0,0,0.7)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,105,180,0.08),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(22,242,179,0.08),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(88,81,219,0.08),transparent_30%)]"></div>

        <div className="absolute right-4 top-4 z-10">
          <div className="rounded-xl border border-[#1f223c] bg-[#0f1326]/90 px-4 py-3 shadow-lg backdrop-blur">
            <p className="text-xs text-[#cdd5f7]">GPA (as of {today})</p>
            <p className="text-lg font-semibold text-white">4.25 / 4.3</p>
          </div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 md:p-10">
          <div className="rounded-xl border border-[#1f223c] bg-[#0f1326]/70 p-5 lg:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_0_6px_rgba(251,191,36,0.12)]"></div>
              <p className="text-lg font-semibold text-white">In Progress</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inProgress.map((course, idx) => (
                <GlowCard
                  key={course}
                  identifier={`coursework-inprogress-${idx}`}
                  className="h-full"
                  cardClassName="group overflow-hidden rounded-lg bg-[#0f1326]/80 px-4 py-4 border-[#1f223c] transition-transform duration-300 hover:-translate-y-1 hover:border-pink-500/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-[#16f2b3]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="relative flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_6px_rgba(251,191,36,0.12)]"></span>
                    <p className="text-sm sm:text-base text-white leading-6">{course}</p>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#1f223c] bg-[#0f1326]/70 p-5 lg:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-[#16f2b3] shadow-[0_0_0_6px_rgba(22,242,179,0.12)]"></div>
              <p className="text-lg font-semibold text-white">Completed</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {completed.map((course, idx) => (
                <GlowCard
                  key={course.name}
                  identifier={`coursework-completed-${idx}`}
                  className="h-full"
                  cardClassName="group overflow-hidden rounded-lg bg-[#0f1326]/80 px-4 py-4 border-[#1f223c] transition-transform duration-300 hover:-translate-y-1 hover:border-pink-500/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-[#16f2b3]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="relative flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#16f2b3] shadow-[0_0_0_6px_rgba(22,242,179,0.12)]"></span>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm sm:text-base text-white leading-6">{course.name}</p>
                      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#13203d] px-2 py-1 text-xs font-semibold text-[#16f2b3]">
                        Grade: {course.grade}
                      </span>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>

        {nonMajor && (nonMajor.inProgress?.length || nonMajor.completed?.length) ? (
          <div className="relative mt-6 rounded-xl border border-[#1f223c] bg-[#0f1326]/80 p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_0_6px_rgba(56,189,248,0.14)]"></div>
                <div>
                  <p className="text-lg font-semibold text-white">Non‑major Coursework</p>
                  <p className="text-sm text-[#cdd5f7]">Electives and supporting courses</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNonMajor((v) => !v)}
                className="rounded-full border border-[#1f223c] bg-[#11152c] px-4 py-2 text-sm font-semibold text-white transition hover:border-pink-500/60 hover:text-pink-200"
              >
                {showNonMajor ? "Hide" : "Show"}
              </button>
            </div>

            {showNonMajor && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(nonMajor.inProgress || []).map((course, idx) => (
                  <GlowCard
                    key={`nonMajor-inprogress-${course}`}
                    identifier={`coursework-nonmajor-inprogress-${idx}`}
                    className="h-full"
                    cardClassName="group overflow-hidden rounded-lg bg-[#0f1326]/80 px-4 py-4 border-[#1f223c] transition-transform duration-300 hover:-translate-y-1 hover:border-pink-500/60"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-[#16f2b3]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_0_6px_rgba(251,191,36,0.12)]"></span>
                      <p className="text-sm sm:text-base text-white leading-6">{course}</p>
                    </div>
                  </GlowCard>
                ))}

                {(nonMajor.completed || []).map((course, idx) => (
                  <GlowCard
                    key={`nonMajor-completed-${course.name}`}
                    identifier={`coursework-nonmajor-completed-${idx}`}
                    className="h-full"
                    cardClassName="group overflow-hidden rounded-lg bg-[#0f1326]/80 px-4 py-4 border-[#1f223c] transition-transform duration-300 hover:-translate-y-1 hover:border-pink-500/60"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-[#16f2b3]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_0_6px_rgba(56,189,248,0.14)]"></span>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm sm:text-base text-white leading-6">{course.name}</p>
                        {course.grade ? (
                          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#13203d] px-2 py-1 text-xs font-semibold text-[#16f2b3]">
                            Grade: {course.grade}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Coursework;
