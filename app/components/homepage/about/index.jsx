import Image from "next/image";
import { personalData } from "@/utils/data/personal-data";

const FACTS = [
  { k: "Based in", v: "Atlanta, GA" },
  { k: "Studying", v: "BS Computer Science · Honors" },
  { k: "GPA", v: "4.28 / 4.30" },
  { k: "Now", v: "ARCTIC HPC + MBUSA + CreateX" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative my-20 lg:my-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left: portrait + facts */}
        <div className="reveal reveal-up lg:col-span-5">
          <div className="relative w-full max-w-md">
            <div className="surface-paper p-2 lg:p-2.5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[var(--bg-cream-warm)]">
                <Image
                  src={personalData.profile}
                  alt={`Portrait of ${personalData.name}`}
                  fill
                  sizes="(min-width: 1024px) 420px, 80vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>
            {/* signature accent */}
            <span
              aria-hidden
              className="absolute -bottom-3 -right-3 px-4 py-2 bg-[var(--ink)] text-[var(--paper)] mono text-[10px] uppercase tracking-[0.22em] rounded-full"
            >
              Hardik · 2026
            </span>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
            {FACTS.map((f) => (
              <div key={f.k} className="border-t border-[var(--line)] pt-3">
                <dt className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                  {f.k}
                </dt>
                <dd className="mt-1 text-sm text-[var(--ink-soft)]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: about copy */}
        <div className="reveal reveal-up delay-160 lg:col-span-7 lg:pt-6">
          <p className="eyebrow">About</p>
          <h2 className="mt-4 display-lg text-[var(--ink)]">
            I prefer <span className="editorial-italic text-[var(--amber-deep)]">building</span> over talking.
          </h2>
          <div className="mt-6 space-y-5 text-[var(--ink-muted)] text-base lg:text-lg leading-[1.75] max-w-2xl">
            <p>{personalData.description}</p>
            <p>
              I&apos;m drawn to problems that sit at the boundary of software and
              infrastructure — the messy seam where the system breaks under real
              usage. That&apos;s where I do my best work.
            </p>
            <p>
              When I&apos;m not building, I&apos;m at the gym, watching cricket, or
              tearing apart hardware to see how it works.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
