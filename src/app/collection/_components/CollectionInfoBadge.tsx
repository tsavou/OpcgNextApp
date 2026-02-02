"use client";

import { useTranslations } from "next-intl";
import { CollectionItem } from "@/lib/services/collection.service";
import { Info, Sparkles, Coins } from "lucide-react";

interface CollectionInfoBadgeProps {
  collectionDetails: CollectionItem;
}

export function CollectionInfoBadge({
  collectionDetails,
}: CollectionInfoBadgeProps) {
  const t = useTranslations("collection");

  return (
    <div className="group/badge relative z-30 inline-block">
      <div className="flex h-8 w-8 cursor-help items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 shadow-lg backdrop-blur-md transition-transform hover:scale-110 hover:bg-sky-500 hover:text-white">
        <Info className="h-4 w-4" />
      </div>

      <div className="pointer-events-none absolute left-0 top-full mt-2 w-max min-w-[120px] max-w-[200px] origin-top-left scale-95 opacity-0 transition-all duration-200 group-hover/badge:scale-100 group-hover/badge:opacity-100">
        <div className="rounded-lg border border-slate-700 bg-slate-900/95 p-3 text-xs shadow-xl backdrop-blur-md">
          
          <div className="flex items-center justify-between gap-3 border-b border-slate-700/50 pb-2 mb-2">
            <span className="font-bold text-white">{collectionDetails.condition}</span>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
              {collectionDetails.language}
            </span>
          </div>

          {collectionDetails.is_graded && (
            <div className="mb-2 flex items-center gap-1.5 text-yellow-400">
              <Sparkles className="h-3 w-3" />
              <span className="font-semibold">
                {collectionDetails.grading_service} {collectionDetails.grade_note}
              </span>
            </div>
          )}

          {(collectionDetails.purchase_price ?? 0) > 0 && (
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Coins className="h-3 w-3" />
              <span>
                {t("purchased")} <span className="font-bold">{collectionDetails.purchase_price} €</span>
              </span>
            </div>
          )}
          
          {!collectionDetails.is_graded && (!collectionDetails.purchase_price || collectionDetails.purchase_price === 0) && (
             <div className="text-slate-500 italic">{t("noOtherInfo")}</div>
          )}
        </div>
      </div>
    </div>
  );
}