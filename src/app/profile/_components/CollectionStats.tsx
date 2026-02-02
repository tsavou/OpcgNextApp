"use client";

import { LibraryBig, Layers, TrendingUp, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCollectionStatsQuery } from "../../collection/_hooks/queries/use-collection-stats-query";
import { Skeleton } from "@/app/_components/Skeleton";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  color: "sky" | "yellow" | "green" | "purple";
}

function StatCard({ icon, label, value, subtitle, color }: StatCardProps) {
  const colorClasses = {
    sky: "bg-sky-900/30 text-sky-400 border-sky-700 hover:shadow-sky-500/20",
    yellow:
      "bg-yellow-900/30 text-yellow-400 border-yellow-700 hover:shadow-yellow-500/20",
    green:
      "bg-green-900/30 text-green-400 border-green-700 hover:shadow-green-500/20",
    purple:
      "bg-purple-900/30 text-purple-400 border-purple-700 hover:shadow-purple-500/20",
  };

  return (
    <div
      className={`rounded-xl border p-6 backdrop-blur-sm transition-all hover:shadow-lg ${colorClasses[color]}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={`rounded-lg bg-slate-800/50 p-2 shadow-sm`}>{icon}</div>
      </div>
      <div>
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="mt-1 text-sm font-medium opacity-80">{label}</p>
        {subtitle && <p className="mt-1 text-xs opacity-60">{subtitle}</p>}
      </div>
    </div>
  );
}

export function CollectionStats() {
  const t = useTranslations("profile");
  const { data: stats, isLoading, error } = useCollectionStatsQuery();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm">
        <h3 className="mb-6 text-xl font-bold text-white">
          {t("collectionStats")}
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-700/50 bg-red-900/20 p-6 shadow-lg backdrop-blur-sm">
        <h3 className="mb-6 text-xl font-bold text-white">
          {t("collectionStats")}
        </h3>
        <p className="text-sm text-red-400">
          Erreur lors du chargement des statistiques
        </p>
      </div>
    );
  }

  const statsData = stats || {
    totalCards: 0,
    totalSets: 0,
    collectionValue: 0,
    rareCards: 0,
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm">
      <h3 className="mb-6 text-xl font-bold text-white">
        {t("collectionStats")}
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<LibraryBig className="h-6 w-6" />}
          label={t("totalCards")}
          value={statsData.totalCards}
          subtitle={t("inYourCollection")}
          color="sky"
        />
        <StatCard
          icon={<Layers className="h-6 w-6" />}
          label={t("collectedSets")}
          value={statsData.totalSets}
          subtitle={t("differentSets")}
          color="yellow"
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6" />}
          label={t("estimatedValue")}
          value={`${statsData.collectionValue.toLocaleString("fr-FR")} €`}
          subtitle={t("marketPrice")}
          color="green"
        />
        <StatCard
          icon={<Star className="h-6 w-6" />}
          label={t("rareCards")}
          value={statsData.rareCards}
          subtitle={t("rareCardsSubtitle")}
          color="purple"
        />
      </div>

      {statsData.totalCards === 0 && (
        <div className="mt-6 rounded-lg border border-yellow-700/50 bg-yellow-900/20 p-4 text-center backdrop-blur-sm">
          <p className="text-sm text-yellow-400">{t("emptyCollection")}</p>
        </div>
      )}
    </div>
  );
}
