export interface ClientToServerEvents {
  join: (data: { room: string }) => void;
  leave: (data: { room: string }) => void;
}
