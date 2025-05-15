import { useContext } from 'react';
import { AppContext } from '../contexts';

export default function useAppSetting() {
  const context = useContext(AppContext);
  if (!context) throw Error('useAppSetting can only be used inside an AppProvider');
  return context;
}
