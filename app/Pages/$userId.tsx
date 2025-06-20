import { useLoaderData } from 'react-router';
import PostCardFromUser from '~/components/PostCardFromUser';
import { User } from '~/domain/postFromUserPage';
import { UserId } from '~/domain/value-object/primary-id.vo';

/**
 * Loader function for config-based routing.
 * Retrieves the user data based on the URL parameter userId.
 */
export async function loader({ params }: { params: { userId: UserId } }) {
  const response = await fetch(`http://localhost:8080/users/${params.userId}`);
  if (!response.ok) {
    throw new Response(null, { status: response.status });
  }
  return response.json();
}

export default function UserProfile() {
  const user: User = useLoaderData();
  const sortedPosts = user.posts.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // Sort by createdAt in descending order
  });
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <img
            src={user.userIconUrl || 'https://tmicfifqruiiqpqiemji.supabase.co/storage/v1/object/public/usericon//default.png'}
            alt={user.username}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white mb-4 sm:mb-0 sm:mr-6"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-200">@{user.userClientId}</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-auto lg: mr-auto border-l-2 border-gray-200 pl-4">
            {user.userInfo}
          </div>
        </div>

        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Favorite Music</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedPosts.map(post => (
              <li key={post.id} className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition">
                <PostCardFromUser post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
