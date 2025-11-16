import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "./_components/Header";
import { Providers } from "../lib/providers";
import "./globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnePiece TCG Manager",
  description: "Gérez votre collection de cartes One Piece TCG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Providers>
          <ReactQueryDevtools />
          <Header />
          <div className="flex w-full grow">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
