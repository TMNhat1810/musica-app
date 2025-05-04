import { io, Socket } from 'socket.io-client';
import { API } from '../constants';
import { ClientToServerEvents, ServerToClientEvents } from './event';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  API.ENDPOINT,
  {
    autoConnect: false,
    transports: ['websocket'],
  },
);
