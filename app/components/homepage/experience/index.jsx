"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { experiences } from "@/utils/data/experience";
import Magnetic from "@/app/components/effects/magnetic";

const EASE = [0.22, 1, 0.36, 1];

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardItem = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: EASE },
  },
};

const cardItemLarge = {
  hidden: { y: 60, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

const HEADLINE_WORDS = [
  { text: "Where", italic: false, accent: false },
  { text: "I'm", italic: false, accent: false },
  { text: "building", italic: true, accent: true },
  { text: ".", italic: false, accent: false, attached: true },
];

/* -------------------------------------------------------------------- */
/* Scramble: decode-style reveal of a string when in viewport.          */
/* -------------------------------------------------------------------- */
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789";

function Scramble({ text, className, reduce, delay = 0 }) {
  const ref = useRef(null);
  const [out, setOut] = useState(reduce ? text : "");

  useEffect(() => {
    if (reduce) {
      setOut(text);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let started = false;
    let raf = 0;
    let timeoutId = 0;

    const run = () => {
      const target = text;
      const duration = 750; // ms
      const start = performance.now();
      const queue = target.split("").map((ch) => ({
        from: SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
        to: ch,
        startAt: Math.random() * 0.5,
        endAt: 0.5 + Math.random() * 0.5,
      }));
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        let s = "";
        for (const q of queue) {
          if (t < q.startAt) {
            s += `<span style="color:var(--amber-deep);opacity:0.65">${q.from}</span>`;
          } else if (t > q.endAt) {
            s += q.to;
          } else {
            const c =
              SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            s += `<span style="color:var(--amber-deep);opacity:0.85">${c}</span>`;
          }
        }
        if (el) el.innerHTML = s;
        if (t < 1) raf = requestAnimationFrame(tick);
        else if (el) el.textContent = target;
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          timeoutId = window.setTimeout(run, delay);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timeoutId);
    };
  }, [text, reduce, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
    </span>
  );
}

/* -------------------------------------------------------------------- */
/* SVG corner brackets — drawn into each card on entry.                 */
/* -------------------------------------------------------------------- */
function CornerBrackets({ featured }) {
  const cls = `exp-bracket${featured ? " exp-bracket--featured" : ""}`;
  return (
    <>
      <svg className={cls} style={{ top: 8, left: 8 }} viewBox="0 0 28 28" aria-hidden>
        <path d="M 1 14 L 1 1 L 14 1" />
      </svg>
      <svg className={cls} style={{ top: 8, right: 8 }} viewBox="0 0 28 28" aria-hidden>
        <path d="M 14 1 L 27 1 L 27 14" />
      </svg>
      <svg className={cls} style={{ bottom: 8, left: 8 }} viewBox="0 0 28 28" aria-hidden>
        <path d="M 1 14 L 1 27 L 14 27" />
      </svg>
      <svg className={cls} style={{ bottom: 8, right: 8 }} viewBox="0 0 28 28" aria-hidden>
        <path d="M 27 14 L 27 27 L 14 27" />
      </svg>
    </>
  );
}


function HeadlineWord({ children, i, italic, accent, reduce }) {
  if (reduce) {
    return (
      <span
        className={italic ? "editorial-italic" : ""}
        style={{ color: accent ? "var(--amber-deep)" : "inherit" }}
      >
        {children}
      </span>
    );
  }
  return (
    <span className="word-mask">
      <motion.span
        initial={{ y: "115%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: 0.9,
          ease: EASE,
          delay: i * 0.06,
        }}
        className={italic ? "editorial-italic" : ""}
        style={{
          color: accent ? "var(--amber-deep)" : "inherit",
          display: "inline-block",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* -------------------------------------------------------------------- */
/* Per-card spotlight (mouse-tracked radial wash). Hooks live here so   */
/* each card has its own motion-value scope.                            */
/* -------------------------------------------------------------------- */
function ExperienceCard({ exp, featured, reduce }) {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const [hover, setHover] = useState(false);

  // 3D tilt — normalized -0.5..0.5 then mapped to small rotation, springed.
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(tiltYRaw, [-0.5, 0.5], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(tiltXRaw, [-0.5, 0.5], [-10, 10]), springCfg);
  const lift = useSpring(0, springCfg);

  const spotlight = useMotionTemplate`radial-gradient(${
    featured ? "360px" : "280px"
  } circle at ${mouseX}px ${mouseY}px, ${
    featured ? "rgba(255,255,255,0.10)" : "var(--amber-tint)"
  }, transparent 70%)`;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const lx = e.clientX - rect.left;
    const ly = e.clientY - rect.top;
    mouseX.set(lx);
    mouseY.set(ly);
    tiltXRaw.set(lx / rect.width - 0.5);
    tiltYRaw.set(ly / rect.height - 0.5);
  };

  const handleLeave = () => {
    setHover(false);
    tiltXRaw.set(0);
    tiltYRaw.set(0);
    lift.set(0);
  };

  const handleEnter = () => {
    setHover(true);
    lift.set(-6);
  };

  return (
    <motion.div
      variants={reduce ? undefined : cardContainer}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.25 }}
      onPointerMove={reduce ? undefined : handleMove}
      onPointerEnter={reduce ? undefined : handleEnter}
      onPointerLeave={reduce ? undefined : handleLeave}
      style={
        reduce
          ? undefined
          : {
              transformPerspective: 1100,
              rotateX,
              rotateY,
              y: lift,
              transformStyle: "preserve-3d",
              transformOrigin: "center",
            }
      }
      className={`relative overflow-hidden ${
        featured ? "surface-ink p-6 lg:p-8" : "surface-paper lift p-6 lg:p-8"
      }`}
    >
      {/* Animated SVG corner brackets — drawn-in on entry */}
      <CornerBrackets featured={featured} />

      {/* Featured card animated grain overlay */}
      {featured && !reduce && <span aria-hidden className="exp-grain" />}
      {/* Tier 2B — slowly morphing organic blob behind featured chrome */}
      {featured && !reduce && (
        <span
          aria-hidden
          className="exp-morph-blob pointer-events-none absolute"
          style={{
            top: "-20%",
            left: "10%",
            width: "70%",
            height: "140%",
            background:
              "radial-gradient(circle, var(--amber-tint), transparent 70%)",
            filter: "blur(24px)",
            opacity: 0.6,
            zIndex: 0,
          }}
        />
      )}

      {/* Tier 1B — mouse-tracked spotlight */}
      {!reduce && (
        <AnimatePresence>
          {hover && (
            <motion.div
              key="spot"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: featured ? 0.5 : 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="pointer-events-none absolute inset-0"
              style={{ background: spotlight, zIndex: 1 }}
            />
          )}
        </AnimatePresence>
      )}

      {/* Existing chrome shimmer (one-pass) on featured card */}
      {featured && !reduce && (
        <motion.span
          aria-hidden
          initial={{ x: "-120%" }}
          whileInView={{ x: "220%" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
          className="pointer-events-none absolute top-0 bottom-0 w-[60%]"
          style={{
            left: 0,
            background:
              "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
            mixBlendMode: "overlay",
            zIndex: 2,
          }}
        />
      )}

      {featured && (
        <motion.p
          variants={reduce ? undefined : cardItem}
          className="mono text-[10px] tracking-[0.22em] uppercase text-[var(--chrome-2)] mb-3 relative"
          style={{ zIndex: 3 }}
        >
          Featured
        </motion.p>
      )}
      <motion.h3
        variants={reduce ? undefined : cardItem}
        className={`display-md relative ${
          featured ? "chrome-text" : "text-[var(--ink)]"
        }`}
        style={{ zIndex: 3 }}
      >
        {exp.title}
      </motion.h3>
      <motion.p
        variants={reduce ? undefined : cardItem}
        className={`mt-2 text-base font-medium relative ${
          featured ? "text-[var(--chrome-1)]" : "text-[var(--amber-deep)]"
        }`}
        style={{ zIndex: 3 }}
      >
        <Scramble text={exp.company} reduce={reduce} delay={350} />
      </motion.p>
      {exp.summary ? (
        <motion.p
          variants={reduce ? undefined : cardItem}
          className={`mt-4 text-[15px] leading-relaxed relative ${
            featured ? "text-[var(--chrome-1)]/80" : "text-[var(--ink-muted)]"
          }`}
          style={{ zIndex: 3 }}
        >
          {exp.summary}
        </motion.p>
      ) : null}

      {exp.bullets?.length ? (
        <ul className="mt-5 space-y-2.5 relative" style={{ zIndex: 3 }}>
          {exp.bullets.map((b) => (
            <motion.li
              key={b}
              variants={reduce ? undefined : cardItem}
              className={`flex items-start gap-3 text-sm leading-relaxed ${
                featured ? "text-[var(--chrome-1)]/85" : "text-[var(--ink-soft)]"
              }`}
            >
              <span
                aria-hidden
                className={`mt-2 h-1 w-3 flex-none rounded-full ${
                  featured ? "bg-[var(--chrome-1)]" : "bg-[var(--amber)]"
                }`}
              />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>
      ) : null}
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/* Per-row wrapper. Owns the row ref → number-glyph parallax, dot ping, */
/* and exposes the ref upward so the section can run an IO active-row   */
/* tracker for the chapter indicator.                                   */
/* -------------------------------------------------------------------- */
function ExperienceRow({ exp, i, total, reduce, registerRowRef }) {
  const liRef = useRef(null);
  const featured = exp.isFeatured;

  useEffect(() => {
    registerRowRef(i, liRef.current);
    return () => registerRowRef(i, null);
  }, [i, registerRowRef]);

  const { scrollYProgress: rowProgress } = useScroll({
    target: liRef,
    offset: ["start end", "end start"],
  });
  // Wider parallax + spring smoothing so the glyph drifts instead of locking to scroll.
  const glyphYRaw = useTransform(rowProgress, [0, 1], [110, -110]);
  const glyphYSmooth = useSpring(glyphYRaw, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });
  // Subtle breathe — peaks mid-row, eases at the edges.
  const glyphScaleRaw = useTransform(
    rowProgress,
    [0, 0.5, 1],
    [0.98, 1.02, 0.98]
  );
  const glyphScaleSmooth = useSpring(glyphScaleRaw, {
    stiffness: 60,
    damping: 20,
  });
  const glyphY = reduce ? 0 : glyphYSmooth;
  const glyphScale = reduce ? 1 : glyphScaleSmooth;

  const card = (
    <ExperienceCard exp={exp} featured={featured} reduce={reduce} />
  );

  const cardRise = (
    <motion.div
      variants={reduce ? undefined : cardItemLarge}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.25 }}
    >
      {card}
    </motion.div>
  );

  return (
    <li
      ref={liRef}
      data-row-index={i}
      className="relative pl-10 lg:pl-0 lg:grid lg:grid-cols-12 lg:gap-10 mb-12 lg:mb-16"
    >
      {/* Tier 1C — giant outlined chapter glyph */}
      <motion.span
        aria-hidden
        initial={reduce ? false : { scale: 0.9, opacity: 0 }}
        whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ y: glyphY }}
        className="hidden lg:block pointer-events-none absolute select-none editorial-italic"
      >
        <motion.span
          style={{
            position: "absolute",
            top: "-2.5rem",
            left: "calc(50% - 32vw)",
            fontSize: "clamp(7rem, 14vw, 14rem)",
            lineHeight: 0.9,
            color: "transparent",
            WebkitTextStroke: featured
              ? "1px rgba(216,216,219,0.18)"
              : "1px rgba(22,22,26,0.10)",
            zIndex: 0,
            display: "inline-block",
            scale: glyphScale,
            transformOrigin: "center",
          }}
        >
          {String(i + 1).padStart(2, "0")}
        </motion.span>
      </motion.span>

      {/* timeline node dot */}
      <motion.span
        aria-hidden
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={
          reduce ? undefined : { scale: [0, 1.6, 1], opacity: [0, 1, 1] }
        }
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`absolute left-2 lg:left-[calc(50%-7px)] top-3 h-3.5 w-3.5 rounded-full z-10 ${
          featured ? "bg-[var(--amber-deep)]" : "bg-[var(--ink)]"
        }`}
        style={{ boxShadow: "0 0 0 4px var(--bg-cream)" }}
      >
        {featured && !reduce && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[var(--amber-deep)]"
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.span>

      <div className="lg:col-span-5 lg:text-right lg:pr-12 relative z-[2]">
        <p className="mono text-xs uppercase tracking-[0.18em] text-[var(--ink-faint)]">
          {exp.duration}
        </p>
        <p className="mt-1 text-sm text-[var(--ink-muted)]">
          {exp.location}
        </p>
      </div>

      <div className="lg:col-span-7 lg:pl-12 mt-3 lg:mt-0 relative z-[2]">
        {i > 0 && !reduce ? (
          <Magnetic strength={0.08}>{cardRise}</Magnetic>
        ) : (
          cardRise
        )}
      </div>
    </li>
  );
}

/* -------------------------------------------------------------------- */
export default function Experience() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress: railProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });
  const railScaleMotion = useTransform(railProgress, [0, 1], [0, 1]);
  const railScale = reduce ? 1 : railScaleMotion;

  // Tier 1A — comet head + tail positions tied to railProgress.
  // Spring-smoothed so the head lags scroll and settles instead of tracking 1:1.
  const railPctRaw = useTransform(railProgress, [0, 1], [0, 100]);
  const railPctSmooth = useSpring(railPctRaw, {
    stiffness: 80,
    damping: 22,
    mass: 0.6,
  });
  const cometTopMotion = useMotionTemplate`calc(${railPctSmooth}% - 14px)`;
  const cometTailTopMotion = useMotionTemplate`calc(${railPctSmooth}% - 154px)`;

  // Tier 2A — section background blob drifts (vertical + small lateral)
  const blobAYMotion = useTransform(railProgress, [0, 1], [-80, 80]);
  const blobAXMotion = useTransform(railProgress, [0, 1], [-15, 15]);
  const blobBYMotion = useTransform(railProgress, [0, 1], [80, -80]);
  const blobBXMotion = useTransform(railProgress, [0, 1], [15, -15]);

  // Tier 2C — sticky chapter indicator
  const total = experiences.length;
  const [active, setActive] = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const rowRefs = useRef([]);

  const registerRowRef = (i, el) => {
    rowRefs.current[i] = el;
  };

  // Section visibility — controls the indicator's slide-in/out
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIndicatorVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px -20% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Active row tracker — picks the row whose center is closest to viewport center
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const refs = rowRefs.current.filter(Boolean);
      if (!refs.length) return;
      const vc = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      refs.forEach((el) => {
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - vc);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = Number(el.dataset.rowIndex || 0);
        }
      });
      setActive(bestIdx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative my-20 lg:my-28"
      style={{ isolation: "isolate" }}
    >
      {/* Tier 2A — ambient background blobs */}
      {!reduce && (
        <>
          {/* Floating ambient particles */}
          {[
            { left: "8%",  top: "15%", delay: "0s",   dur: "9s",  anim: "a", scale: 1 },
            { left: "22%", top: "55%", delay: "1.2s", dur: "11s", anim: "b", scale: 0.7 },
            { left: "38%", top: "30%", delay: "3s",   dur: "10s", anim: "c", scale: 1.2 },
            { left: "55%", top: "75%", delay: "0.5s", dur: "13s", anim: "a", scale: 0.8 },
            { left: "68%", top: "20%", delay: "2.5s", dur: "9s",  anim: "b", scale: 1.1 },
            { left: "82%", top: "60%", delay: "4s",   dur: "12s", anim: "c", scale: 0.9 },
            { left: "92%", top: "40%", delay: "1.8s", dur: "10s", anim: "a", scale: 0.7 },
            { left: "15%", top: "85%", delay: "3.5s", dur: "11s", anim: "b", scale: 1 },
            { left: "45%", top: "50%", delay: "5s",   dur: "14s", anim: "c", scale: 0.6 },
            { left: "75%", top: "90%", delay: "2s",   dur: "10s", anim: "a", scale: 1 },
          ].map((p, idx) => (
            <span
              key={`p-${idx}`}
              aria-hidden
              className="exp-particle"
              style={{
                left: p.left,
                top: p.top,
                animation: `experience-particle-${p.anim} ${p.dur} ease-in-out ${p.delay} infinite`,
                transform: `scale(${p.scale})`,
                zIndex: 0,
              }}
            />
          ))}

          <motion.span
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              top: "5%",
              left: "-10%",
              width: "60vw",
              height: "50vh",
              background:
                "radial-gradient(circle, var(--amber-soft), transparent 70%)",
              opacity: 0.08,
              filter: "blur(80px)",
              x: blobAXMotion,
              y: blobAYMotion,
              zIndex: -1,
            }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              bottom: "5%",
              right: "-10%",
              width: "50vw",
              height: "40vh",
              background:
                "radial-gradient(circle, var(--ink), transparent 70%)",
              opacity: 0.05,
              filter: "blur(100px)",
              x: blobBXMotion,
              y: blobBYMotion,
              zIndex: -1,
            }}
          />
        </>
      )}

      {/* Tier 2C — sticky chapter indicator (lg only) */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{
          x: indicatorVisible ? 0 : "-110%",
          opacity: indicatorVisible ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: EASE }}
        className="hidden lg:flex items-center surface-paper rounded-r-full px-4 py-2 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]"
        style={{
          position: "fixed",
          top: 80,
          left: 0,
          zIndex: 50,
        }}
      >
        <span style={{ color: "var(--amber-deep)", marginRight: 8 }}>◆</span>
        Experience · {String(active + 1).padStart(2, "0")} /{" "}
        {String(total).padStart(2, "0")}
      </motion.div>

      <header className="mb-12 lg:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">Experience</p>
          <h2 className="mt-4 display-xl text-[var(--ink)]">
            {HEADLINE_WORDS.map((w, i) => (
              <span key={`${w.text}-${i}`}>
                {w.attached || i === 0 ? null : " "}
                <HeadlineWord
                  i={i}
                  italic={w.italic}
                  accent={w.accent}
                  reduce={reduce}
                >
                  {w.text}
                </HeadlineWord>
              </span>
            ))}
          </h2>
        </div>
        <p className="lg:col-span-5 text-base lg:text-lg text-[var(--ink-muted)] leading-relaxed">
          Enterprise systems, research HPC, and hands-on technical work — places
          where things have to actually work, every day.
        </p>
      </header>

      <ol className="relative">
        {/* animated vertical rail with gradient + draw-in. Sits BEHIND cards
            (no z-index) so the line only shows in the gutters between rows.
            The comet, below, sits ABOVE the cards with mix-blend-mode screen
            so the glow reads as a traveling light over the card surface. */}
        <motion.span
          aria-hidden
          className="absolute left-3 lg:left-1/2 top-2 bottom-2 w-px"
          style={{
            scaleY: railScale,
            transformOrigin: "top",
            background:
              "linear-gradient(180deg, var(--amber-deep) 0%, var(--ink) 60%, transparent 100%)",
          }}
        />

        {/* Tier 1A — rail comet (tail + head). Sits in the rail column. */}
        {!reduce && (
          <>
            {/* Tail sits BEHIND cards (no z-index) so it only shows in the
                gutters between rows — prevents the bright streak from cutting
                through dark surfaces like the Mercedes featured card. */}
            <motion.span
              aria-hidden
              className="absolute left-3 lg:left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                top: cometTailTopMotion,
                width: 2,
                height: 140,
                background:
                  "linear-gradient(180deg, transparent 0%, transparent 18%, rgba(200,132,61,0.18) 50%, var(--amber) 100%)",
                mixBlendMode: "screen",
                opacity: 0.7,
              }}
            />
            {/* Head sits BEHIND cards too — comet only visible in gutters,
                never painting over card surfaces. */}
            <motion.span
              aria-hidden
              className="absolute left-3 lg:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full pointer-events-none"
              style={{
                top: cometTopMotion,
                background:
                  "radial-gradient(circle, var(--amber-deep) 0%, var(--amber) 40%, transparent 70%)",
                boxShadow: "0 0 36px 6px rgba(200,132,61,0.65)",
                mixBlendMode: "screen",
              }}
            >
              <span aria-hidden className="exp-comet-halo" />
            </motion.span>
          </>
        )}

        {experiences.map((exp, i) => (
          <ExperienceRow
            key={exp.id}
            exp={exp}
            i={i}
            total={total}
            reduce={reduce}
            registerRowRef={registerRowRef}
          />
        ))}
      </ol>
    </section>
  );
}
