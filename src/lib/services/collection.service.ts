import type { SupabaseClient } from "@supabase/supabase-js";

// ─── Types exposés ───────────────────────────────────────────────────────

/** Données d’un item de collection pour une carte (quantity + strategy_tip). */
export interface CollectionItem {
  quantity: number;
  strategy_tip: string | null;
}

/** Statistiques agrégées de la collection. */
export interface CollectionStats {
  totalCards: number;
  totalSets: number;
  collectionValue: number;
  rareCards: number;
}

/** Ligne brute user_collection telle que retournée par Supabase. */
export interface CollectionRow {
  user_id: string;
  card_id: string;
  quantity: number;
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
  updated_at?: string;
}

/** Payload pour ajouter ou mettre à jour un item (upsert). */
export interface UpsertCollectionItemPayload {
  user_id: string;
  card_id: string;
  quantity: number;
  card_name: string;
  card_image: string;
  card_set_id: string;
  set_id: string;
  set_name: string;
  rarity: string;
  card_type: string;
  card_color: string;
  market_price: number;
}

// ─── Lecture ─────────────────────────────────────────────────────────────

/**
 * Récupère l’item de collection pour un utilisateur et une carte.
 * Retourne quantity + strategy_tip (ou valeurs par défaut si absent).
 */
export async function getCollectionItem(
  client: SupabaseClient,
  userId: string,
  cardId: string
): Promise<CollectionItem> {
  const { data, error } = await client
    .from("user_collection")
    .select("quantity, strategy_tip")
    .eq("user_id", userId)
    .eq("card_id", cardId)
    .maybeSingle();

  if (error) throw error;

  return {
    quantity: data?.quantity ?? 0,
    strategy_tip: data?.strategy_tip ?? null,
  };
}

/**
 * Récupère l’ensemble des card_id présents dans la collection de l’utilisateur.
 */
export async function getCollectionCardIds(
  client: SupabaseClient,
  userId: string
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
  userId: string
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

  const totalCards = rows.reduce((acc, r) => acc + (r.quantity ?? 0), 0);
  const totalSets = new Set(
    rows.map((r) => r.set_id).filter((id): id is string => !!id)
  ).size;
  const collectionValue = rows.reduce(
    (acc, r) => acc + (r.market_price ?? 0) * (r.quantity ?? 0),
    0
  );
  const rareRarities = ["SR", "SEC", "SP"];
  const rareCards = rows.reduce(
    (acc, r) =>
      r.rarity && rareRarities.includes(r.rarity)
        ? acc + (r.quantity ?? 0)
        : acc,
    0
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
  userId: string
): Promise<CollectionRow[]> {
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
  payload: UpsertCollectionItemPayload
): Promise<CollectionRow> {
  const { data, error } = await client
    .from("user_collection")
    .upsert(payload, { onConflict: "user_id, card_id" })
    .select()
    .single();

  if (error) throw error;
  return data as CollectionRow;
}

/**
 * Supprime un item de la collection pour un utilisateur et une carte.
 */
export async function deleteCollectionItem(
  client: SupabaseClient,
  userId: string,
  cardId: string
): Promise<void> {
  const { error } = await client
    .from("user_collection")
    .delete()
    .eq("user_id", userId)
    .eq("card_id", cardId);

  if (error) throw error;
}
