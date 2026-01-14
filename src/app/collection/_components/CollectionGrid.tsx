"use client";

import { Card } from "@/app/cards/types/card";
import { CardItem } from "@/app/cards/_components/CardItem";

interface CollectionGridProps {
  cards: Card[];
}

export function CollectionGrid({ cards }: CollectionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {cards.map((card) => (
        <CardItem
          key={card.card_id}
          card={card}
          isOwned={true}
        />
      ))}
    </div>
  );
}