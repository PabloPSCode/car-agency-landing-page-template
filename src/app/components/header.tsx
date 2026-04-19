"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import {
  LandingHeader,
  SearchInput,
} from "../../libs/react-ultimate-components/src";
import { sendMessageWhatsapp } from "../../utils/helpers";
import { useStore } from "../providers/StoreProvider";
import { Title } from "./ui/Typography";

const SearchField = SearchInput as unknown as ComponentType<any>;

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { storeData } = useStore();

  const normalizedPathname = pathname.replace(/^\/sites\/[^/]+/, "") || "/";
  const isHome = normalizedPathname === "/";
  const whatsapp = storeData.contact?.whatsapp ?? "5531998710044";

  const navigationItems = useMemo(
    () => [
      { label: "Início", href: "#inicio" },
      { label: "Estoque", href: "/pesquisa/estoque" },
      { label: "Marcas", href: "#marcas" },
      { label: "Contato", href: "#contato" },
    ],
    [],
  );

  const resolveHref = (href: string) => {
    if (!href.startsWith("#")) return href;
    return isHome ? href : `/${href}`;
  };

  const handleWhatsapp = () => {
    sendMessageWhatsapp(
      "Olá! Quero agendar uma avaliação no estoque da MonlevadeVeiculos.",
      whatsapp,
    );
  };

  const handleSearch = () => {
    if (!search.trim()) {
      router.push("/pesquisa/estoque");
      setShowMobileMenu(false);
      return;
    }

    router.push(
      `/pesquisa/estoque?search=${encodeURIComponent(search.trim())}`,
    );
    setShowMobileMenu(false);
  };

  const handleMobileToggle = (open: boolean) => {
    setShowMobileMenu(open);
  };

  return (
    <LandingHeader.Root
      bordered
      className="bg-white min-h-[72px] backdrop-blur"
      size="lg"
      sticky
      style={{ zIndex: 60 }}
    >
      <LandingHeader.Left className="flex items-center">
        <button
          type="button"
          className="flex items-center text-left gap-3 mt-4 md:mt-0"
          onClick={() => router.push("/")}
        >
          <Image
            src="/logo.png"
            alt="Logo da MonlevadeVeiculos"
            width={160}
            height={160}
            className="w-8 h-8 sm:w-10 sm:h-10"
            quality={100}
          />
          <Title as="span" size="md" className="text-[1.6rem] text-foreground">
            Monlevade<span className="text-secondary-700">Veiculos</span>
          </Title>
        </button>
      </LandingHeader.Left>

      <LandingHeader.Center className="hidden md:flex">
        <LandingHeader.Nav className="justify-center">
          {navigationItems.map((item) => (
            <LandingHeader.Nav.Item
              key={item.label}
              href={resolveHref(item.href)}
            >
              {item.label}
            </LandingHeader.Nav.Item>
          ))}
        </LandingHeader.Nav>
      </LandingHeader.Center>

      <LandingHeader.Right className="flex items-center gap-3">
        <div className="hidden lg:flex lg:flex-col lg:items-end">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/45">
            Atendimento
          </span>
          <span className="text-sm font-semibold text-foreground">
            {storeData.contact?.phone}
          </span>
        </div>

        <LandingHeader.CTA
          className="hidden md:inline-flex"
          label="Agendar avaliação"
          onClick={handleWhatsapp}
        />

        <LandingHeader.MobileMenuToggle
          open={showMobileMenu}
          onToggle={handleMobileToggle as never}
        />
      </LandingHeader.Right>

      <LandingHeader.MobileMenuPanel
        open={showMobileMenu}
        cta={
          <LandingHeader.CTA
            className="w-full justify-center"
            label="Falar no WhatsApp"
            onClick={handleWhatsapp}
          />
        }
      >
        <li className="mb-4 w-full">
          <form
            className="w-full"
            onSubmit={(event) => {
              event.preventDefault();
              handleSearch();
            }}
          >
            <SearchField
              search={search}
              setSearch={setSearch}
              placeholder="Busque marca, modelo ou carroceria"
              variant="button-highlight"
            />
          </form>
        </li>

        {navigationItems.map((item) => (
          <li
            key={item.label}
            className="w-full"
            onClick={() => setShowMobileMenu(false)}
          >
            <a
              href={resolveHref(item.href)}
              className="flex items-center justify-between rounded-xl border border-border-card bg-white px-4 py-3 text-sm font-semibold text-foreground"
            >
              {item.label}
              <ArrowRightIcon
                size={16}
                weight="bold"
                className="text-secondary-700"
              />
            </a>
          </li>
        ))}
      </LandingHeader.MobileMenuPanel>
    </LandingHeader.Root>
  );
}
