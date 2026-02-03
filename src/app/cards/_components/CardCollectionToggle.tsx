"use client";

import { useTranslations } from "next-intl";
import { useUserCollectionIds } from "../../collection/_hooks/queries/use-user-collection-ids";
import { Check, Plus, Loader2, Trash2 } from "lucide-react";
import { Card } from "@/app/cards/types/card";
import { getCardUniqueId } from "../helpers/card";
import { useRemoveFromCollectionMutation } from "@/app/collection/_hooks/queries/mutations/use-remove-from-collection-mutation";
import { AddToCollectionFormModal } from "../../collection/_components/AddToCollectionFormModal";
import { useState } from "react";

interface CardCollectionToggleProps {
  card: Card;
  isOwnedInitial: boolean;
  className?: string;
}

export function CardCollectionToggle({
  card,
  isOwnedInitial,
}: CardCollectionToggleProps) {
  // 1. État global des IDs (Source de vérité)
  const { data: ownedCardIds } = useUserCollectionIds();
  const cardUniqueId = getCardUniqueId(card);

  const [isHovered, setIsHovered] = useState(false);

  // On priorise la donnée fraîche du cache, sinon la prop initiale
  const isOwned = ownedCardIds?.has(cardUniqueId) ?? isOwnedInitial;

  const t = useTranslations("collection");

  // 2. Mutation de suppression uniquement (l'ajout est géré par la modale)
  const { mutate: removeFromCollection, isPending: isRemoving } =
    useRemoveFromCollectionMutation();

  // --- CAS 1 : DÉJÀ DANS LA COLLECTION (Suppression directe) ---
  if (isOwned) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (confirm(t("removeConfirm"))) {
            removeFromCollection(card);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isRemoving}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-yellow-400 bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 shadow-lg shadow-yellow-500/30 transition-all duration-200 hover:scale-110 hover:border-red-500 hover:from-red-500 hover:to-red-400 hover:shadow-red-500/30 active:scale-95"
        title={t("removeFromCollection")}
      >
        {isRemoving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isHovered ? (
          <Trash2 className="h-5 w-5" />
        ) : (
          <Check className="h-5 w-5 stroke-[3]" />
        )}
      </button>
    );
  }

  return (
    <AddToCollectionFormModal card={card}>
      <button
        type="button"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-400 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-slate-600 hover:bg-slate-800 hover:text-slate-300 active:scale-95"
        title={t("addToCollection")}
      >
        <Plus className="h-5 w-5" />
      </button>
    </AddToCollectionFormModal>
  );
}
