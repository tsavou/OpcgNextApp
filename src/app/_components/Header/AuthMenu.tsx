"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import { AuthButtons } from "./AuthButtons";
import { UserMenu } from "./UserMenu";

interface AuthMenuProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function AuthMenu({ isAuthenticated, onLogout }: AuthMenuProps) {
  const t = useTranslations("global");
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

  const toggleAuthMenu = () => setIsAuthMenuOpen(!isAuthMenuOpen);

  if (!isAuthenticated) {
    return <AuthButtons />;
  }

  return (
    <div className="relative">
      <button
        onClick={toggleAuthMenu}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-sky-800"
        aria-label={t("account")}
      >
        <User className="h-5 w-5" />
        <span className="hidden lg:inline">{t("account")}</span>
      </button>
      {isAuthMenuOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={toggleAuthMenu} />
          <div className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
            <UserMenu
              onLogout={() => {
                onLogout();
                toggleAuthMenu();
              }}
              onLinkClick={toggleAuthMenu}
            />
          </div>
        </>
      )}
    </div>
  );
}
