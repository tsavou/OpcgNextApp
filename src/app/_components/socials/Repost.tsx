"use client";

import { HeartIcon, Repeat2 } from "lucide-react";
import { useState } from "react";

interface Props {
  reposts: number;
}

export function Repost({ reposts }: Props) {
  const [reposted, setReposted] = useState(false);
  const [count, setCount] = useState(reposts);

  const handleRepost = () => {
    setReposted(!reposted);
    setCount(count + (reposted ? -1 : 1));
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button className="flex items-center gap-2" onClick={handleRepost}>
        <Repeat2 className={reposted ? "text-emerald-400" : "text-white"} />
        {count}
      </button>
    </div>
  );
}
