// Types pour les cartes One Piece TCG basés sur l'API réelle

export interface Card {
  card_id: string; // colonne card_id de la table user_collection (quand on possède la carte)
  card_name: string;
  card_set_id: string;
  card_image: string;
  card_image_id: string;
  rarity: CardRarity;
  set_name: string;
  set_id: string;
  card_type: CardType;
  card_cost: string | null;
  card_power: string | null;
  counter_amount: number;
  attribute: string | null;
  card_color: CardColor;
  card_text: string | null;
  sub_types: string | null;
  life: string | null;
  inventory_price: number;
  market_price: number;
  date_scraped: string;
}

export type CardRarity =
  | "C" // Common
  | "UC" // Uncommon
  | "R" // Rare
  | "SR" // Super Rare
  | "SEC" // Secret Rare
  | "P" // Promo
  | "L" // Leader
  | "SP"; // Special

export type CardType = "LEADER" | "CHARACTER" | "EVENT" | "STAGE" | "DON";

export type CardColor =
  | "RED"
  | "GREEN"
  | "BLUE"
  | "PURPLE"
  | "BLACK"
  | "YELLOW";

export interface CardSet {
  set_name: string;
  set_id: string;
}

// Types pour les réponses API
export interface CardsResponse {
  data: Card[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface CardFilters {
  search?: string;
  rarity?: CardRarity[];
  set?: string[];
  type?: CardType[];
  colors?: CardColor[];
  minCost?: number;
  maxCost?: number;
  sortBy?: "name" | "rarity" | "set";
  sortOrder?: "asc" | "desc";
}

// Types pour les hooks
export interface UseCardsOptions {
  filters?: CardFilters;
  page?: number;
  pageSize?: number;
}
