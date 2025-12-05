import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "@/app/cards/types/card";
import Link from "next/link";
import { getCardUniqueId } from "../helpers/card";

interface CardItemProps {
  card: Card;
  onClick?: (card: Card) => void;
  className?: string;
}

export function CardItem({ card }: CardItemProps) {
  const t = useTranslations("cardDetail");
  const cardUniqueId = getCardUniqueId(card);

  return (
    <Link
      href={`/cards/${card.card_set_id}?cardId=${encodeURIComponent(cardUniqueId)}`}
      className={`cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg`}
    >
      <div className="relative aspect-[3/4] bg-gray-100">
        {card.card_image ? (
          <Image
            src={card.card_image}
            alt={card.card_name}
            fill
            className="rounded-lg object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <span>{t("noImage")}</span>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-md mb-2 line-clamp-2 text-center font-semibold text-gray-900">
          {card.set_id}: {card.card_name} ({card.card_set_id})
        </h3>

        <div className="space-y-1 text-center text-xs text-gray-600">
          {card.market_price > 0 && (
            <div>
              <span>{t("startingFrom")} </span>
              <span className="font-semibold">{card.market_price} €</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
