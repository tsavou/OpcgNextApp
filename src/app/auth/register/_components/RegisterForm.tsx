"use client";

import { RegisterFormData, useRegisterForm } from "../../_hooks/use-auth-form";
import { useRegisterMutation } from "../../_hooks/queries/mutations/use-register-mutation";
import { SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { UserPlus } from "lucide-react";

export function RegisterForm() {
  const t = useTranslations("global");
  const form = useRegisterForm();
  const { mutate: register, isPending, error } = useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterFormData> = (
    data,
  ) => {
    register({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl md:p-10"
    >
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-sky-950">
          {t("register")}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Commencez votre aventure sur LogPoseCards !
        </p>
      </div>

      {error && (
        <div className="animate-in fade-in slide-in-from-top-1 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 ring-1 ring-inset ring-red-200">
          {error.message || t("error")}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-xs font-medium text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-700"
          >
            {t("password")}
          </label>
          <input
            id="password"
            type="password"
            placeholder={t("passwordPlaceholder")}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-xs font-medium text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-gray-700"
          >
            {t("confirmPassword")}
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder={t("confirmPasswordPlaceholder")}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10"
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-xs font-medium text-red-500">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-yellow-500 px-4 py-3.5 font-bold text-slate-900 transition-all hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500/20 disabled:opacity-50"
      >
        {isPending ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900" />
        ) : (
          <>
            <UserPlus className="h-5 w-5 transition-transform group-hover:scale-110" />
            {t("register")}
          </>
        )}
      </button>
    </form>
  );
}

