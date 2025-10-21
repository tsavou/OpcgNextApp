"use client";

import { Comments } from "./Comments";
import { Like } from "./Like";
import { Repost } from "./Repost";

interface Props {
  likes: number;
  comments: number;
  reposts: number;
}

export function Social({ likes, comments, reposts }: Props) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <Like likes={likes} />
      <Comments comments={comments} />
      <Repost reposts={reposts} />
    </div>
  );
}
