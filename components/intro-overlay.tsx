"use client";

import { useState, useEffect, useRef } from "react";

const NAME = "Saad Aamir";
const TYPING_SPEED = 80;
const HOLD_DURATION = 500;
const SWOOSH_DURATION = 600;
const FADE_DURATION = 180;
const SESSION_KEY = "intro-done";

type Phase = "typing" | "swooshing" | "fading" | "gone";

// Fast path for client-side navigations (no sessionStorage lookup needed)
let introDone = false;

export default function IntroOverlay() {
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [swooshTransform, setSwooshTransform] = useState("none");
  const nameRef = useRef<HTMLSpanElement>(null);

  // On mount: skip animation if already played this session
  useEffect(() => {
    if (introDone || sessionStorage.getItem(SESSION_KEY)) {
      introDone = true;
      setPhase("gone");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;

    if (chars < NAME.length) {
      const t = setTimeout(() => setChars((c) => c + 1), TYPING_SPEED);
      return () => clearTimeout(t);
    }

    // Fully typed — measure target then swoosh
    const hold = setTimeout(() => {
      const targetEl = document.getElementById("hero-name-span");
      const sourceEl = nameRef.current;

      if (targetEl && sourceEl) {
        const targetRect = targetEl.getBoundingClientRect();
        const sourceRect = sourceEl.getBoundingClientRect();
        const dx = targetRect.left - sourceRect.left;
        const dy =
          targetRect.top + targetRect.height / 2 -
          (sourceRect.top + sourceRect.height / 2);
        setSwooshTransform(`translate(${dx}px, ${dy}px)`);
      }

      setPhase("swooshing");

      // Once name has landed, fade overlay away
      setTimeout(() => {
        setPhase("fading");
        setTimeout(() => {
          introDone = true;
          sessionStorage.setItem(SESSION_KEY, "1");
          setPhase("gone");
        }, FADE_DURATION);
      }, SWOOSH_DURATION);
    }, HOLD_DURATION);

    return () => clearTimeout(hold);
  }, [chars, phase]);

  if (phase === "gone") return null;

  const isSwooshing = phase === "swooshing";
  const isFading = phase === "fading";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#0E0F11",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isFading ? 0 : 1,
        transition: isFading ? `opacity ${FADE_DURATION}ms ease` : "none",
        pointerEvents: isFading ? "none" : "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          transform: isSwooshing || isFading ? swooshTransform : "none",
          transition: isSwooshing
            ? `transform ${SWOOSH_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
            : "none",
        }}
      >
        <span
          ref={nameRef}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "68px",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            background: "linear-gradient(120deg, #A78BFA, #C4B5FD)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            whiteSpace: "nowrap",
          }}
        >
          {NAME.slice(0, chars)}
        </span>

        {!isSwooshing && !isFading && (
          <span
            className="cursor-blink"
            style={{
              display: "inline-block",
              width: "3px",
              height: "62px",
              background: "#A78BFA",
              borderRadius: "2px",
              marginLeft: "5px",
              flexShrink: 0,
            }}
          />
        )}
      </div>
    </div>
  );
}
