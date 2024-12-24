import { useState, useEffect, ReactNode } from 'react';
import { AuthServices } from '../../services';
import { TokenUtils } from '../../utils/token';
import { IUser } from './auth';
import { AuthContext } from './auth.context';

interface AuthProviderPropType {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderPropType) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = TokenUtils.getAccessToken();
    if (token) {
      setUser(null);
    }
  }, []);

  const loginUser = async (username: string, password: string) => {
    const { accessToken, refreshToken } = await AuthServices.login(
      username,
      password,
    );
    TokenUtils.setAccessToken(accessToken);
    TokenUtils.setRefreshToken(refreshToken);
    setUser(null);
  };

  const logoutUser = () => {
    TokenUtils.clearTokens();
    setUser(null);
    AuthServices.logout();
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
