"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { projectsData } from "@/utils/data/projects-data";
import { personalData } from "@/utils/data/personal-data";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const SHOWTIME_STOPS = [
  { selector: "body", label: "Hero" },
  { selector: "#about", label: "About" },
  { selector: "#experience", label: "Experience" },
  { selector: "#skills", label: "Skills" },
  { selector: "#coursework", label: "Coursework" },
  { selector: "#awards", label: "Awards" },
  { selector: "#projects", label: "Projects" },
  { selector: "#education", label: "Education" },
  { selector: "#professional-development", label: "Leadership" },
  { selector: "#contact", label: "Contact" },
];

const ASCII_ART = [
  "  ____ _          _   _ _     _           _",
  " / ___| |__   ___| |_| (_)_ _| |__   __ _| |_ ___",
  "| |   | '_ \\ / _ \\ __| | | '__| '_ \\ / _` | __/ _ \\",
  "| |___| | | |  __/ |_| | | |  | | | | (_| | ||  __/",
  " \\____|_| |_|\\___|\\__|_|_|_|  |_| |_|\\__,_|\\__\\___|",
];

const TYPED_CODES = [
  { code: "SHOWTIME", action: "showtime" },
  { code: "PIXELATE", action: "pixelate" },
  { code: "NIGHTOWL", action: "nightowl" },
  { code: "SPEEDRUN", action: "speedrun" },
  { code: "BLOOM", action: "bloom" },
  { code: "CREDITS", action: "credits" },
  { code: "NERDALERT", action: "nerd" },
  { code: "TIMETRAVEL", action: "timetravel" },
  { code: "CATMODE", action: "cat" },
  { code: "RAINBOW", action: "rainbow" },
  { code: "ASCIIART", action: "ascii" },
  { code: "GRATITUDE", action: "gratitude" },
];

const CHEAT_LIST = [
  { label: "Konami", trigger: "↑ ↑ ↓ ↓ ← → ← → B A", effect: "Toggle CRT" },
  { label: "SHOWTIME", trigger: "Type SHOWTIME", effect: "Guided tour" },
  { label: "SPEEDRUN", trigger: "Type SPEEDRUN", effect: "Auto-scroll HUD" },
  { label: "PIXELATE", trigger: "Type PIXELATE", effect: "Pixel art filter" },
  { label: "NIGHTOWL", trigger: "Type NIGHTOWL", effect: "High-contrast terminal theme" },
  { label: "RAINBOW", trigger: "Type RAINBOW", effect: "Gradient frame" },
  { label: "BLOOM", trigger: "Type BLOOM", effect: "Soft particle layer" },
  { label: "TIMETRAVEL", trigger: "Type TIMETRAVEL", effect: "Retro tint" },
  { label: "CATMODE", trigger: "Type CATMODE", effect: "Cat follows cursor" },
  { label: "CREDITS", trigger: "Type CREDITS", effect: "Secret credits modal" },
  { label: "NERDALERT", trigger: "Type NERDALERT", effect: "Stack toast" },
  { label: "ASCIIART", trigger: "Type ASCIIART", effect: "Console art" },
  { label: "GRATITUDE", trigger: "Type GRATITUDE", effect: "Thank-you toast" },
];

const MAX_TYPED_BUFFER = 24;
const MAX_SEQUENCE_BUFFER = 16;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isFormField = (el) => {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
};

const useStableToast = () => {
  const toastRef = useRef({});
  useEffect(() => () => {
    Object.values(toastRef.current).forEach((id) => toast.dismiss(id));
  }, []);
  return toastRef;
};

const BloomLayer = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="cheat-bloom-layer" aria-hidden>
      {[...Array(12)].map((_, idx) => (
        <span key={idx} className="cheat-bloom-dot" style={{ ["--i"]: idx + 1 }} />
      ))}
    </div>
  );
};

const SpeedrunHud = ({ active, fps, pct, onStop }) => {
  if (!active) return null;
  return (
    <div className="cheat-hud">
      <div className="cheat-hud-row">
        <span>Speedrun</span>
        <button onClick={onStop}>Stop</button>
      </div>
      <div className="cheat-hud-row">
        <span>FPS</span>
        <span>{Math.round(fps)}</span>
      </div>
      <div className="cheat-hud-row">
        <span>Path</span>
        <span>{pct}%</span>
      </div>
    </div>
  );
};

const ShowtimeOverlay = ({ step, label, onStop }) => {
  if (step === null) return null;
  return (
    <div className="cheat-showtime">
      <div className="cheat-showtime-card">
        <div className="cheat-showtime-title">Guided tour</div>
        <div className="cheat-showtime-body">
          <span className="cheat-pill">Step {step + 1}</span>
          <span>{label}</span>
        </div>
        <button onClick={onStop}>Skip</button>
      </div>
    </div>
  );
};

const CreditsOverlay = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="cheat-credits">
      <div className="cheat-credits-card">
        <div className="cheat-credits-head">
          <div>
            <p className="cheat-pill">Secret credits</p>
            <h3>Thanks for peeking!</h3>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="cheat-credits-grid">
          <div>
            <p className="cheat-credits-label">Builder</p>
            <p>{personalData.name}</p>
          </div>
          <div>
            <p className="cheat-credits-label">Stack</p>
            <p>Next.js · Tailwind · React · Lottie · SCSS</p>
          </div>
          <div>
            <p className="cheat-credits-label">Fun facts</p>
            <ul>
              <li>Guided tour, CRT, rainbow, bloom, and speedrun are hiding here.</li>
              <li>Cat mode follows your pointer for a bit.</li>
              <li>Use SHOWTIME, KONAMI, or RAINBOW to see things move.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const CatFollower = ({ active, x, y }) => {
  if (!active) return null;
  return (
    <div
      className="cheat-cat"
      style={{ transform: `translate(${x}px, ${y}px)` }}
      aria-hidden
    >
      😺
    </div>
  );
};

export default function CheatCodes() {
  const [crt, setCrt] = useState(false);
  const [bloom, setBloom] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [showtimeStep, setShowtimeStep] = useState(null);
  const [speedrun, setSpeedrun] = useState({ active: false, fps: 0, pct: 0 });
  const [cat, setCat] = useState({ active: false, x: 0, y: 0 });
  const [showCheats, setShowCheats] = useState(false);

  const typedBuffer = useRef("");
  const seqBuffer = useRef([]);
  const timers = useRef({});
  const rafs = useRef({});
  const showtimeTimer = useRef(null);
  const speedrunCleanup = useRef(() => {});
  const catMoveCleanup = useRef(() => {});
  const asciiLogged = useRef(false);
  const toastRef = useStableToast();
  const crtRef = useRef(false);

  const stopShowtime = () => {
    if (showtimeTimer.current) {
      window.clearInterval(showtimeTimer.current);
      showtimeTimer.current = null;
    }
    setShowtimeStep(null);
  };

  const clearTimer = (key) => {
    const t = timers.current[key];
    if (t) {
      window.clearTimeout(t);
      delete timers.current[key];
    }
  };

  const activateTimedClass = (cls, duration, label) => {
    document.body.classList.add(cls);
    clearTimer(cls);
    timers.current[cls] = window.setTimeout(() => {
      document.body.classList.remove(cls);
      delete timers.current[cls];
    }, duration);
    toastRef.current[label] = toast(`${label} for ${(duration / 1000).toFixed(0)}s`, {
      autoClose: 2200,
      toastId: label,
    });
  };

  const toggleCrt = () => {
    setCrt((prev) => {
      const next = !prev;
      crtRef.current = next;
      document.body.classList.toggle("cheat-crt", next);
      return next;
    });
    toast(crtRef.current ? "CRT mode on" : "CRT mode off");
  };

  const toggleCheatList = () => setShowCheats((prev) => !prev);

  const triggerShowtime = () => {
    if (prefersReducedMotion()) {
      toast("Skipped: prefers-reduced-motion is on");
      return;
    }
    stopShowtime();
    setShowtimeStep(0);
    const goTo = (idx) => {
      const target = SHOWTIME_STOPS[idx];
      if (!target) return;
      const el = document.querySelector(target.selector);
      if (el && typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    goTo(0);
    showtimeTimer.current = window.setInterval(() => {
      setShowtimeStep((prev) => {
        const next = prev === null ? 0 : prev + 1;
        if (next >= SHOWTIME_STOPS.length) {
          stopShowtime();
          return null;
        }
        goTo(next);
        return next;
      });
    }, 2600);
    toast("Starting guided tour");
  };

  const startSpeedrun = () => {
    if (prefersReducedMotion()) {
      toast("Speedrun skipped (reduced motion)");
      return;
    }
    if (speedrun.active) {
      stopSpeedrun("Speedrun toggled off");
      return;
    }
    let last = performance.now();
    const abortEvents = ["wheel", "touchstart", "keydown", "pointerdown"]; 
    const abort = () => stopSpeedrun("Interrupted");
    abortEvents.forEach((evt) => window.addEventListener(evt, abort, { once: true }));
    speedrunCleanup.current = () => abortEvents.forEach((evt) => window.removeEventListener(evt, abort));

    const step = (now) => {
      const delta = now - last;
      last = now;
      const speed = 0.8; // px per ms
      const dy = delta * speed;
      window.scrollBy({ top: dy, left: 0, behavior: "auto" });
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const current = doc.scrollTop;
      const pct = max > 0 ? Math.min(100, Math.round((current / max) * 100)) : 100;
      setSpeedrun({ active: true, fps: 1000 / (delta || 1), pct });
      if (pct >= 99) {
        stopSpeedrun("Finished");
        return;
      }
      rafs.current.speedrun = window.requestAnimationFrame(step);
    };
    setSpeedrun({ active: true, fps: 0, pct: 0 });
    rafs.current.speedrun = window.requestAnimationFrame(step);
    toast("Speedrun engaged");
  };

  const stopSpeedrun = (msg) => {
    if (rafs.current.speedrun) {
      window.cancelAnimationFrame(rafs.current.speedrun);
      delete rafs.current.speedrun;
    }
    speedrunCleanup.current();
    setSpeedrun({ active: false, fps: 0, pct: 0 });
    if (msg) toast(msg);
  };

  const triggerBloom = () => {
    setBloom(true);
    clearTimer("bloom");
    timers.current.bloom = window.setTimeout(() => setBloom(false), 24000);
    toast("Bloom overlay up");
  };

  const triggerNerdAlert = () => {
    const sample = projectsData[Math.floor(Math.random() * projectsData.length)];
    const tools = (sample?.tools || []).slice(0, 4).join(" · ") || "Stack TBD";
    toast(`Nerd mode: ${sample?.name || "Project"} → ${tools}`);
  };

  const triggerTimeTravel = () => {
    activateTimedClass("cheat-time-travel", 12000, "Time travel");
  };

  const triggerCatMode = () => {
    setCat((prev) => ({ ...prev, active: true }));
    const move = (e) => {
      setCat((prev) => ({ ...prev, x: e.clientX + 12, y: e.clientY - 12 }));
    };
    window.addEventListener("pointermove", move);
    catMoveCleanup.current = () => window.removeEventListener("pointermove", move);
    clearTimer("cat");
    timers.current.cat = window.setTimeout(() => {
      setCat({ active: false, x: 0, y: 0 });
      catMoveCleanup.current();
    }, 22000);
    toast("Cat mode for ~20s");
  };

  const triggerRainbow = () => activateTimedClass("cheat-rainbow-frame", 18000, "Rainbow frame");

  const triggerPixelate = () => activateTimedClass("cheat-pixelate", 26000, "Pixelate");

  const triggerNightOwl = () => activateTimedClass("cheat-nightowl", 52000, "Night owl");

  const triggerAscii = () => {
    if (asciiLogged.current) return;
    ASCII_ART.forEach((line) => console.log(line));
    asciiLogged.current = true;
    toast("Console art dropped");
  };

  const triggerGratitude = () => {
    toast(`Thanks for visiting, ${personalData.name} appreciates it!`);
  };

  const handleTypedCode = (buffer) => {
    const match = TYPED_CODES.find((c) => buffer.endsWith(c.code));
    if (!match) return;
    switch (match.action) {
      case "showtime":
        triggerShowtime();
        break;
      case "pixelate":
        triggerPixelate();
        break;
      case "nightowl":
        triggerNightOwl();
        break;
      case "speedrun":
        startSpeedrun();
        break;
      case "bloom":
        triggerBloom();
        break;
      case "credits":
        setCreditsOpen(true);
        break;
      case "nerd":
        triggerNerdAlert();
        break;
      case "timetravel":
        triggerTimeTravel();
        break;
      case "cat":
        triggerCatMode();
        break;
      case "rainbow":
        triggerRainbow();
        break;
      case "ascii":
        triggerAscii();
        break;
      case "gratitude":
        triggerGratitude();
        break;
      default:
        break;
    }
  };

  const handleSequence = () => {
    const seq = seqBuffer.current;
    if (seq.length < KONAMI.length) return;
    const last = seq.slice(seq.length - KONAMI.length);
    const match = last.every((k, idx) => k.toLowerCase() === KONAMI[idx].toLowerCase());
    if (match) toggleCrt();
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (isFormField(e.target)) return;
      const key = e.key;
      const normalized = key.length === 1 ? key.toUpperCase() : key;

      seqBuffer.current = [...seqBuffer.current, key].slice(-MAX_SEQUENCE_BUFFER);
      handleSequence();

      if (key.length === 1 || key === " " || key === "Enter") {
        typedBuffer.current = (typedBuffer.current + normalized).slice(-MAX_TYPED_BUFFER);
        handleTypedCode(typedBuffer.current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("cheat-crt", "cheat-pixelate", "cheat-nightowl", "cheat-time-travel", "cheat-rainbow-frame");
      Object.keys(timers.current).forEach(clearTimer);
      if (rafs.current.speedrun) window.cancelAnimationFrame(rafs.current.speedrun);
      stopShowtime();
      speedrunCleanup.current();
      catMoveCleanup.current();
    };
  }, []);

  const showtimeLabel = useMemo(() => {
    if (showtimeStep === null) return null;
    return SHOWTIME_STOPS[showtimeStep]?.label || "";
  }, [showtimeStep]);

  return (
    <>
      <BloomLayer visible={bloom} />
      <SpeedrunHud active={speedrun.active} fps={speedrun.fps} pct={speedrun.pct} onStop={() => stopSpeedrun("Stopped")} />
      <ShowtimeOverlay step={showtimeStep} label={showtimeLabel} onStop={stopShowtime} />
      <CreditsOverlay open={creditsOpen} onClose={() => setCreditsOpen(false)} />
      <CatFollower active={cat.active} x={cat.x} y={cat.y} />
      <div className="cheat-bottom-inline">
        <button className="cheat-fab" onClick={toggleCheatList} aria-expanded={showCheats} aria-controls="cheat-list-popover">
          cheats
        </button>
        {showCheats ? (
          <div id="cheat-list-popover" className="cheat-popover">
            <div className="cheat-popover-head">
              <span className="cheat-pill">Cheats</span>
              <button onClick={toggleCheatList}>Close</button>
            </div>
            <div className="cheat-popover-body">
              {CHEAT_LIST.map((item) => (
                <div key={item.label} className="cheat-popover-row">
                  <div>
                    <p className="cheat-popover-label">{item.label}</p>
                    <p className="cheat-popover-trigger">{item.trigger}</p>
                  </div>
                  <p className="cheat-popover-effect">{item.effect}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
