import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCardById, fetchCards } from "@/lib/api";
import { UseCardsOptions } from "@/types/card";

// Hook pour récupérer les cartes avec pagination
export function useCards(options: UseCardsOptions = {}) {
  const { filters, page = 1, pageSize = 20 } = options;

  return useSuspenseQuery({
    queryKey: ["cards", filters, page, pageSize],
    queryFn: () => fetchCards(filters, page, pageSize),
  });
}

export function useCard(cardId: string) {
  return useSuspenseQuery({
    queryKey: ["card", cardId],
    queryFn: () => fetchCardById(cardId),
  });
}
