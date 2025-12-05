import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card } from "../../types/card";

interface CardHeaderProps {
  card: Card;
}

export function CardHeader({ card }: CardHeaderProps) {
  const t = useTranslations("cardDetail");

  return (
    <div className="space-y-3">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          {card.card_name}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/cards?setId=${card.set_id}&setName=${card.set_name}`}
            className="text-lg font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            {card.set_name}
          </Link>
          <span className="text-gray-400">•</span>
          <span className="text-lg font-medium text-gray-600">
            {card.card_set_id}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <span>{t("lastUpdate")}</span>
          <span className="font-medium">
            {new Date(card.date_scraped).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
