import { Post } from "../types";
import { PostCard } from "./Post";
import { posts } from "../db";

export function Feed() {
  return (
    <div className="flex grow">
      <div className="grow max-w-2xl mx-auto border-x border-neutral-500">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
