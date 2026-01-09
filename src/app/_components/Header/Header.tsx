"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { HeaderLogo } from "./HeaderLogo";
import { DesktopNav } from "./DesktopNav";
import { AuthMenu } from "./AuthMenu";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileMenu } from "./MobileMenu";
import { useAuth } from "@/app/auth/_hooks/use-auth";

export function Header() {
  const t = useTranslations("global");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/cards", label: t("cards") },
    { href: "/collection", label: t("collection") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-sky-900 shadow-lg backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <HeaderLogo />

        <DesktopNav links={navLinks} />

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <AuthMenu isAuthenticated={isAuthenticated} />
          </div>

          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        links={navLinks}
        isAuthenticated={isAuthenticated}
        onLinkClick={toggleMobileMenu}
      />
    </header>
  );
}
