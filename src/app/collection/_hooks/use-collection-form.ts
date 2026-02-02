import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";

export const CollectionFormSchema = z.object({
  condition: z.enum(["M", "NM", "EX", "GD", "LP", "PL", "PO"]),
  language: z.enum(["FR", "EN", "JP"]),
  is_graded: z.boolean(),
  grading_service: z.enum(["CGC", "PSA", "BGS", "SGC"]).optional(),
  grade_note: z.string().optional(),
  purchase_price: z.preprocess(
    (v) =>
      v === undefined || (typeof v === "number" && Number.isNaN(v)) ? 0 : v,
    z.number().min(0, "Le prix d'achat doit être positif")
  ),
});

export type CollectionFormData = z.infer<typeof CollectionFormSchema>;

export function useCollectionForm(defaultValues?: Partial<CollectionFormData>) {
  return useForm<CollectionFormData>({
    resolver: zodResolver(CollectionFormSchema) as Resolver<CollectionFormData>,
    defaultValues: {
      condition: "NM",
      language: "EN",
      is_graded: false,
      purchase_price: 0,
      ...defaultValues,
    },
  });
}