import { Card } from "../../types/card";
import {
  getRarityColor,
  getTypeColor,
  getColorBadge,
} from "../../helpers/card";

interface CardBadgesProps {
  card: Card;
}

export function CardBadges({ card }: CardBadgesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <span
        className={`rounded-full px-3 py-1 text-sm font-semibold ${getRarityColor(
          card.rarity,
        )}`}
      >
        {card.rarity}
      </span>
      <span
        className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${getTypeColor(
          card.card_type,
        )}`}
      >
        {card.card_type}
      </span>
      <span
        className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${getColorBadge(
          card.card_color,
        )}`}
      >
        {card.card_color}
      </span>
    </div>
  );
}
