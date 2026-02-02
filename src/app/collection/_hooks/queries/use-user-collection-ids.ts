import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";
import { getCollectionCardIds } from "@/lib/services/collection.service";

export function useUserCollectionIds() {
  const { user } = useAuth();
  const supabase = createClient();

  return useQuery({
    queryKey: ["user-collection-ids", user?.id],
    queryFn: async () => {
      if (!user) return new Set<string>();
      return getCollectionCardIds(supabase, user.id);
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
}