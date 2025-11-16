import { fetchCardById } from "@/lib/api/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useCardSuspenseQuery(cardId: string) {
  return useSuspenseQuery({
    queryKey: ["card", cardId],
    queryFn: () => fetchCardById(cardId),
  });
}
