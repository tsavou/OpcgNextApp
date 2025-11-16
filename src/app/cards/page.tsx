"use client";

import { CardGrid } from "@/app/cards/_components/CardGrid";
import { CardGridSkeleton } from "@/app/cards/_components/CardGridSkeleton";
import { ErrorFallback } from "@/app/_components/ErrorFallback";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function CardsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="mb-4 text-xl font-semibold text-gray-800">
          Catalogue des cartes
        </h1>
        <QueryErrorResetBoundary>
          <ErrorBoundary
            FallbackComponent={(props) => (
              <ErrorFallback
                {...props}
                title="Erreur lors du chargement des cartes"
              />
            )}
          >
            <Suspense fallback={<CardGridSkeleton />}>
              <CardGrid />
            </Suspense>
          </ErrorBoundary>
        </QueryErrorResetBoundary>
      </div>
    </div>
  );
}
