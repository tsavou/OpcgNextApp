import { Card, CardRarity, CardType, CardColor } from "../types/card";

/**
 * Génère un identifiant unique pour une carte
 * Utilise card_image_id si disponible, sinon crée un identifiant composite
 * @param card - La carte pour laquelle générer l'identifiant
 * @returns Un identifiant unique pour la carte
 */
export function getCardUniqueId(card: Card): string {
  if (card.card_image) {
    // Extraire le nom du fichier de l'URL (ex: "OP13-120_rzJebAw.jpg")
    const urlParts = card.card_image.split("/");
    const filename = urlParts[urlParts.length - 1];
    // Retirer l'extension pour avoir un identifiant plus propre
    return filename.replace(/\.(jpg|jpeg|png|webp)$/i, "");
  }
  // Fallback si pas d'image
  return `${card.set_id}-${card.card_set_id}-${card.card_name}`;
}

/**
 * Retourne les classes CSS pour la couleur de rareté d'une carte
 * @param rarity - La rareté de la carte
 * @returns Les classes CSS Tailwind pour la rareté
 */
export function getRarityColor(rarity: CardRarity | string): string {
  switch (rarity) {
    case "C":
      return "bg-gray-100 text-gray-800";
    case "UC":
      return "bg-green-100 text-green-800";
    case "R":
      return "bg-blue-100 text-blue-800";
    case "SR":
      return "bg-purple-100 text-purple-800";
    case "SEC":
      return "bg-yellow-100 text-yellow-800";
    case "P":
      return "bg-pink-100 text-pink-800";
    case "L":
      return "bg-red-100 text-red-800";
    case "SP":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/**
 * Retourne les classes CSS pour la couleur du type d'une carte
 * @param type - Le type de la carte
 * @returns Les classes CSS Tailwind pour le type
 */
export function getTypeColor(type: CardType | string): string {
  switch (type) {
    case "LEADER":
      return "bg-red-500";
    case "CHARACTER":
      return "bg-blue-500";
    case "EVENT":
      return "bg-green-500";
    case "STAGE":
      return "bg-purple-500";
    case "DON":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
}

/**
 * Retourne les classes CSS pour la couleur d'une carte
 * @param color - La couleur de la carte
 * @returns Les classes CSS Tailwind pour la couleur
 */
export function getColorBadge(color: CardColor | string): string {
  switch (color) {
    case "RED":
      return "bg-red-500";
    case "GREEN":
      return "bg-green-500";
    case "BLUE":
      return "bg-blue-500";
    case "PURPLE":
      return "bg-purple-500";
    case "BLACK":
      return "bg-black";
    case "YELLOW":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
}
