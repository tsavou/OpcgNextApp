import Link from "next/link";
import { CardSet } from "@/app/cards/types/card";
import Image from "next/image";
import { getSetColor, getSetImage } from "@/app/cards/helpers/set";

interface SetItemProps {
  set: CardSet;
}

export function SetItem({ set }: SetItemProps) {
  return (
    <Link
      href={`/cards?setId=${encodeURIComponent(set.set_id)}&setName=${encodeURIComponent(set.set_name)}`}
      className={`group bg-gradient-to-br ${getSetColor(set.set_id)} relative aspect-[8/3] overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <Image
        src={getSetImage(set.set_id)}
        alt={set.set_name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain"
      />

      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
    </Link>
  );
}
