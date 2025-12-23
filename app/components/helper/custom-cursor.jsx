"use client";

import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    setEnabled(true);
    return undefined;
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    if (!dotEl || !ringEl) return undefined;

    target.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    position.current = { ...target.current };

    const handleMove = (event) => {
      target.current = { x: event.clientX, y: event.clientY };
      dotEl.style.opacity = "1";
      ringEl.style.opacity = "1";
    };

    const handleEnter = () => {
      document.body.classList.add("custom-cursor-active");
      dotEl.style.opacity = "1";
      ringEl.style.opacity = "1";
    };

    const handleLeave = () => {
      document.body.classList.remove("custom-cursor-active");
      dotEl.style.opacity = "0";
      ringEl.style.opacity = "0";
    };

    const handleDown = () => {
      dotEl.classList.add("cursor-active");
      ringEl.classList.add("cursor-active");
    };

    const handleUp = () => {
      dotEl.classList.remove("cursor-active");
      ringEl.classList.remove("cursor-active");
    };

    const render = () => {
      position.current.x = target.current.x;
      position.current.y = target.current.y;
      const { x, y } = position.current;
      const transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(var(--cursor-scale, 1))`;
      dotEl.style.transform = transform;
      ringEl.style.transform = transform;
      rafRef.current = window.requestAnimationFrame(render);
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerenter", handleEnter);
    document.addEventListener("pointerleave", handleLeave);
    document.addEventListener("pointerdown", handleDown);
    document.addEventListener("pointerup", handleUp);
    rafRef.current = window.requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerenter", handleEnter);
      document.removeEventListener("pointerleave", handleLeave);
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
};

export default CustomCursor;
