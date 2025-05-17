import { useEffect } from 'react';

export default function useOnPageLeave(callback: () => void) {
  useEffect(() => {
    if (!callback) return;
    const handleUnload = () => {
      callback();
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [callback]);
}
