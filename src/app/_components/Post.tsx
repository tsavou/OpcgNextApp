import { Post } from "../types";
import { Social } from "./socials/Social";

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  return (
    <div className="flex border-b border-neutral-500 p-4">
      <div className="">
        <img
          src={post.author.avatar ?? ""}
          alt={post.author.pseudo}
          className="inline-block size-14 rounded-full outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
        />
      </div>

      <div className="ml-4">
        <div className="flex items-center gap-2">
          <span className="font-bold">{post.author.pseudo}</span>
          <span className="text-sm text-gray-500">@{post.author.username}</span>
          <span className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div>
          <div className="mt-2">{post.content}</div>
          <div className="mt-2 flex gap-2 flex-wrap max-w-lg">
            {post.pictures?.map((picture) => (
              <img
                key={picture}
                src={picture}
                alt="picture"
                className="rounded-md w-64 h-64"
              />
            ))}
          </div>
        </div>
        <Social
          likes={post.likes ?? 0}
          comments={post.comments ?? 0}
          reposts={post.reposts ?? 0}
        />
      </div>
    </div>
  );
}
