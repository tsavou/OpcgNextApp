import Image from "next/image";
import { Card } from "@/types/card";
import Link from "next/link";

interface CardItemProps {
  card: Card;
  onClick?: (card: Card) => void;
  className?: string;
}

export function CardItem({ card }: CardItemProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "C":
        return "bg-gray-100 text-gray-800";
      case "UC":
        return "bg-green-100 text-green-800";
      case "R":
        return "bg-blue-100 text-blue-800";
      case "SR":
        return "bg-purple-100 text-purple-800";
      case "SEC":
        return "bg-yellow-100 text-yellow-800";
      case "P":
        return "bg-pink-100 text-pink-800";
      case "L":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "LEADER":
        return "bg-red-500";
      case "CHARACTER":
        return "bg-blue-500";
      case "EVENT":
        return "bg-green-500";
      case "STAGE":
        return "bg-purple-500";
      case "DON":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Link
      href={`/cards/${card.card_set_id}`}
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

        {/* Badge de type */}
        <div className="absolute top-2 right-2">
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold text-white ${getTypeColor(card.card_type)}`}
          >
            {card.card_type}
          </span>
        </div>
      </div>

      {/* Informations de la carte */}
      <div className="p-3">
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900">
          {card.card_name}
        </h3>

        <div className="mb-2 flex items-center justify-between text-xs text-gray-600">
          <span>{card.set_name || "Set inconnu"}</span>
          {card.card_cost && card.card_cost !== "NULL" && (
            <span className="font-medium">Coût: {card.card_cost}</span>
          )}
        </div>

        {/* Stats */}
        {(card.card_power && card.card_power !== "NULL") ||
        card.counter_amount > 0 ? (
          <div className="flex items-center gap-2 text-xs">
            {card.card_power && card.card_power !== "NULL" && (
              <span className="rounded bg-red-100 px-2 py-1 text-red-800">
                Puissance: {card.card_power}
              </span>
            )}
            {card.counter_amount > 0 && (
              <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
                Contre: {card.counter_amount}
              </span>
            )}
          </div>
        ) : null}

        {/* Prix */}
        {card.market_price > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            <span className="font-medium">Prix: {card.market_price}€</span>
          </div>
        )}
      </div>
    </Link>
  );
}
