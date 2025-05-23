import { useState, useEffect, ReactNode } from 'react';
import { AuthServices } from '../../services';
import { TokenUtils } from '../../utils/token';
import { IUser } from './auth';
import { AuthContext } from './auth.context';
import { setAuthHeader } from '../../utils/axios';

interface AuthProviderPropType {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderPropType) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  const getUserProfile = async () => {
    const user = await AuthServices.getUserProfile();
    setUser(user);
    setAuthenticated(true);
  };

  useEffect(() => {
    const token = TokenUtils.getAccessToken();
    if (token) {
      setAuthHeader(token);
      getUserProfile()
        .catch(() => TokenUtils.clearTokens())
        .finally(() => setReady(true));
    } else {
      setReady(true);
    }
  }, []);

  const signinUser = async (username: string, password: string) => {
    const { access_token, refresh_token } = await AuthServices.signin(
      username,
      password,
    );
    TokenUtils.setAccessToken(access_token);
    TokenUtils.setRefreshToken(refresh_token);
    setAuthHeader(access_token);
    getUserProfile();
  };

  const signoutUser = () => {
    TokenUtils.clearTokens();
    setUser(null);
    setAuthenticated(false);
    AuthServices.signout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signinUser,
        signoutUser,
        getUserProfile,
        isAuthenticated,
      }}
    >
      {ready && children}
    </AuthContext.Provider>
  );
}
