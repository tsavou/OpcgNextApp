import { Suspense } from "react";
import FruitList from "./_components/FruitList/FruitList";
import FruitListFallback from "./_components/FruitList/FruitListFallback";
import { FruitForm } from "./_components/FruitList/FruitForm";

export default function FruitsPage() {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Ajouter un fruit
        </h2>
        <FruitForm />
      </div>

      <Suspense fallback={<FruitListFallback />}>
        <FruitList />
      </Suspense>
    </div>
  );
}
