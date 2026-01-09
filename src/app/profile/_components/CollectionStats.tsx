"use client";

import { useTranslations } from "next-intl";
import { LibraryBig, Layers, TrendingUp, Star } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  color: "sky" | "yellow" | "green" | "purple";
}

function StatCard({ icon, label, value, subtitle, color }: StatCardProps) {
  const colorClasses = {
    sky: "bg-sky-50 text-sky-600 border-sky-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };

  return (
    <div
      className={`rounded-xl border p-6 transition-all hover:shadow-md ${colorClasses[color]}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={`rounded-lg bg-white p-2 shadow-sm`}>{icon}</div>
      </div>
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="mt-1 text-sm font-medium opacity-80">{label}</p>
        {subtitle && (
          <p className="mt-1 text-xs opacity-60">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export function CollectionStats() {
  const t = useTranslations("global");

  // TODO: Remplacer par des données réelles depuis Supabase
  // Pour l'instant, on affiche des valeurs de démonstration
  const stats = {
    totalCards: 0,
    totalSets: 0,
    collectionValue: 0,
    rareCards: 0,
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-xl font-bold text-gray-900">
        Statistiques de collection
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<LibraryBig className="h-6 w-6" />}
          label="Cartes totales"
          value={stats.totalCards}
          subtitle="Dans votre collection"
          color="sky"
        />
        <StatCard
          icon={<Layers className="h-6 w-6" />}
          label="Sets collectés"
          value={stats.totalSets}
          subtitle="Sets différents"
          color="yellow"
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6" />}
          label="Valeur estimée"
          value={`${stats.collectionValue.toLocaleString("fr-FR")} €`}
          subtitle="Prix du marché"
          color="green"
        />
        <StatCard
          icon={<Star className="h-6 w-6" />}
          label="Cartes rares"
          value={stats.rareCards}
          subtitle="SR, SEC, SP"
          color="purple"
        />
      </div>

      {stats.totalCards === 0 && (
        <div className="mt-6 rounded-lg bg-amber-50 p-4 text-center">
          <p className="text-sm text-amber-800">
            Commencez à ajouter des cartes à votre collection pour voir vos
            statistiques !
          </p>
        </div>
      )}
    </div>
  );
}

