"use client";

import { Suspense } from "react";
import { CardDetailSkeleton } from "@/app/cards/_components/CardDetailSkeleton";
import { CardDetailContent } from "@/app/cards/[id]/_components/CardDetailContent";
import React from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorFallback } from "@/app/_components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "next/navigation";

interface CardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = React.use(params);
  const searchParams = useSearchParams();
  const cardUniqueId = searchParams.get("cardId");
  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary
        FallbackComponent={(props) => (
          <ErrorFallback
            {...props}
            title={`Erreur lors du chargement de la carte ${id}`}
          />
        )}
      >
        <Suspense fallback={<CardDetailSkeleton />}>
          <CardDetailContent cardSetId={id} cardUniqueId={cardUniqueId} />
        </Suspense>
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  );
}
