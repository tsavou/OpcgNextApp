"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useUserCollectionIds } from "../hooks/queries/use-user-collection-ids";
import { Check, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card } from "@/app/cards/types/card";
import { getCardUniqueId } from "../helpers/card";
import {
  upsertCollectionItem,
  deleteCollectionItem,
} from "@/lib/services/collection.service";

interface CardCollectionToggleProps {
  card: Card; // ✅ On remplace cardId par l'objet complet
  isOwnedInitial: boolean;
  className?: string;
}

export function CardCollectionToggle({
  card,
  isOwnedInitial,
  className,
}: CardCollectionToggleProps) {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: ownedCardIds } = useUserCollectionIds();

  const cardUniqueId = getCardUniqueId(card);
  const isOwnedFromDB = ownedCardIds?.has(cardUniqueId) ?? false;
  const [isOwned, setIsOwned] = useState(isOwnedFromDB || isOwnedInitial);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsOwned(isOwnedFromDB);
  }, [isOwnedFromDB]);

  const toggleCollection = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    setIsLoading(true);
    const newStatus = !isOwned;
    setIsOwned(newStatus);

    try {
      if (newStatus) {
        await upsertCollectionItem(supabase, {
          user_id: user.id,
          card_id: cardUniqueId,
          quantity: 1,
          card_name: card.card_name,
          card_image: card.card_image,
          card_set_id: card.card_set_id,
          set_id: card.set_id,
          set_name: card.set_name,
          rarity: card.rarity,
          card_type: card.card_type,
          card_color: card.card_color,
          market_price: card.market_price ?? 0,
        });
      } else {
        await deleteCollectionItem(supabase, user.id, cardUniqueId);
      }

      queryClient.invalidateQueries({ queryKey: ["user-collection-ids"] });
      queryClient.invalidateQueries({ queryKey: ["collection", cardUniqueId] });
      router.refresh();
    } catch (error) {
      console.error("Erreur toggle collection:", error);
      setIsOwned(!newStatus);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleCollection}
      disabled={isLoading}
      className={cn(
        "cursor-pointer flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 border",
        isOwned
          ? "bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 border-yellow-400 hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-500 shadow-yellow-500/30"
          : "bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-300 hover:border-slate-600 backdrop-blur-sm",
        className
      )}
      title={isOwned ? "Retirer de la collection" : "Ajouter à la collection"}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isOwned ? (
        <Check className="h-5 w-5" />
      ) : (
        <Plus className="h-5 w-5" />
      )}
    </button>
  );
}