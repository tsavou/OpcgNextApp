import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/app/cards/types/card";
import { getCardUniqueId } from "@/app/cards/helpers/card";
import { deleteCollectionItem } from "@/lib/services/collection.service";
import { useAuth } from "@/app/auth/_hooks/use-auth";
import { useRouter } from "next/navigation";

export function useRemoveFromCollectionMutation() {
  const queryClient = useQueryClient();
  const supabase = createClient();
  const { user } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (card: Card) => {
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const cardId = getCardUniqueId(card);
      return deleteCollectionItem(supabase, user.id, cardId);
    },
    onSuccess: (_, card) => {
      const cardId = getCardUniqueId(card);

      queryClient.setQueryData(["collection-item", cardId], null);

      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["collection-items"] });
      queryClient.invalidateQueries({ queryKey: ["collection-stats"] });
      queryClient.invalidateQueries({ queryKey: ["user-collection-ids"] });
    },
    onError: (error) => {
      console.error("Erreur suppression collection:", error);
    },
  });
}