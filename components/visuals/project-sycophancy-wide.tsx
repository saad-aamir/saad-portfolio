export default function ProjectSycophancyWide() {
  return (
    <svg
      viewBox="0 0 1100 360"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Sycophancy eval pipeline diagram"
    >
      <defs>
        <marker id="swA" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#5C4A99" />
        </marker>
        <marker id="swDA" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#A78BFA" />
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

      {/* ── 200 questions ── */}
      {/* box: x=12–128, yc=122 */}
      <rect x="12" y="96" width="116" height="52" rx="7" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="70" y="118" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">200 questions</text>
      <text x="70" y="135" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">seeded gen.</text>

      {/* ── 3 pushback variants ── */}
      {/* box: x=12–128, yc=248 */}
      <rect x="12" y="216" width="116" height="64" rx="7" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="70" y="240" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">3 pushback</text>
      <text x="70" y="256" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">variants</text>
      <text x="70" y="272" textAnchor="middle" fill="#5C6470" fontSize="9.5" fontFamily="monospace">mild · med · strong</text>

      {/* Arrows: inputs → solver */}
      <path d="M128,122 L158,122 L158,182" stroke="#5C4A99" strokeWidth="2" markerEnd="url(#swA)" />
      <path d="M128,248 L158,248 L158,226" stroke="#5C4A99" strokeWidth="2" markerEnd="url(#swA)" />

      {/* ── Two-turn solver ── */}
      {/* box: x=158–296, yc=199 */}
      <rect x="158" y="160" width="138" height="78" rx="8" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="227" y="191" textAnchor="middle" fill="#A78BFA" fontSize="12.5" fontFamily="monospace" fontWeight="500">Two-turn</text>
      <text x="227" y="207" textAnchor="middle" fill="#A78BFA" fontSize="12.5" fontFamily="monospace" fontWeight="500">solver</text>
      <text x="227" y="226" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">Ask → Pushback</text>

      {/* Arrows: solver → models */}
      <path d="M296,182 L328,139" stroke="#5C4A99" strokeWidth="2" markerEnd="url(#swA)" />
      <path d="M296,218 L328,259" stroke="#5C4A99" strokeWidth="2" markerEnd="url(#swA)" />

      {/* ── Llama 3.1 8B ── */}
      {/* box: x=328–456, yc=139 */}
      <rect x="328" y="110" width="128" height="58" rx="7" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="392" y="135" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">Llama 3.1 8B</text>
      <text x="392" y="154" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">via Ollama</text>

      {/* ── Qwen 2.5 7B ── */}
      {/* box: x=328–456, yc=259 */}
      <rect x="328" y="230" width="128" height="58" rx="7" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="392" y="255" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">Qwen 2.5 7B</text>
      <text x="392" y="274" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">via Ollama</text>

      {/* Arrows: models → regex */}
      <path d="M456,139 L492,180" stroke="#5C4A99" strokeWidth="2" markerEnd="url(#swA)" />
      <path d="M456,259 L492,214" stroke="#5C4A99" strokeWidth="2" markerEnd="url(#swA)" />

      {/* ── Regex check ── */}
      {/* box: x=492–620, yc=198 */}
      <rect x="492" y="162" width="128" height="72" rx="7" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="556" y="188" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">Regex check</text>
      <text x="556" y="206" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">first answer</text>
      <text x="556" y="222" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">correct?</text>

      {/* No branch → INITIAL_INCORRECT */}
      <path d="M556,162 L556,91 L640,91" stroke="#5C4A99" strokeWidth="2" markerEnd="url(#swA)" />
      <text x="596" y="80" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">No</text>

      {/* ── INITIAL_INCORRECT ── */}
      {/* box: x=640–816, yc=91 */}
      <rect x="640" y="68" width="176" height="46" rx="7" fill="#15171A" stroke="#2E343B" strokeWidth="1" />
      <text x="728" y="96" textAnchor="middle" fill="#5C6470" fontSize="11.5" fontFamily="monospace">INITIAL_INCORRECT</text>

      {/* Yes branch → Sonnet judge */}
      <path d="M620,198 L640,198" stroke="#5C4A99" strokeWidth="2" markerEnd="url(#swA)" />
      <text x="630" y="186" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">Yes</text>

      {/* ── Sonnet 4.5 judge ── */}
      {/* box: x=640–816, yc=204 */}
      <rect x="640" y="168" width="176" height="72" rx="8" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="728" y="196" textAnchor="middle" fill="#A78BFA" fontSize="13" fontFamily="monospace">Sonnet 4.5</text>
      <text x="728" y="213" textAnchor="middle" fill="#9CA3AC" fontSize="11" fontFamily="monospace">judge · classify</text>
      <text x="728" y="228" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">second response</text>

      {/* ── 93 hand-labeled (dashed) ── */}
      {/* box: x=640–816, y=296–350 */}
      <rect x="640" y="296" width="176" height="54" rx="7" fill="#15171A" stroke="#A78BFA" strokeWidth="1" strokeDasharray="5 3" />
      <text x="728" y="320" textAnchor="middle" fill="#A78BFA" fontSize="11" fontFamily="monospace">93 hand-labeled</text>
      <text x="728" y="338" textAnchor="middle" fill="#5C6470" fontSize="9.5" fontFamily="monospace">validates</text>
      <line x1="728" y1="296" x2="728" y2="241" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#swDA)" />

      {/* Arrow: Sonnet → MAINTAINED */}
      <path d="M816,204 L848,204" stroke="#5C4A99" strokeWidth="2" markerEnd="url(#swA)" />

      {/* ── MAINTAINED / NOT_MAINTAINED ── */}
      {/* box: x=848–1016, yc=207 */}
      <rect x="848" y="152" width="168" height="110" rx="8" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="932" y="178" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">MAINTAINED</text>
      <text x="932" y="196" textAnchor="middle" fill="#5C6470" fontSize="10" fontFamily="monospace">or</text>
      <text x="932" y="213" textAnchor="middle" fill="#9CA3AC" fontSize="11.5" fontFamily="monospace">NOT_MAINTAINED</text>
      <line x1="848" y1="230" x2="1016" y2="230" stroke="#23272D" strokeWidth="1" />
      <text x="932" y="249" textAnchor="middle" fill="#5C4A99" fontSize="10" fontFamily="monospace">→ bootstrap CIs</text>
      <text x="932" y="263" textAnchor="middle" fill="#5C6470" fontSize="9" fontFamily="monospace">conditional on first-correct</text>

      {/* Arrow: MAINTAINED → Findings */}
      <path d="M1016,204 L1036,204" stroke="#5C4A99" strokeWidth="2" markerEnd="url(#swA)" />

      {/* ── Findings table (green) ── */}
      {/* pill: x=1036–1092, yc=204 */}
      <rect x="1036" y="176" width="56" height="56" rx="28" fill="#1B1E22" stroke="#6DDC9C" strokeWidth="1.5" />
      <circle cx="1064" cy="197" r="5" fill="#6DDC9C" />
      <text x="1064" y="217" textAnchor="middle" fill="#6DDC9C" fontSize="9.5" fontFamily="monospace">table</text>
    </svg>
  );
}
