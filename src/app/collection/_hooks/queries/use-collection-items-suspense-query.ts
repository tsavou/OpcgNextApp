import { useSuspenseQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import {
  type CollectionItem,
  getCollectionItems,
} from "@/lib/services/collection.service";

export type { CollectionItem };

export function useCollectionItemsSuspenseQuery(userId: string) {
  const supabase = createClient();

  return useSuspenseQuery<CollectionItem[]>({
    queryKey: ["collection-items", userId],
    queryFn: () => getCollectionItems(supabase, userId),
    staleTime: 1000 * 60 * 5,
  });
}
