import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "../../types/card";
import { CardBadges } from "./CardBadges";

interface CardImageSectionProps {
  card: Card;
}

export function CardImageSection({ card }: CardImageSectionProps) {
  const t = useTranslations("cardDetail");

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative aspect-[3/4] max-h-[500px] w-full overflow-hidden rounded-lg">
        {card.card_image ? (
          <Image
            src={card.card_image}
            alt={card.card_name}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <span>{t("noImage")}</span>
          </div>
        )}
      </div>
      <CardBadges card={card} />
    </div>
  );
}
