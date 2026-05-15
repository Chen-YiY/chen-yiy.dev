import { useState, useMemo } from 'react';
import type { ProjectData } from '@/lib/github';
import { useLang } from '@/lib/useLang';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: ProjectData[];
}

type SortKey = 'stars' | 'updated' | 'name';

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState<SortKey>('updated');

  // Collect all unique tags/platforms for filter tabs
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => {
      if (p.platform) tags.add(p.platform);
      p.customTags?.forEach((t) => tags.add(t));
      p.topics?.forEach((t) => tags.add(t));
    });
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  // Filter and sort
  const filtered = useMemo(() => {
    let list = [...projects];

    if (activeFilter !== 'All') {
      list = list.filter(
        (p) =>
          p.platform === activeFilter ||
          p.customTags?.includes(activeFilter) ||
          p.topics?.includes(activeFilter)
      );
    }

    list.sort((a, b) => {
      if (sortBy === 'stars') return b.stars - a.stars;
      if (sortBy === 'updated')
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      return a.name.localeCompare(b.name);
    });

    // Featured first
    return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [projects, activeFilter, sortBy]);

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'updated', label: t('projects.sortRecently') },
    { key: 'stars', label: t('projects.sortStars') },
    { key: 'name', label: t('projects.sortName') },
  ];

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              activeFilter === tag
                ? 'bg-text-primary text-white'
                : 'bg-badge-bg text-badge-text hover:bg-border'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center justify-end gap-2 mb-6">
        <span className="text-xs text-text-muted">{t('projects.sort')}</span>
        {sortOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              sortBy === key
                ? 'text-text-primary font-medium'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-12">
          {t('projects.noResults')}
        </p>
      )}
    </div>
  );
}
