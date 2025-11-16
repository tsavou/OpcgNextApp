import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchAllSets } from "@/lib/api/sets";
import { CardSet } from "@/app/cards/types/card";

export function useSetListSuspenseQuery() {
  return useSuspenseQuery<CardSet[]>({
    queryKey: ["sets"],
    queryFn: () => {
      console.log("fetching sets...");
      return fetchAllSets();
    },
  });
}
