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
import SearchResultPage from '../containers/SearchResultPage';
import PostViewPage from '../containers/Forum/PostViewPage';
import Forum from '../containers/Forum';
import ForumLayout from '../layouts/forum';
import PostWritingPage from '../containers/Forum/PostWritingPage';
import PostEditPage from '../containers/Forum/PostEditPage';
import NotFoundPage from '../containers/NotFoundPage';
import HistoryPage from '../containers/HistoryPage';
import AdminPage from '../containers/AdminPage';
import AdminLayout from '../layouts/admin';
import FollowingPage from '../containers/FollowingPage';
import LikedMediaPage from '../containers/LikedMediaPage/LikedMediaPage';

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
        <Route path="r" element={<SearchResultPage />} />
        <Route
          path="history"
          element={
            <AuthProtectedRoute>
              <HistoryPage />
            </AuthProtectedRoute>
          }
        />
        <Route path="follow">
          <Route
            index
            path=""
            element={
              <AuthProtectedRoute>
                <FollowingPage />
              </AuthProtectedRoute>
            }
          />
        </Route>
        <Route
          path="liked"
          element={
            <AuthProtectedRoute>
              <LikedMediaPage />
            </AuthProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="forum" element={<ForumLayout />}>
        <Route index path="" element={<Forum />} />
        <Route
          path="new"
          element={
            <AuthProtectedRoute to="/forum">
              <PostWritingPage />
            </AuthProtectedRoute>
          }
        />
        <Route path="post/:id">
          <Route index path="" element={<PostViewPage />} />
          <Route path="edit" element={<PostEditPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route
        path="auth"
        element={
          <UnauthProtectedRoute>
            <AuthPageLayout />
          </UnauthProtectedRoute>
        }
      >
        <Route index path="sign-in" element={<SignInForm />} />
        <Route path="sign-up" element={<SignUpForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route
        path="admin"
        element={
          <AuthProtectedRoute protectAdmin>
            <AdminLayout />
          </AuthProtectedRoute>
        }
      >
        <Route index path="" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
