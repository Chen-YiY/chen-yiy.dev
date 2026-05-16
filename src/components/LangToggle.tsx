import { useState, useEffect } from 'react';

type Lang = 'zh' | 'en';

function getStoredLang(): Lang {
  return (localStorage.getItem('lang') as Lang) || 'zh';
}

function applyLang(lang: Lang) {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.documentElement.setAttribute('data-lang', lang);
  // 更新 FOUC style 标签，用 !important 确保隐藏生效
  let style = document.querySelector<HTMLStyleElement>('style[data-lang-fouc]');
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('data-lang-fouc', '');
    document.head.appendChild(style);
  }
  style.textContent = '[data-lang]:not([data-lang="' + lang + '"]){display:none!important}';
  window.dispatchEvent(new CustomEvent('lang-change', { detail: lang }));
}

export default function LangToggle() {
  const [lang, setLang] = useState<Lang>('zh');

  useEffect(() => {
    const stored = getStoredLang();
    setLang(stored);
    applyLang(stored);
  }, []);

  const toggle = () => {
    const next: Lang = lang === 'zh' ? 'en' : 'zh';
    setLang(next);
    localStorage.setItem('lang', next);
    applyLang(next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 px-2 py-1 text-xs text-text-secondary hover:text-text-primary transition-colors rounded"
      aria-label={`Language: ${lang === 'zh' ? '中文' : 'English'}`}
      title={lang === 'zh' ? '切换到英文' : 'Switch to Chinese'}
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
      <span className={lang === 'zh' ? 'text-text-primary font-medium' : ''}>中</span>
      <span className="text-text-muted">/</span>
      <span className={lang === 'en' ? 'text-text-primary font-medium' : ''}>EN</span>
    </button>
  );
}
