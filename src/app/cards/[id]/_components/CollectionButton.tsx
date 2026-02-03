"use client";

import { useTranslations } from "next-intl";
import { useCollectionQuery } from "../../../collection/_hooks/queries/use-collection-query";
import { Card } from "@/app/cards/types/card";
import { AddToCollectionFormModal } from "@/app/collection/_components/AddToCollectionFormModal";
import { useRemoveFromCollectionMutation } from "@/app/collection/_hooks/queries/mutations/use-remove-from-collection-mutation";
import { Plus, Check, Trash2, Loader2 } from "lucide-react";
import { getCardUniqueId } from "../../helpers/card";
import { useState } from "react";

export function CollectionButton({ card }: { card: Card }) {
  const t = useTranslations("collection");
  const cardId = getCardUniqueId(card);
  const { data: item, isLoading } = useCollectionQuery(cardId);
  const { mutate: removeFromCollection, isPending: isRemoving } =
    useRemoveFromCollectionMutation();

  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) {
    return <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-800" />;
  }

  const isOwned = !!item;

  if (isOwned) {
    return (
      <button
        onClick={() => {
          if (confirm(t("removeCardConfirm"))) {
            removeFromCollection(card);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isRemoving}
        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition-all duration-200 ${
          isHovered
            ? "border-red-500/30 bg-red-500/10 text-red-500"
            : "border-green-500/30 bg-green-500/10 text-green-400"
        } `}
        title={t("clickToRemove")}
      >
        {isRemoving ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isHovered ? (
          <>
            <Trash2 className="h-5 w-5" />
            <span className="hidden sm:inline">{t("remove")}</span>
          </>
        ) : (
          <>
            <Check className="h-5 w-5" />
            <span className="hidden sm:inline">{t("owned")}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <AddToCollectionFormModal card={card}>
      <button className="flex cursor-pointer items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold text-slate-900 shadow-lg shadow-yellow-500/20 transition-all hover:bg-yellow-400 active:scale-95">
        <Plus className="h-5 w-5" />
        <span className="hidden sm:inline">{t("add")}</span>
      </button>
    </AddToCollectionFormModal>
  );
}
