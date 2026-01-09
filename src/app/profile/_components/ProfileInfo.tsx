"use client";

import { useAuth } from "@/app/auth/_hooks/use-auth";
import { useTranslations } from "next-intl";
import { User, Mail, Calendar } from "lucide-react";

export function ProfileInfo() {
  const t = useTranslations("global");
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

  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-700">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{t("profile")}</h2>
          <p className="text-sm text-slate-400">{t("account")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-slate-300">
          <Mail className="h-5 w-5 text-sky-400" />
          <div>
            <p className="text-sm font-medium text-slate-400">{t("email")}</p>
            <p className="text-base text-white">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <Calendar className="h-5 w-5 text-sky-400" />
          <div>
            <p className="text-sm font-medium text-slate-400">
              Membre depuis
            </p>
            <p className="text-base text-white">{createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

