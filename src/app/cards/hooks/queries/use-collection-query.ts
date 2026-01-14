import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";

export function useCollectionQuery(cardId: string) {
  const { user } = useAuth();
  const supabase = createClient();

  return useQuery({
    queryKey: ["collection", cardId, user?.id],
    queryFn: async () => {
      if (!user) return 0;

      const { data, error } = await supabase
        .from("user_collection")
        .select("quantity")
        .eq("user_id", user.id)
        .eq("card_id", cardId)
        .maybeSingle(); // maybeSingle évite l'erreur si pas de ligne

      if (error) throw error;
      return data?.quantity ?? 0;
    },
    enabled: !!user, // Ne lance la requête que si connecté
  });
}