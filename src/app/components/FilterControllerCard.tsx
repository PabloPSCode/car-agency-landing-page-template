"use client";

import clsx from "clsx";
import { Checkbox, IntervalSliderInput } from "react-ultimate-components";
import { formatBRL } from "../../libs/react-ultimate-components/src/utils/format";
import type { BodyTypeCategory, BrandCategory } from "../../types";
import { Subtitle, Title } from "./ui/Typography";

type PriceRange = [number, number];

export interface FilterControllerCardProps {
  brandCategories: BrandCategory[];
  bodyTypeCategories: BodyTypeCategory[];
  selectedBrandSlugs: string[];
  selectedBodyTypeSlugs: string[];
  priceRange: PriceRange;
  minPrice: number;
  maxPrice: number;
  onToggleBrand: (brandSlug: string) => void;
  onToggleBodyType: (bodyTypeSlug: string) => void;
  onPriceChange: (values: PriceRange) => void;
  onResetFilters: () => void;
  className?: string;
}

export default function FilterControllerCard({
  brandCategories,
  bodyTypeCategories,
  selectedBrandSlugs,
  selectedBodyTypeSlugs,
  priceRange,
  minPrice,
  maxPrice,
  onToggleBrand,
  onToggleBodyType,
  onPriceChange,
  onResetFilters,
  className,
}: FilterControllerCardProps) {
  return (
    <div
      className={clsx(
        "flex w-full flex-col gap-6 rounded-[28px] border border-border-card bg-bg-card p-5 text-foreground shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Title as="div" size="md" className="text-xl">
          Filtros
        </Title>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-sm font-semibold text-secondary-700 transition hover:opacity-80"
        >
          Limpar
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <Title as="div" size="md" className="text-lg">
          Marca
        </Title>
        <Subtitle as="div" className="text-sm">
          Refine o estoque pelas marcas que você quer comparar.
        </Subtitle>

        <div className="flex flex-col gap-2">
          {brandCategories.map((brand) => (
            <Checkbox
              key={brand.slug}
              checked={selectedBrandSlugs.includes(brand.slug)}
              onChange={() => onToggleBrand(brand.slug)}
              helperText={brand.name}
            />
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-foreground/10" />

      <div className="flex flex-col gap-3">
        <Title as="div" size="md" className="text-lg">
          Carroceria
        </Title>
        <Subtitle as="div" className="text-sm">
          Selecione o tipo de chassi que mais combina com o uso previsto.
        </Subtitle>

        <div className="flex flex-col gap-2">
          {bodyTypeCategories.map((bodyType) => (
            <Checkbox
              key={bodyType.slug}
              checked={selectedBodyTypeSlugs.includes(bodyType.slug)}
              onChange={() => onToggleBodyType(bodyType.slug)}
              helperText={bodyType.name}
            />
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-foreground/10" />

      <div className="flex flex-col gap-4">
        <Title as="div" size="md" className="text-lg">
          Faixa de preço
        </Title>
        <IntervalSliderInput
          label="Quanto você quer investir"
          minValue={minPrice}
          maxValue={maxPrice}
          stepValue={1000}
          values={priceRange}
          onChange={onPriceChange}
          formatValue={formatBRL}
        />
      </div>
    </div>
  );
}
