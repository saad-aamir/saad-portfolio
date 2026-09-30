"use client";

import { useEffect, useRef, useState } from "react";

/*
  Baby robot that falls from section header to section header as you scroll.

  It lives in an absolute full-size layer over <main>, in page coordinates.
  Each section's eyebrow label ("About", "Selected work", …) is a ledge,
  falling back to the <h2> where a section has no eyebrow. The robot STANDS
  on most ledges; every third one it HANGS from the end of the text by its
  hands — catching mid-fall and swinging like a damped pendulum before
  settling into a dangle.

  Scrolling only *triggers* a fall — gravity, horizontal steering, bounce,
  splat, catch, and squash all run in real time in a requestAnimationFrame
  loop, so the motion is simulated, not scroll-linked.

  Landing on a stand ledge, by impact speed:
    gentle  → squash and stand
    medium  → bounce (restitution 0.35), then stand
    hard    → SPLAT: topples flat about its feet, lies dazed for a beat,
              then struggles back upright with an overshoot wobble
  Landing on a hang ledge always catches; impact speed sets swing amplitude.
  Scrolling back up sends it home on thrusters (powered flight tween).

  The rAF loop only runs while the robot is moving; settled = zero work.
  Desktop-only (>= 1024px). prefers-reduced-motion snaps between ledges.
*/

const BOT_H = 50; // svg height; feet sit at the bottom edge
const BOT_HALF_W = 22;
const HAND_Y = -5; // hands' y in svg coords when arms are raised
const HANG_DROP = BOT_H - 1 - HAND_Y; // feet are this far below the grip
const GRAVITY = 2600; // px/s²
const MAX_V = 2600; // terminal velocity, px/s
const MAX_VX = 1400; // horizontal steering cap, px/s
const BOUNCE = 0.35; // restitution
const SETTLE_V = 520; // impacts slower than this don't bounce
const SPLAT_V = 2350; // impacts faster than this knock it flat (~1.5+ sections)
const SPLAT_DOWN_MS = 200;
const SPLAT_LIE_MS = 680;
const GETUP_MS = 520;
const SWING_DECAY = 2.2; // s⁻¹
const SWING_FREQ = 6.5; // rad/s

type Phase = "idle" | "falling" | "splat" | "getup" | "flying" | "catch";
type Pose = "feet" | "hands";
type Ledge = { y: number; x1: number; x2: number; mode: "stand" | "hang" };

const easeOutBack = (p: number) => {
  const c1 = 1.70158;
  return 1 + (c1 + 1) * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
};

export default function BabyRobot() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [hanging, setHanging] = useState(false);

  const layerRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const squashRef = useRef<HTMLDivElement>(null);

  const sim = useRef({
    ledges: [] as Ledge[],
    top: 0, // layer top in page coords
    idx: 0,
    x: 0, // feet/grip center, layer coords
    y: 0, // feet (pose "feet") or grip point (pose "hands"), layer coords
    v: 0,
    rot: 0,
    dir: 1, // splat topple / swing direction
    amp: 0, // swing amplitude, degrees
    t0: 0, // phase-local clock for splat/getup/catch
    phase: "idle" as Phase,
    pose: "feet" as Pose,
    hop: false, // click-hop may land back on its own ledge
    raf: 0,
    last: 0,
    flight: { fx: 0, fy: 0, tx: 0, ty: 0, target: 0, start: 0, dur: 0 },
    squashT: 0 as ReturnType<typeof setTimeout> | number,
    reduced: false,
  });

  // Gate on viewport width + track reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setEnabled(mq.matches);
    const onRm = () => (sim.current.reduced = rm.matches);
    onMq();
    onRm();
    mq.addEventListener("change", onMq);
    rm.addEventListener("change", onRm);
    return () => {
      mq.removeEventListener("change", onMq);
      rm.removeEventListener("change", onRm);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const s = sim.current;
    const layer = layerRef.current;
    const bot = botRef.current;
    if (!layer || !bot) return;

    const apply = () => {
      if (s.pose === "hands") {
        // s.y is the grip point; hands (svg y = HAND_Y) must land on it,
        // and the swing pivots about the hands
        bot.style.transformOrigin = `50% ${HAND_Y}px`;
        bot.style.transform = `translate3d(${s.x - BOT_HALF_W}px, ${
          s.y - HAND_Y
        }px, 0) rotate(${s.rot}deg)`;
      } else {
        bot.style.transformOrigin = "50% 100%";
        bot.style.transform = `translate3d(${s.x - BOT_HALF_W}px, ${
          s.y - BOT_H
        }px, 0) rotate(${s.rot}deg)`;
      }
    };

    const toPhase = (p: Phase) => {
      s.phase = p;
      setPhase(p);
    };

    const squash = (k: number) => {
      const el = squashRef.current;
      if (!el || s.reduced) return;
      el.style.transition = "transform 70ms ease-out";
      el.style.transform = `scale(${1 + 0.3 * k}, ${1 - 0.34 * k})`;
      clearTimeout(s.squashT);
      s.squashT = setTimeout(() => {
        el.style.transition = "transform 300ms cubic-bezier(0.34, 1.6, 0.4, 1)";
        el.style.transform = "scale(1, 1)";
      }, 80);
    };

    // Stand partway along the text; hang just past its right end
    const perchX = (i: number) => {
      const L = s.ledges[i];
      if (L.mode === "hang") return L.x2 + 12;
      const w = L.x2 - L.x1;
      return L.x1 + Math.min(Math.max(w * 0.45, 40), w - 30, 380);
    };

    // The y the FEET must cross to arrive: standing is feet-on-ledge,
    // hanging means falling past it until the raised hands reach the grip
    const arriveY = (L: Ledge) => (L.mode === "hang" ? L.y + HANG_DROP : L.y);

    const setPose = (pose: Pose) => {
      if (s.pose === pose) return;
      // Convert s.y so the robot doesn't jump when the anchor changes
      s.y += pose === "hands" ? -HANG_DROP : HANG_DROP;
      s.pose = pose;
    };

    const measure = () => {
      const rect = layer.getBoundingClientRect();
      s.top = rect.top + window.scrollY;
      const left = rect.left;
      const sections = Array.from(
        document.querySelectorAll("#main-content > section")
      );
      // Skip the hero (h1 only) and contact (its card bobs — a perch there
      // wouldn't track the animation and would look detached).
      s.ledges = sections
        .slice(1, -1)
        .map((sec, i) => {
          const el =
            sec.querySelector("p.uppercase") ?? sec.querySelector("h2");
          if (!el) return null;
          // Range = actual text bounds; block boxes extend past the words,
          // and the robot should perch on text, not empty baseline
          const range = document.createRange();
          range.selectNodeContents(el);
          const r = range.getBoundingClientRect();
          // Compensate for in-flight .reveal transforms: rects are measured
          // where the text currently is, but every reveal settles at
          // translateY(0), and transforms never fire the ResizeObserver —
          // without this the robot lands where the text USED to be.
          let lift = 0;
          for (
            let a: HTMLElement | null = el as HTMLElement;
            a && a !== document.body;
            a = a.parentElement
          ) {
            const t = getComputedStyle(a).transform;
            if (t && t !== "none") lift += new DOMMatrixReadOnly(t).f;
          }
          return {
            y: r.top + window.scrollY - s.top - lift,
            x1: r.left - left,
            x2: r.right - left,
            mode: i % 3 === 1 ? ("hang" as const) : ("stand" as const),
          };
        })
        .filter((l): l is Ledge => l !== null);
      if (s.ledges.length === 0) return;
      s.idx = Math.min(s.idx, s.ledges.length - 1);
      if (s.phase === "idle") {
        const L = s.ledges[s.idx];
        s.pose = L.mode === "hang" ? "hands" : "feet";
        s.y = L.y;
        s.x = perchX(s.idx);
        setHanging(L.mode === "hang");
        apply();
      }
      setReady(true);
    };

    const wake = () => {
      if (!s.raf) {
        s.last = performance.now();
        s.raf = requestAnimationFrame(step);
      }
    };

    const startFall = (hop: boolean) => {
      setPose("feet"); // lets go if it was hanging
      setHanging(false);
      s.hop = hop;
      s.v = hop ? -620 : 0;
      toPhase("falling");
      wake();
    };

    const startFly = (target: number) => {
      setPose("feet");
      setHanging(false);
      const T = s.ledges[target];
      const ty = arriveY(T);
      const tx = perchX(target);
      const dist = Math.hypot(ty - s.y, tx - s.x);
      s.flight = {
        fx: s.x,
        fy: s.y,
        tx,
        ty,
        target,
        start: performance.now(),
        dur: Math.min(1100, 450 + (dist / 2500) * 1000),
      };
      toPhase("flying");
      wake();
    };

    const startCatch = (i: number, amp: number) => {
      s.idx = i;
      s.x = perchX(i);
      s.pose = "hands";
      s.y = s.ledges[i].y;
      s.v = 0;
      s.hop = false;
      s.amp = amp;
      s.t0 = performance.now();
      setHanging(true);
      toPhase("catch");
    };

    const check = () => {
      if (s.phase !== "idle" || s.ledges.length === 0) return;
      const st = window.scrollY - s.top;
      const H = window.innerHeight;
      const cur = s.ledges[s.idx].y;

      if (s.reduced) {
        // No motion: snap to the deepest ledge that's comfortably in view
        let t = s.idx;
        for (let i = 0; i < s.ledges.length; i++) {
          if (s.ledges[i].y <= st + H * 0.6) t = i;
        }
        if (s.ledges[t].y < st + H * 0.22 && t < s.ledges.length - 1) t += 1;
        if (t !== s.idx) {
          const L = s.ledges[t];
          s.idx = t;
          s.pose = L.mode === "hang" ? "hands" : "feet";
          s.y = L.y;
          s.x = perchX(t);
          setHanging(L.mode === "hang");
          apply();
        }
        return;
      }

      // Our ledge scrolled above the comfort line → let go / tip off
      if (cur < st + H * 0.22 && s.idx < s.ledges.length - 1) {
        startFall(false);
      }
      // Our ledge is below the viewport → thruster flight back up. The
      // target must sit BELOW the fall-trigger line (0.22H) or tall section
      // gaps would make it fall and fly back up in an endless yo-yo.
      else if (cur > st + H - 30) {
        let t = -1;
        for (let i = 0; i < s.ledges.length; i++) {
          if (s.ledges[i].y >= st + H * 0.25 && s.ledges[i].y <= st + H * 0.6)
            t = i;
        }
        if (t >= 0 && t < s.idx) startFly(t);
      }
    };

    const settle = (i: number) => {
      s.v = 0;
      s.rot = 0;
      s.idx = i;
      s.x = perchX(i);
      s.hop = false;
      setHanging(false);
      toPhase("idle");
    };

    const step = (now: number) => {
      const dt = Math.min((now - s.last) / 1000, 0.033);
      s.last = now;

      if (s.phase === "falling") {
        const prevY = s.y;
        s.v = Math.min(s.v + GRAVITY * dt, MAX_V);
        s.y += s.v * dt;

        // Steer horizontally toward the ledge we expect to land on,
        // pacing the drift by the predicted remaining fall time so the
        // path reads as a ballistic arc, not a slide.
        const st = window.scrollY - s.top;
        const minY = st + window.innerHeight * 0.3;
        const solid = (i: number) =>
          s.ledges[i].y >= minY ||
          (s.hop && i === s.idx) ||
          i === s.ledges.length - 1;

        let cand = s.ledges.length - 1;
        for (let i = 0; i < s.ledges.length; i++) {
          if (arriveY(s.ledges[i]) >= s.y - 0.5 && solid(i)) {
            cand = i;
            break;
          }
        }
        const dy = Math.max(0, arriveY(s.ledges[cand]) - s.y);
        const tRem = Math.max(
          (Math.sqrt(s.v * s.v + 2 * GRAVITY * dy) - s.v) / GRAVITY,
          0.05
        );
        const vx = Math.max(
          -MAX_VX,
          Math.min(MAX_VX, (perchX(cand) - s.x) / tRem)
        );
        s.x += vx * dt;
        // Latch topple direction only on decisive drift — the steering
        // makes small sign-flipping corrections near touchdown
        s.dir = vx > 150 ? 1 : vx < -150 ? -1 : s.dir;
        s.rot =
          s.dir * 6 * Math.min(1, Math.abs(vx) / 500) +
          Math.sin(now / 90) * 5 * Math.min(1, Math.abs(s.v) / 900);

        // Land on the first solid ledge crossed this frame. At terminal
        // velocity a frame moves ~40px, so the check must be against the
        // (prevY → newY) interval or the robot tunnels straight through.
        // Ledges that already scrolled too high aren't solid — it falls
        // through them to the next one that's comfortably in view.
        if (s.v > 0) {
          for (let i = 0; i < s.ledges.length; i++) {
            const L = s.ledges[i];
            const Lc = arriveY(L);
            if (Lc < prevY - 0.5 || Lc > s.y) continue;
            if (solid(i)) {
              if (L.mode === "hang") {
                squash(0.2);
                startCatch(
                  i,
                  s.dir * Math.min(28, 8 + s.v / 130)
                );
              } else if (s.v > SPLAT_V) {
                s.y = Lc;
                squash(1);
                s.v = 0;
                s.idx = i;
                s.x = perchX(i);
                s.hop = false;
                s.t0 = now;
                toPhase("splat");
              } else if (s.v > SETTLE_V) {
                s.y = Lc;
                squash(Math.min(1, s.v / 1800));
                s.v = -s.v * BOUNCE;
              } else {
                s.y = Lc;
                squash(0.35);
                s.rot = 0;
                settle(i);
              }
              break;
            }
          }
        }
      } else if (s.phase === "catch") {
        // Damped pendulum swing about the hands after grabbing the ledge
        const t = (now - s.t0) / 1000;
        const decay = Math.exp(-SWING_DECAY * t);
        s.rot = s.amp * decay * Math.sin(SWING_FREQ * t);
        if (Math.abs(s.amp) * decay < 1) {
          s.rot = 0;
          toPhase("idle");
        }
      } else if (s.phase === "splat") {
        // Topple flat about the feet, then lie there dazed
        const p = Math.min(1, (now - s.t0) / SPLAT_DOWN_MS);
        s.rot = s.dir * 86 * (1 - (1 - p) * (1 - p));
        if (now - s.t0 > SPLAT_DOWN_MS + SPLAT_LIE_MS) {
          s.t0 = now;
          toPhase("getup");
        }
      } else if (s.phase === "getup") {
        // Struggle back upright, overshooting slightly past vertical
        const p = Math.min(1, (now - s.t0) / GETUP_MS);
        s.rot = s.dir * 86 * (1 - easeOutBack(p));
        if (p >= 1) {
          s.rot = 0;
          settle(s.idx);
        }
      } else if (s.phase === "flying") {
        const p = Math.min(1, (now - s.flight.start) / s.flight.dur);
        const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        s.x = s.flight.fx + (s.flight.tx - s.flight.fx) * e;
        s.y = s.flight.fy + (s.flight.ty - s.flight.fy) * e;
        s.rot = Math.sin(p * Math.PI) * -6;
        if (p >= 1) {
          s.rot = 0;
          const T = s.ledges[s.flight.target];
          if (T.mode === "hang") {
            startCatch(s.flight.target, 8);
          } else {
            s.idx = s.flight.target;
            toPhase("idle");
          }
        }
      }

      apply();

      if (s.phase !== "idle") {
        s.raf = requestAnimationFrame(step);
      } else {
        s.raf = 0;
        check(); // scroll may have moved on while we were airborne
      }
    };

    const onScroll = () => check();
    const onClick = () => {
      if (s.phase !== "idle" || s.reduced) return;
      if (s.pose === "hands") {
        // A poke while dangling sets it swinging again
        s.amp = 16 * s.dir;
        s.t0 = performance.now();
        toPhase("catch");
        wake();
      } else {
        startFall(true);
      }
    };

    measure();
    check();
    bot.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);

    return () => {
      bot.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
      cancelAnimationFrame(s.raf);
      s.raf = 0;
      clearTimeout(s.squashT);
    };
  }, [enabled]);

  if (!enabled) return null;

  const A = "#A78BFA", A2 = "#C4B5FD", AD = "#5C4A99";
  const B1 = "#15171A", B2 = "#1B1E22";
  const BR = "#23272D", BR2 = "#2E343B";
  const W = "#F5C16C", PK = "#F47DA0";

  const falling = phase === "falling";
  const flying = phase === "flying";
  const dazed = phase === "splat";

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
        visibility: ready ? "visible" : "hidden",
      }}
    >
      <div
        ref={botRef}
        className="cursor-pointer select-none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${BOT_HALF_W * 2}px`,
          height: `${BOT_H}px`,
          pointerEvents: "auto",
          willChange: "transform",
          transformOrigin: "50% 100%",
        }}
      >
        <div
          ref={squashRef}
          style={{ transformOrigin: "50% 100%", width: "100%", height: "100%" }}
        >
          <svg
            width="44"
            height="50"
            viewBox="0 0 44 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible", display: "block" }}
          >
            {/* Thruster flame — only while flying home */}
            {flying && (
              <g className="bb-flame">
                <ellipse cx="22" cy="53" rx="6.5" ry="8" fill={PK} opacity="0.5" />
                <ellipse cx="22" cy="51" rx="4" ry="5.5" fill={W} opacity="0.9" />
              </g>
            )}

            {/* Raised arms + hands — only while hanging */}
            {hanging && (
              <>
                <rect x="10.5" y={HAND_Y} width="4" height="14" rx="2" fill={B1} stroke={BR} strokeWidth="1" />
                <rect x="29.5" y={HAND_Y} width="4" height="14" rx="2" fill={B1} stroke={BR} strokeWidth="1" />
                <circle cx="12.5" cy={HAND_Y} r="2.6" fill={B2} stroke={AD} strokeWidth="1" />
                <circle cx="31.5" cy={HAND_Y} r="2.6" fill={B2} stroke={AD} strokeWidth="1" />
              </>
            )}

            {/* Antenna */}
            <line x1="22" y1="2" x2="22" y2="7" stroke={AD} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="22" cy="2" r="2.4" fill={falling || flying ? A : AD} style={{ transition: "fill 0.2s" }} />

            {/* Head — oversized, it's a baby */}
            <rect x="7" y="7" width="30" height="23" rx="8" fill={B1} stroke={BR2} strokeWidth="1" />

            {/* Eye sockets */}
            <circle cx="16" cy="18" r="5.5" fill={B2} stroke={AD} strokeWidth="1" />
            <circle cx="28" cy="18" r="5.5" fill={B2} stroke={AD} strokeWidth="1" />

            {/* Pupils — wide-eyed falling, knocked-out dashes when dazed */}
            {dazed ? (
              <>
                <rect x="12" y="17" width="8" height="2.2" rx="1.1" fill={A} />
                <rect x="24" y="17" width="8" height="2.2" rx="1.1" fill={A} />
              </>
            ) : (
              <g className={phase === "idle" ? "bb-blink" : undefined}>
                <circle cx="16" cy={falling ? 19 : 18} r={falling ? 4.2 : 3} fill={A} />
                <circle cx="17" cy={falling ? 17.6 : 16.8} r="1.1" fill={A2} opacity="0.7" />
                <circle cx="28" cy={falling ? 19 : 18} r={falling ? 4.2 : 3} fill={A} />
                <circle cx="29" cy={falling ? 17.6 : 16.8} r="1.1" fill={A2} opacity="0.7" />
              </g>
            )}

            {/* Mouth — "o" when falling, wobbly line when dazed */}
            {falling ? (
              <circle cx="22" cy="26" r="1.8" fill="none" stroke={A} strokeWidth="1.2" />
            ) : dazed ? (
              <path d="M18,26 q2,-1.6 4,0 q2,1.6 4,0" stroke={A} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            ) : (
              <rect x="18" y="25" width="8" height="1.6" rx="0.8" fill={BR} />
            )}

            {/* Body */}
            <rect x="11" y="31" width="22" height="13" rx="5" fill={B1} stroke={BR} strokeWidth="1" />
            <circle cx="22" cy="37.5" r="2.4" fill={flying ? A : AD} style={{ transition: "fill 0.2s" }} />

            {/* Feet */}
            <rect x="13.5" y="44" width="7" height="5" rx="2" fill={B2} stroke={BR} strokeWidth="1" />
            <rect x="23.5" y="44" width="7" height="5" rx="2" fill={B2} stroke={BR} strokeWidth="1" />
          </svg>
        </div>
      </div>

      <style>{`
        .bb-blink {
          transform-box: fill-box;
          transform-origin: center;
          animation: bbBlink 4.4s ease-in-out infinite;
        }
        @keyframes bbBlink {
          0%, 94%, 100% { transform: scaleY(1); }
          96%, 98%      { transform: scaleY(0.1); }
        }
        .bb-flame {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: bbFlame 0.16s ease-in-out infinite alternate;
        }
        @keyframes bbFlame {
          from { transform: scaleY(0.8) scaleX(1.1); }
          to   { transform: scaleY(1.2) scaleX(0.9); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bb-blink, .bb-flame { animation: none; }
        }
      `}</style>
    </div>
  );
}
