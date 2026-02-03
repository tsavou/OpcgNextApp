import { getCardUniqueId } from "@/app/cards/helpers/card";
import { CollectionFormData } from "@/app/collection/_hooks/use-collection-form";
import { Card } from "@/app/cards/types/card";
import type { SupabaseClient } from "@supabase/supabase-js";

// ─── Types exposés ───────────────────────────────────────────────────────

/** Données d’un item de collection pour une carte. */
export interface CollectionItem {
  user_id: string;
  card_id: string;
  quantity: number;
  condition: string;
  language: string;
  is_graded: boolean;
  grading_service: string | null;
  grade_note: string | null;
  purchase_price: number | null;
  card_name: string | null;
  card_image: string | null;
  card_set_id: string | null;
  set_id: string | null;
  set_name: string | null;
  rarity: string | null;
  card_type: string | null;
  card_color: string | null;
  market_price: number | null;
  strategy_tip: string | null;
  created_at?: string;
}

/** Statistiques agrégées de la collection. */
export interface CollectionStats {
  totalCards: number;
  totalSets: number;
  collectionValue: number;
  rareCards: number;
}

// ─── Lecture ─────────────────────────────────────────────────────────────

/**
 * Récupère l’item de collection pour un utilisateur et une carte.
 */
export async function getCollectionItem(
  client: SupabaseClient,
  userId: string,
  cardId: string,
): Promise<CollectionItem | null> {
  const { data, error } = await client
    .from("user_collection")
    .select("*")
    .eq("user_id", userId)
    .eq("card_id", cardId)
    .maybeSingle();

  if (error) throw error;

  return data as CollectionItem | null;
}

/**
 * Récupère l’ensemble des card_id présents dans la collection de l’utilisateur.
 */
export async function getCollectionCardIds(
  client: SupabaseClient,
  userId: string,
): Promise<Set<string>> {
  const { data, error } = await client
    .from("user_collection")
    .select("card_id")
    .eq("user_id", userId);

  if (error) throw error;

  return new Set((data ?? []).map((row) => row.card_id));
}

/**
 * Récupère les statistiques agrégées de la collection (total cartes, sets, valeur, rares).
 */
export async function getCollectionStats(
  client: SupabaseClient,
  userId: string,
): Promise<CollectionStats> {
  const { data: rows, error } = await client
    .from("user_collection")
    .select("quantity, set_id, market_price, rarity")
    .eq("user_id", userId);

  if (error) throw error;

  if (!rows?.length) {
    return {
      totalCards: 0,
      totalSets: 0,
      collectionValue: 0,
      rareCards: 0,
    };
  }

  const totalCards = rows.length;

  const totalSets = new Set(
    rows.map((r) => r.set_id).filter((id): id is string => !!id),
  ).size;

  const collectionValue = rows.reduce(
    (acc, r) => acc + (r.market_price ?? 0),
    0,
  );
  const rareRarities = ["SR", "SEC", "SP"];

  const rareCards = rows.reduce(
    (acc, r) => (r.rarity && rareRarities.includes(r.rarity) ? acc + 1 : acc),
    0,
  );

  return {
    totalCards,
    totalSets,
    collectionValue,
    rareCards,
  };
}

/**
 * Récupère toutes les lignes de la collection pour un utilisateur (côté serveur).
 */
export async function getCollectionItems(
  client: SupabaseClient,
  userId: string,
): Promise<CollectionItem[]> {
  const { data, error } = await client
    .from("user_collection")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

// ─── Écriture ────────────────────────────────────────────────────────────

/**
 * Ajoute ou met à jour un item dans la collection (upsert).
 */
export async function upsertCollectionItem(
  client: SupabaseClient,
  userId: string,
  card: Card,
  formData: CollectionFormData,
): Promise<CollectionItem> {
  const cardId = getCardUniqueId(card);

  const payload = {
    user_id: userId,
    card_id: cardId,
    quantity: 1,
    ...formData,
    card_name: card.card_name,
    card_image: card.card_image,
    card_set_id: card.card_set_id,
    set_id: card.set_id,
    set_name: card.set_name,
    rarity: card.rarity,
    card_type: card.card_type,
    card_color: card.card_color,
    market_price: card.market_price ?? 0,
  };

  const { data, error } = await client
    .from("user_collection")
    .upsert(payload, { onConflict: "user_id, card_id" })
    .select()
    .single();

  if (error) throw error;
  return data as CollectionItem;
}

/**
 * Supprime un item de la collection pour un utilisateur et une carte.
 */
export async function deleteCollectionItem(
  client: SupabaseClient,
  userId: string,
  cardId: string,
): Promise<void> {
  const { error } = await client
    .from("user_collection")
    .delete()
    .eq("user_id", userId)
    .eq("card_id", cardId);

  if (error) throw error;
}
