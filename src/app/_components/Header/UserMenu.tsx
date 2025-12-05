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
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-gray-200 transition-colors hover:bg-sky-800 hover:text-yellow-400"
        >
          <User className="h-5 w-5" />
          {t("profile")}
        </Link>
        <Link
          href="/settings"
          onClick={onLinkClick}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-gray-200 transition-colors hover:bg-sky-800 hover:text-yellow-400"
        >
          <Settings className="h-5 w-5" />
          {t("settings")}
        </Link>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-red-400 transition-colors hover:bg-sky-800"
        >
          <LogOut className="h-5 w-5" />
          {t("logout")}
        </button>
      </>
    );
  }

  return (
    <>
      <Link
        href="/profile"
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        onClick={onLinkClick}
      >
        <User className="h-4 w-4" />
        {t("profile")}
      </Link>
      <Link
        href="/settings"
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        onClick={onLinkClick}
      >
        <Settings className="h-4 w-4" />
        {t("settings")}
      </Link>
      <div className="border-t border-gray-200" />
      <button
        onClick={onLogout}
        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-gray-50"
      >
        <LogOut className="h-4 w-4" />
        {t("logout")}
      </button>
    </>
  );
}
