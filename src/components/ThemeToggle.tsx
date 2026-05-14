import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
  return (localStorage.getItem('theme') as Theme) || 'system';
}

function applyTheme(theme: Theme) {
  const resolved = theme === 'system' ? getSystemTheme() : theme;
  document.documentElement.setAttribute('data-theme', resolved);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);

    // Listen for system theme changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (getStoredTheme() === 'system') applyTheme('system');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const cycle = () => {
    const order: Theme[] = ['light', 'dark', 'system'];
    const next = order[(order.indexOf(theme) + 1) % 3];
    setTheme(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  };

  const icon = theme === 'light' ? '☀' : theme === 'dark' ? '☾' : '◐';

  return (
    <button
      onClick={cycle}
      className="p-2 text-text-secondary hover:text-text-primary transition-colors text-lg"
      aria-label={`Theme: ${theme}`}
      title={`Theme: ${theme}`}
    >
      {icon}
    </button>
  );
}
