"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

interface Props {
  comments: number;
}

export function Comments({ comments }: Props) {
  const [commented, setCommented] = useState(false);
  const [count, setCount] = useState(comments);

  const handleLike = () => {
    setCommented(!commented);
    setCount(count + (commented ? -1 : 1));
  };

  return (
    <div className="mt-2 flex items-center gap-2">
      <button className="flex items-center gap-2" onClick={handleLike}>
        <MessageCircle fill={commented ? "white" : "none"} />
        {count}
      </button>
    </div>
  );
}
