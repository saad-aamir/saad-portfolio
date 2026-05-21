export default function ProjectMatcher() {
  return (
    <svg
      viewBox="0 0 480 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="AI Resume Matcher architecture diagram"
    >
      <rect width="480" height="260" rx="12" fill="#14161A" />

      {/* JD input */}
      <rect x="20" y="60" width="90" height="140" rx="8" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="65" y="85" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace">Job</text>
      <text x="65" y="99" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace">Description</text>
      {[115, 130, 145, 160, 175].map((y, i) => (
        <rect key={i} x="32" y={y} width={40 + (i % 3) * 10} height="6" rx="2" fill="#23272D" />
      ))}

      {/* Resume input */}
      <rect x="370" y="60" width="90" height="140" rx="8" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="415" y="85" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace">Resume</text>
      {[115, 130, 145, 160, 175].map((y, i) => (
        <rect key={i} x="382" y={y} width={40 + (i % 2) * 14} height="6" rx="2" fill="#23272D" />
      ))}

      {/* Arrows in */}
      <path d="M110 130 L160 130" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#arrow2)" />
      <path d="M370 130 L320 130" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#arrow2L)" />

      {/* Extractor box */}
      <rect x="160" y="96" width="160" height="68" rx="8" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="240" y="122" textAnchor="middle" fill="#A78BFA" fontSize="10" fontFamily="monospace" fontWeight="500">LLM Extractor</text>
      <text x="240" y="138" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">structured output</text>
      <text x="240" y="152" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">skills · seniority · tone</text>

      {/* Score output */}
      <rect x="188" y="196" width="104" height="44" rx="8" fill="#15171A" stroke="#6DDC9C" strokeWidth="1" />
      <text x="240" y="216" textAnchor="middle" fill="#6DDC9C" fontSize="11" fontFamily="monospace" fontWeight="500">87%</text>
      <text x="240" y="231" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">alignment score</text>

      <path d="M240 164 L240 196" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#arrow2)" />

      <defs>
        <marker id="arrow2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#5C4A99" />
        </marker>
        <marker id="arrow2L" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
          <path d="M0 0 L6 3 L0 6 Z" fill="#5C4A99" />
        </marker>
      </defs>
    </svg>
  );
}
