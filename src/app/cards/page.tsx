import { CardGrid } from "@/app/cards/_components/CardGrid";
import { CardGridSkeleton } from "@/app/cards/_components/CardGridSkeleton";
import { SetBanner } from "@/app/cards/_components/SetBanner";

import { useTranslations } from "next-intl";
import { AsyncBoundary } from "../_components/AsyncBoundary";
import { Suspense } from "react";

export default function CardsPage() {
  const t = useTranslations("homePage");

  return (
    <div className="w-full">
      <Suspense
        fallback={<div className="h-40 w-full animate-pulse bg-gray-200" />}
      >
        <SetBanner />
      </Suspense>

      <div className="container mx-auto px-4">
        <div className="mb-6">
          <AsyncBoundary
            loadingFallback={<CardGridSkeleton />}
            errorTitle={t("errorLoadingCards")}
          >
            <CardGrid />
          </AsyncBoundary>
        </div>
      </div>
    </div>
  );
}
