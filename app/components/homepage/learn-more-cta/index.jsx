"use client";

import Link from "next/link";
import Magnetic from "../../effects/magnetic";

export default function LearnMoreCTA() {
  return (
    <section className="relative my-20 lg:my-28">
      <div className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">More</span>
        <h2 className="display-lg mt-4">
          Want to <span className="editorial-italic text-[var(--amber-deep)]">learn more</span> about me?
        </h2>
        <p className="mt-5 text-[var(--ink-muted)] text-base lg:text-lg leading-relaxed">
          Programs, leadership, skills, education, and recognition — the longer story
          lives on a page of its own.
        </p>
        <div className="mt-8 flex justify-center">
          <Magnetic>
            <Link href="/about" className="btn-primary no-underline">
              About me
              <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
