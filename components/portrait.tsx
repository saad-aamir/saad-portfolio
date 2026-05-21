import Image from "next/image";
import { clsx } from "clsx";

interface PortraitProps {
  variant?: "hero" | "about";
  className?: string;
}

export default function Portrait({ variant = "hero", className }: PortraitProps) {
  const coords = variant === "hero" ? "33.6°N 73.0°E" : "Rawalpindi, PK";
  const hasPhoto = variant === "hero";

  return (
    <div
      className={clsx(
        "relative rounded-2xl border border-border bg-bg-card overflow-hidden",
        variant === "hero" ? "aspect-[3/4]" : "aspect-square",
        className
      )}
    >
      {hasPhoto ? (
        <Image
          src="/portraits/hero.png"
          alt="Saad Aamir"
          fill
          className="object-cover"
          style={{ objectPosition: "center 38%" }}
          sizes="(max-width: 1024px) 320px, 320px"
          priority
        />
      ) : (
        /* About placeholder until second photo is added */
        <div className="absolute inset-0 bg-gradient-to-br from-bg-1 to-bg-2 flex flex-col items-center justify-center gap-2">
          <svg
            className="w-12 h-12 text-border-2"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p className="font-mono text-text-mute text-center" style={{ fontSize: "10px" }}>
            second photo<br />candid / working shot
          </p>
        </div>
      )}

      {/* Overlay gradient so frame tags are readable over the photo */}
      {hasPhoto && (
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      )}

      {/* Frame tags */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="font-mono text-text-mute bg-bg/70 rounded px-1.5 py-0.5 backdrop-blur-sm" style={{ fontSize: "10px" }}>
          {coords}
        </span>
        <span className="font-mono text-text-mute bg-bg/70 rounded px-1.5 py-0.5 backdrop-blur-sm" style={{ fontSize: "10px" }}>
          {variant === "hero" ? "2024" : "@saadaamir"}
        </span>
      </div>
    </div>
  );
}
