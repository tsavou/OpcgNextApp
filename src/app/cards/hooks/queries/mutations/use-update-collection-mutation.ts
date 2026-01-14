import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";
import { Card } from "@/app/cards/types/card"; // ✅ Import du type
import { getCardUniqueId } from "@/app/cards/helpers/card";

export interface UpdateCollectionPayload {
  card: Card; // ✅ On attend la carte complète
  quantity: number;
}

export function useUpdateCollectionMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({ card, quantity }: UpdateCollectionPayload) => {
      if (!user) throw new Error("Non connecté");

      if (quantity > 0) {
        // UPSERT : On sauvegarde TOUTES les infos (comme dans le Toggle)
        const { data, error } = await supabase
          .from("user_collection")
          .upsert(
            {
              user_id: user.id,
              card_id: getCardUniqueId(card),
              quantity: quantity,
              card_name: card.card_name,
              card_image: card.card_image,
              card_set_id: card.card_set_id,
              set_id: card.set_id,
              set_name: card.set_name,
              rarity: card.rarity,
              card_type: card.card_type,
              card_color: card.card_color,
              market_price: card.market_price || 0,
            },
            { onConflict: "user_id, card_id" }
          )
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // DELETE : Juste besoin de l'ID et UserID
        const { error } = await supabase
          .from("user_collection")
          .delete()
          .eq("user_id", user.id)
          .eq("card_id", getCardUniqueId(card));

        if (error) throw error;
        return null;
      }
    },
    onSuccess: (_, variables) => {
      // Invalidation du cache spécifique et global
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