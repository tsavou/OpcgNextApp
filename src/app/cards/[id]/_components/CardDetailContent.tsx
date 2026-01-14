"use client";

import { useCardSuspenseQuery } from "../../hooks/queries/useCardSuspenseQuery";
import { Card } from "../../types/card";
import { getCardUniqueId } from "../../helpers/card";
import { CardBreadcrumb } from "./CardBreadcrumb";
import { CardImageSection } from "./CardImageSection";
import { CardHeader } from "./CardHeader";
import { CardPricing } from "./CardPricing";
import { CardVariants } from "./CardVariants";
import { useSearchParams } from "next/navigation";
import { AddToCollectionForm } from "./AddToCollectionForm";

export function CardDetailContent({ cardSetId }: { cardSetId: string }) {
  const { data: cards } = useCardSuspenseQuery(cardSetId);

  const searchParams = useSearchParams();
  const cardUniqueId = searchParams.get("cardId");

  const mainCard = cardUniqueId
    ? cards.find((card: Card) => {
        const uniqueId = getCardUniqueId(card);
        return uniqueId === cardUniqueId;
      }) || cards[0]
    : cards[0];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto">
        <CardBreadcrumb card={mainCard} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <CardImageSection card={mainCard} />

          <div className="space-y-6">
            <CardHeader card={mainCard} />
            <CardPricing card={mainCard} />
            {cardUniqueId && (
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">Gestion de collection</h3>
              <AddToCollectionForm cardId={cardUniqueId} />
            </div>
          )}
            <CardVariants cards={cards} currentCardUniqueId={cardUniqueId} />
          </div>
        </div>
      </div>
    </div>
  );
}
