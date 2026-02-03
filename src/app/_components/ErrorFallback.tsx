"use client";

import { FallbackProps } from "react-error-boundary";
import { useTranslations } from "next-intl";

interface ErrorFallbackProps extends FallbackProps {
  title?: string;
  message?: string;
  icon?: string;
  retryLabel?: string;
  showErrorDetails?: boolean;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
  title,
  message,
  icon = "⚠️",
  retryLabel,
  showErrorDetails = true,
}: ErrorFallbackProps) {
  const t = useTranslations("global");
  const defaultTitle = title || t("errorOccurred");
  const defaultRetryLabel = retryLabel || t("retry");
  return (
    <div className="rounded-lg border border-red-800/50 bg-red-900/20 p-6 text-center backdrop-blur-sm">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-red-400">
        {defaultTitle}
      </h3>
      {message && <p className="mb-4 text-red-300">{message}</p>}
      {showErrorDetails && error.message && (
        <p className="mb-4 text-sm text-red-300">{error.message}</p>
      )}
      <button
        className="cursor-pointer rounded-xl bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none"
        onClick={resetErrorBoundary}
      >
        {defaultRetryLabel}
      </button>
    </div>
  );
}
