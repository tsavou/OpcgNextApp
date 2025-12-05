"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { useState } from "react";

export function LanguageSwitcher() {
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
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    setIsOpen(false);
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-sky-800"
        aria-label="Change language"
      >
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguage.flag}</span>
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  locale === lang.code
                    ? "bg-gray-50 font-medium text-yellow-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
