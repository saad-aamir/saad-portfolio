export default function ProjectCopilot() {
  const tools = [
    "list_case_studies",
    "create_lead",
    "list_leads",
    "update_lead_status",
    "list_projects",
    "list_clients",
    "record_website_finding",
    "list_website_findings",
    "draft_outreach_email",
    "hello_studio",
  ];

  const resources = ["studio://pricing", "studio://positioning", "studio://process"];
  const tables = ["clients", "leads", "projects", "case_studies", "website_findings"];
  const files = ["pricing.md", "positioning.md", "process.md"];

  return (
    <svg
      viewBox="0 0 560 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Dark Matter Co-Pilot architecture diagram"
    >
      <defs>
        <marker id="cpArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#5C4A99" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="560" height="320" rx="12" fill="#14161A" />

      {/* Grid */}
      {[80, 160, 240, 320, 400, 480].map((x) => (
        <line key={`vg${x}`} x1={x} y1="0" x2={x} y2="320" stroke="#23272D" strokeWidth="1" />
      ))}
      {[64, 128, 192, 256].map((y) => (
        <line key={`hg${y}`} x1="0" y1={y} x2="560" y2={y} stroke="#23272D" strokeWidth="1" />
      ))}

      {/* ── Claude Desktop ── */}
      <rect x="10" y="114" width="84" height="68" rx="8" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="52" y="138" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace" fontWeight="500">Claude</text>
      <text x="52" y="151" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace" fontWeight="500">Desktop</text>
      <text x="52" y="166" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">MCP client</text>

      {/* Arrow: Claude Desktop → FastMCP */}
      <path d="M94,148 L131,148" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#cpArrow)" />
      <text x="112" y="140" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">MCP protocol</text>

      {/* ── FastMCP Server ── */}
      <rect x="131" y="87" width="100" height="130" rx="10" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="181" y="122" textAnchor="middle" fill="#A78BFA" fontSize="10" fontFamily="monospace" fontWeight="500">FastMCP</text>
      <text x="181" y="136" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace">Server</text>
      <text x="181" y="157" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">Python +</text>
      <text x="181" y="169" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">Pydantic v2</text>

      {/* Arrow: FastMCP → MCP Tools (upper branch, bends up-right) */}
      <path d="M231,110 L252,110 L252,82 L270,82" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#cpArrow)" />

      {/* Arrow: FastMCP → MCP Resources (lower branch, bends down-right) */}
      <path d="M231,195 L252,195 L252,218 L270,218" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#cpArrow)" />

      {/* ── MCP Tools ── */}
      <rect x="270" y="14" width="162" height="152" rx="8" fill="#15171A" stroke="#2E343B" strokeWidth="1" />
      <text x="351" y="30" textAnchor="middle" fill="#5C4A99" fontSize="8" fontFamily="monospace" letterSpacing="1.5">MCP TOOLS</text>
      {tools.map((tool, i) => (
        <text key={tool} x="283" y={44 + i * 12} fill="#9CA3AC" fontSize="7.5" fontFamily="monospace">
          {tool}
        </text>
      ))}

      {/* Arrow: MCP Tools → SQLite */}
      <path d="M432,82 L450,82" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#cpArrow)" />
      <text x="441" y="74" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">queries</text>

      {/* ── MCP Resources ── */}
      <rect x="270" y="178" width="162" height="76" rx="8" fill="#15171A" stroke="#2E343B" strokeWidth="1" />
      <text x="351" y="194" textAnchor="middle" fill="#5C4A99" fontSize="7.5" fontFamily="monospace" letterSpacing="1">MCP RESOURCES</text>
      {resources.map((res, i) => (
        <text key={res} x="283" y={208 + i * 13} fill="#9CA3AC" fontSize="7.5" fontFamily="monospace">
          {res}
        </text>
      ))}

      {/* Arrow: MCP Resources → Markdown files */}
      <path d="M432,218 L450,218" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#cpArrow)" />

      {/* ── SQLite Database (cylinder) ── */}
      {/* Body fill */}
      <rect x="450" y="44" width="84" height="96" fill="#1B1E22" />
      {/* Side strokes */}
      <line x1="450" y1="44" x2="450" y2="140" stroke="#2E343B" strokeWidth="1" />
      <line x1="534" y1="44" x2="534" y2="140" stroke="#2E343B" strokeWidth="1" />
      {/* Bottom ellipse (drawn before top so top sits above) */}
      <ellipse cx="492" cy="140" rx="42" ry="9" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      {/* Top ellipse */}
      <ellipse cx="492" cy="44" rx="42" ry="9" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      {/* Labels (drawn last so they sit above the ellipses) */}
      <text x="492" y="66" textAnchor="middle" fill="#A78BFA" fontSize="9" fontFamily="monospace" fontWeight="500">SQLite</text>
      <text x="492" y="79" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">Database</text>
      {tables.map((t, i) => (
        <text key={t} x="492" y={92 + i * 10} textAnchor="middle" fill="#9CA3AC" fontSize="6.5" fontFamily="monospace">
          {t}
        </text>
      ))}

      {/* ── Markdown files ── */}
      <rect x="450" y="196" width="84" height="74" rx="6" fill="#15171A" stroke="#2E343B" strokeWidth="1" />
      <text x="492" y="214" textAnchor="middle" fill="#9CA3AC" fontSize="8.5" fontFamily="monospace">Markdown</text>
      <text x="492" y="226" textAnchor="middle" fill="#5C6470" fontSize="7" fontFamily="monospace">files</text>
      {files.map((f, i) => (
        <text key={f} x="492" y={240 + i * 11} textAnchor="middle" fill="#9CA3AC" fontSize="7" fontFamily="monospace">
          {f}
        </text>
      ))}

      {/* Status */}
      <circle cx="181" cy="296" r="3" fill="#6DDC9C" />
      <text x="193" y="300" fill="#6DDC9C" fontSize="9" fontFamily="monospace">shipped</text>
    </svg>
  );
}
