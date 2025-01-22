import { ReactNode } from 'react';
import { useAuth } from '../../hooks';
import { Navigate } from 'react-router-dom';

interface UnauthProtectedRouteProps {
  children: ReactNode;
}

export default function UnauthProtectedRoute({
  children,
}: UnauthProtectedRouteProps) {
  const { user } = useAuth();
  if (user) return <Navigate to="/" />;
  return children;
}
