import type { MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import PostCard from "~/components/PostCard";
import type { Post } from "~/domain/post";

export const meta: MetaFunction = () => [
  { title: "Musica" },
  { name: "description", content: "Welcome to Musica!" },
];

export async function loader() {
  const response = await fetch("http://localhost:8080/posts");
  const posts: Post[] = await response.json();

  // 最新順（降順）にソート
  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return { posts };
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
