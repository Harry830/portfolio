// @flow strict

import { professionalDevelopmentSections } from "@/utils/data/professional-development";
import GlowCard from "../../helper/glow-card";

function ProfessionalDevelopment() {
  return (
    <section id="professional-development" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-pink-500/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md text-center">
            Leadership & Professional Development
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#1f223c] bg-gradient-to-br from-[#0f1024] via-[#0b0f24] to-[#0f1024] shadow-[0_20px_70px_-35px_rgba(0,0,0,0.7)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(236,72,153,0.08),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(139,92,246,0.08),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(45,212,191,0.08),transparent_28%)]" />

        <div className="relative grid grid-cols-1 md:grid-cols-3 items-stretch gap-6 p-6 md:p-10">
          {professionalDevelopmentSections.map((section) => {
            const isInterests = section.title?.toLowerCase() === "interests";
            const slug = section.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? "pd";

            return (
              <GlowCard
                key={section.title}
                identifier={`pd-${slug}`}
                className={`${isInterests ? "md:col-span-3" : ""} h-full`}
                cardClassName={`h-full overflow-hidden rounded-xl border border-[#1f223c] bg-[#0f1326]/70 p-5 lg:p-6 shadow-[0_15px_40px_-30px_rgba(0,0,0,0.7)] transition duration-500 hover:-translate-y-1 hover:border-pink-500/50 hover:shadow-[0_25px_60px_-35px_rgba(236,72,153,0.35)]`}
              >
                <div className={`pointer-events-none absolute inset-0 opacity-60 bg-gradient-to-br ${section.accent} transition duration-500 group-hover:opacity-90 group-hover:blur-[6px]`} />
                <div className="relative flex h-full flex-col gap-3">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#13203d] px-3 py-1 text-xs font-semibold text-[#cdd5f7] shadow-inner">
                    <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_0_6px_rgba(251,113,133,0.12)]" />
                    {section.title}
                  </div>
                  {isInterests ? (
                    <div
                      className="grid gap-2 rounded-lg border border-white/5 bg-white/5/70 p-3 transition duration-300 group-hover:border-pink-500/40"
                      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
                    >
                      {section.items.map((item) => (
                        <span
                          key={`${section.title}-${item.name}`}
                          className="flex items-center justify-center rounded-full border border-pink-400/30 bg-[#11172f] px-3 py-2 text-xs md:text-sm font-semibold text-white text-center leading-snug shadow-[0_8px_24px_-14px_rgba(0,0,0,0.8)] transition duration-300 group-hover:border-pink-400/60 group-hover:shadow-[0_10px_28px_-14px_rgba(236,72,153,0.5)]"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {section.items.map((item) => (
                        <div key={`${section.title}-${item.name}`} className="rounded-lg border border-white/5 bg-white/5 p-3">
                          <p className="text-sm md:text-base font-semibold text-white leading-6">{item.name}</p>
                          {item.role ? <p className="text-xs text-[#cdd5f7]">{item.role}</p> : null}
                          {item.timeline ? <p className="text-[11px] text-[#8ea0d0]">{item.timeline}</p> : null}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProfessionalDevelopment;
