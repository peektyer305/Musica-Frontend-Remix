/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import useEmblaCarousel from "embla-carousel-react";
import { Post } from "~/domain/post";
import "../styles/embla.css";
import { Link } from "react-router";
import { formatDate } from "~/utils/formatDate";

export default function PostCard(props: { post: Post }) {
  const { post } = props;
  const [emblaRef] = useEmblaCarousel({ loop: false });
  const formattedCreatedAt = formatDate(post.createdAt);
  return (
    <div className="bg-white border rounded-lg shadow-lg overflow-hidden flex flex-col w-full max-w-xs mx-auto mb-8">
      {/* User Info */}
      <div className="flex items-center p-4 bg-gray-100">
        <Link to={`/users/${post.userId}`} className="flex items-center">
          {post.userIconUrl && (
            <img
              src={post.userIconUrl}
              alt={post.userName}
              className="h-12 w-12 rounded-full object-cover"
            />
          )}
          <div className="ml-3 text-base font-semibold truncate max-w-[140px]">
            {post.userName}
          </div>
        </Link>
        <div className="ml-auto text-xs text-gray-600 whitespace-nowrap">
          {formattedCreatedAt}
        </div>
      </div>

      {/* Image Carousel in Square */}
      <div className="relative w-full aspect-square" ref={emblaRef}>
        <div className="absolute inset-0 flex">
          <div className="embla__slide flex-shrink-0 w-full">
            <a href={post.music.url} target="_blank" rel="noreferrer">
              <img
                src={post.music.image}
                alt={post.music.title}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          {post.imageUrl && (
            <div className="embla__slide flex-shrink-0 w-full">
              <img
                src={post.imageUrl}
                alt="Optional"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col space-y-2">
        <h3 className="text-lg font-bold truncate">{post.music.title}</h3>
        <p className="text-sm text-gray-700 line-clamp-3">{post.music.description}</p>
        <h4 className="text-base font-semibold truncate">{post.title}</h4>
        <p className="text-gray-600 text-sm line-clamp-4">{post.content}</p>
      </div>
    </div>
  );
}
