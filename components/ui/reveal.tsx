"use client";

import { useEffect, useRef } from "react";
import { clsx } from "clsx";

interface RevealProps {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  as?: React.ElementType;
}

const delayClass: Record<number, string> = {
  0: "",
  1: "d1",
  2: "d2",
  3: "d3",
  4: "d4",
};

export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={clsx("reveal", delayClass[delay], className)}
    >
      {children}
    </Tag>
  );
}
