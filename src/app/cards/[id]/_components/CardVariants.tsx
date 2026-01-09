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
    <div className="border-t border-slate-700 pt-6">
      <h3 className="mb-3 text-lg font-semibold text-white">
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
              className={`cursor-pointer block rounded-lg border-2 p-4 transition-all hover:shadow-lg backdrop-blur-sm ${
                isCurrentVariant
                  ? "border-sky-500 bg-sky-900/30 hover:border-sky-400"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-md font-semibold text-white">
                  {card.card_name}
                </h4>
                {isCurrentVariant && (
                  <span className="rounded-full border border-sky-500 bg-sky-900/50 px-2 py-1 text-xs text-sky-300">
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
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <span className="text-sm">{t("noImage")}</span>
                    </div>
                  )}
                </div>
                <div>
                  <div>
                    <span className="text-slate-400">
                      {t("averagePriceLabel")}
                    </span>
                    <span className="ml-1 font-medium text-yellow-400">
                      {card.market_price}€
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">{t("setLabel")}</span>
                    <span className="ml-1 font-medium text-white">
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
