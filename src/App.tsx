import AppProvider from './contexts/app/app.provider';
import AuthProvider from './contexts/auth/auth.provider';
import ThemeProvider from './contexts/theme/theme.provider';
import MusicaRouter from './router';

export default function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <AuthProvider>
          <MusicaRouter />
        </AuthProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
