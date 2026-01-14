import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";

export interface CollectionItem {
  quantity: number;
  strategy_tip: string | null;
}

export function useCollectionQuery(cardId: string) {
  const { user } = useAuth();
  const supabase = createClient();

  return useQuery({
    queryKey: ["collection", cardId, user?.id],
    queryFn: async (): Promise<CollectionItem> => {
      if (!user) {
        return { quantity: 0, strategy_tip: null };
      }

      const { data, error } = await supabase
        .from("user_collection")
        .select("quantity, strategy_tip")
        .eq("user_id", user.id)
        .eq("card_id", cardId)
        .maybeSingle(); // maybeSingle évite l'erreur si pas de ligne

      if (error) throw error;
      
      return {
        quantity: data?.quantity ?? 0,
        strategy_tip: data?.strategy_tip ?? null,
      };
    },
    enabled: !!user, // Ne lance la requête que si connecté
  });
}