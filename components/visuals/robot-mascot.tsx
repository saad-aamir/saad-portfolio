"use client";

import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  { main: "Hello there!",          sub: "Welcome to Saad's portfolio."  },
  { main: "Beep boop.",            sub: "Nice to meet you!"             },
  { main: "I track your cursor.",  sub: "Keeps me entertained."         },
  { main: "Still here!",           sub: "Click me again."               },
  { main: "Built by Saad.",        sub: "With a little help from me."   },
  { main: "Psst —",               sub: "Check the contact section!"    },
];

export default function RobotMascot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const clickCount   = useRef(0);

  const [pupil,     setPupil]     = useState({ x: 0, y: 0 });
  const [blinking,  setBlinking]  = useState(false);
  const [proximity, setProximity] = useState(0);
  const [excited,   setExcited]   = useState(false);
  const [bubble,    setBubble]    = useState({ idx: 0, visible: false });

  // Show a message then auto-hide
  const popBubble = (idx: number, ms: number) => {
    setBubble({ idx, visible: true });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setBubble((b) => ({ ...b, visible: false })),
      ms
    );
  };

  // Cursor tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      setProximity(Math.max(0, 1 - dist / 320));
      const angle = Math.atan2(dy, dx);
      const reach = Math.min(1, dist / 180);
      setPupil({ x: Math.cos(angle) * 4 * reach, y: Math.sin(angle) * 4 * reach });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Blink
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => { setBlinking(false); schedule(); }, 130);
      }, 2800 + Math.random() * 2200);
    };
    schedule();
    return () => clearTimeout(t);
  }, []);

  // Greeting on first load
  useEffect(() => {
    const t = setTimeout(() => popBubble(0, 4500), 1500);
    return () => { clearTimeout(t); clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setExcited(true);
    setTimeout(() => setExcited(false), 700);
    clickCount.current += 1;
    // Cycle through messages 1–5 (skip greeting at index 0)
    const idx = (clickCount.current % (MESSAGES.length - 1)) + 1;
    popBubble(idx, 3000);
  };

  const A  = "#A78BFA", A2 = "#C4B5FD", AD = "#5C4A99";
  const B1 = "#15171A", B2 = "#1B1E22";
  const BR = "#23272D", BR2 = "#2E343B";
  const G  = "#6DDC9C", W  = "#F5C16C";

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 cursor-pointer select-none"
      style={{
        filter:
          proximity > 0.08
            ? `drop-shadow(0 0 ${6 + proximity * 16}px rgba(167,139,250,${0.18 + proximity * 0.45}))`
            : undefined,
        transition: "filter 0.3s ease",
      }}
    >
      {/* ── Speech bubble ── */}
      <div
        aria-live="polite"
        style={{
          position:   "absolute",
          bottom:     "calc(100% + 14px)",
          right:      0,
          width:      "192px",
          opacity:    bubble.visible ? 1 : 0,
          transform:  bubble.visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.93)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background:   "#14161A",
            border:       "1px solid #2E343B",
            borderRadius: "12px",
            padding:      "10px 14px",
            position:     "relative",
          }}
        >
          <p style={{ fontSize: "13px", fontWeight: 500, color: "#ECEDEF", marginBottom: "3px", lineHeight: 1.3 }}>
            {MESSAGES[bubble.idx].main}
          </p>
          <p style={{ fontSize: "11px", color: "#5C6470", fontFamily: "var(--font-jetbrains-mono)", lineHeight: 1.45 }}>
            {MESSAGES[bubble.idx].sub}
          </p>

          {/* Tail — points down toward the robot */}
          <svg
            width="14" height="8" viewBox="0 0 14 8" fill="none"
            style={{ position: "absolute", bottom: "-8px", right: "26px" }}
            aria-hidden="true"
          >
            <path d="M0,0 L7,8 L14,0 Z"        fill="#2E343B" />
            <path d="M1.5,0 L7,6.5 L12.5,0 Z"  fill="#14161A" />
          </svg>
        </div>
      </div>

      {/* ── Robot ── */}
      <svg
        width="64" height="92" viewBox="0 0 64 92"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        className="robot-float"
        style={{ display: "block" }}
        role="img"
        aria-label="Robot mascot — click to chat"
      >
        {/* Antenna */}
        <line x1="32" y1="3" x2="32" y2="15" stroke={AD} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="32" cy="3" r="3"
          fill={excited || proximity > 0.6 ? A : AD}
          style={{ transition: "fill 0.2s" }} />
        {excited && <circle cx="32" cy="3" r="5" fill="none" stroke={A} strokeWidth="1" opacity="0.5" />}

        {/* Head */}
        <rect x="6" y="15" width="52" height="40" rx="10"
          fill={B1} stroke={proximity > 0.15 ? BR2 : BR} strokeWidth="1"
          style={{ transition: "stroke 0.3s" }} />

        {/* Eye sockets */}
        <circle cx="22" cy="35" r="9" fill={B2} stroke={AD} strokeWidth="1" />
        <circle cx="42" cy="35" r="9" fill={B2} stroke={AD} strokeWidth="1" />

        {/* Pupils / blink */}
        {blinking ? (
          <>
            <rect x="14.5" y="33.5" width="15" height="3"   rx="1.5" fill={A} />
            <rect x="34.5" y="33.5" width="15" height="3"   rx="1.5" fill={A} />
          </>
        ) : (
          <>
            <circle cx={22 + pupil.x} cy={35 + pupil.y} r={excited ? 5.5 : 4.5} fill={A} style={{ transition: "r 0.15s" }} />
            <circle cx={22 + pupil.x + 1.5} cy={35 + pupil.y - 1.8} r="1.3" fill={A2} opacity="0.65" />
            <circle cx={42 + pupil.x} cy={35 + pupil.y} r={excited ? 5.5 : 4.5} fill={A} style={{ transition: "r 0.15s" }} />
            <circle cx={42 + pupil.x + 1.5} cy={35 + pupil.y - 1.8} r="1.3" fill={A2} opacity="0.65" />
          </>
        )}

        {/* Mouth bar + dots */}
        <rect x="20" y="47" width="24" height="2.5" rx="1.25" fill={BR} />
        <circle cx="26" cy="48.25" r="1.1" fill={proximity > 0.25 ? A : AD} style={{ transition: "fill 0.25s" }} />
        <circle cx="32" cy="48.25" r="1.1" fill={proximity > 0.45 ? A : AD} style={{ transition: "fill 0.25s" }} />
        <circle cx="38" cy="48.25" r="1.1" fill={proximity > 0.65 ? A : AD} style={{ transition: "fill 0.25s" }} />

        {/* Neck */}
        <rect x="27" y="55" width="10" height="6" rx="2" fill={B1} stroke={BR} strokeWidth="1" />
        <line x1="30" y1="56.5" x2="30" y2="59.5" stroke={BR} strokeWidth="1" />
        <line x1="34" y1="56.5" x2="34" y2="59.5" stroke={BR} strokeWidth="1" />

        {/* Body */}
        <rect x="8" y="61" width="48" height="29" rx="8"
          fill={B1} stroke={proximity > 0.15 ? BR2 : BR} strokeWidth="1"
          style={{ transition: "stroke 0.3s" }} />

        {/* Chest panel */}
        <rect x="16" y="67" width="32" height="17" rx="4" fill={B2} stroke={BR} strokeWidth="1" />

        {/* Center orb */}
        <circle cx="32" cy="75.5" r="3.5"
          fill={proximity > 0.2 ? A : AD}
          opacity={proximity > 0.2 ? 0.9 : 0.5}
          style={{ transition: "fill 0.3s, opacity 0.3s" }} />
        {proximity > 0.35 && (
          <circle cx="32" cy="75.5" r="5.5" fill="none" stroke={A} strokeWidth="0.75" opacity="0.35" />
        )}

        {/* Status dots */}
        <circle cx="22" cy="75.5" r="2" fill={proximity > 0.5 ? G : BR} style={{ transition: "fill 0.3s" }} />
        <circle cx="42" cy="75.5" r="2" fill={excited ? W : BR}          style={{ transition: "fill 0.2s" }} />
      </svg>

      <style>{`
        .robot-float {
          animation: robotFloat 3.8s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes robotFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-7px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .robot-float { animation: none; }
        }
      `}</style>
    </div>
  );
}
