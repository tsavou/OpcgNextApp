"use client";

import { ReactNode, Suspense } from "react";
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
  errorTitle = "Une erreur est survenue",
}: AsyncBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={(props) => (
            <ErrorFallback {...props} title={errorTitle} />
          )}
        >
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
