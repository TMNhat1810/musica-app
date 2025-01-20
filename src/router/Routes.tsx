import { Routes, Route } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import MainLayout from '../layouts/main';
import AuthPageLayout from '../layouts/AuthPage';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import AuthProtectedRoute from './protected/auth.protect';

export default function MusicaRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="" element={<HomePage />} />
      </Route>
      <Route
        path="/auth"
        element={
          <AuthProtectedRoute>
            <AuthPageLayout />
          </AuthProtectedRoute>
        }
      >
        <Route index path="sign-in" element={<SignInForm />} />
        <Route path="sign-up" element={<SignUpForm />} />
      </Route>
    </Routes>
  );
}
