import en from '@/i18n/en.json';
import zh from '@/i18n/zh.json';

const translations = { en, zh } as const;

type Lang = 'en' | 'zh';

export type TranslationKey = string;

export function getLang(): Lang {
  if (typeof window === 'undefined') return 'zh';
  return (localStorage.getItem('lang') as Lang) || 'zh';
}

export function t(key: string, lang?: Lang): string {
  const l = lang || (typeof window !== 'undefined' ? getLang() : 'zh');
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = translations[l];
  for (const k of keys) {
    result = result?.[k];
  }
  return (result as string) || key;
}
