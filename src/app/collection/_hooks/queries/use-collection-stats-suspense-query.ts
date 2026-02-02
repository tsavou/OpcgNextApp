import { useSuspenseQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import {
  type CollectionStats,
  getCollectionStats,
} from "@/lib/services/collection.service";

export type { CollectionStats };

export function useCollectionStatsSuspenseQuery(userId: string) {
  const supabase = createClient();

  return useSuspenseQuery<CollectionStats>({
    queryKey: ["collection-stats", userId],
    queryFn: () => getCollectionStats(supabase, userId),
    staleTime: 1000 * 60 * 5,
  });
}
