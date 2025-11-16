"use client";

import { SetGrid } from "@/app/sets/_components/SetGrid";
import { SetGridSkeleton } from "@/app/sets/_components/SetGridSkeleton";
import { Hero } from "@/app/_components/Hero";
import { ErrorFallback } from "@/app/_components/ErrorFallback";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />

      <section id="sets" className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Tous les sets disponibles
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Découvrez tous les sets de cartes One Piece TCG et explorez leurs
            collections
          </p>
        </div>

        <QueryErrorResetBoundary>
          <ErrorBoundary
            FallbackComponent={(props) => (
              <ErrorFallback
                {...props}
                title="Erreur lors du chargement des sets"
              />
            )}
          >
            <Suspense fallback={<SetGridSkeleton />}>
              <SetGrid />
            </Suspense>
          </ErrorBoundary>
        </QueryErrorResetBoundary>
      </section>
    </div>
  );
}
