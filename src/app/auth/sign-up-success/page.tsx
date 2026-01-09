"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { AuthLayout } from "../_components/AuthLayout";

export default function SignUpSuccessPage() {
  const t = useTranslations("global");

  return (
    <AuthLayout showMobileLogo={false}>
      <div className="mb-8">
        <Image
          src="/images/logo.png"
          alt="LogPose Cards"
          width={120}
          height={120}
          className="h-auto w-auto rounded-full"
        />
      </div>

      <div className="w-full max-w-md space-y-8 text-center lg:text-left">

          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t("signupSuccessTitle")}
            </h1>
            <p className="text-lg text-slate-400">
              {t("signupSuccessDesc")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-900/50">
                <Mail className="h-5 w-5 text-sky-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-200">{t("checkEmail")}</p>
                <p className="text-xs text-slate-500">
                  {t("checkSpam")}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/auth/login"
              className="cursor-pointer inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 px-8 py-3.5 text-base font-bold text-slate-900 shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:shadow-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto"
            >
              {t("backToLogin")}
            </Link>
          </div>
        </div>
    </AuthLayout>
  );
}