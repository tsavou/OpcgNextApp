import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CollectionGrid } from "./_components/CollectionGrid";
import Link from "next/link";
import { Coins, Inbox, Trophy } from "lucide-react";
import { Card } from "@/app/cards/types/card";
import { getCollectionItems } from "@/lib/services/collection.service";

export default async function CollectionPage() {
  const t = await getTranslations("collection");
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login");
  }

  const collectionItems = await getCollectionItems(supabase, user.id) as unknown as Card[];

  const totalValue = collectionItems.reduce((acc, curr) => acc + (curr.market_price ?? 0), 0);
  const totalCards = collectionItems.length;

  return (
    <div className="min-h-screen pb-20 pt-8">
      <div className="container mx-auto px-4">
        
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">{t("title")}</h1>
            <p className="mt-2 text-slate-400">Gérez votre portfolio One Piece TCG</p>
          </div>

          <div className="flex gap-4">
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 min-w-[140px]">
              <div className="mb-1 flex items-center gap-2 text-slate-400">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-xs font-bold uppercase">{t("totalCards")}</span>
              </div>
              <div className="text-2xl font-bold text-white">{totalCards}</div>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 min-w-[140px]">
              <div className="mb-1 flex items-center gap-2 text-slate-400">
                <Coins className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase">{t("estimatedValue")}</span>
              </div>
              <div className="text-2xl font-bold text-white">
                 {totalValue.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
              </div>
            </div>
          </div>
        </div>

        {collectionItems.length > 0 ? (
          <CollectionGrid cards={collectionItems} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 py-20 text-center">
            <div className="mb-4 rounded-full bg-slate-800 p-4">
              <Inbox className="h-8 w-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white">{t("emptyTitle")}</h3>
            <p className="mt-2 max-w-sm text-slate-400">
              {t("emptyDesc")}
            </p>
            <Link
              href="/#sets"
              className="mt-6 inline-flex items-center rounded-lg bg-yellow-500 px-6 py-3 font-bold text-slate-900 transition-colors hover:bg-yellow-400"
            >
              Explorer les cartes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}