"use client";

import { useCollectionQuery } from "../../../collection/_hooks/queries/use-collection-query";
import { Card } from "@/app/cards/types/card";
import { AddToCollectionFormModal } from "@/app/collection/_components/AddToCollectionFormModal"; 
import { useRemoveFromCollectionMutation } from "@/app/collection/_hooks/queries/mutations/use-remove-from-collection-mutation";
import { Plus, Check, Trash2, Loader2 } from "lucide-react";
import { getCardUniqueId } from "../../helpers/card";
import { useState } from "react";

export function CollectionButton({ card }: { card: Card }) {
  const cardId = getCardUniqueId(card);
  const { data: item, isLoading } = useCollectionQuery(cardId);
  const { mutate: removeFromCollection, isPending: isRemoving } = useRemoveFromCollectionMutation();
  
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) {
    return <div className="h-10 w-10 animate-pulse bg-slate-800 rounded-lg" />;
  }

  const isOwned = !!item;


  if (isOwned) {
    return (
      <button 
        onClick={() => {
          if (confirm("Retirer cette carte de la collection ?")) {
            removeFromCollection(card);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isRemoving}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 border cursor-pointer
          ${isHovered 
            ? "bg-red-500/10 text-red-500 border-red-500/30" 
            : "bg-green-500/10 text-green-400 border-green-500/30"
          }
        `}
        title="Cliquez pour retirer de la collection"
      >
        {isRemoving ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isHovered ? (
          <>
            <Trash2 className="w-5 h-5" />
            <span className="hidden sm:inline">Retirer</span>
          </>
        ) : (
          <>
            <Check className="w-5 h-5" />
            <span className="hidden sm:inline">Possédée</span>
          </>
        )}
      </button>
    );
  }

  return (
    <AddToCollectionFormModal card={card}>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold text-sm transition-all active:scale-95 shadow-lg shadow-yellow-500/20 cursor-pointer">
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">Ajouter</span>
      </button>
    </AddToCollectionFormModal>
  );
}