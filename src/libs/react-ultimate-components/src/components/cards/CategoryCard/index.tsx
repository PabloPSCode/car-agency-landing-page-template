"use client";

import { Icon } from "@iconify/react";
import clsx from "clsx";

export interface CategoryCardProps {
  /** Nome da categoria exibida no card. */
  name: string;
  /** Link para a listagem da categoria. */
  onSeeCategory: () => void;
  /** URL da imagem apresentada no card. */
  imgUrl?: string;
  /** Ícone renderizado diretamente no card. */
  icon?: unknown;
  /** Nome do ícone (Solar) exibido quando nenhuma imagem é enviada. */
  iconName?: string;
  /** Cor do ícone (Solar) exibido quando nenhuma imagem é enviada. */
  iconColor?: string;
  /** Classes extras aplicadas ao contêiner externo. */
  className?: string;
  /** Classes extras aplicadas ao bloco de mídia. */
  mediaClassName?: string;
  /** Classes extras aplicadas ao título. */
  labelClassName?: string;
  /** Texto auxiliar opcional. */
  description?: string;
  /** Abre o link em uma nova aba (opcional). */
  newTab?: boolean;
}

/**
 * Card clicável para destacar categorias em vitrines ou seções de navegação.
 * Prioriza a imagem fornecida via `imgUrl` e, na ausência dela, renderiza o
 * ícone Solar informado em `iconName`, mantendo uma área padronizada e
 * responsiva.
 */
export default function CategoryCard({
  name,
  onSeeCategory,
  imgUrl,
  icon,
  iconName,
  iconColor,
  className,
  mediaClassName,
  labelClassName,
  description,
}: CategoryCardProps) {
  const resolvedIconName = iconName?.startsWith("solar:")
    ? iconName
    : iconName
    ? `solar:${iconName}`
    : undefined;

  const media = imgUrl ? (
    <img
      src={imgUrl}
      alt={name}
      className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
      loading="lazy"
    />
  ) : icon ? (
    <div className="text-primary-600">{icon as never}</div>
  ) : resolvedIconName ? (
    <Icon
      icon={resolvedIconName}
      className={clsx(
        iconColor
          ? `text-${iconColor} h-8 w-8 sm:h-10 sm:w-10`
          : "h-8 w-8 sm:h-10 sm:w-10"
      )}
    />
  ) : null;

  return (
    <button
      type="button"
      className={clsx(
        "group flex min-h-[122px] flex-col items-center justify-center gap-3 rounded-2xl border border-border-card bg-bg-card p-4 text-foreground shadow-sm",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/40",
        className
      )}
      aria-label={`Ver categoria ${name}`}
      onClick={onSeeCategory}
    >
      <div
        className={clsx(
          "flex h-12 w-full max-w-[108px] items-center justify-center overflow-hidden rounded-xl p-2 text-primary-600 transition-colors",
          mediaClassName
        )}
      >
        {media}
      </div>
      <span
        className={clsx(
          "text-center text-sm font-semibold uppercase leading-tight text-foreground sm:text-base",
          labelClassName
        )}
      >
        {name}
      </span>
      {description ? (
        <span className="text-center text-xs leading-5 text-foreground/62">
          {description}
        </span>
      ) : null}
    </button>
  );
}
