import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CollectionFormSchema = z.object({
  quantity: z.number().int().min(0, "La quantité ne peut pas être négative"),
});

export type CollectionFormData = z.infer<typeof CollectionFormSchema>;

export function useCollectionForm(defaultQuantity: number = 0) {
  return useForm<CollectionFormData>({
    resolver: zodResolver(CollectionFormSchema),
    defaultValues: {
      quantity: defaultQuantity,
    },
  });
}