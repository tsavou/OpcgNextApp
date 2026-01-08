"use client";

import { useFruitListSuspenseQuery } from "@/app/fruits/_hooks/queries/use-fruit-list-suspense-query";
import { useTranslations } from "next-intl";
import { useId } from "react";

export function FruitList() {
	const t = useTranslations("fruits.list");

	const listLabelId = useId();

	const { data } = useFruitListSuspenseQuery();

	const fruitQuantities = Object.entries(data);

	if (fruitQuantities.length === 0) {
		return <p>{t("noFruits")}</p>;
	}

	return (
		<div className="flex flex-col gap-2 p-4 rounded-md border border-gray-300">
			<p className="text-lg font-medium" id={listLabelId}>{t("title")}</p>
			<dl aria-labelledby={listLabelId}>
				{fruitQuantities.map(([fruit, quantity]) => (
					<div key={fruit} className="flex gap-2 items-center">
						<dt className="text-sm font-medium">{fruit}</dt>
						<dd className="text-sm font-medium">x {quantity}</dd>
					</div>
				))}
			</dl>
		</div>
	);
}
