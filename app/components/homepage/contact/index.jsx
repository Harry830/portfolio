"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { personalData } from "@/utils/data/personal-data";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import Magnetic from "@/app/components/effects/magnetic";
import ContactForm from "./contact-form";

export default function ContactSection() {
  const [showForm, setShowForm] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The huge email tracks scroll subtly
  const yEmail = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative my-28 lg:my-40 pb-12"
      data-cursor-hover
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 lg:mb-14">
        <div className="lg:col-span-7">
          <p className="eyebrow">◆ Closing</p>
          <h2 className="mt-4 display-xl text-[var(--ink)]">
            Let&apos;s build <span className="editorial-italic text-[var(--amber-deep)]">something</span>.
          </h2>
        </div>
        <p className="lg:col-span-5 text-base lg:text-lg text-[var(--ink-muted)] leading-relaxed lg:pt-6">
          Open to internships, full-time conversations starting 2027, and
          serious side-projects. Reach out — I respond fast.
        </p>
      </div>

      {/* Email-as-headline — the centerpiece */}
      <motion.a
        style={{ y: yEmail }}
        href={`mailto:${personalData.email}`}
        className="contact-email block group"
        aria-label={`Send email to ${personalData.email}`}
      >
        <span className="block">hardiksaini830</span>
        <span className="block editorial-italic text-[var(--amber-deep)]">
          @gmail.com
        </span>
        <span className="contact-email-arrow" aria-hidden>↗</span>
      </motion.a>

      <div className="hairline mt-12 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            Or find me
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Magnetic strength={0.25}>
              <Link
                href={personalData.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost text-xs no-underline"
              >
                <BsLinkedin /> LinkedIn
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href={personalData.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost text-xs no-underline"
              >
                <BsGithub /> GitHub
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href={personalData.resume}
                target="_blank"
                className="btn-ghost text-xs no-underline"
              >
                Resume <span aria-hidden>↗</span>
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="md:text-right">
          <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            Prefer a form?
          </p>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="mt-3 inline-flex items-center gap-2 text-base text-[var(--ink)] hover:text-[var(--amber-deep)] transition-colors"
          >
            {showForm ? "Hide message form" : "Send a message"}
            <span aria-hidden>{showForm ? "↑" : "↓"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: 16, transition: { duration: 0.3 } }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <ContactForm />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
