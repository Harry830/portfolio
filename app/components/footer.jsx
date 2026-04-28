import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-24 border-t border-[var(--line)] bg-[var(--bg-cream)]">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Currently</p>
            <p className="display-md text-[var(--ink)]">
              Open to summer + fall
              <br />
              <span className="editorial-italic text-[var(--amber-deep)]">
                opportunities, conversations, and good ideas.
              </span>
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link
              href={`mailto:${personalData.email}`}
              className="text-2xl lg:text-3xl editorial text-[var(--ink)] hover:text-[var(--amber-deep)] transition-colors no-underline"
            >
              {personalData.email}
            </Link>
            <div className="flex flex-wrap gap-3">
              <Link
                href={personalData.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost text-xs no-underline"
              >
                LinkedIn
                <span aria-hidden>↗</span>
              </Link>
              <Link
                href={personalData.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost text-xs no-underline"
              >
                GitHub
                <span aria-hidden>↗</span>
              </Link>
              <Link href={personalData.resume} target="_blank" className="btn-ghost text-xs no-underline">
                Resume
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hairline mt-14 mb-6" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm text-[var(--ink-faint)]">
          <p>
            © {year} {personalData.name}. Built in Atlanta.
          </p>
          <p className="mono text-xs uppercase tracking-[0.16em]">
            {personalData.designation}
          </p>
        </div>
      </div>
    </footer>
  );
}
