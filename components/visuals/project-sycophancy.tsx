export default function ProjectSycophancy() {
  return (
    <svg
      viewBox="0 0 560 230"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Sycophancy eval pipeline diagram"
    >
      <defs>
        <marker id="syA" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#5C4A99" />
        </marker>
        <marker id="syDA" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#A78BFA" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="560" height="320" rx="12" fill="#14161A" />
      {[80, 160, 240, 320, 400, 480].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="320" stroke="#23272D" strokeWidth="1" />
      ))}
      {[64, 128, 192, 256].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="560" y2={y} stroke="#23272D" strokeWidth="1" />
      ))}

      {/* ── 200 questions ── */}
      <rect x="8" y="62" width="76" height="40" rx="5" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="46" y="79" textAnchor="middle" fill="#9CA3AC" fontSize="8" fontFamily="monospace">200 questions</text>
      <text x="46" y="93" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">seeded gen.</text>

      {/* ── 3 pushback variants ── */}
      <rect x="8" y="216" width="76" height="50" rx="5" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="46" y="234" textAnchor="middle" fill="#9CA3AC" fontSize="8" fontFamily="monospace">3 pushback</text>
      <text x="46" y="247" textAnchor="middle" fill="#9CA3AC" fontSize="8" fontFamily="monospace">variants</text>
      <text x="46" y="259" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">mild · med · strong</text>

      {/* Arrows: inputs → solver */}
      <path d="M84,82 L92,82 L92,148" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />
      <path d="M84,241 L92,241 L92,192" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />

      {/* ── Two-turn solver ── */}
      <rect x="92" y="132" width="76" height="58" rx="6" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="130" y="152" textAnchor="middle" fill="#A78BFA" fontSize="8.5" fontFamily="monospace" fontWeight="500">Two-turn</text>
      <text x="130" y="165" textAnchor="middle" fill="#A78BFA" fontSize="8.5" fontFamily="monospace" fontWeight="500">solver</text>
      <text x="130" y="179" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">Ask → Pushback</text>

      {/* Arrows: solver → models */}
      <path d="M168,151 L178,111" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />
      <path d="M168,169 L178,207" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />

      {/* ── Llama 3.1 8B ── */}
      <rect x="178" y="90" width="78" height="42" rx="5" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="217" y="108" textAnchor="middle" fill="#9CA3AC" fontSize="8" fontFamily="monospace">Llama 3.1 8B</text>
      <text x="217" y="122" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">via Ollama</text>

      {/* ── Qwen 2.5 7B ── */}
      <rect x="178" y="186" width="78" height="42" rx="5" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="217" y="204" textAnchor="middle" fill="#9CA3AC" fontSize="8" fontFamily="monospace">Qwen 2.5 7B</text>
      <text x="217" y="218" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">via Ollama</text>

      {/* Arrows: models → regex */}
      <path d="M256,111 L266,148" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />
      <path d="M256,207 L266,171" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />

      {/* ── Regex check ── */}
      <rect x="266" y="132" width="80" height="52" rx="5" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="306" y="151" textAnchor="middle" fill="#9CA3AC" fontSize="8" fontFamily="monospace">Regex check</text>
      <text x="306" y="164" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">first answer</text>
      <text x="306" y="176" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">correct?</text>

      {/* No → INITIAL_INCORRECT */}
      <path d="M306,132 L306,67 L356,67" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />
      <text x="330" y="60" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">No</text>

      {/* ── INITIAL_INCORRECT ── */}
      <rect x="356" y="52" width="106" height="30" rx="5" fill="#15171A" stroke="#2E343B" strokeWidth="1" />
      <text x="409" y="71" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">INITIAL_INCORRECT</text>

      {/* Yes → Sonnet judge */}
      <path d="M346,158 L356,158" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />
      <text x="351" y="150" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">Yes</text>

      {/* ── Sonnet 4.5 judge ── */}
      <rect x="356" y="134" width="102" height="50" rx="6" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1" />
      <text x="407" y="154" textAnchor="middle" fill="#A78BFA" fontSize="8.5" fontFamily="monospace">Sonnet 4.5</text>
      <text x="407" y="166" textAnchor="middle" fill="#9CA3AC" fontSize="7.5" fontFamily="monospace">judge · classify</text>
      <text x="407" y="178" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">second response</text>

      {/* ── 93 hand-labeled (dashed) ── */}
      <rect x="356" y="248" width="102" height="36" rx="5" fill="#15171A" stroke="#A78BFA" strokeWidth="1" strokeDasharray="3 2" />
      <text x="407" y="264" textAnchor="middle" fill="#A78BFA" fontSize="7.5" fontFamily="monospace">93 hand-labeled</text>
      <text x="407" y="276" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">validates</text>
      <line x1="407" y1="248" x2="407" y2="185" stroke="#A78BFA" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#syDA)" />

      {/* Arrow: Sonnet → MAINTAINED */}
      <path d="M458,159 L468,159" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />

      {/* ── MAINTAINED / NOT_MAINTAINED ── */}
      <rect x="468" y="118" width="82" height="68" rx="6" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="509" y="137" textAnchor="middle" fill="#9CA3AC" fontSize="7.5" fontFamily="monospace">MAINTAINED</text>
      <text x="509" y="149" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">or</text>
      <text x="509" y="161" textAnchor="middle" fill="#9CA3AC" fontSize="7.5" fontFamily="monospace">NOT_MAINTAINED</text>
      <text x="509" y="178" textAnchor="middle" fill="#5C4A99" fontSize="6.5" fontFamily="monospace">→ bootstrap CIs</text>

      {/* Arrow: MAINTAINED → Findings */}
      <path d="M509,186 L509,200" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />

      {/* ── Findings table (green) ── */}
      <rect x="474" y="200" width="72" height="24" rx="12" fill="#1B1E22" stroke="#6DDC9C" strokeWidth="1.5" />
      <circle cx="484" cy="212" r="3" fill="#6DDC9C" />
      <text x="511" y="216" textAnchor="middle" fill="#6DDC9C" fontSize="8" fontFamily="monospace">Findings table</text>
    </svg>
  );
}
