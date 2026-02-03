"use client";

import { ReactNode, Suspense } from "react";
import { useTranslations } from "next-intl";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";

interface AsyncBoundaryProps {
  children: ReactNode;
  loadingFallback: ReactNode;
  errorTitle?: string;
}

export function AsyncBoundary({
  children,
  loadingFallback,
  errorTitle,
}: AsyncBoundaryProps) {
  const t = useTranslations("global");
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={(props) => (
            <ErrorFallback
              {...props}
              title={errorTitle ?? t("errorOccurred")}
            />
          )}
        >
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
