"use client";

import { useFruitListSuspenseQuery } from "../../_hooks/queries/use-fruit-list-suspense-query";

export default function FruitList() {
  const { data } = useFruitListSuspenseQuery();

  const fruitQuantities = Object.entries(data);

  if (fruitQuantities.length === 0) {
    return <div>Aucun fruit trouvé</div>;
  }

  return (
    <dl className="grid grid-cols-2 gap-4">
      {fruitQuantities.map(([fruit, quantity]) => (
        <div key={fruit}>
          <dt className="text-sm font-medium text-gray-500">{fruit}</dt>
          <dd className="text-sm text-gray-900">{quantity}</dd>
        </div>
      ))}
    </dl>
  );
}
