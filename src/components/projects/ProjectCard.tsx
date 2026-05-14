import type { ProjectData } from '@/lib/github';
import { formatRelativeTime } from '@/lib/github';

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const tags = project.customTags || project.topics;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-bg-secondary rounded-lg border border-border p-5 hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-1">
          {project.name}
        </h3>
        {project.featured && (
          <span className="flex-shrink-0 ml-2 px-1.5 py-0.5 bg-accent/10 text-accent text-[10px] font-medium rounded">
            Featured
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-1">
        {project.customDescription || project.description || 'No description'}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
        <span className="flex items-center gap-0.5">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          {project.stars}
        </span>
        <span className="flex items-center gap-0.5">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          </svg>
          {project.forks}
        </span>
        <span>{formatRelativeTime(project.updatedAt)}</span>
        {project.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-accent" />
            {project.language}
          </span>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-badge-bg text-badge-text text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {project.platform && (
            <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded">
              {project.platform}
            </span>
          )}
        </div>
      )}
    </a>
  );
}
