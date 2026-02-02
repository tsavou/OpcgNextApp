import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";
import {
  type CollectionStats,
  getCollectionStats,
} from "@/lib/services/collection.service";

export type { CollectionStats };

export function useCollectionStatsQuery() {
  const { user } = useAuth();
  const supabase = createClient();

  return useQuery({
    queryKey: ["collection-stats", user?.id],
    queryFn: async (): Promise<CollectionStats> => {
      if (!user) {
        return {
          totalCards: 0,
          totalSets: 0,
          collectionValue: 0,
          rareCards: 0,
        };
      }
      return getCollectionStats(supabase, user.id);
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
}

