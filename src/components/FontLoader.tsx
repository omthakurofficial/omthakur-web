'use client';

import { useEffect } from 'react';

export function FontLoader() {
  useEffect(() => {
    // Check if Google Fonts are loading properly
    const checkFontLoading = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap';
      
      // Set a timeout to detect if font loading fails
      const timeout = setTimeout(() => {
        console.warn('Google Fonts taking too long to load, using fallback fonts');
        document.documentElement.style.setProperty('--font-inter', 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif');
      }, 3000);

      link.onload = () => {
        clearTimeout(timeout);
        console.log('Google Fonts loaded successfully');
      };

      link.onerror = () => {
        clearTimeout(timeout);
        console.warn('Google Fonts failed to load, using fallback fonts');
        document.documentElement.style.setProperty('--font-inter', 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif');
      };

      // Only add if not already present
      if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
        document.head.appendChild(link);
      }
    };

    // Check font loading on mount
    if (document.readyState === 'complete') {
      checkFontLoading();
    } else {
      window.addEventListener('load', checkFontLoading);
      return () => window.removeEventListener('load', checkFontLoading);
    }
  }, []);

  return null;
}