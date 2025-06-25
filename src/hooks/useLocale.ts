import { useContext } from 'react';
import { LocaleContext } from '../contexts';

export default function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw Error('useLocale can only be used inside an LocaleProvider');
  return context;
}
