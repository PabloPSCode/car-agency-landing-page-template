"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
  delay?: number;
}

function useReveal(once = false) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return { ref, visible };
}

export function RevealContainer({
  children,
  className,
  once = false,
  delay = 0,
}: AnimatedContainerProps) {
  const { ref, visible } = useReveal(once);

  return (
    <div
      ref={ref}
      className={clsx(
        "transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function FadeContainer({
  children,
  className,
  once = false,
  delay = 0,
}: AnimatedContainerProps) {
  const { ref, visible } = useReveal(once);

  return (
    <div
      ref={ref}
      className={clsx(
        "transition-opacity duration-700 ease-out",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function ZoomContainer({
  children,
  className,
  once = false,
  delay = 0,
}: AnimatedContainerProps) {
  const { ref, visible } = useReveal(once);

  return (
    <div
      ref={ref}
      className={clsx(
        "transition-all duration-700 ease-out",
        visible ? "scale-100 opacity-100" : "scale-[0.96] opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
