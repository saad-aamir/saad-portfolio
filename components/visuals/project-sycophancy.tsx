export default function ProjectSycophancy() {
  return (
    <svg
      viewBox="0 0 560 220"
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
      <rect width="560" height="220" rx="12" fill="#14161A" />
      {[80, 160, 240, 320, 400, 480].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="220" stroke="#23272D" strokeWidth="1" />
      ))}
      {[55, 110, 165].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="560" y2={y} stroke="#23272D" strokeWidth="1" />
      ))}

      {/* ── Dataset ── */}
      <rect x="8" y="68" width="84" height="44" rx="6" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="50" y="87" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace" fontWeight="500">Dataset</text>
      <text x="50" y="101" textAnchor="middle" fill="#5C6470" fontSize="7.5" fontFamily="monospace">200q · 3 push</text>

      {/* Arrow: Dataset → Solver */}
      <path d="M92,90 L110,90" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />

      {/* ── Solver ── */}
      <rect x="110" y="68" width="76" height="44" rx="6" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="148" y="87" textAnchor="middle" fill="#A78BFA" fontSize="9" fontFamily="monospace" fontWeight="500">Solver</text>
      <text x="148" y="101" textAnchor="middle" fill="#5C6470" fontSize="7.5" fontFamily="monospace">Ask → Push</text>

      {/* Arrows: Solver → models */}
      <path d="M186,82 L206,65" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />
      <path d="M186,98 L206,115" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />

      {/* ── Llama 3.1 8B ── */}
      <rect x="206" y="46" width="84" height="34" rx="5" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="248" y="59" textAnchor="middle" fill="#9CA3AC" fontSize="8.5" fontFamily="monospace">Llama 3.1 8B</text>
      <text x="248" y="72" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">via Ollama</text>

      {/* ── Qwen 2.5 7B ── */}
      <rect x="206" y="98" width="84" height="34" rx="5" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="248" y="111" textAnchor="middle" fill="#9CA3AC" fontSize="8.5" fontFamily="monospace">Qwen 2.5 7B</text>
      <text x="248" y="124" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">via Ollama</text>

      {/* Arrows: models → Sonnet judge */}
      <path d="M290,63 L312,80" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />
      <path d="M290,115 L312,100" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />

      {/* ── Sonnet 4.5 judge ── */}
      <rect x="312" y="66" width="92" height="48" rx="6" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="358" y="86" textAnchor="middle" fill="#A78BFA" fontSize="9" fontFamily="monospace" fontWeight="500">Sonnet 4.5</text>
      <text x="358" y="100" textAnchor="middle" fill="#9CA3AC" fontSize="8" fontFamily="monospace">judge</text>

      {/* ── 93 hand-labeled (dashed, validates Sonnet) ── */}
      <rect x="312" y="155" width="92" height="40" rx="5" fill="#15171A" stroke="#A78BFA" strokeWidth="1" strokeDasharray="3 2" />
      <text x="358" y="172" textAnchor="middle" fill="#A78BFA" fontSize="8" fontFamily="monospace">93 hand-labeled</text>
      <text x="358" y="185" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">validates</text>
      <line x1="358" y1="155" x2="358" y2="115" stroke="#A78BFA" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#syDA)" />

      {/* Arrow: Sonnet → MAINTAINED */}
      <path d="M404,90 L424,90" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#syA)" />

      {/* ── MAINTAINED / NOT_MAINTAINED ── */}
      <rect x="424" y="64" width="128" height="52" rx="6" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="488" y="84" textAnchor="middle" fill="#9CA3AC" fontSize="8.5" fontFamily="monospace">MAINTAINED</text>
      <text x="488" y="97" textAnchor="middle" fill="#5C6470" fontSize="7.5" fontFamily="monospace">or</text>
      <text x="488" y="109" textAnchor="middle" fill="#9CA3AC" fontSize="8.5" fontFamily="monospace">NOT_MAINTAINED</text>
    </svg>
  );
}
