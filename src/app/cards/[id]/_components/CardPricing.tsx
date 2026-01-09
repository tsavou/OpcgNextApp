import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "../../types/card";

interface CardPricingProps {
  card: Card;
}

export function CardPricing({ card }: CardPricingProps) {
  const t = useTranslations("cardDetail");

  return (
    <div className="border-t border-slate-700 pt-6">
      <div className="mb-3 flex items-center gap-4">
        <h3 className="text-lg font-semibold text-white">
          {t("marketPrice")}
        </h3>

        <a
          href={`https://www.cardmarket.com/fr/OnePiece/Products/Search?category=-1&searchString=${encodeURIComponent(card.card_set_id)}&searchMode=v2&mode=gallery`}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-sky-500 hover:bg-slate-800 hover:text-white backdrop-blur-sm"
        >
          <span>{t("viewOnCardmarket")}</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-green-700/50 bg-green-900/20 p-4 backdrop-blur-sm">
          <h4 className="mb-1 text-sm font-medium text-green-400">
            {t("averagePrice")}
          </h4>
          <p className="text-xl font-bold text-green-300">
            {card.market_price}€
          </p>
        </div>
        <div className="rounded-lg border border-blue-700/50 bg-blue-900/20 p-4 backdrop-blur-sm">
          <h4 className="mb-1 text-sm font-medium text-blue-400">
            {t("inventoryPrice")}
          </h4>
          <p className="text-xl font-bold text-blue-300">
            {card.inventory_price}€
          </p>
        </div>
      </div>
    </div>
  );
}
