import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchAllCards } from "@/lib/api/api";
import { fetchSetCards } from "@/lib/api/sets";
import { Card } from "@/app/cards/types/card";

export function useCardsSuspenseQuery(setId?: string | null) {
  return useSuspenseQuery<Card[]>({
    queryKey: setId ? ["set-cards", setId] : ["cards", "all"],
    queryFn: () => {
      if (setId) {
        console.log(`fetching cards for set ${setId}...`);
        return fetchSetCards(setId);
      }
      console.log("fetching all cards...");
      return fetchAllCards();
    },
  });
}
