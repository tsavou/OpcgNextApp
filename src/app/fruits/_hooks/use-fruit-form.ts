import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FruitFormSchema = z
  .object({
    fruit: z
      .string("Veuillez entrer un nom de fruit")
      .nonempty("Veuillez fournir un nom de fruit"),
    quantity: z.coerce
      .number("Veuillez entrer une quantité")
      .positive("Veuillez entrer une quantité positive"),
  })
  .required();

export type FruitFormData = z.infer<typeof FruitFormSchema>;

export function useFruitForm() {
  return useForm({
    resolver: zodResolver(FruitFormSchema),
  });
}
