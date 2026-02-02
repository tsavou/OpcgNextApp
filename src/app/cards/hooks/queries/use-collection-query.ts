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
    queryFn: async (): Promise<CollectionItem> => {
      if (!user) return { quantity: 0, strategy_tip: null };
      return getCollectionItem(supabase, user.id, cardId);
    },
    enabled: !!user,
  });
}