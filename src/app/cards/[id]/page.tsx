"use client";

import { Suspense } from "react";
import { CardDetailSkeleton } from "@/app/cards/_components/CardDetailSkeleton";
import { CardDetailContent } from "@/app/cards/[id]/_components/CardDetailContent";
import React from "react";

interface CardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = React.use(params);
  return (
    <Suspense fallback={<CardDetailSkeleton />}>
      <CardDetailContent cardId={id} />
    </Suspense>
  );
}
