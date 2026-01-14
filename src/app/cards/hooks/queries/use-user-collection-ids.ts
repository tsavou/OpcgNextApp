import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";

export function useUserCollectionIds() {
  const { user } = useAuth();
  const supabase = createClient();

  return useQuery({
    queryKey: ["user-collection-ids", user?.id],
    queryFn: async () => {
      if (!user) return new Set<string>();

      const { data, error } = await supabase
        .from("user_collection")
        .select("card_id");

      if (error) throw error;

      // On transforme le tableau en Set pour une recherche instantanée : O(1)
      return new Set(data.map((item) => item.card_id));
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutes
  });
}