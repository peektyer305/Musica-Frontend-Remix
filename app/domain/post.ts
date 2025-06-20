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
  userClientId: string;
  imageUrl?: string;
  userIconUrl?: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}
