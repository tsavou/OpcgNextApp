"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCardsSuspenseQuery } from "@/app/cards/_hooks/queries/useCardsSuspenseQuery";
import { CardItem } from "./CardItem";
import { getCardUniqueId } from "../helpers/card";
import { useUserCollectionIds } from "../../collection/_hooks/queries/use-user-collection-ids";

export function CardGrid() {
  const t = useTranslations("cardDetail");
  const searchParams = useSearchParams();
  const setId = searchParams.get("setId");
  const setName = searchParams.get("setName");

  const { data: cards } = useCardsSuspenseQuery(setId);
  const { data: ownedCardIds } = useUserCollectionIds()

  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-2 text-lg text-slate-400">🔍</div>
          <p className="text-slate-400">
            {setId
              ? t("noCardsFoundForSet", { setId, setName: setName || "" })
              : t("noCardsFound")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cards.map((card) => {
          const cardUniqueId = getCardUniqueId(card);
          return (
            <CardItem 
              key={cardUniqueId} 
              card={card} 
              isOwned={ownedCardIds?.has(cardUniqueId) ?? false} 
            />
          );
        })}
      </div>
    </div>
  );
}
