import { useContext } from 'react';
import { AuthContext } from '../contexts';

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error('useAuth can only be used inside an AuthProvider');
  return context;
}
