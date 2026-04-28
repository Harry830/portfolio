"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projectsData } from "@/utils/data/projects-data";
import ProjectTile from "./project-tile";

/**
 * Pinned horizontal scroller. The user scrolls vertically; the tiles
 * translate horizontally. Each tile is its own framed card with a placeholder
 * gradient hero (real images drop into /public/image/projects/* later).
 *
 * On mobile (<768px), converts to vertical stacked cards for better UX.
 *
 * Translation is calculated from MEASURED track + viewport widths so the last
 * tile lands flush right with no empty trailing gutter.
 */
export default function HorizontalWork() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const tiles = projectsData.length;

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      // Right-align the last tile, plus a tiny breathing pad so it isn't kissing the edge
      const max = Math.max(0, trackWidth - viewportWidth + 16);
      setMaxTranslate(max);
    };
    measure();
    // Run again after fonts/images settle
    const t = setTimeout(measure, 120);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);
  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="work" aria-label="Selected work">
      {/* Desktop (lg+): pinned horizontal scroller */}
      <div
        ref={ref}
        className="relative hidden lg:block"
        style={{ height: `${(tiles + 1) * 75}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center pt-32 lg:pt-40 pb-20">
          {/* Header lockup */}
          <div className="absolute top-8 lg:top-12 left-0 right-0 px-5 sm:px-8 lg:px-12 z-10 pointer-events-none">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Selected Work</p>
                <h2 className="display-lg mt-2 text-[var(--ink)]">
                  Things I&apos;ve <span className="editorial-italic text-[var(--amber-deep)]">shipped</span>.
                </h2>
              </div>
              <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)] pb-2">
                {String(tiles).padStart(2, "0")} projects · scroll
              </p>
            </div>
          </div>

          <motion.div
            ref={trackRef}
            style={{ x }}
            className="horizontal-track flex gap-6 lg:gap-10 will-change-transform pl-5 sm:pl-8 lg:pl-12 pr-[8vw]"
          >
            {/* intro card */}
            <article className="hwork-tile hwork-intro">
              <p className="mono text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">
                ◆ Featured Reel · 2026
              </p>
              <h3 className="display-md mt-6 text-[var(--ink)]">
                Five projects.
                <br />
                <span className="editorial-italic text-[var(--amber-deep)]">
                  Two years of building.
                </span>
              </h3>
              <p className="mt-6 text-base text-[var(--ink-muted)] leading-relaxed">
                Each tile is a product I designed, architected, or shipped.
                Real users, real constraints — not coursework.
              </p>
              <p className="mt-8 mono text-xs text-[var(--ink-faint)]">
                ↳ keep scrolling
              </p>
            </article>

            {projectsData.map((project, i) => (
              <ProjectTile key={project.id} project={project} index={i} />
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-8 left-5 right-5 sm:left-8 sm:right-8 lg:left-12 lg:right-12 z-10">
            <div className="flex items-center gap-4">
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
                Progress
              </span>
              <div className="flex-1 h-px bg-[var(--line)] relative overflow-hidden">
                <motion.div
                  style={{ width: progressBar }}
                  className="absolute inset-y-0 left-0 bg-[var(--amber-deep)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet & mobile (<lg): vertical stacked cards */}
      <div className="lg:hidden my-16 sm:my-20">
        <div className="mb-10">
          <p className="eyebrow">Selected Work</p>
          <h2 className="display-lg mt-2 text-[var(--ink)]">
            Things I&apos;ve <span className="editorial-italic text-[var(--amber-deep)]">shipped</span>.
          </h2>
        </div>

        <div className="space-y-10 sm:space-y-12">
          {projectsData.map((project, i) => (
            <ProjectTile key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
