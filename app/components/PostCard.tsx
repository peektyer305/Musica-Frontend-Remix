/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import useEmblaCarousel from "embla-carousel-react";
import { Post } from "~/domain/post";
import { buildUrl } from "~/utils/buildUrl";
import "../styles/embla.css";

export default function PostCard(props: { post: Post }) {
  const imageUrl = props.post.imageUrl ? buildUrl(props.post.imageUrl) : null;
  const userIconUrl = props.post.userIconUrl
    ? buildUrl(props.post.userIconUrl)
    : null;
  const [emblaRef] = useEmblaCarousel();
  return (
    <div className="w-auto border rounded-lg shadow-sm text-wrap whitespace-normal break-words">
      <div className="p-4 flex items-center">
        {userIconUrl && (
          <img
            src={userIconUrl}
            alt="profile"
            className="rounded-full h-8 w-8 object-cover"
          />
        )}
        <div className="ml-2 font-semibold">{props.post.userName}</div>
        <div className="ml-10">{props.post.music.title}</div>
      </div>
      <div className="embla my-2" ref={emblaRef}>
        <div className="embla__container w-full">
          <div className="embla__slide">
            <a href={props.post.music.url} target="_blank" rel="noreferrer">
              <img src={props.post.music.image} alt="Image 1" />
            </a>
          </div>
          {imageUrl && (
            <div className="embla__slide">
              <img src={imageUrl} alt="Image 2 optional" />
            </div>
          )}
        </div>
        <div className="ml-auto">{props.post.music.description}</div>
      </div>
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
