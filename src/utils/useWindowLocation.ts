import { useEffect } from 'react';

export function useWindowLocation() {
  const isClient = typeof window === 'object';

  useEffect(() => {
    if (!isClient) {
      return;
    }
  }, [isClient]);

  return isClient && window.location;
}
