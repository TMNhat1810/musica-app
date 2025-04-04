import { ReactNode } from 'react';
import { useAuth } from '../../hooks';
import { Navigate } from 'react-router-dom';

interface AuthProtectedRouteProps {
  children: ReactNode;
  to?: string;
}

export default function AuthProtectedRoute({
  children,
  to = '/',
}: AuthProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={to} />;
  return children;
}
