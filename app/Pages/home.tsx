import type { MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import PostCard from "~/components/PostCard";
import { Post } from "~/domain/post";

export const meta: MetaFunction = () => {
  return [
    { title: "Musica" },
    { name: "description", content: "Welcome to Musica!" },
  ];
};

export async function loader() {
  const response = await fetch("http://localhost:8080/posts");
  const posts = await response.json();
   posts.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => {
    const ta = new Date(a.createdAt).getTime();
    const tb = new Date(b.createdAt).getTime();
    return tb - ta;
  });
  return { posts };
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div>
      {posts.map((post: Post) => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
