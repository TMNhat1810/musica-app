import { createContext } from 'react';
import { AppContextType } from './app';

export const AppContext = createContext<AppContextType | null>(null);
