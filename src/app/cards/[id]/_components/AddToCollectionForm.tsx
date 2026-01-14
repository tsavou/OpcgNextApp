"use client";

import { useEffect } from "react";
import { useCollectionForm, CollectionFormData } from "@/app/cards/hooks/use-collection-form";
import { useUpdateCollectionMutation } from "../../hooks/queries/mutations/use-update-collection-mutation";
import { useCollectionQuery } from "../../hooks/queries/use-collection-query";
import { Loader2, Plus, Minus, Check } from "lucide-react";
import { useAuth } from "@/app/auth/_hooks/use-auth";
import { useRouter } from "next/navigation";
import { Card } from "@/app/cards/types/card";
import { getCardUniqueId } from "../../helpers/card";

interface AddToCollectionFormProps {
  card: Card;
}

  export function AddToCollectionForm({ card }: AddToCollectionFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  
  // 1. Récupérer la donnée (Query)
  const { data: collectionItem, isLoading: isLoadingQuery } = useCollectionQuery(getCardUniqueId(card));
  const currentQuantity = collectionItem?.quantity ?? 0;

  // 2. Initialiser le formulaire (Form Hook)
  const form = useCollectionForm(currentQuantity);
  
  // 3. Préparer la mutation (Mutation Hook)
  const { mutate: updateCollection, isPending: isUpdating } = useUpdateCollectionMutation();

  // Mettre à jour le formulaire quand la donnée arrive de la BDD
  useEffect(() => {
    form.setValue("quantity", currentQuantity);
  }, [currentQuantity, form]);

  // Fonction de soumission
  const onSubmit = (data: CollectionFormData) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    updateCollection({ card, quantity: data.quantity });
  };

  // Handlers pour les boutons (Simulent la soumission du form)
  const handleIncrement = () => {
    const newVal = form.getValues("quantity") + 1;
    form.setValue("quantity", newVal);
    form.handleSubmit(onSubmit)();
  };

  const handleDecrement = () => {
    const current = form.getValues("quantity");
    if (current > 0) {
      const newVal = current - 1;
      form.setValue("quantity", newVal);
      form.handleSubmit(onSubmit)();
    }
  };

  if (isLoadingQuery) {
    return <div className="h-12 w-32 animate-pulse rounded-xl bg-slate-800" />;
  }

  // AFFICHAGE 1 : Bouton "Ajouter" (Si quantité 0)
  if (currentQuantity === 0) {
    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Champ caché pour que react-hook-form gère la donnée */}
        <input type="hidden" {...form.register("quantity")} value={1} />
        
        <button
          onClick={() => {
             // On force la valeur à 1 avant de submit
             form.setValue("quantity", 1); 
          }}
          disabled={isUpdating}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:scale-[1.01] disabled:opacity-50"
        >
          {isUpdating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
          Ajouter à ma collection
        </button>
      </form>
    );
  }

  // AFFICHAGE 2 : Compteur (Si quantité > 0)
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="flex w-full items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-2">
        <div className="flex items-center justify-between flex-1">
          <button
            type="button" // Important: type button pour ne pas submit le form nativement
            onClick={handleDecrement}
            disabled={isUpdating}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-900 shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="font-bold text-slate-900 text-xl tabular-nums min-w-[3rem] text-center">
            {isUpdating ? <Loader2 className="h-5 w-5 animate-spin mx-auto text-green-600" /> : currentQuantity}
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={isUpdating}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm hover:bg-slate-800 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <div className="hidden sm:flex items-center gap-1 pr-2 text-xs font-semibold text-green-700 uppercase tracking-wide">
          <Check className="h-4 w-4" />
          Possédée
        </div>
      </div>
    </form>
  );
}