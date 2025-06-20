export interface PostFromUserPage {
  id: string;
  title: string;
  content?: string;
  userClientId: string;
  music: {
    description: string;
    image: string;
    title: string;
    url: string;
  };
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface User {
  id: string;
  username: string;
  userInfo?: string;
  userIconUrl?: string;
  userClientId: string;
  posts: PostFromUserPage[];
}
