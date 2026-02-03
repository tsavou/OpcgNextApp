"use client";

import { useTranslations } from "next-intl";
import { Shield, Lock, LogOut } from "lucide-react";
import { useLogoutMutation } from "@/app/auth/_hooks/queries/mutations/use-logout-mutation";

export function SecuritySettings() {
  const t = useTranslations("settings");
  const tGlobal = useTranslations("global");
  const { mutate: logout } = useLogoutMutation();

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{t("securityTitle")}</h2>
          <p className="text-sm text-slate-400">{t("securitySubtitle")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-red-400" />
            <div>
              <p className="text-sm font-medium text-slate-400">
                {t("changePassword")}
              </p>
              <p className="text-xs text-slate-500">
                {t("changePasswordDescription")}
              </p>
            </div>
          </div>
          <span className="rounded-full bg-slate-700/50 px-3 py-1 text-xs font-medium text-slate-300">
            {t("comingSoon")}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-red-700/50 bg-red-900/10 p-4">
          <div className="flex items-center gap-3">
            <LogOut className="h-5 w-5 text-red-400" />
            <div>
              <p className="text-sm font-medium text-red-400">
                {tGlobal("logout")}
              </p>
              <p className="text-xs text-red-400/70">
                {t("logoutDescription")}
              </p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="cursor-pointer rounded-lg border border-red-700/50 bg-red-900/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-900/30"
          >
            {tGlobal("logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
