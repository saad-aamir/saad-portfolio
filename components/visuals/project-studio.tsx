export default function ProjectStudio() {
  return (
    <svg
      viewBox="0 0 480 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Dark Matter Studio platform diagram"
    >
      <rect width="480" height="260" rx="12" fill="#14161A" />

      {/* Browser frame */}
      <rect x="40" y="40" width="400" height="200" rx="10" fill="#1B1E22" stroke="#2E343B" strokeWidth="1" />
      <rect x="40" y="40" width="400" height="32" rx="10" fill="#15171A" />
      <rect x="40" y="60" width="400" height="12" fill="#15171A" />
      <circle cx="60" cy="56" r="5" fill="#2E343B" />
      <circle cx="76" cy="56" r="5" fill="#2E343B" />
      <circle cx="92" cy="56" r="5" fill="#2E343B" />
      <rect x="116" y="48" width="240" height="16" rx="4" fill="#23272D" />
      <text x="236" y="60" textAnchor="middle" fill="#5C6470" fontSize="9" fontFamily="monospace">darkmatterstudio.io</text>

      {/* Content area */}
      <rect x="56" y="84" width="160" height="16" rx="3" fill="#23272D" />
      <rect x="56" y="108" width="100" height="8" rx="2" fill="#1B1E22" />
      <rect x="56" y="122" width="120" height="8" rx="2" fill="#1B1E22" />
      <rect x="56" y="136" width="90" height="8" rx="2" fill="#1B1E22" />
      <rect x="56" y="160" width="72" height="28" rx="14" fill="#A78BFA" />
      <text x="92" y="178" textAnchor="middle" fill="#14161A" fontSize="9" fontFamily="monospace">View Work</text>

      {/* Right panel - project cards */}
      <rect x="244" y="80" width="172" height="68" rx="8" fill="#14161A" stroke="#23272D" strokeWidth="1" />
      <rect x="252" y="88" width="80" height="8" rx="2" fill="#2E343B" />
      <rect x="252" y="102" width="120" height="6" rx="2" fill="#1B1E22" />
      <rect x="252" y="114" width="100" height="6" rx="2" fill="#1B1E22" />
      <circle cx="398" cy="104" r="4" fill="#6DDC9C" />

      <rect x="244" y="156" width="172" height="68" rx="8" fill="#14161A" stroke="#23272D" strokeWidth="1" />
      <rect x="252" y="164" width="64" height="8" rx="2" fill="#2E343B" />
      <rect x="252" y="178" width="108" height="6" rx="2" fill="#1B1E22" />
      <rect x="252" y="190" width="88" height="6" rx="2" fill="#1B1E22" />
      <circle cx="398" cy="180" r="4" fill="#F5C16C" />
    </svg>
  );
}
