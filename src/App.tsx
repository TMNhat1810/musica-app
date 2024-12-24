import ThemeProvider from './contexts/theme/theme.provider';
import MainLayout from './layouts/main/MainLayout';

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
