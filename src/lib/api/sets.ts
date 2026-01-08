import { Card, CardSet } from "@/app/cards/types/card";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchAllSets(): Promise<CardSet[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/allSets/`,
    );

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

export async function fetchSetCards(setId: string): Promise<Card[]> {
  try {
    const response = await fetch(
        `${API_BASE_URL}/sets/${setId}/`,
    );

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
