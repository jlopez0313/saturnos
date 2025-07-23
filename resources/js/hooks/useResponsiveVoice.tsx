// hooks/useResponsiveVoice.ts
import { useEffect, useState } from 'react';

export function useResponsiveVoice() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.responsiveVoice) {
      const script = document.createElement('script');
      script.src = 'https://code.responsivevoice.org/responsivevoice.js';
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  return isLoaded;
}
