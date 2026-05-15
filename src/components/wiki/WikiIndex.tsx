import { useState, useMemo } from 'react';
import { BASE } from '@/lib/base';
import { useLang } from '@/lib/useLang';

export interface WikiEntry {
  slug: string;
  title: string;
  type: string;
  tags: string[];
  summary: string;
  created: string;
}

interface WikiIndexProps {
  entries: WikiEntry[];
}

const TYPE_TABS = ['All', 'concept', 'entity', 'insight', 'topic', 'source'] as const;

export default function WikiIndex({ entries }: WikiIndexProps) {
  const { t } = useLang();
  const [activeType, setActiveType] = useState<string>('All');
  const [activeTag, setActiveTag] = useState<string>('All');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    entries.forEach((e) => e.tags.forEach((tag) => tags.add(tag)));
    return ['All', ...Array.from(tags).sort()];
  }, [entries]);

  const filtered = useMemo(() => {
    let list = entries;
    if (activeType !== 'All') {
      list = list.filter((e) => e.type === activeType);
    }
    if (activeTag !== 'All') {
      list = list.filter((e) => e.tags.includes(activeTag));
    }
    return list.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
  }, [entries, activeType, activeTag]);

  return (
    <div>
      {/* Type Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {TYPE_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveType(tab)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              activeType === tab
                ? 'bg-text-primary text-white'
                : 'bg-badge-bg text-badge-text hover:bg-border'
            }`}
          >
            {tab === 'All' ? t('wiki.all') : tab}
          </button>
        ))}
      </div>

      {/* Tag Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {allTags.slice(0, 20).map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              activeTag === tag
                ? 'bg-accent text-white'
                : 'bg-badge-bg text-badge-text hover:bg-border'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((entry) => (
          <a
            key={entry.slug}
            href={`${BASE}/wiki/${entry.slug}`}
            className="group block bg-bg-secondary rounded-lg border border-border p-5 hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                {entry.title}
              </h3>
              <span className="flex-shrink-0 ml-2 px-1.5 py-0.5 bg-accent/10 text-accent text-[10px] font-medium rounded">
                {entry.type}
              </span>
            </div>
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {entry.summary}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
              {entry.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 bg-badge-bg text-badge-text rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-12">
          {t('wiki.noResults')}
        </p>
      )}
    </div>
  );
}
