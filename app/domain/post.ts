import { Url } from "~/interface/url";

export interface Post {
  id: string;
  userId: string;
  title: string;
  content?: string;
  music: {
    description: string;
    image: string;
    title: string;
    url: string;
  };
  imageUrl?: Url;
  userIconUrl?: Url;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}
