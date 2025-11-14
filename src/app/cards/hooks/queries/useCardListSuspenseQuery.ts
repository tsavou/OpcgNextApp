import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCards } from "@/lib/api";
import { UseCardsOptions } from "@/app/cards/types/card";

export function useCardListSuspenseQuery(options: UseCardsOptions = {}) {
  const { filters, page = 1, pageSize = 20 } = options;

  return useSuspenseQuery({
    queryKey: ["cards", filters, page, pageSize],
    queryFn: () => {
      console.log("fetching cards...");
      new Promise((resolve) => setTimeout(resolve, 1500));
      //throw new Error("Test error");
      return fetchCards(filters, page, pageSize);
    },
  });
}
