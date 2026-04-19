"use client";

import { SlidersHorizontalIcon, XIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import type { ReactNode } from "react";

interface MobileMenuToggleButtonProps {
  open: boolean;
  onToggle: (open: boolean) => void;
  className?: string;
}

interface MobilePanelProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

export function MobileMenuToggleButton({
  open,
  onToggle,
  className,
}: MobileMenuToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(!open)}
      className={clsx(
        "inline-flex items-center gap-2 rounded-xl border border-border-card bg-bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-sm",
        className
      )}
    >
      {open ? <XIcon size={18} weight="bold" /> : <SlidersHorizontalIcon size={18} weight="bold" />}
      {open ? "Fechar filtros" : "Abrir filtros"}
    </button>
  );
}

export function MobilePanel({
  open,
  children,
  className,
}: MobilePanelProps) {
  if (!open) return null;

  return (
    <div
      className={clsx(
        "rounded-3xl border border-border-card bg-bg-card p-4 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
