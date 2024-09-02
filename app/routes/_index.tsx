import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostCard from "~/components/PostCard";
import { Post } from "~/domain/post";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const response = await fetch("http://localhost:8080/posts");
  const posts = await response.json();
  console.log(posts);
  return { posts };
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Welcome to Musica!</h1>
      {posts.map((post: Post) => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
