import Link from "next/link";
import { useTranslations } from "next-intl";
import { User, Settings, LogOut } from "lucide-react";

interface UserMenuProps {
  onLogout: () => void;
  onLinkClick?: () => void;
  variant?: "desktop" | "mobile";
}

export function UserMenu({
  onLogout,
  onLinkClick,
  variant = "desktop",
}: UserMenuProps) {
  const t = useTranslations("global");

  if (variant === "mobile") {
    return (
      <>
        <Link
          href="/profile"
          onClick={onLinkClick}
          className="cursor-pointer group flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-slate-300 transition-all hover:bg-slate-800/80 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10"
        >
          <User className="h-5 w-5 transition-transform group-hover:scale-110" />
          {t("profile")}
        </Link>
        <Link
          href="/settings"
          onClick={onLinkClick}
          className="cursor-pointer group flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-slate-300 transition-all hover:bg-slate-800/80 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10"
        >
          <Settings className="h-5 w-5 transition-transform group-hover:rotate-90" />
          {t("settings")}
        </Link>
        <button
          onClick={onLogout}
          className="cursor-pointer group flex w-full items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-red-400 transition-all hover:bg-red-900/30 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/20"
        >
          <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          {t("logout")}
        </button>
      </>
    );
  }

  return (
    <>
      <Link
        href="/profile"
        className="cursor-pointer group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800/80 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10"
        onClick={onLinkClick}
      >
        <User className="h-4 w-4 transition-transform group-hover:scale-110" />
        {t("profile")}
      </Link>
      <Link
        href="/settings"
        className="cursor-pointer group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800/80 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10"
        onClick={onLinkClick}
      >
        <Settings className="h-4 w-4 transition-transform group-hover:rotate-90" />
        {t("settings")}
      </Link>
      <div className="border-t border-slate-700/50" />
      <button
        onClick={onLogout}
        className="cursor-pointer group flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-900/30 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/20"
      >
        <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {t("logout")}
      </button>
    </>
  );
}
