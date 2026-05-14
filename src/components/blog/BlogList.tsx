import { useState, useMemo } from 'react';
import { BASE } from '@/lib/base';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ['All', ...Array.from(tags).sort()];
  }, [posts]);

  const filtered = useMemo(() => {
    let list = posts.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.summary.toLowerCase().includes(search.toLowerCase());
      const matchTag =
        activeTag === 'All' || p.tags.includes(activeTag);
      return matchSearch && matchTag;
    });

    return list.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [posts, search, activeTag]);

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              activeTag === tag
                ? 'bg-text-primary text-white'
                : 'bg-badge-bg text-badge-text hover:bg-border'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map((post) => (
          <a
            key={post.slug}
            href={`${BASE}/blog/${post.slug}`}
            className="block bg-bg-secondary rounded-lg border border-border p-5 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-text-primary mb-2 group-hover:text-accent">
              {post.title}
            </h3>
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {post.summary}
            </p>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <time>
                {new Date(post.date).toLocaleDateString('zh-CN')}
              </time>
              <span>·</span>
              <span>{post.readingTime}</span>
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-1.5 py-0.5 bg-badge-bg text-badge-text rounded">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-text-muted py-12">
            No articles found.
          </p>
        )}
      </div>
    </div>
  );
}
