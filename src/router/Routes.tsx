import { Routes, Route } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import MainLayout from '../layouts/main';
import AuthPageLayout from '../layouts/AuthPage';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import AuthProtectedRoute from './protected/auth.protect';
import UploadPage from '../containers/UploadPage';
import UnauthProtectedRoute from './protected/unauth.protect';
import MediaViewPage from '../containers/MediaViewPage';
import ProfilePage from '../containers/ProfilePage';

export default function MusicaRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="" element={<HomePage />} />
        <Route
          path="upload"
          element={
            <AuthProtectedRoute>
              <UploadPage />
            </AuthProtectedRoute>
          }
        />
        <Route path="w/:id" element={<MediaViewPage />} />
        <Route path="p/:id" element={<ProfilePage />} />
      </Route>
      <Route
        path="/auth"
        element={
          <UnauthProtectedRoute>
            <AuthPageLayout />
          </UnauthProtectedRoute>
        }
      >
        <Route index path="sign-in" element={<SignInForm />} />
        <Route path="sign-up" element={<SignUpForm />} />
      </Route>
    </Routes>
  );
}
