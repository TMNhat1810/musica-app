import { User } from './user.interface';

export interface Media {
  id: string;
  title: string;
  description?: string;
  user_id: string;
  media_url: string;
  thumbnail_url?: string;
  type: 'video' | 'audio';
  created_at: Date;
  user: User;
}
