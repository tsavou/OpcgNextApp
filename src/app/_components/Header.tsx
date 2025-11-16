import Link from "next/link";

export function Header() {
  return (
    <header className="h-15 w-full bg-gray-100 px-4">
      <div className="flex h-full items-center justify-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/cards">Cartes</Link>
        <Link href="/collection">Collection</Link>
      </div>
    </header>
  );
}
