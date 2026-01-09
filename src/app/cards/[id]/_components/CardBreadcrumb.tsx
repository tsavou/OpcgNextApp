import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card } from "../../types/card";

interface CardBreadcrumbProps {
  card: Card;
}

export function CardBreadcrumb({ card }: CardBreadcrumbProps) {
  const t = useTranslations("global");

  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-slate-400">
        <li>
          <Link href="/" className="cursor-pointer hover:text-white transition-colors">
            {t("home")}
          </Link>
        </li>
        <li>/</li>
        <li>
          <Link
            href={`/cards?setId=${card.set_id}&setName=${card.set_name}`}
            className="cursor-pointer hover:text-white transition-colors"
          >
            {card.set_name}
          </Link>
        </li>
        <li>/</li>
        <li className="font-medium text-white">{card.card_name}</li>
      </ol>
    </nav>
  );
}
