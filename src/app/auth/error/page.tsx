"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AuthLayout } from "../_components/AuthLayout";

export default function AuthErrorPage() {
  const t = useTranslations("global");
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  let errorMessage = t("authErrorDefault");
  if (errorParam) {
    if (errorParam === "noTokenError") {
      errorMessage = t("noTokenError");
    } else {
      errorMessage = errorParam;
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8 text-center lg:text-left">
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t("authErrorTitle")}
          </h1>
          <p className="text-lg text-slate-400">{t("authErrorDesc")}</p>
        </div>

        <div className="rounded-xl border border-red-700/50 bg-red-900/20 p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-900/50">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="mb-2 font-semibold text-red-400">
                {t("authErrorDetails")}
              </p>
              <p className="text-sm text-slate-300">{errorMessage}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <Link
            href="/auth/login"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-sky-500 hover:bg-slate-800 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none"
          >
            <ArrowLeft className="h-5 w-5" />
            {t("backToLogin")}
          </Link>
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-base font-bold text-slate-900 shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:shadow-yellow-500/30 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none"
          >
            <Home className="h-5 w-5" />
            {t("home")}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
