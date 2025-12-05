import { SetGrid } from "@/app/sets/_components/SetGrid";
import { SetGridSkeleton } from "@/app/sets/_components/SetGridSkeleton";
import { Hero } from "@/app/_components/Hero";
import { useTranslations } from "next-intl";
import { AsyncBoundary } from "./_components/AsyncBoundary";

export default function Home() {
  const t = useTranslations("homePage");
  return (
    <div className="w-full">
      <Hero />

      <section id="sets" className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
              {t("setsTitle")}
            </span>
          </h2>
        </div>

        <AsyncBoundary
          loadingFallback={<SetGridSkeleton />}
          errorTitle={t("errorLoadingSets")}
        >
          <SetGrid />
        </AsyncBoundary>
      </section>
    </div>
  );
}
