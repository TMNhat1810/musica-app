export interface IUser {
  id: string;
  username: string;
  display_name?: string;
  email: string;
  role: string;
  is_active: boolean;
  photo_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface AuthContextType {
  user: IUser | null;
  signinUser: (username: string, password: string) => Promise<void>;
  signoutUser: () => void;
  getUserProfile: () => void;
}
