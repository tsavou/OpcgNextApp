import Image from "next/image";
import { Card } from "@/app/cards/types/card";
import Link from "next/link";
import { getCardUniqueId, getRarityColor } from "../helpers/card";

interface CardItemProps {
  card: Card;
  onClick?: (card: Card) => void;
  className?: string;
}

export function CardItem({ card }: CardItemProps) {
  const cardUniqueId = getCardUniqueId(card);

  return (
    <Link
      href={`/cards/${card.card_set_id}?cardId=${encodeURIComponent(cardUniqueId)}`}
      className={`cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg`}
    >
      {/* Image de la carte */}
      <div className="relative aspect-[3/4] bg-gray-100">
        {card.card_image ? (
          <Image
            src={card.card_image}
            alt={card.card_name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <span>Pas d&apos;image</span>
          </div>
        )}

        {/* Badge de rareté */}
        <div className="absolute top-2 left-2">
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${getRarityColor(card.rarity)}`}
          >
            {card.rarity}
          </span>
        </div>
      </div>

      {/* Informations de la carte */}
      <div className="p-3">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900">
          {card.card_name}
        </h3>

        <div className="space-y-1 text-xs text-gray-600">
          <div>
            <span className="font-medium">Set: </span>
            <span>{card.set_name || "Set inconnu"}</span>
          </div>

          <div>
            <span className="font-medium">ID Set: </span>
            <span>{card.set_id || card.card_set_id}</span>
          </div>

          <div>
            <span className="font-medium">ID Carte: </span>
            <span>{card.card_image_id}</span>
          </div>

          {card.market_price > 0 && (
            <div>
              <span className="font-medium">Prix: </span>
              <span>{card.market_price}€</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
