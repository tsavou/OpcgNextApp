"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Inbox } from "lucide-react";
import { CardItem } from "@/app/cards/_components/CardItem";
import { Card } from "@/app/cards/types/card";
import { useCollectionItemsSuspenseQuery } from "../_hooks/queries/use-collection-items-suspense-query";

interface CollectionGridProps {
  userId: string;
}

export function CollectionGrid({ userId }: CollectionGridProps) {
  const t = useTranslations("collection");
  const { data: collectionItems } = useCollectionItemsSuspenseQuery(userId);

  if (collectionItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 py-20 text-center">
        <div className="mb-4 rounded-full bg-slate-800 p-4">
          <Inbox className="h-8 w-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-white">{t("emptyTitle")}</h3>
        <p className="mt-2 max-w-sm text-slate-400">{t("emptyDesc")}</p>
        <Link
          href="/#sets"
          className="mt-6 inline-flex items-center rounded-lg bg-yellow-500 px-6 py-3 font-bold text-slate-900 transition-colors hover:bg-yellow-400"
        >
          {t("exploreButton")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {collectionItems.map((item) => (
        <CardItem
          key={item.card_id}
          card={item as unknown as Card}
          isOwned={true}
          collectionDetails={item}
        />
      ))}
    </div>
  );
}
