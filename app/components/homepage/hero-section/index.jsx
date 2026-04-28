"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";
import Magnetic from "@/app/components/effects/magnetic";

const PILLARS = [
  { k: "01", v: "CS @ Georgia State" },
  { k: "02", v: "ARCTIC HPC team" },
  { k: "03", v: "Mercedes-Benz USA · Summer '26" },
  { k: "04", v: "Startup builder" },
];

const reveal = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: 0,
    transition: {
      duration: 1.05,
      ease: [0.22, 1, 0.36, 1],
      delay: 1.4 + i * 0.07, // wait for preloader curtain
    },
  }),
};

function Word({ children, i, italic = false, accent = false, mute = false }) {
  return (
    <span className="word-mask">
      <motion.span
        variants={reveal}
        initial="hidden"
        animate="show"
        custom={i}
        className={italic ? "editorial-italic" : ""}
        style={{
          color: accent ? "var(--amber-deep)" : mute ? "var(--ink-muted)" : "inherit",
          display: "inline-block",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Live clock for the hero ticker
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative pt-36 pb-20 lg:pt-48 lg:pb-28"
      id="top"
    >
      {/* status row */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 mb-12 lg:mb-20"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.3 } }}
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--amber)] opacity-60 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--amber-deep)]" />
          </span>
          <p className="eyebrow">Available · Summer & Fall 2026</p>
        </div>
        <p className="mono text-[11px] tracking-[0.22em] uppercase text-[var(--ink-faint)]">
          Atlanta, GA · {now} ET
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left: Hero text */}
        <div className="lg:col-span-7">
          <motion.h1
            style={{ scale, opacity, y }}
            className="display-xxl text-[var(--ink)] origin-top-left"
          >
            <div>
              <Word i={0} mute>
                Hey I&apos;m
              </Word>
            </div>
            <div>
              <Word i={1}>Hardik</Word>
            </div>
            <div>
              <Word i={2} italic accent>
                Saini
              </Word>
            </div>
          </motion.h1>
        </div>

        {/* Right: Profile photo - elegant with stylish borders */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: -5 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            rotate: 0,
            transition: { 
              duration: 1.4, 
              ease: [0.22, 1, 0.36, 1], 
              delay: 1.8 
            } 
          }}
          className="lg:col-span-5 flex justify-center lg:justify-end relative"
        >
          {/* Floating geometric shapes behind */}
          <motion.div
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 8, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 lg:right-12 w-40 h-40 rounded-3xl bg-gradient-to-br from-[var(--amber)] to-[var(--amber-deep)] opacity-15 blur-2xl"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -12, 0],
              scale: [1, 1.08, 1]
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            className="absolute bottom-8 left-0 lg:left-8 w-32 h-32 rounded-full bg-gradient-to-br from-[var(--ink)] to-[var(--ink-soft)] opacity-12 blur-xl"
          />

          {/* Main photo container with elegant frame */}
          <motion.div
            whileHover={{ 
              scale: 1.03, 
              y: -8
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {/* Dramatic shadow layers */}
            <div className="absolute inset-0 translate-y-10 translate-x-5 blur-3xl opacity-20 bg-[var(--ink)] rounded-2xl" />
            <div className="absolute inset-0 translate-y-5 translate-x-2 blur-xl opacity-12 bg-[var(--amber-deep)] rounded-2xl" />
            
            {/* Elegant border frame */}
            <div className="relative">
              {/* Outer decorative corners - thin elegant lines */}
              <motion.div 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 w-20 h-20"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--amber-deep)] to-transparent" />
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[var(--amber-deep)] to-transparent" />
              </motion.div>
              
              <motion.div 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-6 -right-6 w-20 h-20"
              >
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[var(--amber-deep)] to-transparent" />
                <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-[var(--amber-deep)] to-transparent" />
              </motion.div>

              {/* Photo with subtle inner border */}
              <div className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-2xl overflow-hidden">
                {/* Subtle inner glow border */}
                <div className="absolute inset-0 rounded-2xl border border-[var(--amber)]/30 z-10 pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(200,132,61,0.1)] z-10 pointer-events-none" />
                
                <img
                  src="/profile-cutout.jpg"
                  alt="Hardik Saini"
                  className="w-full h-full object-cover object-center"
                  style={{
                    filter: 'contrast(1.05) saturate(1.1)',
                  }}
                  onError={(e) => {
                    e.target.src = personalData.profile;
                  }}
                />
                
                {/* Elegant gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--ink)]/20 to-transparent pointer-events-none" />
              </div>

              {/* Minimalist accent dots */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-[var(--amber-deep)]"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.25
                }}
                className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-[var(--amber-deep)]"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 2.05 } }}
        className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
      >
        <div className="lg:col-span-7">
          <p className="text-lg lg:text-xl text-[var(--ink-muted)] leading-relaxed max-w-2xl">
            I turn messy real-world workflows into systems people actually want
            to use — joining{" "}
            <span className="text-[var(--ink)] font-medium">Mercedes-Benz USA</span>{" "}
            this summer as an SAP &amp; Innovation intern, operating research HPC with{" "}
            <span className="text-[var(--ink)] font-medium">GSU&apos;s ARCTIC team</span>
            , and shipping startup ideas through{" "}
            <span className="text-[var(--ink)] font-medium">CreateX</span>.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.3}>
              <Link href="#work" className="btn-primary no-underline">
                See selected work <span aria-hidden>↓</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href={personalData.resume}
                target="_blank"
                className="btn-ghost no-underline"
              >
                Resume <span aria-hidden>↗</span>
              </Link>
            </Magnetic>
          </div>
        </div>

        <ul className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-3">
          {PILLARS.map((p) => (
            <li
              key={p.k}
              className="flex items-baseline gap-3 border-t border-[var(--line)] pt-3"
            >
              <span className="mono text-xs text-[var(--ink-faint)]">{p.k}</span>
              <span className="text-sm text-[var(--ink-soft)]">{p.v}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, delay: 2.6 } }}
        className="mt-20 flex items-center justify-center gap-3 mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-faint)]"
        aria-hidden
      >
        <span>scroll</span>
        <motion.span
          className="block h-px w-10 bg-[var(--ink-faint)] origin-left"
          animate={{ scaleX: [1, 1.6, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
