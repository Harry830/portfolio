"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { projectsData } from "@/utils/data/projects-data";

const FEATURED_IDS = [1, 4];

function FeaturedProject({ project, index }) {
  const [imageError, setImageError] = useState(false);
  const hasImage =
    project.image &&
    project.image.startsWith("/image/projects/") &&
    !imageError;
  const flip = index % 2 === 1;

  return (
    <article
      className="projects-featured reveal reveal-up"
      data-flip={flip ? "true" : "false"}
    >
      <div className="projects-featured-media">
        <div className="projects-featured-plate">
          {hasImage ? (
            <Image
              src={project.image}
              alt={`${project.name} — preview`}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 50vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <span
              className="projects-featured-wordmark editorial-italic"
              aria-hidden
            >
              {project.name}
            </span>
          )}
          <span className="projects-featured-stamp mono">
            {String(index + 1).padStart(2, "0")} · Featured
          </span>
        </div>
      </div>

      <div className="projects-featured-body">
        <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
          {project.year} · {project.role}
        </p>
        <h3 className="display-lg mt-3 text-[var(--ink)]">{project.name}</h3>
        <p className="editorial-italic text-[var(--amber-deep)] text-xl sm:text-2xl mt-2 leading-snug">
          {project.tagline}
        </p>
        <p className="mt-5 text-[15px] sm:text-base text-[var(--ink-muted)] leading-relaxed">
          {project.description}
        </p>

        {project.impact?.length ? (
          <ul className="mt-6 space-y-2">
            {project.impact.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 text-[14px] sm:text-[15px] text-[var(--ink-soft)]"
              >
                <span
                  aria-hidden
                  className="mt-[10px] block h-px w-4 shrink-0 bg-[var(--amber-deep)]"
                />
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {project.tools?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <span key={t} className="projects-chip">
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {(project.demo || project.code) && (
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.demo ? (
              <Link
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs no-underline"
              >
                Live demo <span aria-hidden>↗</span>
              </Link>
            ) : null}
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
        )}
      </div>
    </article>
  );
}

function OtherProject({ project }) {
  const [imageError, setImageError] = useState(false);
  const hasImage =
    project.image &&
    project.image.startsWith("/image/projects/") &&
    !imageError;

  return (
    <article className="projects-card surface-paper lift reveal reveal-up">
      <div className="projects-card-media">
        {hasImage ? (
          <Image
            src={project.image}
            alt={`${project.name} — preview`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <span
            className="projects-card-wordmark editorial-italic"
            aria-hidden
          >
            {project.name}
          </span>
        )}
      </div>
      <div className="projects-card-body">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display-md text-[var(--ink)]">{project.name}</h3>
          <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)] whitespace-nowrap">
            {project.year}
          </span>
        </div>
        <p className="mt-1 text-[13px] mono uppercase tracking-[0.14em] text-[var(--ink-faint)]">
          {project.role}
        </p>
        <p className="editorial-italic text-[var(--amber-deep)] mt-3 text-lg leading-snug">
          {project.tagline}
        </p>
        <p className="mt-3 text-[14.5px] text-[var(--ink-muted)] leading-relaxed">
          {project.description}
        </p>

        {project.tools?.length ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tools.slice(0, 6).map((t) => (
              <span key={t} className="projects-chip projects-chip--sm">
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {(project.demo || project.code) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.demo ? (
              <Link
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs no-underline"
              >
                Live demo <span aria-hidden>↗</span>
              </Link>
            ) : null}
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
        )}
      </div>
    </article>
  );
}

export default function ProjectsIndex() {
  const featured = projectsData.filter((p) => FEATURED_IDS.includes(p.id));
  const others = projectsData.filter((p) => !FEATURED_IDS.includes(p.id));
  const total = projectsData.length;

  return (
    <>
      {/* HERO */}
      <section className="pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-20 lg:pb-28">
        <div className="reveal reveal-up">
          <p className="eyebrow">
            Index · {String(total).padStart(2, "0")} projects
          </p>
        </div>
        <h1 className="display-xxl mt-5 sm:mt-7 text-[var(--ink)] reveal reveal-up delay-80">
          Projects,
          <br />
          <span className="editorial-italic text-[var(--amber-deep)]">
            products
          </span>
          , and small obsessions.
        </h1>
        <div className="mt-8 sm:mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <p className="max-w-2xl text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed reveal reveal-up delay-160">
            A working catalogue of things I&apos;ve designed, built, or
            shipped — usually at the intersection of AI, cloud, and the kind
            of everyday tools real people end up depending on.
          </p>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end reveal reveal-up delay-240">
            <Link href="/#contact" className="btn-primary text-xs no-underline">
              Start a project <span aria-hidden>↗</span>
            </Link>
            <Link href="/about" className="btn-ghost text-xs no-underline">
              About me
            </Link>
          </div>
        </div>
      </section>

      <div className="hairline" />

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-28">
          <header className="flex items-end justify-between gap-4 mb-10 sm:mb-14">
            <div className="reveal reveal-up">
              <p className="eyebrow">Featured</p>
              <h2 className="display-lg mt-2 text-[var(--ink)]">
                The work I&apos;m{" "}
                <span className="editorial-italic text-[var(--amber-deep)]">
                  proudest
                </span>{" "}
                of.
              </h2>
            </div>
            <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)] pb-2 hidden sm:block">
              {String(featured.length).padStart(2, "0")} selected
            </p>
          </header>

          <div className="space-y-16 sm:space-y-24 lg:space-y-28">
            {featured.map((project, i) => (
              <FeaturedProject key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <>
          <div className="hairline" />

          {/* OTHERS */}
          <section className="py-16 sm:py-20 lg:py-28">
            <header className="flex items-end justify-between gap-4 mb-10 sm:mb-14">
              <div className="reveal reveal-up">
                <p className="eyebrow">Also building</p>
                <h2 className="display-lg mt-2 text-[var(--ink)]">
                  Other{" "}
                  <span className="editorial-italic text-[var(--amber-deep)]">
                    projects
                  </span>
                  .
                </h2>
              </div>
              <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)] pb-2 hidden sm:block">
                {String(others.length).padStart(2, "0")} more
              </p>
            </header>

            <div className="projects-grid">
              {others.map((project) => (
                <OtherProject key={project.id} project={project} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* OUTRO CTA */}
      <div className="hairline" />
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="reveal reveal-up max-w-3xl">
          <p className="eyebrow">Next</p>
          <h2 className="display-xl mt-4 text-[var(--ink)]">
            Have something{" "}
            <span className="editorial-italic text-[var(--amber-deep)]">
              worth building
            </span>
            ?
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed">
            I&apos;m always happy to talk through ideas — especially the
            messy, half-formed kind. Send me a note and we&apos;ll figure
            out what&apos;s real.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/#contact" className="btn-primary text-sm no-underline">
              Get in touch <span aria-hidden>↗</span>
            </Link>
            <Link href="/" className="btn-ghost text-sm no-underline">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
