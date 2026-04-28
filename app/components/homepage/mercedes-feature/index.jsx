"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";

/**
 * Mercedes-Benz feature with a scroll-pinned roll-in.
 *
 * The section is tall (~200vh) and the visual stage sits inside a
 * `position: sticky; height: 100vh;` container, so the stage stays pinned in
 * the viewport while `scrollYProgress` (0 → 1) drives a single, simple
 * choreography: the fully-formed Mercedes star rolls in from off-screen-right
 * to center while spinning, like a polished hubcap rolling onto stage. After
 * it settles, the title and meta rise into place. The page never actually
 * stops — the user just scrolls through a tall section whose contents are
 * pinned, which plays nicely with Lenis smooth scrolling.
 */
export default function MercedesFeature() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Stage / atmosphere
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.2, 0.55, 0.65, 0.55]
  );

  // Roll-in: the star starts ~110vw to the right of its anchored slot and
  // translates to 0 while spinning. The animation now spans nearly the
  // whole pinned section so it feels measured rather than flicked.
  // Rotation goes 360° → 0° — exactly one revolution, which from the
  // camera reads as the logo rolling to the LEFT.
  const logoXVw = useTransform(scrollYProgress, [0.05, 0.85], [110, 0]);
  const logoX = useMotionTemplate`${logoXVw}vw`;
  const logoRotate = useTransform(scrollYProgress, [0.05, 0.85], [360, 0]);

  // Tiny settle once the roll lands — a hint of squash on touchdown.
  const logoScale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.8, 0.9, 1],
    [0.92, 0.92, 0.97, 1.03, 1]
  );

  // Glow under the logo only fires once the star has landed.
  const glowOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.95, 1],
    [0, 0.5, 0.4]
  );

  // Text — fades up once the section enters view and stays put. We use
  // viewport intersection (whileInView) for the title and meta because
  // they should be readable for the entire duration the section is
  // pinned, not just at the tail end of the scroll progress.

  // Progress hint — visible across the pin, swaps copy once the logo
  // has finished rolling, fades out at the very end.
  const hintOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.94, 1],
    [0, 1, 1, 0]
  );
  const hintLabelOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.8, 0.88],
    [0, 1, 1, 0]
  );
  const hintDoneOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.88, 0.96, 1],
    [0, 1, 1, 0]
  );

  // Reduced-motion: render a static, fully-formed star without the pin.
  if (reduced) {
    return (
      <section
        className="bleed mercedes-scene relative my-24 lg:my-36"
        aria-label="Featured: Mercedes-Benz USA internship — Summer 2026"
      >
        <span className="chrome-rail top-0 left-0 right-0" />
        <span className="chrome-rail bottom-0 left-0 right-0" />
        <div className="mercedes-stage">
          <div className="mercedes-copy">
            <p className="mono text-[10px] tracking-[0.32em] uppercase text-[var(--chrome-2)] mb-6">
              ◆ Featured · Summer 2026
            </p>
            <h2 className="mercedes-title chrome-text">
              <span className="block">Joining</span>
              <span className="block editorial-italic">@ Mercedes-Benz</span>
              <span className="block">USA</span>
            </h2>
            <div className="mt-8 lg:mt-10">
              <MercedesMeta />
            </div>
          </div>
          <div className="mercedes-stage-logo">
            <div aria-hidden className="mercedes-star">
              <img
                src="/mercedes-logo.png"
                alt=""
                draggable={false}
                width={1024}
                height={1024}
                className="mercedes-logo-img"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="bleed mercedes-pin"
      aria-label="Featured: Mercedes-Benz USA internship — Summer 2026"
      style={{
        position: "relative",
        height: "280vh",
        background: "linear-gradient(180deg, var(--charcoal) 0%, #050507 100%)",
      }}
    >
      <div
        className="mercedes-sticky mercedes-scene"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          isolation: "isolate",
        }}
      >
        {/* horizon rails */}
        <span className="chrome-rail top-0 left-0 right-0" />
        <span className="chrome-rail bottom-0 left-0 right-0" />

        {/* vignette wash */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: vignetteOpacity,
            background:
              "radial-gradient(70% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.78) 100%)",
          }}
        />

        {/* soft chrome floor glow under the landing zone — sits under the
            right column where the logo settles, not at viewport center */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            right: "12vw",
            width: "min(40vw, 520px)",
            height: "min(40vw, 520px)",
            background:
              "radial-gradient(circle, rgba(243,243,244,0.4) 0%, rgba(243,243,244,0) 65%)",
            opacity: glowOpacity,
            filter: "blur(20px)",
          }}
        />

        {/* Two-column stage: text on the left, the rolling logo on the
            right. The grid keeps both elements vertically centered in the
            pinned 100vh viewport. */}
        <div className="mercedes-stage">
          <div className="mercedes-copy">
            <p className="mono text-[10px] tracking-[0.32em] uppercase text-[var(--chrome-2)] mb-6">
              ◆ Featured · Summer 2026
            </p>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mercedes-title chrome-text"
            >
              <span className="block">Joining</span>
              <span className="block editorial-italic">@ Mercedes-Benz</span>
              <span className="block">USA</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 lg:mt-10"
            >
              <MercedesMeta />
            </motion.div>
          </div>

          {/* the star — actual Mercedes-Benz mark from Wikimedia,
              rasterised once to a transparent 1024² PNG so the GPU can
              rotate it as a single texture (vs. re-rasterising 1.4 MB of
              vector paths every frame). */}
          <div className="mercedes-stage-logo">
            <motion.div
              aria-hidden
              className="mercedes-star is-pinned"
              style={{
                x: logoX,
                rotate: logoRotate,
                scale: logoScale,
              }}
            >
              <img
                src="/mercedes-logo.png"
                alt=""
                draggable={false}
                width={1024}
                height={1024}
                className="mercedes-logo-img"
              />
            </motion.div>
          </div>
        </div>

        {/* pinned scroll-progress hint */}
        <motion.div
          className="mercedes-hint"
          style={{ opacity: hintOpacity }}
          aria-hidden
        >
          <div className="mercedes-hint-track">
            <motion.div
              className="mercedes-hint-fill"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <motion.p
            className="mercedes-hint-label"
            style={{ opacity: hintLabelOpacity }}
          >
            Scroll · rolling in
          </motion.p>
          <motion.p
            className="mercedes-hint-label is-done"
            style={{ opacity: hintDoneOpacity }}
          >
            Scroll · continue
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function MercedesMeta() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="border-t border-white/15 pt-4">
          <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--chrome-2)]">
            Role
          </p>
          <p className="mt-2 text-[var(--chrome-1)] text-base">
            SAP &amp; Innovation Intern
          </p>
        </div>
        <div className="border-t border-white/15 pt-4">
          <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--chrome-2)]">
            When
          </p>
          <p className="mt-2 text-[var(--chrome-1)] text-base">Summer 2026</p>
        </div>
        <div className="border-t border-white/15 pt-4">
          <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--chrome-2)]">
            Where
          </p>
          <p className="mt-2 text-[var(--chrome-1)] text-base">
            MBUSA HQ · Atlanta, GA
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-[var(--chrome-1)]/80 text-base lg:text-lg leading-relaxed">
        Joining the SAP &amp; Innovation team to support enterprise integrations,
        internal tooling, and workflow automation that scales across business
        units — bridging engineering rigor with operational reality at a global
        automotive enterprise.
      </p>
    </>
  );
}
