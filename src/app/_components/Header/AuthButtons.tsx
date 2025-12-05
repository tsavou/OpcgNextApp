import Link from "next/link";
import { useTranslations } from "next-intl";
import { LogIn, UserPlus } from "lucide-react";

interface AuthButtonsProps {
  onLinkClick?: () => void;
  variant?: "desktop" | "mobile";
}

export function AuthButtons({
  onLinkClick,
  variant = "desktop",
}: AuthButtonsProps) {
  const t = useTranslations("global");

  if (variant === "mobile") {
    return (
      <>
        <Link
          href="/login"
          onClick={onLinkClick}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-gray-200 transition-colors hover:bg-sky-800 hover:text-yellow-400"
        >
          <LogIn className="h-5 w-5" />
          {t("login")}
        </Link>
        <Link
          href="/register"
          onClick={onLinkClick}
          className="mt-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 px-4 py-2 text-base font-medium text-slate-900 transition-opacity hover:opacity-90"
        >
          <UserPlus className="h-5 w-5" />
          {t("register")}
        </Link>
      </>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="text-sm font-semibold text-yellow-400 transition-colors hover:text-white"
      >
        {t("login")}
      </Link>
      <Link
        href="/register"
        className="rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 px-4 py-2 text-sm font-medium text-slate-900 transition-opacity hover:opacity-90"
      >
        {t("register")}
      </Link>
    </div>
  );
}

