import { clsx } from "clsx";

type ButtonVariant = "primary" | "ghost" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  as: Tag = "button",
  href,
  target,
  rel,
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium transition-all duration-[250ms] ease-out focus-visible:outline-2 focus-visible:outline-accent";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-accent text-bg hover:bg-accent-2",
    ghost:
      "text-text-dim hover:text-text border border-border hover:border-border-2 hover:bg-bg-1",
    outline:
      "border border-border text-text hover:border-border-2 hover:bg-bg-1",
  };

  const allClasses = clsx(base, variants[variant], className);

  if (Tag === "a") {
    return (
      <a href={href} target={target} rel={rel} className={allClasses} style={{ fontSize: "14px" }}>
        {children}
      </a>
    );
  }

  return (
    <button className={allClasses} style={{ fontSize: "14px" }} {...props}>
      {children}
    </button>
  );
}
