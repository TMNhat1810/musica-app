import { User } from './user.interface';

export interface ForumImage {
  id: string;
  url: string;
  forum_post_id: string;
}

export interface ForumPost {
  id: string;
  title: string;
  type: string;
  content: string;
  images: ForumImage[];
  user: User;
  created_at: string;
  updated_at: string;
  _count?: {
    ForumComment: number;
  };
}
