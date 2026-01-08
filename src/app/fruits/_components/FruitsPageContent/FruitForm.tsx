"use client";

import { useTranslations } from "next-intl";
import { SubmitHandler } from "react-hook-form";
import { usePostFruitMutation } from "../../_hooks/mutations/use-post-fruit-mutation";
import { FruitFormFields, useFruitForm } from "../../_hooks/use-fruit-form";
import { Input } from "@/app/_components/Input";

export function FruitForm() {
	const t = useTranslations("fruits.form");

	const { mutateAsync: postFruit } = usePostFruitMutation();

	const form = useFruitForm();

	const onSubmit: SubmitHandler<FruitFormFields> = async ({
		fruit,
		quantity,
	}) => {
		try {
			await postFruit(
				{
					fruit,
					quantity,
				},
				{
					onSuccess: () => {
						form.reset();
					},
				},
			);
		} catch {
			// No error handling for now
		}
	};

	return (
		<form
			className="flex flex-col gap-2 p-4 text-lg rounded-md border border-gray-300"
			onSubmit={form.handleSubmit(onSubmit)}
		>
			<Input
				label={t("fruitField.label")}
				error={form.formState.errors.fruit?.message}
				{...form.register("fruit")}
			/>
			<Input
				label={t("quantityField.label")}
				error={form.formState.errors.quantity?.message}
				{...form.register("quantity")}
			/>
			<button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors" disabled={form.formState.isSubmitting} type="submit">
				{form.formState.isSubmitting
					? t("submitButton.loadingLabel")
					: t("submitButton.label")}
			</button>
		</form>
	);
}
