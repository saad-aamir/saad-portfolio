import { clsx } from "clsx";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={clsx(
        "font-mono font-medium uppercase tracking-widest text-accent mb-4 flex items-center gap-3",
        className
      )}
      style={{ fontSize: "12.5px" }}
    >
      <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}
