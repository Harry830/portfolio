"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const PALETTE_BY_INDEX = [
  // each tile gets a different placeholder gradient — feels like art direction
  ["#e7b27a", "#c8843d"],   // amber
  ["#d8d2c4", "#8d8275"],   // stone
  ["#1f1d1a", "#3d3631"],   // ink
  ["#efe8db", "#c5b9a3"],   // cream warm
  ["#a26425", "#56321a"],   // burnt amber
];

export default function ProjectTile({ project, index }) {
  const [hover, setHover] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [from, to] = PALETTE_BY_INDEX[index % PALETTE_BY_INDEX.length];
  const isDarkPlate = index % PALETTE_BY_INDEX.length === 2 || index % PALETTE_BY_INDEX.length === 4;

  // Check if image exists (starts with /image/projects/)
  const hasImage = project.image && project.image.startsWith("/image/projects/") && !imageError;

  return (
    <article
      className="hwork-tile group"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {/* hero plate with image or gradient fallback */}
      <div
        className="hwork-plate"
        style={{
          background: hasImage ? "var(--charcoal)" : `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        }}
        aria-label={`${project.name} ${hasImage ? "screenshot" : "placeholder"}`}
      >
        {/* Project image if available */}
        {hasImage && (
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 720px"
            onError={() => setImageError(true)}
          />
        )}

        {/* decorative wordmark behind */}
        <span
          className="hwork-plate-wordmark editorial-italic absolute z-[1]"
          style={{
            color: hasImage
              ? "rgba(255,255,255,0.04)"
              : isDarkPlate
              ? "rgba(255,255,255,0.08)"
              : "rgba(22,22,26,0.06)",
          }}
          aria-hidden
        >
          {project.name}
        </span>

        {/* sliding overlay on hover */}
        <motion.div
          className="hwork-plate-overlay"
          initial={false}
          animate={{ y: hover ? "0%" : "100%" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper)]/80">
            {project.role || "Builder"}
          </p>
          <p className="editorial-italic text-3xl text-[var(--paper)] mt-2">
            {project.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {(project.tools || []).slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] text-white/90"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <p className="hwork-plate-stamp mono">
          {String(index + 1).padStart(2, "0")} / {String(5).padStart(2, "0")}
        </p>

        {!hasImage && (
          <p className="hwork-plate-asset mono">
            ↳ drop image at {project.image}
          </p>
        )}
      </div>

      {/* meta row */}
      <div className="hwork-meta">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display-md text-[var(--ink)]">{project.name}</h3>
          <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)] whitespace-nowrap">
            {project.year}
          </p>
        </div>
        <p className="mt-2 text-[15px] text-[var(--ink-muted)] leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.demo ? (
            <Link
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-xs no-underline"
            >
              Live demo <span aria-hidden>↗</span>
            </Link>
          ) : (
            <span className="btn-ghost text-xs cursor-default opacity-60">
              In progress
            </span>
          )}
          {project.code ? (
            <Link
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost text-xs no-underline"
            >
              Source <span aria-hidden>↗</span>
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
