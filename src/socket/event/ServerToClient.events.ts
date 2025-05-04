export interface ServerToClientEvents {
  'comment:new': (data: { id: string; content: string }) => void;
  'comment:update': (data: { id: string; content: string }) => void;
  'comment:delete': (data: { id: string; content: string }) => void;

  'reply:new': (data: { id: string; content: string }) => void;
  'reply:update': (data: { id: string; content: string }) => void;
  'reply:delete': (data: { id: string; content: string }) => void;
}
