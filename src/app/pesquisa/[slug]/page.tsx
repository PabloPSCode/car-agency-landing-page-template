"use client";

import {
  CalendarIcon,
  GaugeIcon,
  GearSixIcon,
} from "@phosphor-icons/react";
import Breadcrumb from "react-ultimate-components/src/components/navigation/BreadCrumb/index.tsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard, SearchInput } from "react-ultimate-components";
import FilterControllerCard from "../../components/FilterControllerCard";
import {
  MobileMenuToggleButton,
  MobilePanel,
} from "../../components/mobile/MobilePanel";
import {
  FadeContainer,
  RevealContainer,
} from "../../components/ui/Animations";
import { Section } from "../../components/ui/Section";
import { Subtitle, Title } from "../../components/ui/Typography";
import { useStore } from "../../providers/StoreProvider";
import {
  formatKmRodage,
  formatPublishingDate,
  slugify,
} from "../../../utils/car";
import { sendMessageWhatsapp } from "../../../utils/helpers";

type PriceRange = [number, number];
const SearchField = SearchInput as unknown as ComponentType<any>;

export default function SearchPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { brandCategories, bodyTypeCategories, cars, storeData } = useStore();
  const whatsapp = storeData.contact?.whatsapp ?? "5531998710044";
  const normalizedPathname = pathname.replace(/^\/sites\/[^/]+/, "") || pathname;

  const initialSearch = searchParams.get("search")?.trim() ?? "";
  const initialBrand = searchParams.get("marca")?.trim() ?? "";
  const initialBodyType = searchParams.get("carroceria")?.trim() ?? "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedBrandSlugs, setSelectedBrandSlugs] = useState<string[]>(
    initialBrand ? [initialBrand] : []
  );
  const [selectedBodyTypeSlugs, setSelectedBodyTypeSlugs] = useState<string[]>(
    initialBodyType ? [initialBodyType] : []
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const priceBounds = useMemo<PriceRange>(() => {
    if (!cars.length) return [0, 0];
    const prices = cars.map((car) => car.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [cars]);

  const [priceRange, setPriceRange] = useState<PriceRange>(priceBounds);

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setSelectedBrandSlugs(initialBrand ? [initialBrand] : []);
  }, [initialBrand]);

  useEffect(() => {
    setSelectedBodyTypeSlugs(initialBodyType ? [initialBodyType] : []);
  }, [initialBodyType]);

  useEffect(() => {
    setPriceRange(priceBounds);
  }, [priceBounds]);

  const filteredCars = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return cars.filter((car) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          car.name,
          car.brand,
          car.bodyType,
          car.shortDescription,
          car.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesBrand =
        !selectedBrandSlugs.length ||
        selectedBrandSlugs.includes(slugify(car.brand));
      const matchesBodyType =
        !selectedBodyTypeSlugs.length ||
        selectedBodyTypeSlugs.includes(slugify(car.bodyType));
      const matchesPrice =
        car.price >= priceRange[0] && car.price <= priceRange[1];

      return matchesSearch && matchesBrand && matchesBodyType && matchesPrice;
    });
  }, [cars, priceRange, searchTerm, selectedBodyTypeSlugs, selectedBrandSlugs]);

  const handleSearchSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    router.push(
      queryString ? `/pesquisa/estoque?${queryString}` : "/pesquisa/estoque"
    );
  };

  const handleToggleBrand = (brandSlug: string) => {
    setSelectedBrandSlugs((previous) =>
      previous.includes(brandSlug)
        ? previous.filter((item) => item !== brandSlug)
        : [...previous, brandSlug]
    );
  };

  const handleToggleBodyType = (bodyTypeSlug: string) => {
    setSelectedBodyTypeSlugs((previous) =>
      previous.includes(bodyTypeSlug)
        ? previous.filter((item) => item !== bodyTypeSlug)
        : [...previous, bodyTypeSlug]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedBrandSlugs([]);
    setSelectedBodyTypeSlugs([]);
    setPriceRange(priceBounds);
    router.push("/pesquisa/estoque");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Section className="">
        <div className="mb-8 grid gap-5">
          <RevealContainer once>
            <Breadcrumb
              currentPath={normalizedPathname}
              rootLabel="Início"
              labelMap={{
                pesquisa: "Estoque",
                estoque: "Todos os veículos",
              }}
              className="-mt-8"
            />
          </RevealContainer>

          <RevealContainer once delay={80}>
            <div className="grid gap-3">
              <Title as="div" size="xl">
                Veículos seminovos com procedência
              </Title>
              <Subtitle as="div">
                Exibindo {filteredCars.length} veículos filtrados por busca, preço,
                marca e carroceria.
              </Subtitle>
            </div>
          </RevealContainer>

          <FadeContainer once delay={120}>
            <form
              className="w-full rounded-[28px] border border-border-card bg-bg-card p-4 shadow-sm"
              onSubmit={(event) => {
                event.preventDefault();
                handleSearchSubmit();
              }}
            >
              <SearchField
                search={searchTerm}
                setSearch={setSearchTerm}
                placeholder="Busca rápida por marca, modelo ou carroceria"
                variant="secondary"
              />
            </form>
          </FadeContainer>
        </div>

        <div className="mb-5 md:hidden">
          <MobileMenuToggleButton
            open={showMobileFilters}
            onToggle={(open) => setShowMobileFilters(open)}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
            <FilterControllerCard
              brandCategories={brandCategories}
              bodyTypeCategories={bodyTypeCategories}
              selectedBrandSlugs={selectedBrandSlugs}
              selectedBodyTypeSlugs={selectedBodyTypeSlugs}
              priceRange={priceRange}
              minPrice={priceBounds[0]}
              maxPrice={priceBounds[1]}
              onToggleBrand={handleToggleBrand}
              onToggleBodyType={handleToggleBodyType}
              onPriceChange={setPriceRange}
              onResetFilters={handleResetFilters}
            />
          </div>

          <div className="grid gap-6">
            <div className="md:hidden">
              <MobilePanel open={showMobileFilters}>
                <FilterControllerCard
                  brandCategories={brandCategories}
                  bodyTypeCategories={bodyTypeCategories}
                  selectedBrandSlugs={selectedBrandSlugs}
                  selectedBodyTypeSlugs={selectedBodyTypeSlugs}
                  priceRange={priceRange}
                  minPrice={priceBounds[0]}
                  maxPrice={priceBounds[1]}
                  onToggleBrand={handleToggleBrand}
                  onToggleBodyType={handleToggleBodyType}
                  onPriceChange={setPriceRange}
                  onResetFilters={handleResetFilters}
                />
              </MobilePanel>
            </div>

            {filteredCars.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredCars.map((car, index) => (
                  <FadeContainer key={car.id} once delay={index * 45}>
                    <ProductCard
                      productId={car.id}
                      variant="vehicle"
                      imageUrl={car.vehicleImage}
                      title={car.name}
                      subtitle={`Publicado em ${formatPublishingDate(
                        car.publishingDate
                      )}`}
                      location={car.city}
                      price={car.price}
                      oldPrice={car.oldPrice}
                      tag={car.badge}
                      metaItems={[
                        {
                          icon: <GaugeIcon size={18} weight="duotone" />,
                          label: formatKmRodage(car.kmRodage),
                        },
                        {
                          icon: <CalendarIcon size={18} weight="duotone" />,
                          label: car.yearModel,
                        },
                        {
                          icon: <GearSixIcon size={18} weight="duotone" />,
                          label: car.gearType,
                        },
                      ]}
                      ctaLabel="Ver mais informações"
                      onAddToCart={() => router.push(`/produto/${car.slug}`)}
                      onSeeProductDetails={() => router.push(`/produto/${car.slug}`)}
                      onShare={() =>
                        sendMessageWhatsapp(
                          `Olá! Quero detalhes do veículo ${car.name}.`,
                          whatsapp
                        )
                      }
                    />
                  </FadeContainer>
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-border-card bg-bg-card p-8 text-center shadow-sm">
                <Title as="div" size="md" className="mb-3">
                  Nenhum veículo encontrado
                </Title>
                <Subtitle as="div">
                  Ajuste os filtros ou limpe a pesquisa para ver novamente o
                  estoque completo.
                </Subtitle>
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
