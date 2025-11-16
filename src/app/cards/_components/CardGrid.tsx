"use client";

import { useSearchParams } from "next/navigation";
import { useCardsSuspenseQuery } from "@/app/cards/hooks/queries/useCardsSuspenseQuery";
import { CardItem } from "./CardItem";
import { getCardUniqueId } from "../helpers/card";

export function CardGrid() {
  const searchParams = useSearchParams();
  const setId = searchParams.get("setId");
  const setName = searchParams.get("setName");
  const title = setId && setName ? `${setId}: ${setName}` : "Toutes les cartes";

  const { data: cards } = useCardsSuspenseQuery(setId);

  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-2 text-lg text-gray-400">🔍</div>
          <p className="text-gray-600">
            {setId
              ? "Aucune carte trouvée pour ce set"
              : "Aucune carte trouvée"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-800">{title}</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cards.map((card) => (
          <CardItem key={getCardUniqueId(card)} card={card} />
        ))}
      </div>
    </div>
  );
}
