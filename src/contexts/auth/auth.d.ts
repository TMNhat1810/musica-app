export interface IUser {
  name: string;
}

export interface AuthContextType {
  user: IUser | null;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}
