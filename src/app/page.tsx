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
import { useRouter } from "next/navigation";
import Button from "react-ultimate-components/src/components/buttons/Button";
import {
  CategoryCard,
  ProductCard,
} from "../libs/react-ultimate-components/src";
import VideoSection from "../libs/react-ultimate-components/src/components/elements/VideoSection";
import { formatKmRodage, formatPublishingDate } from "../utils/car";
import { sendMessageWhatsapp } from "../utils/helpers";
import {
  FadeContainer,
  RevealContainer,
  ZoomContainer,
} from "./components/ui/Animations";
import { Section } from "./components/ui/Section";
import { Paragraph, Subtitle, Title } from "./components/ui/Typography";
import { useStore } from "./providers/StoreProvider";

export default function Home() {
  const router = useRouter();
  const { brandCategories, bodyTypeCategories, cars, storeData } =
    useStore();
  const featuredCars = cars.filter((car) => car.featured).slice(0, 4);
  const latestCars = cars.slice(0, 6);
  const whatsapp = storeData.contact?.whatsapp ?? "5531998710044";

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main id="inicio" className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden ">
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-secondary-900 via-secondary-800/50 to-secondary-100/20 flex flex-col items-center justify-center" />
        <VideoSection
          size="full"
          videoUrl="/videos/video.mp4"
          showPlayPauseButton={false}
          showOverlay
          containerClassName="!min-h-[70vh] bg-transparent"
        />
      </section>

      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center h-full">
        <div className="mx-auto my-auto min-h-[95vh] flex w-full max-w-7xl items-center justify-center2 px-6 pb-16 lg:px-8">
          <RevealContainer
            once
            className="pointer-events-auto m-auto space-y-8"
          >
            <Title
              as="h1"
              className="max-w-[70vw] sm:max-w-[50vw]  xl:max-w-[50vw] text-center !text-3xl leading-[0.96] tracking-[-0.05em] text-white sm:!text-5xl mt-12"
            >
              Buscando seu próximo carro? Encontre aqui o seminovo ideal para
              você.
            </Title>

            <FadeContainer
              once
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Button
                type="button"
                label="Ver estoque"
                onClick={() => router.push("/pesquisa/estoque")}
                className="!rounded-full !bg-secondary-500 !px-8 !py-4 !text-white !shadow-none"
              />
            </FadeContainer>
          </RevealContainer>
        </div>
      </div>

      <Section id="marcas" className="pt-6">
        <RevealContainer once>
          <div className="mb-6 flex flex-col gap-3">
            <Title as="div" size="lg">
              Busque pela marca
            </Title>
            <Subtitle as="div">Trabalhamos com todas as marcas.</Subtitle>
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
              Hatch, sedan, SUV, picape e utilitário organizados em cards
              rápidos.
            </Subtitle>
          </div>
        </RevealContainer>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {bodyTypeCategories.map((bodyType, index) => (
            <RevealContainer key={bodyType.id} once delay={index * 55}>
              <CategoryCard
                name={bodyType.name}
                description={bodyType.description}
                imgUrl={bodyType.imageUrl}
                imageFit="cover"
                onSeeCategory={() =>
                  router.push(`/pesquisa/estoque?carroceria=${bodyType.slug}`)
                }
                mediaClassName="bg-secondary-50"
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
              Cards com layout de vitrine, quilometragem, câmbio, localização e
              preço.
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
                    whatsapp,
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
                    whatsapp,
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
