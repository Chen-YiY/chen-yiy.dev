import { useState, useEffect } from 'react';
import { t } from '@/lib/i18n';

export function useLang() {
  const [lang, setLang] = useState<'zh' | 'en'>(
    (typeof window !== 'undefined' && localStorage.getItem('lang') as 'zh' | 'en') || 'zh'
  );

  useEffect(() => {
    const handler = (e: Event) => {
      setLang((e as CustomEvent).detail);
    };
    window.addEventListener('lang-change', handler);
    return () => window.removeEventListener('lang-change', handler);
  }, []);

  return {
    lang,
    t: (key: string) => t(key, lang),
  };
}
