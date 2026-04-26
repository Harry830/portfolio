"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#programs", label: "Programs" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section-aware highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: [0.3], rootMargin: "-20% 0px -60% 0px" }
    );

    NAV.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(246, 242, 234, 0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(120%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(120%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(22, 22, 26, 0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <nav className="flex items-center justify-between py-4 lg:py-5">
          <Link
            href="/"
            className="group flex items-baseline gap-2 no-underline"
            aria-label="Hardik Saini — Home"
          >
            <span className="editorial text-[1.55rem] leading-none text-[var(--ink)] tracking-tight">
              Hardik
            </span>
            <span className="editorial-italic text-[1.55rem] leading-none text-[var(--amber-deep)]">
              Saini
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors no-underline ${
                    activeSection === item.href
                      ? "text-[var(--ink)]"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                  <span
                    className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-px bg-[var(--amber-deep)] transition-transform duration-500 origin-left"
                    style={{
                      transform: activeSection === item.href ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <Link href="#contact" className="btn-primary text-xs no-underline">
                Let's talk
                <span aria-hidden>↗</span>
              </Link>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--paper)]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block w-4 h-[10px]">
              <span
                className="absolute left-0 right-0 top-0 h-px bg-[var(--ink)] transition-transform duration-300"
                style={{ transform: open ? "translateY(5px) rotate(45deg)" : "none" }}
              />
              <span
                className="absolute left-0 right-0 bottom-0 h-px bg-[var(--ink)] transition-transform duration-300"
                style={{ transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </nav>

        {/* Mobile drawer */}
        <div
          id="mobile-nav"
          className="md:hidden overflow-hidden transition-[max-height,opacity] duration-500"
          style={{
            maxHeight: open ? "420px" : "0px",
            opacity: open ? 1 : 0,
          }}
        >
          <ul className="flex flex-col gap-1 pb-5">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] no-underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary no-underline"
              >
                Let's talk
                <span aria-hidden>↗</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
