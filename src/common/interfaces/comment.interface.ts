import { User } from './user.interface';

export interface Comment {
  id: string;
  content: string;
  user_id: string;
  media_id?: string;
  community_post_id?: string;
  reply_to?: string;
  created_at: Date;
  updated_at: Date;
  replies: Comment[];
  user: User;
}
