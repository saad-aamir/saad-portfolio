"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroRobot() {
  const ref = useRef<HTMLDivElement>(null);
  const [head,   setHead]   = useState({ x: 0, y: 0 });
  const [body,   setBody]   = useState({ x: 0, y: 0 });
  const [pupil,  setPupil]  = useState({ x: 0, y: 0 });
  const [blinking,  setBlinking]  = useState(false);
  const [proximity, setProximity] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r  = ref.current.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist  = Math.sqrt(dx * dx + dy * dy);
      setProximity(Math.max(0, 1 - dist / 550));
      const angle = Math.atan2(dy, dx);
      const f     = Math.min(1, dist / 300);
      setBody ({ x: Math.cos(angle) * 4 * f * 0.20, y: Math.sin(angle) * 3 * f * 0.15 });
      setHead ({ x: Math.cos(angle) * 4 * f * 0.60, y: Math.sin(angle) * 3 * f * 0.30 });
      const pf = Math.min(1, dist / 180);
      setPupil({ x: Math.cos(angle) * 3 * pf, y: Math.sin(angle) * 3 * pf });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const blink = () => {
      t = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => { setBlinking(false); blink(); }, 130);
      }, 3000 + Math.random() * 2500);
    };
    blink();
    return () => clearTimeout(t);
  }, []);

  const A  = "#A78BFA", A2 = "#C4B5FD", AD = "#5C4A99";
  const B1 = "#15171A", B2 = "#1B1E22", BK = "#14161A";
  const BR = "#23272D", BR2 = "#2E343B";
  const G  = "#6DDC9C", W = "#F5C16C", PK = "#F47DA0";
  const p  = proximity;

  return (
    <div ref={ref} className="select-none hr-wrap" style={{ overflow: "visible" }} aria-hidden="true">
      {/*
        viewBox 220×260, displayed 200×236.
        Thrusters: two straight-down nozzle bells at x=74 and x=146.
          Flames are axis-aligned ellipses so transform-box:fill-box +
          transform-origin:50% 0% gives true scaleY flicker from nozzle exit.
        Rope: drawn last with overflow:visible, runs from tow-bar to y=520,
          landing behind the card (which has a hook ring at its top).
      */}
      <svg
        width="200" height="236"
        viewBox="0 0 220 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Glow filter shared by rope */}
          <filter id="hr-rope-glow" x="-80%" y="-5%" width="260%" height="110%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* Softer glow for flame layers */}
          <filter id="hr-flame-glow" x="-40%" y="-5%" width="180%" height="110%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* ── THRUSTER FLAMES ─────────────────────────────────────────
            Drawn before body so the body sits on top.
            All ellipses start at y = cy − ry = 244 (nozzle exit).
            transform-box:fill-box + transform-origin:50% 0% in CSS
            makes scaleY stretch/shrink downward from the nozzle exit.
        */}

        {/* Left burner  — cx=74 */}
        {/* outer violet corona */}
        <ellipse cx="74" cy="294" rx="18" ry="50" fill={A}  opacity="0.18"
          className="hr-fo hr-d3" filter="url(#hr-flame-glow)"/>
        {/* pink/orange mid */}
        <ellipse cx="74" cy="272" rx="12" ry="28" fill={PK} opacity="0.65"
          className="hr-fm hr-d2"/>
        {/* warm yellow inner */}
        <ellipse cx="74" cy="258" rx="7"  ry="14" fill={W}  opacity="0.95"
          className="hr-fc hr-d1"/>
        {/* white-hot core */}
        <ellipse cx="74" cy="249" rx="4"  ry="5"  fill="#fff" opacity="0.90"
          className="hr-fi hr-d0"/>

        {/* Right burner — cx=146 */}
        <ellipse cx="146" cy="294" rx="18" ry="50" fill={A}  opacity="0.18"
          className="hr-fo hr-d1" filter="url(#hr-flame-glow)"/>
        <ellipse cx="146" cy="272" rx="12" ry="28" fill={PK} opacity="0.65"
          className="hr-fm hr-d0"/>
        <ellipse cx="146" cy="258" rx="7"  ry="14" fill={W}  opacity="0.95"
          className="hr-fc hr-d3"/>
        <ellipse cx="146" cy="249" rx="4"  ry="5"  fill="#fff" opacity="0.90"
          className="hr-fi hr-d2"/>

        {/* ── BODY + ARMS (parallax) ─────────────────────────────────── */}
        <g transform={`translate(${body.x},${body.y})`}>

          {/* left shoulder connector */}
          <rect x="30" y="116" width="28" height="20" rx="6" fill={B1} stroke={BR} strokeWidth="1"/>
          {/* left upper arm */}
          <rect x="35" y="116" width="18" height="70" rx="7" fill={B1} stroke={BR} strokeWidth="1"/>
          <rect x="38" y="123" width="12" height="4"  rx="2" fill={BR}/>
          {/* left elbow */}
          <circle cx="44" cy="184" r="8" fill={B2} stroke={BR2} strokeWidth="1"/>
          {/* left forearm — reaches tow bar */}
          <rect x="38" y="188" width="14" height="62" rx="6" fill={BK} stroke={BR} strokeWidth="1"/>
          <rect x="41" y="196" width="8"  height="2"  rx="1" fill={BR}/>
          <rect x="41" y="202" width="6"  height="2"  rx="1" fill={BR}/>

          {/* right shoulder connector */}
          <rect x="162" y="116" width="28" height="20" rx="6" fill={B1} stroke={BR} strokeWidth="1"/>
          {/* right upper arm */}
          <rect x="167" y="116" width="18" height="70" rx="7" fill={B1} stroke={BR} strokeWidth="1"/>
          <rect x="170" y="123" width="12" height="4"  rx="2" fill={BR}/>
          {/* right elbow */}
          <circle cx="176" cy="184" r="8" fill={B2} stroke={BR2} strokeWidth="1"/>
          {/* right forearm */}
          <rect x="168" y="188" width="14" height="62" rx="6" fill={BK} stroke={BR} strokeWidth="1"/>
          <rect x="171" y="196" width="8"  height="2"  rx="1" fill={BR}/>
          <rect x="171" y="202" width="6"  height="2"  rx="1" fill={BR}/>

          {/* chest (covers shoulder stubs) */}
          <rect x="56"  y="108" width="108" height="118" rx="12" fill={B1} stroke={BR} strokeWidth="1"/>
          <rect x="68"  y="122" width="84"  height="74"  rx="7"  fill={BK} stroke={BR} strokeWidth="1"/>

          {/* orb */}
          <circle cx="110" cy="159" r="15" fill={BK}
            stroke={p > 0.15 ? AD : BR} strokeWidth="1" style={{ transition: "stroke 0.4s" }}/>
          <circle cx="110" cy="159" r="10" fill={p > 0.15 ? A : AD}
            style={{ transition: "fill 0.4s" }}/>
          <circle cx="114" cy="155" r="3"  fill={A2} opacity="0.65"/>
          {p > 0.18 && (
            <circle cx="110" cy="159" r="22" fill="none" stroke={A}
              strokeWidth="0.75" opacity={p * 0.5}/>
          )}

          {/* status dots */}
          {[G, A, A, A, W].map((c, i) => (
            <circle key={i} cx={88 + i * 11} cy={187} r="2.8"
              fill={p > ([0.4, 0.2, 0.1, 0.2, 0.4][i]) ? c : BR}
              style={{ transition: "fill 0.3s" }}/>
          ))}

          {/* vent lines */}
          <rect x="76" y="201" width="68" height="2" rx="1" fill={BR}/>
          <rect x="76" y="207" width="52" height="2" rx="1" fill={BR}/>
          <rect x="76" y="213" width="60" height="2" rx="1" fill={BR}/>

          {/* hip plate */}
          <rect x="72" y="224" width="76" height="14" rx="6" fill={B1} stroke={BR} strokeWidth="1"/>
          <rect x="80" y="228" width="60" height="3"  rx="1.5" fill={BR}/>

          {/* nozzle tubes — protrude below hip plate */}
          <rect x="72" y="232" width="4" height="12" rx="1" fill={B1} stroke={BR2} strokeWidth="1"/>
          <rect x="144" y="232" width="4" height="12" rx="1" fill={B1} stroke={BR2} strokeWidth="1"/>

          {/* nozzle bells — flared trapezoid, exit at y=244 */}
          <path d="M69,244 L72,237 L76,237 L79,244 Z"
            fill={B2} stroke={AD} strokeWidth="1" strokeLinejoin="round"/>
          <path d="M141,244 L144,237 L148,237 L151,244 Z"
            fill={B2} stroke={AD} strokeWidth="1" strokeLinejoin="round"/>
          {/* nozzle exit glow rings */}
          <ellipse cx="74"  cy="244" rx="6" ry="2" fill={W} opacity="0.6"/>
          <ellipse cx="146" cy="244" rx="6" ry="2" fill={W} opacity="0.6"/>

          {/* tow bar */}
          <rect x="40" y="250" width="140" height="10" rx="5"
            fill={B1} stroke={BR2} strokeWidth="1"/>
          <rect x="44"  y="253" width="4" height="4" rx="1" fill={BR2}/>
          <rect x="172" y="253" width="4" height="4" rx="1" fill={BR2}/>

          {/* center hook ring */}
          <circle cx="110" cy="255" r="9"   stroke={AD} strokeWidth="1.5" fill={BK}/>
          <circle cx="110" cy="255" r="4.5" fill={p > 0.2 ? A : AD} style={{ transition: "fill 0.4s" }}/>
          <circle cx="110" cy="255" r="2"   fill={A2} opacity="0.5"/>

          {/* neck */}
          <rect x="98" y="96" width="24" height="14" rx="4" fill={BK} stroke={BR} strokeWidth="1"/>
          <line x1="105" y1="98"  x2="105" y2="108" stroke={BR} strokeWidth="1"/>
          <line x1="110" y1="98"  x2="110" y2="108" stroke={BR} strokeWidth="1"/>
          <line x1="115" y1="98"  x2="115" y2="108" stroke={BR} strokeWidth="1"/>
        </g>

        {/* ── HEAD (most parallax) ─────────────────────────────────── */}
        <g transform={`translate(${head.x},${head.y})`}>
          <line x1="110" y1="4" x2="110" y2="22" stroke={AD} strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="110" cy="4" r="3.5" fill={p > 0.5 ? A : AD} style={{ transition: "fill 0.3s" }}/>
          {p > 0.35 && (
            <circle cx="110" cy="4" r="6.5" fill="none" stroke={A}
              strokeWidth="0.8" opacity={p * 0.6}/>
          )}

          <rect x="68" y="20" width="84" height="78" rx="13" fill={B1} stroke={BR2} strokeWidth="1"/>
          <rect x="77" y="21" width="66" height="5"  rx="2.5" fill={BR2} opacity="0.5"/>

          <rect x="56"  y="36" width="14" height="28" rx="5" fill={B2} stroke={BR} strokeWidth="1"/>
          <circle cx="63"  cy="50" r="2" fill={p > 0.3 ? AD : BR} style={{ transition: "fill 0.3s" }}/>
          <rect x="150" y="36" width="14" height="28" rx="5" fill={B2} stroke={BR} strokeWidth="1"/>
          <circle cx="157" cy="50" r="2" fill={p > 0.3 ? AD : BR} style={{ transition: "fill 0.3s" }}/>

          <rect x="78" y="38" width="64" height="38" rx="7" fill={BK} stroke={AD} strokeWidth="1"/>
          {p > 0.15 && (
            <rect x="79" y="39" width="62" height="36" rx="6" fill={A} opacity={p * 0.07}/>
          )}

          <circle cx="98"  cy="57" r="12" fill={B2} stroke={AD} strokeWidth="1"/>
          <circle cx="122" cy="57" r="12" fill={B2} stroke={AD} strokeWidth="1"/>

          {blinking ? (
            <>
              <rect x="89"  y="55" width="18" height="3.5" rx="1.75" fill={A}/>
              <rect x="113" y="55" width="18" height="3.5" rx="1.75" fill={A}/>
            </>
          ) : (
            <>
              <circle cx={98  + pupil.x} cy={57 + pupil.y} r="6.5" fill={A}/>
              <circle cx={98  + pupil.x + 2} cy={57 + pupil.y - 2} r="2" fill={A2} opacity="0.7"/>
              <circle cx={98  + pupil.x} cy={57 + pupil.y} r="10"  fill={A} opacity="0.1"/>
              <circle cx={122 + pupil.x} cy={57 + pupil.y} r="6.5" fill={A}/>
              <circle cx={122 + pupil.x + 2} cy={57 + pupil.y - 2} r="2" fill={A2} opacity="0.7"/>
              <circle cx={122 + pupil.x} cy={57 + pupil.y} r="10"  fill={A} opacity="0.1"/>
            </>
          )}

          <rect x="88" y="82" width="44" height="7" rx="3.5" fill={B2} stroke={BR} strokeWidth="1"/>
          {[0,1,2,3,4].map((i) => (
            <rect key={i} x={93 + i * 8} y={84.5} width="4" height="2" rx="1"
              fill={p > 0.25 ? AD : BR} style={{ transition: "fill 0.3s" }}/>
          ))}
        </g>

        {/* ── ROPE — drawn last, overflow:visible carries it into the card ──
            The card (later in DOM) renders on top, so the rope "enters" it
            cleanly from above. A spacer div in contact.tsx creates the gap
            where the rope is visible before disappearing behind the card.
        */}
        <path
          d="M110,264 Q105,390 110,520"
          stroke={A} strokeWidth="3.5" strokeDasharray="8 5"
          strokeLinecap="round" fill="none"
          filter="url(#hr-rope-glow)"
          className="hr-rope"
        />
        {/* highlight strand */}
        <path
          d="M110,264 Q115,390 110,520"
          stroke={A2} strokeWidth="1.5"
          strokeLinecap="round" fill="none" opacity="0.35"
          className="hr-rope"
        />
      </svg>

      <style>{`
        /* Float */
        .hr-wrap svg {
          animation: hrFloat 4s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes hrFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-10px); }
        }

        /* Flames — axis-aligned ellipses, scale from nozzle exit (top-center) */
        .hr-fi, .hr-fc, .hr-fm, .hr-fo {
          transform-box: fill-box;
          transform-origin: 50% 0%;   /* top-center = nozzle exit for each ellipse */
        }
        .hr-fi { animation: hrFi 0.11s ease-in-out infinite alternate; }
        .hr-fc { animation: hrFc 0.18s ease-in-out infinite alternate-reverse; }
        .hr-fm { animation: hrFm 0.27s ease-in-out infinite alternate; }
        .hr-fo { animation: hrFo 0.42s ease-in-out infinite alternate-reverse; }

        @keyframes hrFi {
          from { transform: scaleX(1)    scaleY(1);    }
          to   { transform: scaleX(1.7)  scaleY(0.60); }
        }
        @keyframes hrFc {
          from { transform: scaleX(0.80) scaleY(1.22); }
          to   { transform: scaleX(1.50) scaleY(0.72); }
        }
        @keyframes hrFm {
          from { transform: scaleX(0.85) scaleY(1.15); }
          to   { transform: scaleX(1.40) scaleY(0.78); }
        }
        @keyframes hrFo {
          from { transform: scaleX(0.90) scaleY(1);    opacity: 0.12; }
          to   { transform: scaleX(1.55) scaleY(0.62); opacity: 0.22; }
        }

        /* Stagger left vs right burner */
        .hr-d1 { animation-delay: 0.04s; }
        .hr-d2 { animation-delay: 0.09s; }
        .hr-d3 { animation-delay: 0.14s; }

        /* Rope pulses with float */
        .hr-rope { animation: hrRope 4s ease-in-out infinite; }
        @keyframes hrRope {
          0%, 100% { opacity: 1;    }
          50%       { opacity: 0.50; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hr-wrap svg                { animation: none; }
          .hr-fi,.hr-fc,.hr-fm,.hr-fo { animation: none; }
          .hr-rope                    { animation: none; }
        }
      `}</style>
    </div>
  );
}
