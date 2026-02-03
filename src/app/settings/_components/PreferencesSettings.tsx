"use client";

import { useTranslations } from "next-intl";
import { Globe, Bell } from "lucide-react";
import { LanguageSwitcher } from "@/app/_components/Header/LanguageSwitcher";

export function PreferencesSettings() {
  const t = useTranslations("settings");

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600">
          <Globe className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            {t("preferencesTitle")}
          </h2>
          <p className="text-sm text-slate-400">{t("preferencesSubtitle")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-sm font-medium text-slate-400">
                {t("language")}
              </p>
              <p className="text-xs text-slate-500">
                {t("languageDescription")}
              </p>
            </div>
          </div>
          <div className="relative">
            <LanguageSwitcher dropdownPosition="left" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-sm font-medium text-slate-400">
                {t("notifications")}
              </p>
              <p className="text-xs text-slate-500">
                {t("notificationsDescription")}
              </p>
            </div>
          </div>
          <span className="rounded-full bg-slate-700/50 px-3 py-1 text-xs font-medium text-slate-300">
            {t("comingSoon")}
          </span>
        </div>
      </div>
    </div>
  );
}
