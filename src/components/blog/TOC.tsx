import { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  text: string;
  depth: number;
}

export default function TOC() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3');
    const items: TOCItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || '',
      depth: el.tagName === 'H2' ? 2 : 3,
    }));
    setHeadings(items);

    // Generate IDs if missing
    elements.forEach((el) => {
      if (!el.id) {
        el.id = (el.textContent || '')
          .toLowerCase()
          .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
          .replace(/^-|-$/g, '');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
        On this page
      </h4>
      <ul className="space-y-1 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block py-1 transition-colors ${
                h.depth === 3 ? 'pl-4' : ''
              } ${
                activeId === h.id
                  ? 'text-accent font-medium'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
