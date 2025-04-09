// app/routes/users/$userId.tsx
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  const { userId } = params;
  if (!userId) {
    throw new Error("User ID is required");
  }
  // ここでAPIからユーザーデータを取得する
  const response = await fetch(`http://localhost:8080/users/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  const user = await response.json();
  if (!user) {
    throw new Error("User not found");
  }
  // 取得したユーザーデータを返す
  console.log(user);
  return { user };
};

export default function UserPage() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {user.id}</p>
      <p>Username: {user.username}</p>
      <p>Bio: {user.bio}</p>
      <p>posts:{user.posts}</p>
    </div>
  );
}
