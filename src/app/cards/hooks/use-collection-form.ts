import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CollectionFormSchema = z.object({
  quantity: z.number().int().min(0, "La quantité doit être positive"),
  condition: z.enum(["M", "NM", "EX", "GD", "LP", "PL", "PO"]),
  language: z.enum(["FR", "EN", "JP"]),
  notes: z.string().optional(),
  purchase_price: z.number().min(0, "Le prix d'achat doit être positif").optional(),
});

export type CollectionFormData = z.infer<typeof CollectionFormSchema>;

export function useCollectionForm(defaultQuantity: number = 0) {
  return useForm<CollectionFormData>({
    resolver: zodResolver(CollectionFormSchema),
    defaultValues: {
      quantity: defaultQuantity,
      condition: "NM",
      language: "EN",
    },
  });
}