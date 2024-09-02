/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Post } from "~/domain/post";
import { buildUrl } from "~/utils/buildUrl";

export default function PostCard(props: { post: Post }) {
  const imageUrl = props.post.imageUrl ? buildUrl(props.post.imageUrl) : null;
  const userIconUrl = props.post.userIconUrl
    ? buildUrl(props.post.userIconUrl)
    : null;
  return (
    <div className="border rounded-lg shadow-sm text-wrap whitespace-normal break-words">
      <div className="p-4 flex items-center">
        {userIconUrl && (
          <img
            src={userIconUrl}
            alt="profile"
            className="rounded-full h-8 w-8 object-cover"
          />
        )}
        <div className="ml-2 font-semibold">{props.post.userName}</div>
      </div>
      <div className="flex justify-center">
        <img
          src={props.post.music.image}
          alt="Image 1"
          className="w-auto h-auto"
        />
      </div>{" "}
      {imageUrl && (
        <div className="flex justify-center items-center">
          <a href={imageUrl}>
            <img
              src={imageUrl}
              alt="Image 2 optional"
              className="w-auto h-auto"
            />
          </a>
        </div>
      )}
      <div className="px-4 pb-4">
        <span className="font-semibold mr-2">{props.post.title}</span>
        <br />
        <span className="text-pretty">{props.post.content}</span>
        <br />
        <span>{props.post.createdAt.toString()}</span>
      </div>
    </div>
  );
}
