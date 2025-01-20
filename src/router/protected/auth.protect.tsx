import { ReactNode } from 'react';
import { useAuth } from '../../hooks';
import { Navigate } from 'react-router-dom';

interface AuthProtectedRouteProps {
  children: ReactNode;
}

export default function AuthProtectedRoute({ children }: AuthProtectedRouteProps) {
  const { user } = useAuth();
  if (user) return <Navigate to="/" />;
  return children;
}
