"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const t = useTranslations("global");
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  
  // Si le paramètre est une clé de traduction, on la traduit, sinon on affiche le message tel quel
  let errorMessage = t("authErrorDefault");
  if (errorParam) {
    // Vérifier si c'est une clé de traduction connue
    if (errorParam === "noTokenError") {
      errorMessage = t("noTokenError");
    } else {
      // Sinon utiliser le message tel quel
      errorMessage = errorParam;
    }
  }

  return (
    <div className="relative flex flex-1 w-full bg-slate-900">
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/3 lg:px-8 xl:px-12">
        <div className="mb-8 lg:hidden">
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
              {t("authErrorTitle")}
            </h1>
            <p className="text-lg text-slate-400">
              {t("authErrorDesc")}
            </p>
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
                <p className="text-sm text-slate-300">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Link
              href="/auth/login"
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-sky-500 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <ArrowLeft className="h-5 w-5" />
              {t("backToLogin")}
            </Link>
            <Link
              href="/"
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-base font-bold text-slate-900 shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:shadow-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <Home className="h-5 w-5" />
              {t("home")}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block lg:w-2/3">
        <div className="absolute inset-0 bg-slate-900">
          <Image
            src="/images/logpose.png"
            alt="One Piece Map Background"
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
        </div>

        <div className="absolute bottom-12 right-12 z-20 max-w-md text-right">
          <blockquote className="text-xl font-medium italic text-slate-300/80">
            &quot;The destination is important, but the journey is even more important.&quot;
          </blockquote>
        </div>
      </div>
    </div>
  );
}

