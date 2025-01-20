import { useContext } from 'react';
import { ThemeContext } from '../contexts';

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw Error('useTheme can only be used inside an ThemeProvider');
  return context;
}
