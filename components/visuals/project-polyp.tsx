// Every number here is reported in the audit: the seed spread on the hardest
// unseen centre, the augmentation effect, and the centre-identification probe.
const SCALE = 190 / 0.06; // px per Dice point, shared by both comparison bars

export default function ProjectPolyp() {
  return (
    <svg
      viewBox="0 0 560 220"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Polyp segmentation audit: seed spread against the reported effect, and the centre-identification probe"
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
        <marker id="pyA" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#5C4A99" />
        </marker>
      </defs>

      {/* ── Setup header ── */}
      <rect x="8" y="10" width="544" height="28" rx="6" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="20" y="28" fill="#A78BFA" fontSize="8.5" fontFamily="monospace" fontWeight="500">
        U-Net · ResNet34
      </text>
      <text x="112" y="28" fill="#5C6470" fontSize="8" fontFamily="monospace">
        1,450 images (1,305 / 145) · evaluated on 5 clinical centres in 3 countries
      </text>

      {/* ── Left: seed noise vs reported effect ── */}
      <rect x="8" y="48" width="276" height="160" rx="8" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="20" y="68" fill="#9CA3AC" fontSize="8.5" fontFamily="monospace" fontWeight="500">
        is the effect bigger than the noise?
      </text>

      {/* Bar 1 — seed alone */}
      <text x="20" y="92" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        seed alone, hardest unseen centre
      </text>
      <rect x="20" y="98" width={0.036 * SCALE} height="14" rx="3" fill="#A78BFA" fillOpacity="0.22" stroke="#A78BFA" strokeWidth="1" strokeDasharray="3 2" />
      <text x={26 + 0.036 * SCALE} y="109" fill="#A78BFA" fontSize="8" fontFamily="monospace">
        ±0.036
      </text>

      {/* Bar 2 — reported improvement */}
      <text x="20" y="134" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        augmentation, 5-seed protocol
      </text>
      <rect x="20" y="140" width={0.055 * SCALE} height="14" rx="3" fill="#1E1B2E" stroke="#A78BFA" strokeWidth="1.5" />
      <text x={26 + 0.055 * SCALE} y="151" fill="#9CA3AC" fontSize="8" fontFamily="monospace">
        +0.055
      </text>

      <line x1="20" y1="168" x2="272" y2="168" stroke="#23272D" strokeWidth="1" />
      <text x="20" y="184" fill="#9CA3AC" fontSize="8" fontFamily="monospace">
        p = 0.024 over ten runs
      </text>
      <text x="20" y="198" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        single-run comparisons are uninterpretable
      </text>

      {/* ── Right: centre fingerprint probe ── */}
      <rect x="296" y="48" width="256" height="160" rx="8" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="308" y="68" fill="#A78BFA" fontSize="8.5" fontFamily="monospace" fontWeight="500">
        a hidden source of bias
      </text>

      <rect x="308" y="80" width="98" height="36" rx="5" fill="#15171A" stroke="#2E343B" strokeWidth="1" />
      <text x="357" y="96" textAnchor="middle" fill="#9CA3AC" fontSize="7.5" fontFamily="monospace">
        every tissue
      </text>
      <text x="357" y="108" textAnchor="middle" fill="#9CA3AC" fontSize="7.5" fontFamily="monospace">
        pixel discarded
      </text>

      <path d="M406,98 L428,98" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#pyA)" />

      <rect x="428" y="80" width="110" height="36" rx="5" fill="#15171A" stroke="#5C4A99" strokeWidth="1" />
      <text x="483" y="96" textAnchor="middle" fill="#9CA3AC" fontSize="7.5" fontFamily="monospace">
        linear probe
      </text>
      <text x="483" y="108" textAnchor="middle" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        source centre
      </text>

      {/* Probe accuracy against chance */}
      <text x="308" y="142" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        identifies the centre
      </text>
      <rect x="308" y="150" width="194" height="12" rx="3" fill="#15171A" stroke="#23272D" strokeWidth="1" />
      <rect x="308" y="150" width={194 * 0.916} height="12" rx="3" fill="#1E1B2E" stroke="#A78BFA" strokeWidth="1" />
      <text x="508" y="160" fill="#A78BFA" fontSize="8" fontFamily="monospace">
        91.6%
      </text>

      <text x="308" y="182" fill="#5C6470" fontSize="7.5" fontFamily="monospace">
        chance
      </text>
      <rect x="308" y="188" width="194" height="12" rx="3" fill="#15171A" stroke="#23272D" strokeWidth="1" />
      <rect x="308" y="188" width={194 * 0.476} height="12" rx="3" fill="#15171A" stroke="#5C6470" strokeWidth="1" />
      <text x="508" y="198" fill="#5C6470" fontSize="8" fontFamily="monospace">
        47.6%
      </text>
    </svg>
  );
}
