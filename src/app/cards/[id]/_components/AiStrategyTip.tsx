"use client";

import { useCollectionQuery } from "../../hooks/queries/use-collection-query";
import { Sparkles, Bot } from "lucide-react";

interface AiStrategyTipProps {
  cardId: string;
}

export function AiStrategyTip({ cardId }: AiStrategyTipProps) {
  // On récupère la donnée en temps réel (si Make met à jour, ça s'affichera)
  const { data: collectionItem } = useCollectionQuery(cardId);
  const tip = collectionItem?.strategy_tip;
  console.log(cardId);

  // Si pas de conseil, on n'affiche rien du tout
  if (!tip) return null;

  return (
    <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative overflow-hidden rounded-xl border border-indigo-500/30 bg-slate-900/50 p-4 shadow-xl backdrop-blur-sm">
        
        {/* Effet de brillance en arrière-plan */}
        <div className="absolute -right-10 -top-10 h-24 w-24 bg-indigo-500/20 blur-3xl" />
        
        {/* En-tête du composant */}
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
            <Bot className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300">
            Conseil Tactique
          </h3>
          <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
        </div>

        {/* Le texte du conseil */}
        <p className="relative z-10 text-sm leading-relaxed text-slate-300">
          <span className="text-indigo-400 text-lg font-serif">&quot;</span>
          {tip}
          <span className="text-indigo-400 text-lg font-serif">&quot;</span>
        </p>
        
        <div className="mt-2 text-[10px] text-slate-500 text-right">
          Généré par Gemini AI
        </div>
      </div>
    </div>
  );
}