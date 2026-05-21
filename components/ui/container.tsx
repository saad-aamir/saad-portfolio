import { clsx } from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-[1180px] px-[6vw]",
        className
      )}
    >
      {children}
    </div>
  );
}
