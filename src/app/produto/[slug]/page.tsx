"use client";

import {
  CalendarIcon,
  GasPumpIcon,
  GaugeIcon,
  GearSixIcon,
  MapPinIcon,
  PaletteIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import Breadcrumb from "react-ultimate-components/src/components/navigation/BreadCrumb/index.tsx";
import { useParams, useRouter } from "next/navigation";
import {
  GenericProductDetails,
  ProductCard,
} from "../../../libs/react-ultimate-components/src";
import {
  FadeContainer,
  RevealContainer,
} from "../../components/ui/Animations";
import { Section } from "../../components/ui/Section";
import { Paragraph, Subtitle, Title } from "../../components/ui/Typography";
import { useStore } from "../../providers/StoreProvider";
import { formatKmRodage, formatPublishingDate } from "../../../utils/car";
import { sendMessageWhatsapp } from "../../../utils/helpers";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { cars, storeData } = useStore();
  const whatsapp = storeData.contact?.whatsapp ?? "5531998710044";

  const slug = Array.isArray(params?.slug)
    ? params.slug[params.slug.length - 1]
    : params?.slug;
  const selectedCar = cars.find((car) => car.slug === slug) ?? cars[0];

  if (!selectedCar) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Section>
          <Title as="div" size="lg">
            Veículo não encontrado
          </Title>
        </Section>
      </main>
    );
  }

  const specItems = [
    {
      label: "Ano / modelo",
      value: selectedCar.yearModel,
      icon: <CalendarIcon size={24} weight="duotone" />,
    },
    {
      label: "Quilometragem",
      value: formatKmRodage(selectedCar.kmRodage),
      icon: <GaugeIcon size={24} weight="duotone" />,
    },
    {
      label: "Câmbio",
      value: selectedCar.gearType,
      icon: <GearSixIcon size={24} weight="duotone" />,
    },
    {
      label: "Motor",
      value: selectedCar.enginePower,
      icon: <GaugeIcon size={24} weight="duotone" />,
    },
    {
      label: "Combustível",
      value: selectedCar.fuelType,
      icon: <GasPumpIcon size={24} weight="duotone" />,
    },
    {
      label: "Cor",
      value: selectedCar.color,
      icon: <PaletteIcon size={24} weight="duotone" />,
    },
  ];

  const relatedCars = cars.filter((car) => car.id !== selectedCar.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Section className="pb-8 pt-8">
        <RevealContainer once>
          <Breadcrumb
            currentPath={`/produto/${selectedCar.slug}`}
            rootLabel="Início"
            labelMap={{
              produto: "Veículo",
              [selectedCar.slug]: selectedCar.name,
            }}
          />
        </RevealContainer>

        <RevealContainer once delay={80}>
          <div className="mt-6 grid gap-4">
            <Title as="div" size="xl">
              {selectedCar.name}
            </Title>
            <Subtitle as="div">
              {selectedCar.shortDescription} Publicado em{" "}
              {formatPublishingDate(selectedCar.publishingDate)}.
            </Subtitle>
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-foreground/74">
              <span className="inline-flex items-center gap-2">
                <MapPinIcon size={18} weight="duotone" />
                {selectedCar.location}
              </span>
              <span className="inline-flex items-center gap-2 text-[#1c9246]">
                <ShieldCheckIcon size={18} weight="duotone" />
                Aceitamos seu carro na troca
              </span>
            </div>
          </div>
        </RevealContainer>
      </Section>

      <Section className="pt-0">
        <FadeContainer once delay={120}>
          <GenericProductDetails
            product={{
              id: selectedCar.id,
              name: selectedCar.name,
              price: selectedCar.price,
              oldPrice: selectedCar.oldPrice,
              description: selectedCar.shortDescription,
              photos: selectedCar.gallery.map((image, index) => ({
                src: image,
                alt: `${selectedCar.name} - foto ${index + 1}`,
              })),
              shareUrl: selectedCar.shareUrl,
            }}
            showHelperText={false}
            onAddToCart={() =>
              sendMessageWhatsapp(
                `Olá! Quero conversar sobre o veículo ${selectedCar.name}.`,
                whatsapp
              )
            }
          />
        </FadeContainer>
      </Section>

      <Section className="pt-2">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-6">
            <RevealContainer once delay={80}>
              <div className="rounded-[30px] border border-border-card bg-bg-card p-6 shadow-sm">
                <Title as="div" size="md" className="mb-6">
                  Ficha rápida do veículo
                </Title>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {specItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 rounded-2xl bg-[#f7f9fc] p-4"
                    >
                      <div className="text-secondary-700">{item.icon}</div>
                      <div className="grid gap-1">
                        <span className="text-sm text-foreground/56">
                          {item.label}
                        </span>
                        <span className="text-lg font-semibold text-foreground">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealContainer>

            <RevealContainer once delay={120}>
              <div className="rounded-[30px] border border-border-card bg-bg-card p-6 shadow-sm">
                <Title as="div" size="md" className="mb-5">
                  Mais sobre o {selectedCar.name}
                </Title>
                <Paragraph>{selectedCar.description}</Paragraph>

                <Title as="div" size="md" className="mb-5 mt-8">
                  Itens que chamam atenção
                </Title>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedCar.features.map((feature) => (
                    <div
                      key={feature}
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#f7f9fc] px-4 py-3 text-sm font-medium text-foreground/82"
                    >
                      <ShieldCheckIcon
                        size={18}
                        weight="duotone"
                        className="text-[#1c9246]"
                      />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </RevealContainer>
          </div>

          <div className="grid gap-6 lg:sticky lg:top-28 lg:self-start">
            <FadeContainer once delay={120}>
              <div className="rounded-[30px] border border-border-card bg-bg-card p-6 shadow-sm">
                <div className="grid gap-2 text-center">
                  {selectedCar.oldPrice ? (
                    <>
                      <span className="text-sm uppercase tracking-[0.18em] text-foreground/44">
                        Fipe sugerida
                      </span>
                      <span className="text-2xl font-semibold text-foreground/36 line-through">
                        {selectedCar.oldPrice.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </>
                  ) : null}
                  <span className="text-sm uppercase tracking-[0.18em] text-secondary-700">
                    Por apenas
                  </span>
                  <span className="text-5xl font-bold leading-none text-secondary-700">
                    {selectedCar.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      sendMessageWhatsapp(
                        `Olá! Quero negociar o veículo ${selectedCar.name}.`,
                        whatsapp
                      )
                    }
                    className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-4 py-4 text-base font-semibold text-white"
                  >
                    Quero negociar
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      sendMessageWhatsapp(
                        `Olá! Quero agendar um test drive do veículo ${selectedCar.name}.`,
                        whatsapp
                      )
                    }
                    className="inline-flex items-center justify-center rounded-xl border border-primary-500 px-4 py-4 text-base font-semibold text-secondary-700"
                  >
                    Agendar test drive
                  </button>
                </div>
              </div>
            </FadeContainer>

            <FadeContainer once delay={160}>
              <div className="rounded-[30px] border border-border-card bg-bg-card p-6 shadow-sm">
                <Title as="div" size="md" className="mb-5">
                  Informações da loja
                </Title>
                <div className="grid gap-4 text-sm text-foreground/74">
                  <div className="grid gap-1">
                    <span className="font-semibold text-foreground">Endereço</span>
                    <span>{storeData.address?.street}</span>
                    <span>
                      {storeData.address?.city} - {storeData.address?.state}
                    </span>
                  </div>

                  <div className="grid gap-1">
                    <span className="font-semibold text-foreground">Contato</span>
                    <span className="inline-flex items-center gap-2">
                      <PhoneCallIcon size={16} weight="duotone" />
                      {storeData.contact?.phone}
                    </span>
                    <span>{storeData.contact?.email}</span>
                  </div>

                  <div className="grid gap-1">
                    <span className="font-semibold text-foreground">
                      Horário de funcionamento
                    </span>
                    <span>Segunda a sexta: {storeData.store.operation.mondayToFriday}</span>
                    <span>Sábado: {storeData.store.operation.saturday}</span>
                  </div>
                </div>
              </div>
            </FadeContainer>
          </div>
        </div>
      </Section>

      <Section className="pt-2">
        <div className="mb-8 grid gap-3">
          <Title as="div" size="lg">
            Também podem te interessar
          </Title>
          <Subtitle as="div">
            Cards reutilizados para reforçar a navegação por estoque relacionado.
          </Subtitle>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {relatedCars.map((car, index) => (
            <FadeContainer key={car.id} once delay={index * 55}>
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
                    `Olá! Quero detalhes sobre o veículo ${car.name}.`,
                    whatsapp
                  )
                }
              />
            </FadeContainer>
          ))}
        </div>
      </Section>
    </main>
  );
}
