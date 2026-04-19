"use client";

import {
  CalendarIcon,
  GaugeIcon,
  GearSixIcon,
  MapPinIcon,
  ShareNetworkIcon,
  StarIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import { formatBRL } from "../../../utils/format";

type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export interface ProductMetaItem {
  icon?: unknown;
  label: string;
}

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: number;
  rating?: Rating;
  installments?: number;
  installmentValue?: number;
  ctaLabel?: string;
  shareLabel?: string;
  className?: string;
  onAddToCart?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
  onSeeProductDetails?: (productId?: string) => void;
  showDeal?: boolean;
  dealPrice?: number;
  dealEndsWithIn?: string;
  variant?: "default" | "vehicle";
  subtitle?: string;
  location?: string;
  metaItems?: ProductMetaItem[];
  oldPrice?: number;
  tag?: string;
  imageAlt?: string;
  buttonVariant?: "primary" | "outlined";
  ctaClassName?: string;
  productId?: string;
}

export default function ProductCard({
  imageUrl,
  title,
  price,
  installments,
  installmentValue,
  ctaLabel = "Ver mais informações",
  shareLabel,
  onAddToCart,
  onShare,
  onFavorite,
  onSeeProductDetails,
  showDeal,
  dealPrice,
  className,
  variant = "default",
  subtitle,
  location,
  metaItems,
  oldPrice,
  tag,
  imageAlt,
  buttonVariant = "outlined",
  ctaClassName,
  productId,
}: ProductCardProps) {
  const currentPrice = dealPrice ?? price;
  const comparePrice = oldPrice ?? (showDeal && currentPrice < price ? price : undefined);
  const formattedPrice = formatBRL(currentPrice);
  const formattedComparePrice =
    typeof comparePrice === "number" && comparePrice > currentPrice
      ? formatBRL(comparePrice)
      : null;

  return (
    <article
      className={clsx(
        "group flex min-h-[720px] flex-col overflow-hidden rounded-[26px] border border-border-card bg-bg-card text-foreground shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      aria-label={`Produto: ${title}`}
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => onSeeProductDetails?.(productId)}
          className="relative block h-[220px] w-full overflow-hidden bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/40"
        >
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        </button>

        {tag ? (
          <span className="absolute left-4 top-4 rounded-full bg-primary-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            {tag}
          </span>
        ) : null}

        {(onFavorite || onShare) && (
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            {onFavorite ? (
              <button
                type="button"
                onClick={onFavorite}
                aria-label={`Favoritar ${title}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-foreground shadow-sm"
              >
                <StarIcon size={18} weight="bold" />
              </button>
            ) : null}
            {onShare ? (
              <button
                type="button"
                onClick={onShare}
                aria-label={`${shareLabel ?? "Compartilhar"} ${title}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-foreground shadow-sm"
              >
                <ShareNetworkIcon size={18} weight="bold" />
              </button>
            ) : null}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onSeeProductDetails?.(productId)}
            className="text-left"
          >
            <span className="block text-2xl font-bold leading-tight text-foreground">
              {title}
            </span>
          </button>

          {subtitle ? (
            <span className="text-sm font-semibold uppercase tracking-[0.04em] text-foreground/62">
              {subtitle}
            </span>
          ) : null}
        </div>

        {metaItems?.length ? (
          <div className="grid grid-cols-2 gap-3 text-sm text-foreground/78">
            {metaItems.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                <span className="text-secondary-600">
                  {(item.icon as never) ?? <GaugeIcon size={18} weight="duotone" />}
                </span>
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        ) : null}

        {location ? (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <MapPinIcon size={18} weight="duotone" />
            {location}
          </span>
        ) : null}

        {variant === "default" && installments && installmentValue ? (
          <span className="text-sm text-foreground/68">
            Em até {installments}x de {formatBRL(installmentValue)}
          </span>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            {formattedComparePrice ? (
              <>
                <span className="text-xs uppercase tracking-[0.16em] text-foreground/46">
                  De
                </span>
                <span className="text-lg font-semibold text-foreground/42 line-through">
                  {formattedComparePrice}
                </span>
              </>
            ) : null}
            <span className="text-xs uppercase tracking-[0.16em] text-secondary-700">
              Por
            </span>
            <span className="text-3xl font-bold leading-none text-secondary-700">
              {formattedPrice}
            </span>
          </div>

          {variant === "vehicle" && !metaItems?.length ? (
            <div className="hidden sm:flex sm:flex-col sm:items-end sm:text-right">
              <span className="inline-flex items-center gap-2 text-sm text-foreground/60">
                <CalendarIcon size={16} weight="duotone" />
                Pronta entrega
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-foreground/60">
                <GearSixIcon size={16} weight="duotone" />
                Laudo aprovado
              </span>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onAddToCart ?? (() => onSeeProductDetails?.(productId))}
          className={clsx(
            "mt-2 inline-flex items-center justify-center rounded-xl border px-4 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300/60",
            buttonVariant === "primary"
              ? "border-primary-500 bg-primary-500 text-white hover:opacity-95"
              : "border-primary-500 text-secondary-700 hover:bg-secondary-50",
            ctaClassName
          )}
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  );
}

export type { ProductCardProps };
export { CalendarIcon, GaugeIcon, GearSixIcon };
