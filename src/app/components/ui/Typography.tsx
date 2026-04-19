import clsx from "clsx";
import type { ElementType, ReactNode } from "react";

type TypographyProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

type TitleProps<T extends ElementType> = TypographyProps<T> & {
  size?: "hero" | "xl" | "lg" | "md";
};

export function Eyebrow<T extends ElementType = "span">({
  as,
  children,
  className,
}: TypographyProps<T>) {
  const Component = as ?? "span";

  return (
    <Component
      className={clsx(
        "inline-flex items-center rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary-600",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function Title<T extends ElementType = "div">({
  as,
  children,
  className,
  size = "xl",
}: TitleProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={clsx(
        "font-secondary font-bold tracking-tight text-foreground",
        size === "hero" && "text-4xl leading-tight sm:text-5xl lg:text-6xl",
        size === "xl" && "text-3xl leading-tight sm:text-4xl",
        size === "lg" && "text-2xl leading-tight sm:text-3xl",
        size === "md" && "text-xl leading-snug sm:text-2xl",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function Subtitle<T extends ElementType = "div">({
  as,
  children,
  className,
}: TypographyProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={clsx(
        "text-base leading-7 text-foreground/72 sm:text-lg",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function Paragraph<T extends ElementType = "p">({
  as,
  children,
  className,
}: TypographyProps<T>) {
  const Component = as ?? "p";

  return (
    <Component className={clsx("text-sm leading-7 text-foreground/74 sm:text-base", className)}>
      {children}
    </Component>
  );
}
