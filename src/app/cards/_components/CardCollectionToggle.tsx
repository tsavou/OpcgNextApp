"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useUserCollectionIds } from "../hooks/queries/use-user-collection-ids";
import { Check, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CardCollectionToggleProps {
  cardId: string;
  isOwnedInitial: boolean;
  className?: string;
}

export function CardCollectionToggle({
  cardId,
  isOwnedInitial,
  className,
}: CardCollectionToggleProps) {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: ownedCardIds } = useUserCollectionIds();

  // Utiliser la query pour déterminer l'état actuel depuis la BDD
  const isOwnedFromDB = ownedCardIds?.has(cardId) ?? false;
  
  // État local pour l'optimistic update
  const [isOwned, setIsOwned] = useState(isOwnedFromDB || isOwnedInitial);
  const [isLoading, setIsLoading] = useState(false);

  // Synchroniser l'état local avec la BDD quand les données changent
  useEffect(() => {
    setIsOwned(isOwnedFromDB);
  }, [isOwnedFromDB]);

  const toggleCollection = async (e: React.MouseEvent) => {
    e.preventDefault(); // Empêche le clic de déclencher le lien vers la carte
    e.stopPropagation();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    setIsLoading(true);

    // Optimistic update (changement visuel immédiat)
    const newStatus = !isOwned;
    setIsOwned(newStatus);

    try {
      if (newStatus) {
        // Ajouter (Quantité 1 par défaut)
        await supabase.from("user_collection").upsert(
          { user_id: user.id, card_id: cardId, quantity: 1 },
          { onConflict: "user_id, card_id" }
        );
      } else {
        // Retirer
        await supabase
          .from("user_collection")
          .delete()
          .eq("user_id", user.id)
          .eq("card_id", cardId);
      }

      // Invalider le cache des IDs pour que le hook global soit à jour
      queryClient.invalidateQueries({ queryKey: ["user-collection-ids"] });
      // Invalider aussi la query individuelle si on va sur la page détail
      queryClient.invalidateQueries({ queryKey: ["collection", cardId] });

    } catch (error) {
      console.error("Erreur toggle collection:", error);
      setIsOwned(!newStatus); // Revert en cas d'erreur
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