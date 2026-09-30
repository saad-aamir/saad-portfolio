const LAYERS = [0, 1, 2, 3, 4, 5, 6, 7];

export default function ProjectCapitulation() {
  return (
    <svg
      viewBox="0 0 560 220"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Capitulation direction: residual-stream probe against a pre-registered AUROC gate"
    >
      {/* Background */}
      <rect width="560" height="220" rx="12" fill="#14161A" />
      {[80, 160, 240, 320, 400, 480].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="220" stroke="#23272D" strokeWidth="1" />
      ))}
      {[55, 110, 165].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="560" y2={y} stroke="#23272D" strokeWidth="1" />
      ))}

      <defs>
        <marker id="cpA" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#5C4A99" />
        </marker>
      </defs>

      {/* ── Residual stream ── */}
      <text x="12" y="24" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        residual stream
      </text>
      {LAYERS.map((i) => (
        <rect
          key={i}
          x="12"
          y={36 + i * 20}
          width="96"
          height="14"
          rx="3"
          fill="#1B1E22"
          stroke="#2E343B"
          strokeWidth="1"
        />
      ))}
      {/* Candidate direction read off the stack */}
      <line x1="60" y1="36" x2="60" y2="190" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="60" cy="116" r="4" fill="#A78BFA" />
      <text x="72" y="208" fill="#A78BFA" fontSize="7.5" fontFamily="monospace">
        candidate direction
      </text>

      <path d="M112,116 L136,116" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#cpA)" />

      {/* ── Pre-registered protocol ── */}
      <rect x="136" y="60" width="132" height="112" rx="8" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="202" y="80" textAnchor="middle" fill="#A78BFA" fontSize="8.5" fontFamily="monospace" fontWeight="500">
        pre-registered
      </text>
      {["cross-validation", "shuffled-label nulls", "positive control", "AUROC gate"].map((line, i) => (
        <text
          key={line}
          x="150"
          y={102 + i * 18}
          fill="#9CA3AC"
          fontSize="7.5"
          fontFamily="monospace"
        >
          {line}
        </text>
      ))}

      <path d="M268,100 L292,88" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#cpA)" />
      <path d="M268,132 L292,144" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#cpA)" />

      {/* ── Outcomes ── */}
      <rect x="292" y="62" width="256" height="48" rx="6" fill="#15171A" stroke="#6DDC9C" strokeWidth="1" />
      <text x="306" y="82" fill="#6DDC9C" fontSize="8.5" fontFamily="monospace" fontWeight="500">
        positive control
      </text>
      <text x="306" y="98" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        the protocol can detect a direction
      </text>
      <text x="530" y="82" textAnchor="end" fill="#6DDC9C" fontSize="9" fontFamily="monospace">
        pass
      </text>

      <rect x="292" y="120" width="256" height="48" rx="6" fill="#15171A" stroke="#2E343B" strokeWidth="1" strokeDasharray="4 3" />
      <text x="306" y="140" fill="#9CA3AC" fontSize="8.5" fontFamily="monospace" fontWeight="500">
        capitulation direction
      </text>
      <text x="306" y="156" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        does not clear it, reported as a null
      </text>
      <text x="530" y="140" textAnchor="end" fill="#5C6470" fontSize="9" fontFamily="monospace">
        null
      </text>

      {/* ── Follow-up ── */}
      <text x="292" y="184" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        follow-up: 8 models across 2 families,
      </text>
      <text x="292" y="196" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        causal ablation via TransformerLens:
      </text>
      <text x="292" y="208" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        the direction emerges between 3B and 7B
      </text>
    </svg>
  );
}
