import { useCards } from "@/hooks/useCards";
import { CardItem } from "./CardItem";

export function CardGrid() {
  const { data } = useCards();
  const cards = data?.data || [];

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-2 text-lg text-gray-400">🔍</div>
          <p className="text-gray-600">Aucune carte trouvée</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {cards.map((card) => (
        <CardItem key={card.card_image_id ?? card.card_name} card={card} />
      ))}
    </div>
  );
}
