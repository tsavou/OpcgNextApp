"use client";

import { CardGrid } from "@/app/cards/_components/CardGrid";
import { CardGridSkeleton } from "@/app/cards/_components/CardGridSkeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function CardsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          🏴‍☠️ OnePiece TCG Manager
        </h1>
        <p className="text-gray-600">
          Explorez et gérez votre collection de cartes One Piece TCG
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Catalogue des cartes
        </h2>
        <ErrorBoundary
          FallbackComponent={({ error }) => (
            <div>
              Une erreur est survenue lors du chargement des cartes:{" "}
              {error.message}
            </div>
          )}
        >
          <Suspense fallback={<CardGridSkeleton />}>
            <CardGrid />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
