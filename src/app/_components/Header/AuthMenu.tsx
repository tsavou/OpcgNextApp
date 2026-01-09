"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import { AuthButtons } from "./AuthButtons";
import { UserMenu } from "./UserMenu";
import { useLogoutMutation } from "@/app/auth/_hooks/queries/mutations/use-logout-mutation";

interface AuthMenuProps {
  isAuthenticated: boolean;
}

export function AuthMenu({ isAuthenticated }: AuthMenuProps) {
  const t = useTranslations("global");
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const { mutate: logout } = useLogoutMutation();

  const toggleAuthMenu = () => setIsAuthMenuOpen(!isAuthMenuOpen);

  const handleLogout = () => {
    logout();
    toggleAuthMenu();
  };

  if (!isAuthenticated) {
    return <AuthButtons />;
  }

  return (
    <div className="relative">
      <button
        onClick={toggleAuthMenu}
        className="cursor-pointer group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800/80 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10"
        aria-label={t("account")}
      >
        <User className="h-5 w-5 transition-transform group-hover:scale-110" />
        <span className="hidden lg:inline">{t("account")}</span>
      </button>
      {isAuthMenuOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={toggleAuthMenu} />
          <div className="absolute top-full right-0 mt-2 w-48 rounded-xl border border-slate-700/50 bg-slate-800/95 backdrop-blur-md shadow-2xl shadow-black/50 overflow-hidden">
            <UserMenu onLogout={handleLogout} onLinkClick={toggleAuthMenu} />
          </div>
        </>
      )}
    </div>
  );
}
