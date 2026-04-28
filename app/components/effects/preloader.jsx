"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * First-load preloader: counter ticks 0 → 100, then a vertical curtain
 * lifts. Locks scroll while visible. Skipped if prefers-reduced-motion.
 */
export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPct(100);
      setDone(true);
      return undefined;
    }

    document.body.style.overflow = "hidden";
    let v = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      v += Math.random() * 9 + 3;
      if (v >= 100) v = 100;
      setPct(Math.floor(v));
      if (v < 100) {
        setTimeout(tick, 60 + Math.random() * 80);
      } else {
        setTimeout(() => {
          if (!cancelled) setDone(true);
        }, 450);
      }
    };
    tick();

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-101%",
            transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="preloader-grid">
            <motion.p
              className="preloader-eyebrow mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.2 } }}
            >
              ◆ Hardik · Portfolio · 2026
            </motion.p>

            <motion.h1
              className="preloader-name editorial"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 } }}
            >
              Hardik{" "}
              <span className="editorial-italic" style={{ color: "var(--amber-soft)" }}>
                Saini
              </span>
            </motion.h1>

            <div className="preloader-counter mono">
              <span>{String(pct).padStart(3, "0")}</span>
              <span className="preloader-counter-pct">%</span>
            </div>

            <div className="preloader-bar">
              <motion.div
                className="preloader-bar-fill"
                style={{ scaleX: pct / 100 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
