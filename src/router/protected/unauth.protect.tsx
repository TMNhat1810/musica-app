import { ReactNode } from 'react';
import { useAuth } from '../../hooks';
import { Navigate } from 'react-router-dom';

interface UnauthProtectedRouteProps {
  children: ReactNode;
  to?: string;
}

export default function UnauthProtectedRoute({
  children,
  to = '/',
}: UnauthProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={to} />;
  return children;
}
