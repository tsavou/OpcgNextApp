import { CardDetailSkeleton } from "@/app/cards/_components/CardDetailSkeleton";
import { CardDetailContent } from "@/app/cards/[id]/_components/CardDetailContent";
import { getTranslations } from "next-intl/server";
import React from "react";

import { AsyncBoundary } from "@/app/_components/AsyncBoundary";

interface CardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = await params;
  const t = await getTranslations("cardDetail");

  return (
    <AsyncBoundary
      loadingFallback={<CardDetailSkeleton />}
      errorTitle={t("errorLoadingCard", { id })}
    >
      <CardDetailContent cardSetId={id} />
    </AsyncBoundary>
  );
}
