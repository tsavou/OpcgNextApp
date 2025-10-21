import { Card, CardsResponse, CardFilters } from "@/types/card";

const API_BASE_URL = "https://optcgapi.com/api";

// Fonction pour récupérer tous les sets disponibles
export async function fetchAllSets(): Promise<unknown[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/allSets/`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des sets:", error);
    throw error;
  }
}

// Fonction pour récupérer toutes les cartes d'un set spécifique
export async function fetchSetCards(setId: string): Promise<Card[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/sets/${setId}/`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des cartes du set ${setId}:`,
      error,
    );
    throw error;
  }
}

// Fonction pour récupérer une carte spécifique par son ID
export async function fetchCardById(cardId: string): Promise<Card[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/sets/card/${cardId}/`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la carte ${cardId}:`,
      error,
    );
    throw error;
  }
}

// Fonction pour récupérer toutes les cartes de tous les sets (simulation d'un endpoint global)
export async function fetchAllCards(): Promise<Card[]> {
  try {
    // D'abord récupérer tous les sets
    //const sets = await fetchAllSets();
    // TODO: Remove this and improve
    const sets = [
      {
        set_name: "Premium Booster - The Best - Vol. 2",
        set_id: "PRB-02",
      },
    ];

    // Ensuite récupérer toutes les cartes de chaque set
    const allCards: Card[] = [];

    for (const set of sets) {
      try {
        const cards = await fetchSetCards(set.id || set.set_id);
        allCards.push(...cards);
      } catch (error) {
        console.warn(
          `Impossible de récupérer les cartes du set ${set.id || set.set_id}:`,
          error,
        );
      }
    }

    return allCards;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de toutes les cartes:",
      error,
    );
    throw error;
  }
}

// Fonction pour rechercher des cartes par nom (simulation avec les données locales)
export async function searchCards(query: string, limit = 10): Promise<Card[]> {
  try {
    // Récupérer toutes les cartes et filtrer localement
    const allCards = await fetchAllCards();

    const filteredCards = allCards.filter((card) =>
      card.card_name.toLowerCase().includes(query.toLowerCase()),
    );

    return filteredCards.slice(0, limit);
  } catch (error) {
    console.error("Erreur lors de la recherche de cartes:", error);
    throw error;
  }
}

// Fonction pour récupérer les cartes avec filtres
export async function fetchCards(
  filters?: CardFilters,
  page = 1,
  pageSize = 20,
): Promise<CardsResponse> {
  try {
    // Récupérer toutes les cartes
    const allCards = await fetchAllCards();

    let filteredCards = [...allCards];

    // Appliquer les filtres
    if (filters?.search) {
      filteredCards = filteredCards.filter((card) =>
        card.card_name.toLowerCase().includes(filters.search!.toLowerCase()),
      );
    }

    if (filters?.rarity && filters.rarity.length > 0) {
      filteredCards = filteredCards.filter((card) =>
        filters.rarity!.includes(card.rarity),
      );
    }

    if (filters?.type && filters.type.length > 0) {
      filteredCards = filteredCards.filter((card) =>
        filters.type!.includes(card.card_type),
      );
    }

    if (filters?.colors && filters.colors.length > 0) {
      filteredCards = filteredCards.filter((card) =>
        filters.colors!.includes(card.card_color),
      );
    }

    // Appliquer le tri
    if (filters?.sortBy) {
      filteredCards.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (filters.sortBy) {
          case "name":
            aValue = a.card_name;
            bValue = b.card_name;
            break;
          case "rarity":
            aValue = a.rarity;
            bValue = b.rarity;
            break;
          case "set":
            aValue = a.set_name || "";
            bValue = b.set_name || "";
            break;
          default:
            return 0;
        }

        if (filters.sortOrder === "desc") {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    // Appliquer la pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCards = filteredCards.slice(startIndex, endIndex);
    return {
      data: paginatedCards,
      total: filteredCards.length,
      page,
      pageSize,
      hasMore: endIndex < filteredCards.length,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des cartes:", error);
    throw error;
  }
}
