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

      <section id="sets" className="bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-center text-3xl font-bold text-white">{t("setsTitle")}</h2>
          </div>

          <AsyncBoundary
            loadingFallback={<SetGridSkeleton />}
            errorTitle={t("errorLoadingSets")}
          >
            <SetGrid />
          </AsyncBoundary>
        </div>
      </section>
    </div>
  );
}
