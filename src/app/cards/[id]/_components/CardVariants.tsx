import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "../../types/card";
import { getCardUniqueId } from "../../helpers/card";

interface CardVariantsProps {
  cards: Card[];
  currentCardUniqueId: string | null;
}

export function CardVariants({
  cards,
  currentCardUniqueId,
}: CardVariantsProps) {
  const t = useTranslations("cardDetail");

  if (cards.length <= 1) {
    return null;
  }

  return (
    <div className="border-t pt-6">
      <h3 className="mb-3 text-lg font-semibold text-gray-900">
        {t("availableVariants")} ({cards.length})
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((card, index) => {
          const variantUniqueId = getCardUniqueId(card);
          const isCurrentVariant = currentCardUniqueId === variantUniqueId;
          const variantUrl = `/cards/${card.card_set_id}?cardId=${encodeURIComponent(variantUniqueId)}`;

          return (
            <Link
              key={index}
              href={variantUrl}
              className={`block rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                isCurrentVariant
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-md font-semibold text-gray-900">
                  {card.card_name}
                </h4>
                {isCurrentVariant && (
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    {t("current")}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  {card.card_image ? (
                    <Image
                      src={card.card_image}
                      alt={card.card_name}
                      width={100}
                      height={100}
                      className="rounded-lg object-contain object-center"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <span className="text-sm">{t("noImage")}</span>
                    </div>
                  )}
                </div>
                <div>
                  <div>
                    <span className="text-gray-600">
                      {t("averagePriceLabel")}
                    </span>
                    <span className="ml-1 font-medium">
                      {card.market_price}€
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">{t("setLabel")}</span>
                    <span className="ml-1 font-medium">
                      {`${card.set_id}: ${card.set_name}`}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
