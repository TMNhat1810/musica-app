import { BrowserRouter } from 'react-router-dom';
import MusicaRoutes from './Routes';

export default function MusicaRouter() {
  return (
    <BrowserRouter>
      <MusicaRoutes />
    </BrowserRouter>
  );
}
