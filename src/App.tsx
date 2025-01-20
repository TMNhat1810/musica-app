import AuthProvider from './contexts/auth/auth.provider';
import ThemeProvider from './contexts/theme/theme.provider';
import MusicaRouter from './router';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MusicaRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}
