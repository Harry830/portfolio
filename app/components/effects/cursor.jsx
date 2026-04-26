"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a soft amber blob that lerps toward the pointer and
 * scales up over interactive elements. Hidden on touch devices and when
 * prefers-reduced-motion is set.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let target = { ...pos };
    let ringPos = { ...pos };
    let scale = 1;
    let scaleTarget = 1;
    let rafId;

    const move = (e) => {
      target = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.32;
      pos.y += (target.y - pos.y) * 0.32;
      ringPos.x += (target.x - ringPos.x) * 0.14;
      ringPos.y += (target.y - ringPos.y) * 0.14;
      scale += (scaleTarget - scale) * 0.18;

      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;

      rafId = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const t = e.target;
      if (t && t.closest && t.closest("a, button, [data-cursor-hover], input, textarea")) {
        scaleTarget = 2.4;
        ring.classList.add("is-hover");
      }
    };
    const onOut = (e) => {
      const t = e.target;
      if (t && t.closest && t.closest("a, button, [data-cursor-hover], input, textarea")) {
        scaleTarget = 1;
        ring.classList.remove("is-hover");
      }
    };

    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerenter", onEnter);
    document.addEventListener("pointerleave", onLeave);

    document.documentElement.classList.add("cursor-on");
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerenter", onEnter);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("cursor-on");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
