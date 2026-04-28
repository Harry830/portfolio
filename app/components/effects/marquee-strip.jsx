"use client";

/**
 * Big editorial marquee strip. Loops infinitely via duplicated track.
 *
 * @param {string[]} items
 * @param {"left"|"right"} direction
 * @param {number} speed       seconds per loop (lower = faster)
 * @param {string} variant     "display" (huge italic) | "label" (mono)
 */
export default function MarqueeStrip({
  items,
  direction = "left",
  speed = 38,
  variant = "display",
  separator = "✦",
}) {
  const track = [...items, ...items];
  return (
    <div className={`marquee-strip ${variant === "label" ? "is-label" : "is-display"}`}>
      <ul
        className={`marquee-track-rich ${direction === "right" ? "is-reverse" : ""}`}
        style={{ animationDuration: `${speed}s` }}
        role="list"
      >
        {track.map((item, i) => (
          <li key={i} className="marquee-item-rich">
            <span className={variant === "display" ? "editorial-italic" : "mono"}>
              {item}
            </span>
            <span className="marquee-sep" aria-hidden>
              {separator}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
