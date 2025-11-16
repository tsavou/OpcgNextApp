import Link from "next/link";
import { CardSet } from "@/app/cards/types/card";

interface SetItemProps {
  set: CardSet;
}

export function SetItem({ set }: SetItemProps) {
  // Générer une couleur de fond basée sur le nom du set pour un effet visuel
  const getSetColor = (setId: string) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-red-500 to-red-600",
      "from-green-500 to-green-600",
      "from-yellow-500 to-yellow-600",
      "from-pink-500 to-pink-600",
      "from-indigo-500 to-indigo-600",
      "from-teal-500 to-teal-600",
    ];
    const hash = setId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <Link
      href={`/cards?setId=${encodeURIComponent(set.set_id)}&setName=${encodeURIComponent(set.set_name)}`}
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getSetColor(set.set_id)} opacity-90`}
      />

      <div className="relative p-6 text-white">
        <div className="mb-3">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            {set.set_id}
          </span>
        </div>

        <h3 className="mb-2 text-xl leading-tight font-bold transition-colors group-hover:text-yellow-200">
          {set.set_name}
        </h3>

        <div className="mt-4 flex items-center text-sm opacity-90">
          <span className="mr-2">Voir les cartes</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
    </Link>
  );
}
