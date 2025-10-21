export interface Post {
  id: string;
  content: string;
  author: User;
  pictures?: string[];
  likes?: number;
  comments?: number;
  reposts?: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  pseudo: string;
  avatar?: string;
}
