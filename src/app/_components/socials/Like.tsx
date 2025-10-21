"use client";

import { HeartIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  likes: number;
}

export function Like({ likes }: Props) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setCount(count + (liked ? -1 : 1));
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button className="flex items-center gap-2" onClick={handleLike}>
        <HeartIcon fill={liked ? "white" : "none"} />
        {count}
      </button>
    </div>
  );
}
