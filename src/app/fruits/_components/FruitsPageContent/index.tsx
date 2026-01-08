import { Suspense } from "react";
import { FruitForm } from "./FruitForm";
import { FruitList } from "./FruitList/FruitList";
import { FruitListFallback } from "./FruitList/FruitListFallback";

export function FruitsPageContent() {
	return (
		<div className="flex flex-col justify-center w-full max-w-md mx-auto gap-4">
			<FruitForm />
			<Suspense fallback={<FruitListFallback />}>
				<FruitList />
			</Suspense>
		</div>
	);
}
