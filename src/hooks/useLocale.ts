import { useContext } from 'react';
import { AppContext } from '../contexts';

export default function useLocale() {
  const context = useContext(AppContext);
  if (!context) throw Error('useLocale can only be used inside an LocaleProvider');
  return context;
}
