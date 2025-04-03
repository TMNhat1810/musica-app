import { User } from './user.interface';

export interface ForumComment {
  id: string;
  content: string;
  user_id: string;
  post_id?: string;
  reply_to?: string;
  created_at: Date;
  updated_at: Date;
  replies: ForumComment[];
  user: User;
}
