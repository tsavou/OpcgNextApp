import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import z from "zod";

function createFruitFormSchema(
	t: ReturnType<typeof useTranslations<"fruits.form">>,
) {
	return z.object({
		fruit: z.string().min(1, t("fruitField.errors.empty")),
		quantity: z.coerce
			.number<number>(t("quantityField.errors.type"))
			.positive(t("quantityField.errors.sign")),
	});
}

export type FruitFormFields = z.infer<ReturnType<typeof createFruitFormSchema>>;

export function useFruitForm() {
	const t = useTranslations("fruits.form");

	return useForm<FruitFormFields>({
		resolver: zodResolver(createFruitFormSchema(t)),
	});
}
