import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "./_components/Header/Header";
import { Providers } from "../lib/providers";
import "./globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider } from "next-intl";
import { SetLocaleCookie } from "./_components/SetLocaleCookie";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LogPoseCards - One Piece TCG Manager",
  description:
    "Gérez votre collection de cartes One Piece TCG. Rejoignez LogPoseCards pour créer et gérer votre collection de cartes, suivre la valeur de vos cartes et plus encore !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
        >
          <ReactQueryDevtools />
          <NextIntlClientProvider>
            <Header />
            <div className="flex w-full grow">{children}</div>
          </NextIntlClientProvider>
          <SetLocaleCookie />
        </body>
      </Providers>
    </html>
  );
}
