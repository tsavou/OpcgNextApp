import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CollectionGrid } from "./_components/CollectionGrid";
import Link from "next/link";
import { Coins, Inbox, Trophy } from "lucide-react";
import { Card } from "@/app/cards/types/card"; // Import du type pour le casting

export default async function CollectionPage() {
  const t = await getTranslations("collection");
  const supabase = await createClient();

  // 1. Auth Check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login");
  }

  // 2. Récupérer ma collection
  const { data: collectionItems, error } = await supabase
    .from("user_collection")
    .select("*") 
    .eq("user_id", user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return <div className="p-8 text-red-500">Erreur de chargement du trésor.</div>;
  }

  // 3. Mapper vers le format Card pour l'affichage
  // On force le type "as unknown as Card[]" car il manque des champs techniques (power, life...)
  // qui ne sont pas stockés en BDD mais dont on n'a pas besoin pour l'affichage simple.
  const myCards = collectionItems.map((item) => ({
    card_id: item.card_id,
    card_name: item.card_name || "Nom inconnu",
    card_image: item.card_image,
    card_set_id: item.card_set_id,
    set_id: item.set_id || item.card_set_id?.split("-")[0] || "Unknown",
    
    // ✅ CORRECTION 1 : Le nom de la colonne en BDD est 'rarity', pas 'card_rarity'
    rarity: item.rarity, 
    
    // ✅ CORRECTION 2 : On récupère le prix stocké (ou 0 par défaut)
    market_price: item.market_price || 0,
    
    // Champs optionnels ou fallbacks pour satisfaire CardItem si besoin
    card_type: item.card_type,
    card_color: item.card_color,
    
    // Propriété virtuelle pour l'affichage
    _quantity: item.quantity 
  })) as unknown as Card[]; 

  // Stats simplifiées
  const totalCardsCount = collectionItems.reduce((acc, curr) => acc + curr.quantity, 0);
  
  // Calcul de la valeur totale basé sur le prix stocké
  const totalValue = collectionItems.reduce((acc, curr) => {
    return acc + ((curr.market_price || 0) * curr.quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-slate-900 pb-20 pt-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-2 text-slate-400">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex gap-4">
            {/* Compteur Cartes */}
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 min-w-[140px]">
              <div className="mb-1 flex items-center gap-2 text-slate-400">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-xs font-bold uppercase">{t("totalCards")}</span>
              </div>
              <div className="text-2xl font-bold text-white">{totalCardsCount}</div>
            </div>
            
            {/* Compteur Valeur */}
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 min-w-[140px]">
              <div className="mb-1 flex items-center gap-2 text-slate-400">
                <Coins className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase">{t("estimatedValue")}</span>
              </div>
              <div className="text-2xl font-bold text-white">
                 {totalValue.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
              </div>
            </div>
          </div>
        </div>

        {/* Grille */}
        {myCards.length > 0 ? (
          <CollectionGrid cards={myCards} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 py-20 text-center">
            <div className="mb-4 rounded-full bg-slate-800 p-4">
              <Inbox className="h-8 w-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white">{t("emptyTitle")}</h3>
            <p className="mt-2 max-w-sm text-slate-400">
              {t("emptyDesc")}
            </p>
            <Link
              href="/#sets"
              className="mt-6 inline-flex items-center rounded-lg bg-yellow-500 px-6 py-2.5 font-bold text-slate-900 transition-colors hover:bg-yellow-400"
            >
              {t("exploreButton")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}