import { Comment, ForumComment } from '../../common/interfaces';

export interface ServerToClientEvents {
  'comment:new': (data: Comment | ForumComment) => void;
  'comment:update': (data: Comment | ForumComment) => void;
  'comment:delete': (data: Comment | ForumComment) => void;

  'reply:new': (data: Comment | ForumComment) => void;
  'reply:update': (data: Comment | ForumComment) => void;
  'reply:delete': (data: Comment | ForumComment) => void;
}
