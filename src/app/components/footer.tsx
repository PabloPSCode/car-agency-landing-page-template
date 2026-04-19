"use client";

import Image from "next/image";
import { Footer as FooterRC } from "../../libs/react-ultimate-components";
import { useStore } from "../providers/StoreProvider";

export default function Footer() {
  const { storeData, brandCategories } = useStore();
  const footerYear = new Date().getFullYear();

  const companyItems = [
    { label: "Estoque com procedência checada" },
    { label: "Avaliação justa na troca" },
    { label: "Apoio no financiamento" },
  ];

  const supportItems = [
    {
      label: `Segunda a sexta: ${storeData.store.operation.mondayToFriday}`,
    },
    {
      label: `Sábado: ${storeData.store.operation.saturday}`,
    },
    {
      label: `Telefone: ${storeData.contact?.phone}`,
    },
    {
      label: `WhatsApp: ${storeData.contact?.phone}`,
    },
  ];

  const addressItems = [
    { label: storeData.address?.street ?? "" },
    {
      label: `${storeData.address?.city} - ${storeData.address?.state}`,
    },
    {
      label: `CEP: ${storeData.address?.zipCode}`,
    },
    {
      label: `E-mail: ${storeData.contact?.email}`,
    },
  ];

  const brandItems = brandCategories.slice(0, 5).map((brand) => ({
    label: brand.name,
    href: `/pesquisa/estoque?marca=${brand.slug}`,
  }));

  const socialItems = [
    storeData.social_medias?.instagram && {
      href: storeData.social_medias.instagram,
      iconName: "instagram",
    },
    storeData.social_medias?.facebook && {
      href: storeData.social_medias.facebook,
      iconName: "facebook",
    },
  ].filter(Boolean) as { href: string; iconName: "instagram" | "facebook" }[];

  return (
    <div id="contato" className="bg-white text-foreground">
      <FooterRC.Root bordered={false} className="bg-white text-foreground">
        <FooterRC.Top columns={4} className="border-t-0">
          <FooterRC.Column items={companyItems} title="MonlevadeVeiculos" />
          <FooterRC.Column items={supportItems} title="Atendimento" />
          <FooterRC.Column items={addressItems} title="Endereço" />
          <FooterRC.Column items={brandItems} title="Marcas em destaque" />
        </FooterRC.Top>

        <FooterRC.SocialRow
          title="Acompanhe novidades e novas entradas"
          items={socialItems}
          iconsClassName="text-foreground"
          className="border-y border-foreground/10 bg-secondary-50/50"
        />

        <FooterRC.Bottom className="text-foreground/80">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-center">
              © {footerYear} {storeData.store.name}. CNPJ{" "}
              {storeData.legal?.cnpj}
            </p>
            <p className="text-xs text-center flex items-center gap-2">
              Desenvolvido por{" "}
              <a href="https://www.plssistemas.com.br" target="_blank" rel="noopener noreferrer">
              <Image
                src="/imgs/logo_pls.png"
                alt="PLS Sistemas"
                width={100}
                height={100}
              />
              </a>
            </p>
          </div>
        </FooterRC.Bottom>
      </FooterRC.Root>
    </div>
  );
}
