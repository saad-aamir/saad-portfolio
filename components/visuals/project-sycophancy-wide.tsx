export default function ProjectSycophancyWide() {
  return (
    <svg
      viewBox="0 0 1100 360"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Sycophancy eval pipeline diagram"
    >
      <defs>
        {/* userSpaceOnUse = fixed size regardless of strokeWidth; refX at tip so no overshoot into boxes */}
        <marker id="swA" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="10" refX="13" refY="5" orient="auto">
          <path d="M0 0 L13 5 L0 10 Z" fill="#5C4A99" />
        </marker>
        <marker id="swDA" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
          <path d="M0 0 L9 4 L0 8 Z" fill="#A78BFA" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="1100" height="360" rx="16" fill="#14161A" />
      {[110, 220, 330, 440, 550, 660, 770, 880, 990].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="360" stroke="#23272D" strokeWidth="1" />
      ))}
      {[90, 180, 270].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="1100" y2={y} stroke="#23272D" strokeWidth="1" />
      ))}

      {/* ── 200 questions  x=12–128  yc=140 ── */}
      <rect x="12" y="115" width="116" height="50" rx="7" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="70" y="136" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">200 questions</text>
      <text x="70" y="153" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">seeded gen.</text>

      {/* ── 3 pushback variants  x=12–128  yc=250 ── */}
      <rect x="12" y="220" width="116" height="62" rx="7" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="70" y="242" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">3 pushback</text>
      <text x="70" y="258" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">variants</text>
      <text x="70" y="274" textAnchor="middle" fill="#5C6470" fontSize="9.5" fontFamily="monospace">mild · med · strong</text>

      {/* Straight diagonals: inputs → solver left edge */}
      <path d="M128,140 L162,172" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#swA)" />
      <path d="M128,251 L162,218" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#swA)" />

      {/* ── Two-turn solver  x=162–292  yc=195 ── */}
      <rect x="162" y="155" width="130" height="80" rx="8" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="227" y="185" textAnchor="middle" fill="#A78BFA" fontSize="12.5" fontFamily="monospace" fontWeight="500">Two-turn</text>
      <text x="227" y="201" textAnchor="middle" fill="#A78BFA" fontSize="12.5" fontFamily="monospace" fontWeight="500">solver</text>
      <text x="227" y="222" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">Ask → Pushback</text>

      {/* Straight diagonals: solver right edge → models left edge */}
      <path d="M292,172 L326,140" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#swA)" />
      <path d="M292,218 L326,250" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#swA)" />

      {/* ── Llama 3.1 8B  x=326–444  yc=140 ── */}
      <rect x="326" y="114" width="118" height="52" rx="7" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="385" y="136" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">Llama 3.1 8B</text>
      <text x="385" y="154" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">via Ollama</text>

      {/* ── Qwen 2.5 7B  x=326–444  yc=250 ── */}
      <rect x="326" y="224" width="118" height="52" rx="7" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="385" y="246" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">Qwen 2.5 7B</text>
      <text x="385" y="264" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">via Ollama</text>

      {/* Straight diagonals: models right edge → regex left edge */}
      <path d="M444,140 L478,182" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#swA)" />
      <path d="M444,250 L478,208" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#swA)" />

      {/* ── Regex check  x=478–596  yc=195 ── */}
      <rect x="478" y="160" width="118" height="70" rx="7" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="537" y="185" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">Regex check</text>
      <text x="537" y="202" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">first answer</text>
      <text x="537" y="219" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">correct?</text>

      {/* No branch: diagonal from Regex top-right → INITIAL left edge */}
      <path d="M596,162 L660,100" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#swA)" />
      <text x="616" y="117" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">No</text>

      {/* Yes branch: horizontal, 64px gap for label */}
      <path d="M596,195 L660,195" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#swA)" />
      <text x="628" y="184" textAnchor="middle" fill="#5C6470" fontSize="11" fontFamily="monospace">Yes</text>

      {/* ── INITIAL_INCORRECT  x=660–828  yc=100 ── */}
      <rect x="660" y="78" width="168" height="44" rx="7" fill="#15171A" stroke="#2E343B" strokeWidth="1" />
      <text x="744" y="105" textAnchor="middle" fill="#5C6470" fontSize="11.5" fontFamily="monospace">INITIAL_INCORRECT</text>

      {/* ── Sonnet 4.5 judge  x=660–828  yc=195 ── */}
      <rect x="660" y="160" width="168" height="70" rx="8" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="744" y="187" textAnchor="middle" fill="#A78BFA" fontSize="13" fontFamily="monospace">Sonnet 4.5</text>
      <text x="744" y="204" textAnchor="middle" fill="#9CA3AC" fontSize="11" fontFamily="monospace">judge · classify</text>
      <text x="744" y="220" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">second response</text>

      {/* ── 93 hand-labeled  x=660–828  y=285–335 ── */}
      <rect x="660" y="285" width="168" height="50" rx="7" fill="#15171A" stroke="#A78BFA" strokeWidth="1" strokeDasharray="5 3" />
      <text x="744" y="307" textAnchor="middle" fill="#A78BFA" fontSize="11" fontFamily="monospace">93 hand-labeled</text>
      <text x="744" y="325" textAnchor="middle" fill="#5C6470" fontSize="9.5" fontFamily="monospace">validates</text>

      {/* Dashed vertical: 93-labeled top → Sonnet bottom */}
      <line x1="744" y1="285" x2="744" y2="232" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#swDA)" />

      {/* Arrow: Sonnet right → MAINTAINED left */}
      <path d="M828,195 L862,195" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#swA)" />

      {/* ── MAINTAINED / NOT_MAINTAINED  x=862–1016  yc=195 ── */}
      <rect x="862" y="145" width="154" height="100" rx="8" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="939" y="170" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">MAINTAINED</text>
      <text x="939" y="187" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">or</text>
      <text x="939" y="204" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">NOT_MAINTAINED</text>
      <line x1="862" y1="220" x2="1016" y2="220" stroke="#23272D" strokeWidth="1" />
      <text x="939" y="236" textAnchor="middle" fill="#5C4A99" fontSize="10" fontFamily="monospace">→ bootstrap CIs</text>
      <text x="939" y="234" dy="14" textAnchor="middle" fill="#5C6470" fontSize="8.5" fontFamily="monospace">conditional on first-correct</text>

      {/* Arrow: MAINTAINED right → Findings left */}
      <path d="M1016,195 L1028,195" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#swA)" />

      {/* ── Findings table  x=1028–1088  yc=195 ── */}
      <rect x="1028" y="170" width="60" height="50" rx="25" fill="#1B1E22" stroke="#6DDC9C" strokeWidth="1.5" />
      <circle cx="1058" cy="191" r="5" fill="#6DDC9C" />
      <text x="1058" y="212" textAnchor="middle" fill="#6DDC9C" fontSize="10" fontFamily="monospace">table</text>
    </svg>
  );
}
