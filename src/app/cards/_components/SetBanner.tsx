"use client";

import Image from "next/image";
import { getSetColor, getSetImage } from "../helpers/set";
import { useSearchParams } from "next/navigation";

export function SetBanner() {
  const searchParams = useSearchParams();
  const setId = searchParams.get("setId");
  const setName = searchParams.get("setName");

  if (!setId || !setName) {
    return null;
  }

  return (
    <div
      className={`bg-gradient-to-br ${getSetColor(setId)} mb-6 max-h-80 w-full overflow-hidden py-4 shadow-lg`}
    >
      <Image
        src={getSetImage(setId)}
        alt={setName}
        height={720}
        width={1080}
        className="mx-auto object-contain"
      />
    </div>
  );
}
