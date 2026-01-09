"use client";

import { useAuth } from "@/app/auth/_hooks/use-auth";
import { useTranslations } from "next-intl";
import { User, Mail } from "lucide-react";

export function AccountSettings() {
  const t = useTranslations("settings");
  const tGlobal = useTranslations("global");
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-2xl border border-slate-700 bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm">
        <div className="h-6 w-32 bg-slate-700 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-slate-700 rounded" />
          <div className="h-4 w-3/4 bg-slate-700 rounded" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-700">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{t("accountTitle")}</h2>
          <p className="text-sm text-slate-400">{t("accountSubtitle")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-sky-400" />
            <div>
              <p className="text-sm font-medium text-slate-400">{tGlobal("email")}</p>
              <p className="text-base text-white">{user.email}</p>
            </div>
          </div>
          <span className="rounded-full bg-slate-700/50 px-3 py-1 text-xs font-medium text-slate-300">
            {t("readOnly")}
          </span>
        </div>
      </div>
    </div>
  );
}

