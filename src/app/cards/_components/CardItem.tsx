import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "@/app/cards/types/card";
import Link from "next/link";
import { getCardUniqueId } from "../helpers/card";
import { CardCollectionToggle } from "./CardCollectionToggle";
import { CollectionItem } from "@/lib/services/collection.service";
import { CollectionInfoBadge } from "@/app/collection/_components/CollectionInfoBadge";

interface CardItemProps {
  card: Card;
  onClick?: (card: Card) => void;
  className?: string;
  isOwned?: boolean;
  collectionDetails?: CollectionItem;
}

export function CardItem({ card, isOwned = false, collectionDetails }: CardItemProps) {
  const t = useTranslations("cardDetail");
  const cardUniqueId = getCardUniqueId(card);

  return (
    <Link
      href={`/cards/${card.card_set_id}?cardId=${encodeURIComponent(cardUniqueId)}`}
      className={`relative group cursor-pointer rounded-lg bg-slate-700/30 transition-all`}
    >
      {collectionDetails && (
        <div className="absolute left-0 -top-2 z-20 w-fit" onClick={(e) => e.stopPropagation()}>
          <CollectionInfoBadge 
            collectionDetails={collectionDetails}
          />
        </div>
      )}

      <div
        className="absolute right-0 -top-2 z-20 opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <CardCollectionToggle 
          card={card} 
          isOwnedInitial={isOwned} 
        />
      </div>
      <div className="overflow-hidden rounded-lg">
        <div className="relative aspect-[3/4] bg-slate-700/50">
          {card.card_image ? (
            <Image
              src={card.card_image}
              alt={card.card_name}
              fill
              className="rounded-lg object-contain object-center p-2 transition-all duration-300 group-hover:scale-105 group-has-[button:hover]:scale-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              <span>{t("noImage")}</span>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="text-md mb-2 line-clamp-2 text-center font-semibold text-white">
            {card.set_id}: {card.card_name} ({card.card_set_id})
          </h3>

          <div className="space-y-1 text-center text-xs text-slate-400">
            {card.market_price > 0 && (
              <div>
                <span>{t("startingFrom")} </span>
                <span className="font-semibold text-yellow-400">
                  {card.market_price} €
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
