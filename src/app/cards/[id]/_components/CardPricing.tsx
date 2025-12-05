import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "../../types/card";

interface CardPricingProps {
  card: Card;
}

export function CardPricing({ card }: CardPricingProps) {
  const t = useTranslations("cardDetail");

  return (
    <div className="border-t pt-6">
      <div className="mb-3 flex items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {t("marketPrice")}
        </h3>

        <a
          href={`https://www.cardmarket.com/fr/OnePiece/Products/Search?category=-1&searchString=${encodeURIComponent(card.card_set_id)}&searchMode=v2&mode=gallery`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <span>{t("viewOnCardmarket")}</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-green-50 p-4">
          <h4 className="mb-1 text-sm font-medium text-green-600">
            {t("averagePrice")}
          </h4>
          <p className="text-xl font-bold text-green-900">
            {card.market_price}€
          </p>
        </div>
        <div className="rounded-lg bg-blue-50 p-4">
          <h4 className="mb-1 text-sm font-medium text-blue-600">
            {t("inventoryPrice")}
          </h4>
          <p className="text-xl font-bold text-blue-900">
            {card.inventory_price}€
          </p>
        </div>
      </div>
    </div>
  );
}
