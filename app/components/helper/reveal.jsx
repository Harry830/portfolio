"use client";

import { useEffect } from "react";

/**
 * Mounts a single IntersectionObserver that progressively reveals
 * any element with the `.reveal` class. No deps, no per-component state.
 */
const Reveal = () => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = document.querySelectorAll(".reveal");

    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => io.observe(el));

    // Re-scan when client-side content swaps in.
    const mo = new MutationObserver(() => {
      document
        .querySelectorAll(".reveal:not(.is-visible)")
        .forEach((el) => io.observe(el));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
};

export default Reveal;
