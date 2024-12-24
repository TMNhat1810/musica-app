import { createContext } from 'react';
import { ThemeContextType } from './theme';

export const ThemeContext = createContext<ThemeContextType | null>(null);
