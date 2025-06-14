/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import useEmblaCarousel from "embla-carousel-react";
import { PostFromUserPage } from "~/domain/postFromUserPage";
import { buildUrl } from "~/utils/buildUrl";
import "../styles/embla.css";
import { formatDate } from "~/utils/formatDate";


export default function PostCard(props: { post: PostFromUserPage }) {
  const imageUrl = props.post.imageUrl
    ? buildUrl({ Scheme: "https", Host: props.post.imageUrl, Path: "" })
    : null;
  const [emblaRef] = useEmblaCarousel();
  const formattedCreatedAt = formatDate(props.post.createdAt);
  return (
    <div className="w-auto border rounded-lg shadow-sm text-wrap whitespace-normal break-words">
      <div className="p-4 flex items-center">
        <div className="whitespace-nowrap truncate">{props.post.music.title}</div>
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
      {/*<div className="ml-auto">{props.post.music.description}</div>*/}
      </div>
      <div className="px-4 pb-4">
        <span className="font-semibold mr-2 whitespace-nowrap truncate">{props.post.title}</span>
        <br />
        <span className="text-pretty whitespace-nowrap truncate">{props.post.content}</span>
        <br />
        <span className="text-gray-500">{formattedCreatedAt}</span>
      </div>
    </div>
  );
}
