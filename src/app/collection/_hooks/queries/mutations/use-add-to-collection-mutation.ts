import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/app/cards/types/card";
import { getCardUniqueId } from "@/app/cards/helpers/card";
import { upsertCollectionItem } from "@/lib/services/collection.service";
import { CollectionFormData } from "@/app/collection/_hooks/use-collection-form";
import { useAuth } from "@/app/auth/_hooks/use-auth";
import { useRouter } from "next/navigation";

export function useAddToCollectionMutation() {
  const queryClient = useQueryClient();
  const supabase = createClient();
  const { user } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ card, formData }: { card: Card; formData: CollectionFormData }) => {
      if (!user) {
        router.push("/auth/login");
        return;
      }

      return upsertCollectionItem(supabase, user.id, card, formData);
    },
    onSuccess: (_, variables) => {
      const cardId = getCardUniqueId(variables.card);
      
      queryClient.invalidateQueries({ queryKey: ["collection-item", cardId] });
      
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["collection-items"] });
      queryClient.invalidateQueries({ queryKey: ["collection-stats"] });
      queryClient.invalidateQueries({ queryKey: ["user-collection-ids"] });
    },
    onError: (error) => {
      console.error("Erreur ajout collection:", error);
    },
  });
}