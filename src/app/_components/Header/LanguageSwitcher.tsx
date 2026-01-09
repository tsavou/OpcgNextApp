"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { useState } from "react";

interface LanguageSwitcherProps {
  dropdownPosition?: "right" | "left";
}

export function LanguageSwitcher({ dropdownPosition = "right" }: LanguageSwitcherProps = {}) {
  const router = useRouter();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  const switchLanguage = async (newLocale: string) => {
    try {
      // Utiliser l'API Cookie Store du navigateur
      if (typeof cookieStore !== "undefined") {
        await cookieStore.set("locale", newLocale);
      } else {
        // Fallback pour les navigateurs qui ne supportent pas cookieStore
        document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      }
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Erreur lors du changement de langue:", error);
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800/80 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10"
        aria-label="Change language"
      >
        <Languages className="h-4 w-4 transition-transform group-hover:rotate-12" />
        <span className="hidden sm:inline text-lg">{currentLanguage.flag}</span>
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute top-full ${dropdownPosition === "left" ? "left-0" : "right-0"} mt-2 w-40 rounded-xl border border-slate-700/50 bg-slate-800/95 backdrop-blur-md shadow-2xl shadow-black/50 overflow-hidden z-50`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`cursor-pointer group flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-all first:rounded-t-xl last:rounded-b-xl ${
                  locale === lang.code
                    ? "font-semibold text-yellow-400 bg-yellow-900/20 hover:bg-yellow-900/30"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-yellow-400"
                }`}
              >
                <span className="text-lg transition-transform group-hover:scale-110">{lang.flag}</span>
                <span className="transition-transform group-hover:translate-x-0.5">{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
