import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/auth/_hooks/use-auth";

export interface CollectionStats {
  totalCards: number;
  totalSets: number;
  collectionValue: number;
  rareCards: number;
}

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

      const { data: collectionItems, error } = await supabase
        .from("user_collection")
        .select("quantity, set_id, market_price, rarity")
        .eq("user_id", user.id);

      if (error) throw error;

      if (!collectionItems || collectionItems.length === 0) {
        return {
          totalCards: 0,
          totalSets: 0,
          collectionValue: 0,
          rareCards: 0,
        };
      }

      // Calcul du total de cartes (somme des quantités)
      const totalCards = collectionItems.reduce(
        (acc, curr) => acc + (curr.quantity || 0),
        0
      );

      // Calcul du nombre de sets distincts
      const uniqueSets = new Set(
        collectionItems
          .map((item) => item.set_id)
          .filter((setId): setId is string => !!setId)
      );
      const totalSets = uniqueSets.size;

      // Calcul de la valeur totale de la collection
      const collectionValue = collectionItems.reduce((acc, curr) => {
        const price = curr.market_price || 0;
        const quantity = curr.quantity || 0;
        return acc + price * quantity;
      }, 0);

      // Calcul du nombre de cartes rares (SR, SEC, SP)
      const rareRarities = ["SR", "SEC", "SP"];
      const rareCards = collectionItems.reduce((acc, curr) => {
        if (curr.rarity && rareRarities.includes(curr.rarity)) {
          return acc + (curr.quantity || 0);
        }
        return acc;
      }, 0);

      return {
        totalCards,
        totalSets,
        collectionValue,
        rareCards,
      };
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutes
  });
}

