import { Media } from './media.interface';

export interface Notification {
  id: string;
  media_id: string;
  user_id: string;
  is_read: boolean;
  type: 'NEW_MEDIA_UPLOAD' | 'NEW_COMMENT';
  media: Media;
  created_at: Date;
}
