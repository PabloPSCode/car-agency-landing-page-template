import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { getStoreByDomain } from "../lib/store-data";
import Footer from "./components/footer";
import Header from "./components/header";
import ThemeTokens from "./components/ThemeTokens";
import { StoreProvider } from "./providers/StoreProvider";
// @ts-ignore: Allow importing global CSS without type declarations
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers();
  const host =
    (await headerList).get("x-store-slug") ??
    (await headerList).get("x-forwarded-host") ??
    (await headerList).get("host");
  const { storeData } = await getStoreByDomain(host);

  return {
    title: storeData.store.name || "MonlevadeVeiculos",
    description:
      storeData.store.slogan ||
      "Estoque automotivo com seminovos selecionados em João Monlevade.",
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerList = headers();
  const host =
    (await headerList).get("x-store-slug") ??
    (await headerList).get("x-forwarded-host") ??
    (await headerList).get("host");
  const storePayload = await getStoreByDomain(host);

  return (
    <html lang="pt-BR">
      <body className="overflow-x-hidden bg-background">
        <StoreProvider value={storePayload}>
          <ThemeTokens />
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
