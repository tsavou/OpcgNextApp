import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Card } from "../../types/card";

interface CardHeaderProps {
  card: Card;
}

export function CardHeader({ card }: CardHeaderProps) {
  const t = useTranslations("cardDetail");
  const locale = useLocale();

  return (
    <div className="space-y-3">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-white">
          {card.card_name}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/cards?setId=${card.set_id}&setName=${card.set_name}`}
            className="cursor-pointer text-lg font-medium text-sky-400 transition-colors hover:text-sky-300"
          >
            {card.set_name}
          </Link>
          <span className="text-slate-500">•</span>
          <span className="text-lg font-medium text-slate-400">
            {card.card_set_id}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-1">
          <span>{t("lastUpdate")}</span>
          <span className="font-medium text-white">
            {new Date(card.date_scraped).toLocaleDateString(locale || "fr-FR")}
          </span>
        </div>
      </div>
    </div>
  );
}
