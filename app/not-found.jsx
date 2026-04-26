import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <p className="mono text-xs uppercase tracking-[0.22em] text-[var(--ink-faint)]">
        Error · 404
      </p>
      <h1 className="mt-5 display-xl text-[var(--ink)]">
        Page <span className="editorial-italic text-[var(--amber-deep)]">not found</span>.
      </h1>
      <p className="mt-4 text-base text-[var(--ink-muted)] max-w-md">
        Looks like that path doesn&apos;t exist. Let&apos;s get you back home.
      </p>
      <Link href="/" className="btn-primary mt-8 no-underline">
        Back to home <span aria-hidden>↗</span>
      </Link>
    </div>
  );
}
