import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
            🏴‍☠️ OnePiece TCG Manager
          </h1>
          <p className="mb-8 text-xl text-blue-100 md:text-2xl">
            Explorez et gérez votre collection de cartes One Piece TCG
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cards"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 transition-all hover:scale-105 hover:shadow-xl"
            >
              Voir toutes les cartes
            </Link>
            <Link
              href="#sets"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold transition-all hover:scale-105 hover:bg-white/10"
            >
              Explorer les sets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
