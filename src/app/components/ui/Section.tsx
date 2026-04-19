import clsx from "clsx";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section id={id} className={clsx("w-full py-12 sm:py-16", className)}>
      <div className={clsx("mx-auto w-full max-w-7xl px-4", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function HeroSection({
  id,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        className
      )}
    >
      <div className={clsx("mx-auto w-full", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
