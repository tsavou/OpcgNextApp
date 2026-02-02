"use client";

import { useState } from "react";
import { Card } from "@/app/cards/types/card";
import { useAddToCollectionMutation } from "../../cards/hooks/queries/mutations/use-add-to-collection-mutation";
import { CollectionFormData, useCollectionForm } from "../../cards/hooks/use-collection-form";
import { Loader2, Save } from "lucide-react";
import { Modal } from "@/app/_components/Modal";
import { FormSelect } from "@/app/_components/form/FormSelect";
import { FormInput } from "@/app/_components/form/FormInput";


interface AddToCollectionFormModalProps {
  card: Card;
  children: React.ReactNode;
}

export function AddToCollectionFormModal({ card, children }: AddToCollectionFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const { mutate: addToCollection, isPending } = useAddToCollectionMutation();

  const form = useCollectionForm();

  const onSubmit = (formData: CollectionFormData) => {
    addToCollection({ card, formData }, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      }
    });
  };

  const isGraded = form.watch("is_graded");

  return (
    <>
      <span
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="inline-block cursor-pointer"
      >
        {children}
      </span>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Ajouter à la collection"
      >
        <div className="mb-6 -mt-2 flex gap-3 items-center p-3 bg-slate-800/50 rounded-lg border border-slate-800">
           {card.card_image && (
             <img src={card.card_image} alt="" className="w-8 h-11 object-contain rounded shadow-sm" />
           )}
           <div>
             <p className="text-sm font-bold text-white">{card.card_name}</p>
             <p className="text-xs text-slate-400">{card.card_set_id}</p>
           </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            
            <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="État"
              {...form.register("condition")}
              error={form.formState.errors.condition?.message}
              options={[
                { label: "Mint", value: "M" },
                { label: "Near Mint", value: "NM" },
                { label: "Excellent", value: "EX" },
                { label: "Good", value: "GD" },
                { label: "Lightly Played", value: "LP" },
                { label: "Played", value: "PL" },
                { label: "Poor", value: "PO" },
              ]}
            />

            <FormSelect
              label="Langue"
              {...form.register("language")}
              error={form.formState.errors.language?.message}
              options={[
                { label: "Français 🇫🇷", value: "FR" },
                { label: "Anglais 🇬🇧", value: "EN" },
                { label: "Japonais 🇯🇵", value: "JP" },
              ]}
            />
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
               <div className="flex items-center gap-2">
                 <input 
                   type="checkbox" 
                   id="check_graded_modal"
                   {...form.register("is_graded")}
                   className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-yellow-500 focus:ring-yellow-500"
                 />
                 <label htmlFor="check_graded_modal" className="text-sm font-medium cursor-pointer select-none">Carte Gradée / Notée</label>
               </div>

               {isGraded && (
                 <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-1">
                    <FormSelect
                      label="Service de gradage"
                      {...form.register("grading_service")}
                      error={form.formState.errors.grading_service?.message}
                      options={[
                        { label: "PSA", value: "PSA" },
                        { label: "BGS", value: "BGS" },
                        { label: "CGC", value: "CGC" },
                        { label: "PCA", value: "PCA" },
                      ]}
                    />
                    <FormInput
                      label="Note"
                      {...form.register("grade_note")}
                      error={form.formState.errors.grade_note?.message}
                      type="number"
                      step="1"
                      min="1"
                      max="10"
                    />
                 </div>
               )}
            </div>

            <FormInput
              label="Prix d'achat"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...form.register("purchase_price", { valueAsNumber: true })}
              error={form.formState.errors.purchase_price?.message}
              suffix="€"
            />

            <div className="pt-4 border-t border-slate-800">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                Ajouter à ma collection
              </button>
            </div>
          </form>
      </Modal>
    </>
  );
}