import githubCache from '@/data/github-cache.json';
import supplementalData from '@/data/projects.json';

export interface ProjectData {
  name: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  featured: boolean;
  fork: boolean;
  customDescription?: string;
  customTags?: string[];
  platform?: string;
  hidden?: boolean;
}

export function getProjects(): ProjectData[] {
  const repos = githubCache as any[];

  const projects: ProjectData[] = repos.map((repo) => {
    const supplement = (supplementalData as any).projects.find(
      (p: any) => p.name === repo.name
    );

    return {
      name: repo.name,
      description: repo.description || '',
      url: repo.html_url,
      homepage: repo.homepage || '',
      language: repo.language || '',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
      fork: repo.fork,
      featured: supplement?.featured ?? false,
      customDescription: supplement?.customDescription,
      customTags: supplement?.customTags,
      platform: supplement?.platform,
      hidden: supplement?.hidden,
    };
  });

  return projects.filter((p) => !p.hidden);
}

export function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return '1d ago';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}
