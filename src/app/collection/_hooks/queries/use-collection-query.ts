import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";
import {
  type CollectionItem,
  getCollectionItem,
} from "@/lib/services/collection.service";

export type { CollectionItem };

export function useCollectionQuery(cardId: string) {
  const { user } = useAuth();
  const supabase = createClient();

  return useQuery({
    queryKey: ["collection", cardId, user?.id],
    queryFn: async (): Promise<CollectionItem | null> => {
      if (!user) return null;
      return getCollectionItem(supabase, user.id, cardId) ?? null;
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
}