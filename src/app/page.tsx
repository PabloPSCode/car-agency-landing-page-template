"use client";

import {
  ArrowRightIcon,
  BuildingsIcon,
  CalendarIcon,
  GaugeIcon,
  GearSixIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BannerCarousel,
  CategoryCard,
  ProductCard,
} from "../libs/react-ultimate-components/src";
import { formatKmRodage, formatPublishingDate } from "../utils/car";
import { sendMessageWhatsapp } from "../utils/helpers";
import BodyTypeIcon from "./components/BodyTypeIcon";
import {
  FadeContainer,
  RevealContainer,
  ZoomContainer,
} from "./components/ui/Animations";
import { HeroSection, Section } from "./components/ui/Section";
import { Paragraph, Subtitle, Title } from "./components/ui/Typography";
import { useStore } from "./providers/StoreProvider";

export default function Home() {
  const router = useRouter();
  const { brandCategories, bodyTypeCategories, cars, heroBanners, storeData } =
    useStore();
  const featuredCars = cars.filter((car) => car.featured).slice(0, 4);
  const latestCars = cars.slice(0, 6);
  const whatsapp = storeData.contact?.whatsapp ?? "5531998710044";

  const heroSlides = heroBanners.map((banner) => (
    <div
      key={banner.id}
      className="relative min-h-[70vh] overflow-hidden bg-[#0f1724]"
    >
      <Image
        src={banner.imageUrl}
        alt={banner.title}
        fill
        className="object-cover opacity-75 brightness-150"
        priority={banner.id === heroBanners[0]?.id}
        sizes="100vw"
      />
      <div className="absolute inset-0 " />
      <div className="relative z-10 flex min-h-[70vh] items-center">
        <div className="w-3/4 sm:w-full flex justify-center mx-auto">
          <div className="max-w-7xl -mt-32">
            <Title
              as="div"
              size="hero"
              className="mt-6 max-w-5xl text-white bg-[linear-gradient(120deg,rgba(15,23,36,0.4),rgba(15,23,36,0.2),rgba(15,23,36,0.2))] p-8 rounded-lg"
            >
              {banner.title}
            </Title>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push(banner.ctaHref)}
                className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-3 text-base font-semibold text-white"
              >
                {banner.ctaLabel}
                <ArrowRightIcon size={18} weight="bold" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  ));

  return (
    <main id="inicio" className="min-h-screen bg-background text-foreground">
      <HeroSection>
        <ZoomContainer once delay={100}>
          <BannerCarousel
            items={heroSlides}
            loop
            showDots
            showNavigation
            className="overflow-hidden"
          />
        </ZoomContainer>
      </HeroSection>

      <Section id="marcas" className="pt-6">
        <RevealContainer once>
          <div className="mb-6 flex flex-col gap-3">
            <Title as="div" size="lg">
              Busque pela marca
            </Title>
            <Subtitle as="div">
              Trabalhamos com todas as marcas.
            </Subtitle>
          </div>
        </RevealContainer>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10">
          {brandCategories.map((brand, index) => (
            <RevealContainer key={brand.id} once delay={index * 40}>
              <CategoryCard
                name={brand.name}
                imgUrl={brand.logoUrl}
                onSeeCategory={() =>
                  router.push(`/pesquisa/estoque?marca=${brand.slug}`)
                }
                className="min-h-[124px] w-full bg-white"
                labelClassName="text-[13px] sm:text-sm"
              />
            </RevealContainer>
          ))}
        </div>
      </Section>

      <Section id="carrocerias" className="bg-[#e5ebf2]/70 py-10">
        <RevealContainer once>
          <div className="mb-6 flex flex-col gap-3">
            <Title as="div" size="lg">
              Busque pelo tipo de carroceria
            </Title>
            <Subtitle as="div">
              Hatch, sedan, SUV, picape e utilitário organizados em cards rápidos.
            </Subtitle>
          </div>
        </RevealContainer>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {bodyTypeCategories.map((bodyType, index) => (
            <RevealContainer key={bodyType.id} once delay={index * 55}>
              <CategoryCard
                name={bodyType.name}
                description={bodyType.description}
                icon={
                  <BodyTypeIcon
                    iconKey={bodyType.iconKey}
                    className="h-9 w-9 text-secondary-700"
                  />
                }
                onSeeCategory={() =>
                  router.push(`/pesquisa/estoque?carroceria=${bodyType.slug}`)
                }
                mediaClassName="max-w-[84px] bg-secondary-50"
                labelClassName="text-foreground"
              />
            </RevealContainer>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid gap-3">
            <Title as="div" size="lg">
              Seminovos em destaque
            </Title>
            <Subtitle as="div">
              Cards com layout de vitrine, quilometragem, câmbio, localização e preço.
            </Subtitle>
          </div>

          <button
            type="button"
            onClick={() => router.push("/pesquisa/estoque")}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary-500 px-5 py-3 text-base font-semibold text-white"
          >
            Ver todo o estoque
            <ArrowRightIcon size={18} weight="bold" />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredCars.map((car, index) => (
            <ZoomContainer key={car.id} once delay={index * 70}>
              <ProductCard
                productId={car.id}
                variant="vehicle"
                imageUrl={car.vehicleImage}
                title={car.name}
                subtitle={car.shortDescription}
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
                    `Olá! Quero receber mais informações sobre o veículo ${car.name}.`,
                    whatsapp
                  )
                }
              />
            </ZoomContainer>
          ))}
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Procedência visível",
              text: "Cada anúncio foi montado para expor versão, preço, quilometragem e publicação logo na primeira dobra.",
              icon: <ShieldCheckIcon size={24} weight="duotone" />,
            },
            {
              title: "Atendimento com contexto",
              text: "Os CTAs já empurram o lead para WhatsApp com mensagem pronta, reduzindo atrito na negociação.",
              icon: <PhoneCallIcon size={24} weight="duotone" />,
            },
            {
              title: "Todas as marcas",
              text: "A navegação por marca e carroceria foi pensada para concessionária, multimarcas e revenda local.",
              icon: <BuildingsIcon size={24} weight="duotone" />,
            },
          ].map((item, index) => (
            <RevealContainer key={item.title} once delay={index * 80}>
              <div className="rounded-[28px] border border-border-card bg-bg-card p-6 shadow-sm">
                <div className="mb-4 inline-flex rounded-2xl bg-secondary-50 p-3 text-secondary-700">
                  {item.icon}
                </div>
                <Title as="div" size="md" className="mb-3 text-xl">
                  {item.title}
                </Title>
                <Paragraph>{item.text}</Paragraph>
              </div>
            </RevealContainer>
          ))}
        </div>
      </Section>

      <Section className="pt-2">
        <div className="mb-8 flex flex-col gap-3">
          <Title as="div" size="lg">
            Chegaram agora no estoque
          </Title>
          <Subtitle as="div">
            Uma segunda grade para provar a escalabilidade do template em home.
          </Subtitle>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {latestCars.map((car, index) => (
            <FadeContainer key={car.id} once delay={index * 55}>
              <ProductCard
                productId={car.id}
                variant="vehicle"
                imageUrl={car.vehicleImage}
                title={car.name}
                subtitle={`Publicado em ${formatPublishingDate(car.publishingDate)}`}
                location={car.location}
                price={car.price}
                oldPrice={car.oldPrice}
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
                ctaLabel="Quero negociar"
                buttonVariant="primary"
                onAddToCart={() =>
                  sendMessageWhatsapp(
                    `Olá! Tenho interesse em negociar o veículo ${car.name}.`,
                    whatsapp
                  )
                }
                onSeeProductDetails={() => router.push(`/produto/${car.slug}`)}
              />
            </FadeContainer>
          ))}
        </div>
      </Section>
    </main>
  );
}
