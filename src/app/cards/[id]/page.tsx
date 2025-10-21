"use client";

import { Suspense } from "react";
import { useCard } from "@/hooks/useCards";
import { CardDetailSkeleton } from "@/components/CardDetailSkeleton";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface CardDetailPageProps {
  params: Promise<{ id: string }>;
}

function CardDetailContent({ cardId }: { cardId: string }) {
  const { data: cards } = useCard(cardId);

  // Prendre la première carte comme carte principale (ou celle avec le prix le plus bas)
  const mainCard = cards[0];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "C":
        return "bg-gray-100 text-gray-800";
      case "UC":
        return "bg-green-100 text-green-800";
      case "R":
        return "bg-blue-100 text-blue-800";
      case "SR":
        return "bg-purple-100 text-purple-800";
      case "SEC":
        return "bg-yellow-100 text-yellow-800";
      case "P":
        return "bg-pink-100 text-pink-800";
      case "L":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "LEADER":
        return "bg-red-500";
      case "CHARACTER":
        return "bg-blue-500";
      case "EVENT":
        return "bg-green-500";
      case "STAGE":
        return "bg-purple-500";
      case "DON":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getColorBadge = (color: string) => {
    switch (color) {
      case "RED":
        return "bg-red-500";
      case "GREEN":
        return "bg-green-500";
      case "BLUE":
        return "bg-blue-500";
      case "PURPLE":
        return "bg-purple-500";
      case "BLACK":
        return "bg-black";
      case "YELLOW":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-gray-900">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/" className="hover:text-gray-900">
                Catalogue
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900">{mainCard.card_name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image de la carte */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
              {mainCard.card_image ? (
                <Image
                  src={mainCard.card_image}
                  alt={mainCard.card_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  <span>Pas d&apos;image</span>
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${getRarityColor(
                  mainCard.rarity,
                )}`}
              >
                {mainCard.rarity}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${getTypeColor(
                  mainCard.card_type,
                )}`}
              >
                {mainCard.card_type}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${getColorBadge(
                  mainCard.card_color,
                )}`}
              >
                {mainCard.card_color}
              </span>
            </div>
          </div>

          {/* Informations de la carte */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {mainCard.card_name}
              </h1>
              <p className="text-lg text-gray-600">{mainCard.set_name}</p>
            </div>

            {/* Stats principales */}
            <div className="grid grid-cols-2 gap-4">
              {mainCard.card_cost && mainCard.card_cost !== "NULL" && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-1 text-sm font-medium text-gray-600">
                    Coût
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {mainCard.card_cost}
                  </p>
                </div>
              )}
              {mainCard.card_power && mainCard.card_power !== "NULL" && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-1 text-sm font-medium text-gray-600">
                    Puissance
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {mainCard.card_power}
                  </p>
                </div>
              )}
              {mainCard.counter_amount > 0 && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-1 text-sm font-medium text-gray-600">
                    Contre
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {mainCard.counter_amount}
                  </p>
                </div>
              )}
              {mainCard.life && mainCard.life !== "NULL" && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-1 text-sm font-medium text-gray-600">
                    Vie
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {mainCard.life}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {mainCard.card_text && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Effet
                </h3>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="whitespace-pre-wrap text-gray-700">
                    {mainCard.card_text}
                  </p>
                </div>
              </div>
            )}

            {/* Sous-types */}
            {mainCard.sub_types && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Types
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mainCard.sub_types.split(" ").map((type, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Attribut */}
            {mainCard.attribute && mainCard.attribute !== "NULL" && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Attribut
                </h3>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
                  {mainCard.attribute}
                </span>
              </div>
            )}

            {/* Prix */}
            <div className="border-t pt-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Prix du marché
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-1 text-sm font-medium text-green-600">
                    Prix moyen
                  </h4>
                  <p className="text-xl font-bold text-green-900">
                    {mainCard.market_price}€
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-1 text-sm font-medium text-blue-600">
                    Prix inventaire
                  </h4>
                  <p className="text-xl font-bold text-blue-900">
                    {mainCard.inventory_price}€
                  </p>
                </div>
              </div>
            </div>

            {/* Informations techniques */}
            <div className="border-t pt-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Informations techniques
              </h3>
              <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID de la carte:</span>
                  <span className="font-medium">{mainCard.card_set_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Set ID:</span>
                  <span className="font-medium">{mainCard.set_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dernière mise à jour:</span>
                  <span className="font-medium">
                    {new Date(mainCard.date_scraped).toLocaleDateString(
                      "fr-FR",
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Variantes de la carte */}
            {cards.length > 1 && (
              <div className="border-t pt-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Variantes disponibles ({cards.length})
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {cards.map((card, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border-2 p-4 ${
                        index === 0
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">
                          {card.card_name}
                        </h4>
                        {index === 0 && (
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                            Principale
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Prix moyen:</span>
                          <span className="ml-1 font-medium">
                            {card.market_price}€
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Rareté:</span>
                          <span className="ml-1 font-medium">
                            {card.rarity}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">ID:</span>
                          <span className="ml-1 font-medium">
                            {card.card_set_id}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <span className="ml-1 font-medium">
                            {card.card_type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = React.use(params);
  return (
    <Suspense fallback={<CardDetailSkeleton />}>
      <CardDetailContent cardId={id} />
    </Suspense>
  );
}
