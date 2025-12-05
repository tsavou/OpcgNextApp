import { CardDetailSkeleton } from "@/app/cards/_components/CardDetailSkeleton";
import { CardDetailContent } from "@/app/cards/[id]/_components/CardDetailContent";
import React from "react";

import { AsyncBoundary } from "@/app/_components/AsyncBoundary";

interface CardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = React.use(params);

  return (
    <AsyncBoundary
      loadingFallback={<CardDetailSkeleton />}
      errorTitle={`Erreur lors du chargement de la carte ${id}`}
    >
      <CardDetailContent cardSetId={id} />
    </AsyncBoundary>
  );
}
