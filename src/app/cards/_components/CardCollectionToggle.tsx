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
  const { mutate: removeFromCollection, isPending: isRemoving } = useRemoveFromCollectionMutation();

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
        className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 border bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 border-yellow-400 hover:from-red-500 hover:to-red-400 hover:border-red-500 hover:shadow-red-500/30 shadow-yellow-500/30"
        title={t("removeFromCollection")}
      >
        {isRemoving ? <Loader2 className="h-4 w-4 animate-spin" /> : isHovered ? <Trash2 className="h-5 w-5" /> : <Check className="h-5 w-5 stroke-[3]" />}
      </button>
    );
  }

  return (
    <AddToCollectionFormModal card={card}>
      <button
        type="button"
        className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 border bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-300 hover:border-slate-600 backdrop-blur-sm"
        title={t("addToCollection")}
      >
        <Plus className="h-5 w-5" />
      </button>
    </AddToCollectionFormModal>
  );
}