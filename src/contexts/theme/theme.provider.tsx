import { useState, ReactNode, useMemo } from 'react';
import { ThemeContext } from './theme.context';
import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '../../theme';

interface ThemeProviderPropType {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderPropType) {
  const [mode, setMode] = useState<string>('dark');

  const changeThemeMode = (mode: string) => {
    setMode(mode);
  };

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, changeThemeMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
