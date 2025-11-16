import { useSetListSuspenseQuery } from "@/app/sets/hooks/queries/useSetListSuspenseQuery";
import { SetItem } from "./SetItem";

export function SetGrid() {
  const { data } = useSetListSuspenseQuery();
  const sets = data || [];

  if (sets.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-2 text-lg text-gray-400">📦</div>
          <p className="text-gray-600">Aucun set trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sets.map((set) => (
        <SetItem key={set.set_id} set={set} />
      ))}
    </div>
  );
}
