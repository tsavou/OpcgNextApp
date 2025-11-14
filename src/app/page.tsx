"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-2xl font-bold">Home</h1>
      <p className="text-gray-600">Welcome to the home page</p>
      <Link href="/cards">Cards</Link>
    </div>
  );
}
