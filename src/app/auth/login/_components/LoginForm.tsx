"use client";

import { LoginFormData, useLoginForm } from "../../_hooks/use-auth-form";
import { useLoginMutation } from "../../_hooks/queries/mutations/use-login-mutation";
import { SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { LogIn } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
  const t = useTranslations("global");
  const form = useLoginForm();
  const { mutate: login, isPending, error } = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormData> = (
    data,
  ) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="w-full max-w-md space-y-8 text-center lg:text-left">
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {t("login")}
        </h1>
        <p className="text-lg text-slate-400">
          {t("loginWelcome")}
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {error && (
          <div className="animate-in fade-in slide-in-from-top-1 rounded-xl border border-red-800/50 bg-red-900/20 p-4 text-sm font-medium text-red-400 backdrop-blur-sm">
            {error.message || t("error")}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-slate-300">
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white transition-all placeholder:text-slate-500 focus:border-sky-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50 backdrop-blur-sm"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs font-medium text-red-400">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-300"
            >
              {t("password")}
            </label>
            <input
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white transition-all placeholder:text-slate-500 focus:border-sky-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50 backdrop-blur-sm"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-xs font-medium text-red-400">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 px-8 py-3.5 text-base font-bold text-slate-900 shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:shadow-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50"
        >
          {isPending ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900" />
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              {t("login")}
            </>
          )}
        </button>

        <div className="pt-4 text-center lg:text-left">
          <p className="text-sm text-slate-400">
            {t("noAccount")}{" "}
            <Link
              href="/auth/register"
              className="font-bold text-yellow-400 transition-colors hover:text-yellow-300"
            >
              {t("register")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

