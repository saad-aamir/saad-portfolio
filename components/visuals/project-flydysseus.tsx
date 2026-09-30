const CARDS = [
  {
    x: 8,
    label: "intact",
    stroke: "#2E343B",
    labelFill: "#9CA3AC",
    delta: "baseline",
    outcome: "binds to the mast",
    dead: [] as number[],
    cut: false,
  },
  {
    x: 192,
    label: "sensory silenced",
    stroke: "#A78BFA",
    labelFill: "#A78BFA",
    delta: "feeding circuit +51 Hz",
    outcome: "ignores the song",
    dead: [0, 1],
    cut: false,
  },
  {
    x: 376,
    label: "motor neuron cut",
    stroke: "#C4B5FD",
    labelFill: "#C4B5FD",
    delta: "circuit stays fully active",
    outcome: "body walks past anyway",
    dead: [6],
    cut: true,
  },
];

// Mini connectome: positions are relative to each card's origin.
const NODES = [
  { x: 22, y: 0 },
  { x: 22, y: 26 },
  { x: 62, y: 6 },
  { x: 60, y: 32 },
  { x: 92, y: 0 },
  { x: 98, y: 26 },
  { x: 134, y: 14 },
];
const EDGES: [number, number][] = [
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [2, 5],
  [4, 6],
  [5, 6],
];

export default function ProjectFlydysseus() {
  return (
    <svg
      viewBox="0 0 560 220"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Fly-dysseus: three ablation conditions on the FlyWire connectome"
    >
      {/* Background */}
      <rect width="560" height="220" rx="12" fill="#14161A" />
      {[80, 160, 240, 320, 400, 480].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="220" stroke="#23272D" strokeWidth="1" />
      ))}
      {[55, 110, 165].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="560" y2={y} stroke="#23272D" strokeWidth="1" />
      ))}

      {/* ── Source header ── */}
      <rect x="8" y="10" width="544" height="30" rx="6" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="20" y="29" fill="#A78BFA" fontSize="9" fontFamily="monospace" fontWeight="500">
        FlyWire connectome
      </text>
      <text x="142" y="29" fill="#5C6470" fontSize="8.5" fontFamily="monospace">
        138,639 neurons · whole-brain model reproduced to within 0.3 Hz
      </text>

      {/* ── Three conditions ── */}
      {CARDS.map((card) => (
        <g key={card.label} transform={`translate(${card.x}, 52)`}>
          <rect
            width="176"
            height="156"
            rx="8"
            fill="#1B1E22"
            stroke={card.stroke}
            strokeWidth={card.stroke === "#2E343B" ? 1 : 1.5}
          />

          <text x="12" y="20" fill={card.labelFill} fontSize="9" fontFamily="monospace" fontWeight="500">
            {card.label}
          </text>

          {/* Mini connectome */}
          <g transform="translate(10, 40)">
            {EDGES.map(([a, b]) => {
              const muted = card.dead.includes(a) || card.dead.includes(b);
              return (
                <line
                  key={`${a}-${b}`}
                  x1={NODES[a].x}
                  y1={NODES[a].y + 14}
                  x2={NODES[b].x}
                  y2={NODES[b].y + 14}
                  stroke={muted ? "#23272D" : "#5C4A99"}
                  strokeWidth="1"
                  strokeDasharray={muted ? "2 2" : undefined}
                />
              );
            })}
            {NODES.map((n, i) => {
              const dead = card.dead.includes(i);
              return (
                <circle
                  key={i}
                  cx={n.x}
                  cy={n.y + 14}
                  r={i === 6 ? 4.5 : 3.5}
                  fill={dead ? "#14161A" : "#A78BFA"}
                  stroke={dead ? "#5C6470" : "none"}
                  strokeWidth="1"
                />
              );
            })}
            {/* Severed axon on the motor side */}
            {card.cut && (
              <g>
                <line x1="106" y1="20" x2="120" y2="34" stroke="#C4B5FD" strokeWidth="1.5" />
                <line x1="120" y1="20" x2="106" y2="34" stroke="#C4B5FD" strokeWidth="1.5" />
              </g>
            )}
          </g>

          {/* Readouts */}
          <line x1="12" y1="104" x2="164" y2="104" stroke="#23272D" strokeWidth="1" />
          <text x="12" y="122" fill="#9CA3AC" fontSize="8" fontFamily="monospace">
            {card.delta}
          </text>
          <text x="12" y="140" fill="#5C6470" fontSize="8" fontFamily="monospace">
            {card.outcome}
          </text>
        </g>
      ))}
    </svg>
  );
}
