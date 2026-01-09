"use client";

import { useAuth } from "@/app/auth/_hooks/use-auth";
import { useTranslations } from "next-intl";
import { User, Mail, Calendar } from "lucide-react";

export function ProfileInfo() {
  const t = useTranslations("global");
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
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
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-700">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{t("profile")}</h2>
          <p className="text-sm text-gray-500">{t("account")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-700">
          <Mail className="h-5 w-5 text-sky-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">{t("email")}</p>
            <p className="text-base">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Calendar className="h-5 w-5 text-sky-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">
              Membre depuis
            </p>
            <p className="text-base">{createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

