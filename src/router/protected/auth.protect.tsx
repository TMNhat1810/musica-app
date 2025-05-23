import { ReactNode } from 'react';
import { useAuth } from '../../hooks';
import { Navigate } from 'react-router-dom';

interface AuthProtectedRouteProps {
  children: ReactNode;
  to?: string;
  protectAdmin?: boolean;
}

export default function AuthProtectedRoute({
  children,
  to = '/',
  protectAdmin = false,
}: AuthProtectedRouteProps) {
  const { user } = useAuth();
  if (!user) return <Navigate to={to} />;
  if (protectAdmin && user.role !== 'admin') return <Navigate to={to} />;
  return children;
}
