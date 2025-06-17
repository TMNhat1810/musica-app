import AppProvider from './contexts/app/app.provider';
import AuthProvider from './contexts/auth/auth.provider';
import LocaleProvider from './contexts/locale/locale.provider';
import ThemeProvider from './contexts/theme/theme.provider';
import MusicaRouter from './router';

export default function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <LocaleProvider>
          <AuthProvider>
            <MusicaRouter />
          </AuthProvider>
        </LocaleProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
