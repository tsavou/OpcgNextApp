"use client";

import { useTranslations } from "next-intl";
import { Coins, Star, Trophy } from "lucide-react";
import { useCollectionStatsSuspenseQuery } from "../_hooks/queries/use-collection-stats-suspense-query";

interface CollectionHeaderStatsProps {
  userId: string;
}

export function CollectionHeaderStats({ userId }: CollectionHeaderStatsProps) {
  const t = useTranslations("collection");
  const { data: stats } = useCollectionStatsSuspenseQuery(userId);

  return (
    <div className="flex gap-4">
      <div className="min-w-[140px] rounded-xl border border-slate-700 bg-slate-800 p-4">
        <div className="mb-1 flex items-center gap-2 text-slate-400">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="text-xs font-bold uppercase">{t("totalCards")}</span>
        </div>
        <div className="text-center text-2xl font-bold text-white">
          {stats.totalCards}
        </div>
      </div>

      <div className="min-w-[140px] rounded-xl border border-slate-700 bg-slate-800 p-4">
        <div className="mb-1 flex items-center gap-2 text-slate-400">
          <Coins className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase">
            {t("estimatedValue")}
          </span>
        </div>
        <div className="text-center text-2xl font-bold text-white">
          {stats.collectionValue.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
          })}
        </div>
      </div>
      <div className="min-w-[140px] rounded-xl border border-slate-700 bg-slate-800 p-4">
        <div className="mb-1 flex items-center gap-2 text-slate-400">
          <Star className="h-4 w-4 text-purple-500" />
          <span className="text-xs font-bold uppercase">{t("rareCards")}</span>
        </div>
        <div className="text-center text-2xl font-bold text-white">
          {stats.rareCards}
        </div>
      </div>
    </div>
  );
}
