import { CardGrid } from "@/app/cards/_components/CardGrid";
import { CardGridSkeleton } from "@/app/cards/_components/CardGridSkeleton";
import { SetBanner } from "@/app/cards/_components/SetBanner";

import { useTranslations } from "next-intl";
import { AsyncBoundary } from "../_components/AsyncBoundary";
import { Suspense } from "react";

export default function CardsPage() {
  const t = useTranslations("homePage");

  return (
    <div className="w-full bg-slate-900">
      <Suspense
        fallback={<div className="h-40 w-full animate-pulse bg-slate-800" />}
      >
        <SetBanner />
      </Suspense>

      <div className="container mx-auto px-4 py-8">
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
