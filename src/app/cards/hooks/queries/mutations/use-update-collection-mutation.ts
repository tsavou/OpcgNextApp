import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";
import { Card } from "@/app/cards/types/card";
import { getCardUniqueId } from "@/app/cards/helpers/card";
import {
  upsertCollectionItem,
  deleteCollectionItem,
} from "@/lib/services/collection.service";

export interface UpdateCollectionPayload {
  card: Card;
  quantity: number;
}

export function useUpdateCollectionMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({ card, quantity }: UpdateCollectionPayload) => {
      if (!user) throw new Error("Non connecté");

      const cardId = getCardUniqueId(card);

      if (quantity > 0) {
        return upsertCollectionItem(supabase, {
          user_id: user.id,
          card_id: cardId,
          quantity,
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
      }

      await deleteCollectionItem(supabase, user.id, cardId);
      return null;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collection", getCardUniqueId(variables.card), user?.id],
      });
      queryClient.invalidateQueries({ queryKey: ["user-collection-ids"] });
    },
    onError: (error) => {
      console.error("Erreur collection:", error);
    },
  });
}