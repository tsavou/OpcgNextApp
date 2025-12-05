"use client";

import { usePostFruitMutation } from "../../_hooks/queries/mutations/use-post-fruit-mutation";
import { FruitFormData, useFruitForm } from "../../_hooks/use-fruit-form";
import { SubmitHandler } from "react-hook-form";

export function FruitForm() {
  const form = useFruitForm();

  const { mutate: postFruit, isPending: isPostingFruit } =
    usePostFruitMutation();

  const onSubmit: SubmitHandler<FruitFormData> = ({ fruit, quantity }) => {
    postFruit({
      fruit,
      quantity,
    });
  };

  return (
    <form
      className="flex flex-col items-start gap-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <label htmlFor="fruit">Nom du fruit</label>
      <input
        type="text"
        placeholder="Nom du fruit"
        className="rounded-md border border-gray-300 px-4 py-2"
        {...form.register("fruit")}
      />
      {form.formState.errors.fruit && (
        <p className="text-red-500">{form.formState.errors.fruit.message}</p>
      )}
      <label htmlFor="quantity">Quantité</label>
      <input
        type="number"
        placeholder="Quantité"
        className="rounded-md border border-gray-300 px-4 py-2"
        {...form.register("quantity")}
      />
      {form.formState.errors.quantity && (
        <p className="text-red-500">{form.formState.errors.quantity.message}</p>
      )}
      <button
        type="submit"
        disabled={isPostingFruit}
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        {isPostingFruit ? "Ajout en cours..." : "Ajouter un fruit"}
      </button>
    </form>
  );
}
