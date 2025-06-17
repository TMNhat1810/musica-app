import { createContext } from 'react';
import { LocaleContextType } from './locale';

export const LocaleContext = createContext<LocaleContextType | null>(null);
