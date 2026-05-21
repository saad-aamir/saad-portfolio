export default function ProjectSentiment() {
  return (
    <svg
      viewBox="0 0 480 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Sentiment Pipeline architecture diagram"
    >
      <rect width="480" height="260" rx="12" fill="#14161A" />

      {/* Pipeline flow */}
      {/* Source */}
      <rect x="20" y="110" width="80" height="40" rx="6" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="60" y="128" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace">Social</text>
      <text x="60" y="142" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">streams</text>

      <path d="M100 130 L130 130" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#arrow3)" />

      {/* Kafka */}
      <rect x="130" y="104" width="80" height="52" rx="6" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="170" y="128" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace">Kafka</text>
      <text x="170" y="142" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">queue</text>

      <path d="M210 130 L240 130" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#arrow3)" />

      {/* Classifier */}
      <rect x="240" y="96" width="100" height="68" rx="8" fill="#1B1E22" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="290" y="124" textAnchor="middle" fill="#A78BFA" fontSize="10" fontFamily="monospace" fontWeight="500">Classifier</text>
      <text x="290" y="140" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">positive</text>
      <text x="290" y="154" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">negative · neutral</text>

      <path d="M340 130 L370 130" stroke="#5C4A99" strokeWidth="1.5" markerEnd="url(#arrow3)" />

      {/* Redis */}
      <rect x="370" y="104" width="80" height="52" rx="6" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <text x="410" y="128" textAnchor="middle" fill="#9CA3AC" fontSize="9" fontFamily="monospace">Redis</text>
      <text x="410" y="142" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">cache</text>

      {/* Chart area */}
      <rect x="130" y="180" width="220" height="56" rx="8" fill="#15171A" stroke="#23272D" strokeWidth="1" />
      {[0,1,2,3,4,5,6].map((i) => {
        const h = 10 + Math.sin(i) * 8 + i * 2;
        return (
          <rect key={i} x={148 + i * 26} y={220 - h} width="14" height={h} rx="2"
            fill={i > 4 ? "#6DDC9C" : i > 2 ? "#A78BFA" : "#F47DA0"} opacity="0.7" />
        );
      })}
      <text x="240" y="225" textAnchor="middle" fill="#5C6470" fontSize="8" fontFamily="monospace">sentiment over time</text>

      <defs>
        <marker id="arrow3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#5C4A99" />
        </marker>
      </defs>
    </svg>
  );
}
