import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";

export interface UpdateCollectionPayload {
  cardId: string;
  quantity: number;
}

export function useUpdateCollectionMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({ cardId, quantity }: UpdateCollectionPayload) => {
      if (!user) throw new Error("Non connecté");

      if (quantity > 0) {
        // UPSERT : Insérer ou Mettre à jour
        const { data, error } = await supabase
          .from("user_collection")
          .upsert(
            {
              user_id: user.id,
              card_id: cardId,
              quantity: quantity,
            },
            { onConflict: "user_id, card_id" }
          )
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // DELETE : Si quantité tombe à 0
        const { error } = await supabase
          .from("user_collection")
          .delete()
          .eq("user_id", user.id)
          .eq("card_id", cardId);

        if (error) throw error;
        return null;
      }
    },
    onSuccess: (_, variables) => {
      // Invalidation intelligente : on ne rafraîchit que cette carte
      queryClient.invalidateQueries({
        queryKey: ["collection", variables.cardId, user?.id],
      });
      // Optionnel : rafraîchir les stats globales du profil
      queryClient.invalidateQueries({ queryKey: ["user-stats"] });
    },
    onError: (error) => {
      console.error("Erreur collection:", error);
    },
  });
}