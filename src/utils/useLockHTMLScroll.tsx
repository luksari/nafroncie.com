import { useLayoutEffect } from 'react';

// Hook
export function useLockHTMLScroll(condition: boolean) {
  useLayoutEffect(() => {
    const html = document.querySelector('html');
    if (!html) {
      return;
    }
    // Prevent scrolling on mount
    if (condition) {
      html.style.overflow = 'hidden';
    } else {
      html.style.overflow = 'auto';
    }
    // Re-enable scrolling when component unmounts
    return () => {
      html.style.overflow = 'auto';
    };
  }, [condition]);
}
