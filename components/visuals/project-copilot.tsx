export default function ProjectCopilot() {
  return (
    <svg
      viewBox="0 0 560 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Dark Matter Co-Pilot architecture diagram"
    >
      {/* Background */}
      <rect width="560" height="320" rx="12" fill="#14161A" />

      {/* Grid lines */}
      {[80, 160, 240, 320, 400, 480].map((x) => (
        <line key={`vg-${x}`} x1={x} y1="0" x2={x} y2="320" stroke="#23272D" strokeWidth="1" />
      ))}
      {[64, 128, 192, 256].map((y) => (
        <line key={`hg-${y}`} x1="0" y1={y} x2="560" y2={y} stroke="#23272D" strokeWidth="1" />
      ))}

      {/* User node */}
      <rect x="24" y="130" width="80" height="60" rx="8" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="64" y="155" textAnchor="middle" fill="#9CA3AC" fontSize="10" fontFamily="monospace">User</text>
      <text x="64" y="171" textAnchor="middle" fill="#5C6470" fontSize="9" fontFamily="monospace">/ Team</text>

      {/* Arrow: User → Co-Pilot */}
      <path d="M104 160 L176 160" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#arrowV)" />

      {/* Co-Pilot core */}
      <rect x="176" y="108" width="104" height="104" rx="10" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="228" y="148" textAnchor="middle" fill="#A78BFA" fontSize="10" fontFamily="monospace" fontWeight="500">Co-Pilot</text>
      <text x="228" y="164" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">Claude API</text>
      <text x="228" y="178" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">+ MCP</text>

      {/* Arrow: Co-Pilot → Tools */}
      <path d="M280 160 L352 160" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#arrowV)" />

      {/* MCP Tools */}
      <rect x="352" y="88" width="88" height="44" rx="6" fill="#15171A" stroke="#2E343B" strokeWidth="1" />
      <text x="396" y="109" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace">Projects</text>
      <text x="396" y="123" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">read / write</text>

      <rect x="352" y="138" width="88" height="44" rx="6" fill="#15171A" stroke="#2E343B" strokeWidth="1" />
      <text x="396" y="159" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace">Messages</text>
      <text x="396" y="173" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">draft / send</text>

      <rect x="352" y="188" width="88" height="44" rx="6" fill="#15171A" stroke="#2E343B" strokeWidth="1" />
      <text x="396" y="209" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace">Assets</text>
      <text x="396" y="223" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">review / flag</text>

      {/* MCP label */}
      <text x="396" y="64" textAnchor="middle" fill="#5C4A99" fontSize="9" fontFamily="monospace" letterSpacing="2">MCP TOOLS</text>

      {/* Arrows to tools */}
      <path d="M440 110 L456 110" stroke="#2E343B" strokeWidth="1" />
      <path d="M440 160 L456 160" stroke="#2E343B" strokeWidth="1" />
      <path d="M440 210 L456 210" stroke="#2E343B" strokeWidth="1" />

      {/* Data stores */}
      <rect x="456" y="96" width="76" height="28" rx="4" fill="#0E0F11" stroke="#23272D" strokeWidth="1" />
      <text x="494" y="113" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">PostgreSQL</text>

      <rect x="456" y="146" width="76" height="28" rx="4" fill="#0E0F11" stroke="#23272D" strokeWidth="1" />
      <text x="494" y="163" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">Email API</text>

      <rect x="456" y="196" width="76" height="28" rx="4" fill="#0E0F11" stroke="#23272D" strokeWidth="1" />
      <text x="494" y="213" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">File Storage</text>

      {/* Status indicator */}
      <circle cx="228" cy="268" r="3" fill="#F5C16C" />
      <text x="240" y="272" fill="#F5C16C" fontSize="9" fontFamily="monospace">in progress</text>

      {/* Arrow marker */}
      <defs>
        <marker id="arrowV" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#5C4A99" />
        </marker>
      </defs>
    </svg>
  );
}
