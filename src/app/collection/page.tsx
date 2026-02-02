import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CollectionGrid } from "./_components/CollectionGrid";
import { CollectionGridSkeleton } from "./_components/CollectionGridSkeleton";
import { CollectionHeaderStats } from "./_components/CollectionHeaderStats";
import { CollectionHeaderStatsSkeleton } from "./_components/CollectionHeaderStatsSkeleton";
import { AsyncBoundary } from "../_components/AsyncBoundary";

export default async function CollectionPage() {
  const t = await getTranslations("collection");
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen pb-20 pt-8">
      <div className="container mx-auto px-4">
        
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">{t("title")}</h1>
            <p className="mt-2 text-slate-400">{t("subtitle")}</p>
          </div>

          <AsyncBoundary
            loadingFallback={<CollectionHeaderStatsSkeleton />}
            errorTitle={t("errorLoadingStats")}
          >
            <CollectionHeaderStats userId={user.id} />
          </AsyncBoundary>
        </div>

        <AsyncBoundary
          loadingFallback={<CollectionGridSkeleton />}
          errorTitle={t("errorLoadingCollection")}
        >
          <CollectionGrid userId={user.id} />
        </AsyncBoundary>
      </div>
    </div>
  );
}