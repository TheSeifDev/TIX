'use client';

import { useEffect } from 'react';

export function LanguageAttributes({ arabic = false }: { arabic?: boolean }) {
  useEffect(() => {
    document.documentElement.lang = arabic ? 'ar' : 'en';
    document.documentElement.dir = arabic ? 'rtl' : 'ltr';
    return () => { document.documentElement.lang = 'en'; document.documentElement.dir = 'ltr'; };
  }, [arabic]);
  return null;
}
