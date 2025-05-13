import { ForumPost } from './forum-post.interface';
import { Media } from './media.interface';

export interface ViewLog {
  id: string;
  link_to_media?: string;
  link_to_forum?: string;
  media?: Media;
  forum?: ForumPost;
  created_at: string;
  updated_at: string;
  action: 'view_media' | 'view_forum';
}

export interface LikeLog {
  id: string;
  link_to_media?: string;
  link_to_forum?: string;
  media?: Media;
  forum?: ForumPost;
  created_at: string;
  updated_at: string;
  action: 'like_media' | 'like_forum';
}
