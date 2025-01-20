import { Routes, Route } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import MainLayout from '../layouts/main';
import SignInPage from '../containers/SignInPage';

export default function MusicaRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="/" element={<HomePage />} />
      </Route>
      <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  );
}
