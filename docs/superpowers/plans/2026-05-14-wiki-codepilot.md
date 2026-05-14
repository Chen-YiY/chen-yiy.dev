# Wiki Digital Garden + CodePilot 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有 Astro 个人站点上新增 Wiki Digital Garden 页面和 CodePilot 项目展示。

**Architecture:** 使用 Astro Content Collection 静态生成 wiki 页面，通过 Windows junction 软链接接入外部 MyKnowledgeBase wiki 目录。自定义 remark 插件处理 Obsidian 风格的 `[[wikilinks]]`。Wiki 入口页使用 React 组件实现筛选/排序交互，详情页为纯 Astro 静态页面。

**Tech Stack:** Astro 5, React 19, Tailwind CSS v4, MDX, unified/remark (AST transform)

---

## 文件结构

| 文件 | 职责 |
|------|------|
| `src/content/wiki/` | 软链接 → MyKnowledgeBase/wiki/ |
| `src/content.config.ts` | 新增 wiki collection schema |
| `src/lib/remark-wikilinks.ts` | remark 插件：body 中 `[[wikilinks]]` → `<a>` |
| `src/lib/wiki-utils.ts` | frontmatter wikilink 解析工具函数 |
| `src/components/wiki/WikiIndex.tsx` | 入口页交互组件（筛选、Tab） |
| `src/pages/wiki/index.astro` | 入口页（Astro 壳 + React 组件） |
| `src/pages/wiki/[slug].astro` | 详情页（纯 Astro） |
| `src/config.ts` | nav 新增 Wiki |
| `src/data/projects.json` | 新增 CodePilot 条目 |
| `src/styles/global.css` | wiki 页面样式 |

---

### Task 1: 创建软链接并验证 Astro 识别

**Files:**
- Create: `src/content/wiki/` (junction)

- [ ] **Step 1: 创建 Windows junction**

```cmd
mklink /J D:\Code\web\src\content\wiki D:\Chen_YiY\Documents\MyKnowledgeBase\wiki
```

Expected: `Junction created for D:\Code\web\src\content\wiki <<===>> D:\Chen_YiY\Documents\MyKnowledgeBase\wiki`

- [ ] **Step 2: 验证软链接内容可读**

```bash
ls D:/Code/web/src/content/wiki/
```

Expected: 列出 `concepts/` `entities/` `insights/` `topics/` `sources/` 等子目录

- [ ] **Step 3: 在 .gitignore 中排除软链接**

在 `D:\Code\web\.gitignore` 末尾追加：

```
# Wiki symlink (external)
src/content/wiki
```

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: add wiki symlink to gitignore"
```

---

### Task 2: 新增 wiki content collection schema

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: 添加 wiki collection**

当前文件内容：

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

修改为：

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const wiki = defineCollection({
  type: 'content',
  schema: z.object({
    type: z.enum(['concept', 'entity', 'insight', 'topic', 'source']),
    tags: z.array(z.string()).default([]),
    sources: z.string().optional(),
    aliases: z.array(z.string()).default([]),
    related: z.string().optional(),
    category: z.string().optional(),
    strength: z.string().optional(),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { blog, wiki };
```

注意使用 `z.coerce.date()` 而非 `z.date()`，因为 YAML 中的日期字符串需要自动转换。

- [ ] **Step 2: 验证 schema 能解析 wiki 文件**

```bash
cd D:/Code/web && npx astro check 2>&1 | head -30
```

Expected: 无 schema 相关报错（可能有其他 warnings，忽略即可）

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add wiki content collection schema"
```

---

### Task 3: 编写 wikilink remark 插件

**Files:**
- Create: `src/lib/remark-wikilinks.ts`

- [ ] **Step 1: 创建 remark-wikilinks.ts**

```ts
import { visit } from 'unist-util-visit';
import type { Root, Text, Link, Html } from 'mdast';

// 匹配 [[slug]] 或 [[slug|display]]，排除 ![[image]] 嵌入
const WIKILINK_RE = /(?<!!)\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;

export default function remarkWikilinks() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return;

      const matches = [...node.value.matchAll(WIKILINK_RE)];
      if (matches.length === 0) return;

      const children: (Text | Link | Html)[] = [];
      let lastIndex = 0;

      for (const match of matches) {
        const matchStart = match.index!;
        const matchEnd = matchStart + match[0].length;
        const slug = match[1];
        const display = match[2] || slug;

        // match 前的普通文本
        if (matchStart > lastIndex) {
          children.push({
            type: 'text',
            value: node.value.slice(lastIndex, matchStart),
          });
        }

        // wikilink → <a> 标签
        children.push({
          type: 'html',
          value: `<a href="/wiki/${slug}" class="wiki-link">${display}</a>`,
        } as Html);

        lastIndex = matchEnd;
      }

      // match 后的剩余文本
      if (lastIndex < node.value.length) {
        children.push({
          type: 'text',
          value: node.value.slice(lastIndex),
        });
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}
```

- [ ] **Step 2: 安装 unist-util-visit 依赖**

```bash
cd D:/Code/web && npm install unist-util-visit
```

Expected: `added 1 package` 或 `already up to date`

- [ ] **Step 3: Commit**

```bash
git add src/lib/remark-wikilinks.ts package.json package-lock.json
git commit -m "feat: add wikilink remark plugin"
```

---

### Task 4: 注册 remark 插件到 Astro 配置

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: 更新 astro.config.mjs**

当前内容：

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://chen-yiy.dev',
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

修改为：

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkWikilinks from './src/lib/remark-wikilinks.ts';

export default defineConfig({
  site: 'https://chen-yiy.dev',
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkWikilinks],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 2: 验证构建不报错**

```bash
cd D:/Code/web && npm run build 2>&1 | tail -10
```

Expected: 构建成功，无 remark 插件相关报错

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: register wikilink remark plugin"
```

---

### Slug 解析说明

Astro 5 中，嵌套子目录的 content collection entry 的 `entry.id` 包含路径前缀。例如 `wiki/concepts/mcp.md` 的 `entry.id` 为 `concepts/mcp`，而非 `mcp`。

wikilink 中引用的是纯文件名（如 `[[mcp]]`），因此需要统一处理：
- `wiki-utils.ts` 中新增 `getWikiSlug(entryId)` 函数，剥离子目录前缀
- remark 插件中的 wikilink slug 直接就是纯文件名，无需转换
- 需要在构建时验证实际的 `entry.id` 格式，据此调整 `getWikiSlug` 实现

---

### Task 5: 编写 frontmatter wikilink 工具函数

**Files:**
- Create: `src/lib/wiki-utils.ts`

- [ ] **Step 1: 创建 wiki-utils.ts**

```ts
export interface WikilinkRef {
  slug: string;
  label: string;
}

/**
 * 从 entry.id 提取扁平 slug
 * "concepts/mcp" → "mcp"，"mcp" → "mcp"
 */
export function getWikiSlug(entryId: string): string {
  const parts = entryId.split('/');
  return parts[parts.length - 1];
}

/**
 * 解析 frontmatter 中的 wikilink 字符串
 * 输入: "[[mcp]], [[context-engineering|Context Engineering]]"
 * 输出: [{ slug: "mcp", label: "mcp" }, { slug: "context-engineering", label: "Context Engineering" }]
 */
export function parseWikilinks(text: string | undefined): WikilinkRef[] {
  if (!text) return [];

  const re = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;
  const refs: WikilinkRef[] = [];
  let match;

  while ((match = re.exec(text)) !== null) {
    refs.push({
      slug: match[1],
      label: match[2] || match[1],
    });
  }

  return refs;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/wiki-utils.ts
git commit -m "feat: add frontmatter wikilink parser utility"
```

---

### Task 6: 创建 Wiki 入口页

**Files:**
- Create: `src/components/wiki/WikiIndex.tsx`
- Create: `src/pages/wiki/index.astro`

- [ ] **Step 1: 创建 WikiIndex.tsx React 组件**

```tsx
import { useState, useMemo } from 'react';

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
  const [activeType, setActiveType] = useState<string>('All');
  const [activeTag, setActiveTag] = useState<string>('All');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    entries.forEach((e) => e.tags.forEach((t) => tags.add(t)));
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
        {TYPE_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              activeType === t
                ? 'bg-text-primary text-white'
                : 'bg-badge-bg text-badge-text hover:bg-border'
            }`}
          >
            {t === 'All' ? '全部' : t}
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
            href={`/wiki/${entry.slug}`}
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
          没有找到匹配的条目。
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 创建入口页 index.astro**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import WikiIndex from '@/components/wiki/WikiIndex';
import { getCollection } from 'astro:content';
import { getWikiSlug } from '@/lib/wiki-utils';

const entries = (await getCollection('wiki')).map((entry) => {
  const slug = getWikiSlug(entry.id);
  return {
    slug,
    title: entry.data.aliases?.[0] || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
    type: entry.data.type,
    tags: entry.data.tags,
    summary: entry.body?.slice(0, 100).replace(/[#*\[\]]/g, '').trim() || '',
    created: entry.data.created.toISOString(),
  };
});
---

<BaseLayout title="Wiki" description="个人知识库 — 概念、实体与洞察">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
    <section class="text-center max-w-2xl mx-auto mb-12">
      <h1 class="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
        Wiki
      </h1>
      <p class="text-text-secondary">
        个人知识库 — 概念、实体与洞察
      </p>
    </section>

    <WikiIndex client:load entries={entries} />
  </div>
</BaseLayout>
```

- [ ] **Step 3: 验证开发服务器能渲染 /wiki**

```bash
cd D:/Code/web && npx astro build 2>&1 | tail -15
```

Expected: 构建成功，`/wiki` 页面被生成

- [ ] **Step 4: Commit**

```bash
git add src/components/wiki/WikiIndex.tsx src/pages/wiki/index.astro
git commit -m "feat: add wiki index page with type/tag filtering"
```

---

### Task 7: 创建 Wiki 详情页

**Files:**
- Create: `src/pages/wiki/[slug].astro`

- [ ] **Step 1: 创建详情页**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getCollection, render } from 'astro:content';
import { parseWikilinks, getWikiSlug } from '@/lib/wiki-utils';

export async function getStaticPaths() {
  const entries = await getCollection('wiki');
  return entries.map((entry) => ({
    params: { slug: getWikiSlug(entry.id) },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);

const slug = getWikiSlug(entry.id);
// 标题：优先用第一个 alias，否则把 slug 转为标题格式
const title =
  entry.data.aliases?.[0] ||
  slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

const sourcesRefs = parseWikilinks(entry.data.sources);
const relatedRefs = parseWikilinks(entry.data.related);
---

<BaseLayout title={title} description={`Wiki: ${title}`}>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
    <div class="lg:flex lg:gap-12">
      <!-- Main Content -->
      <article class="flex-1 min-w-0">
        <header class="mb-10">
          <a
            href="/wiki"
            class="inline-flex items-center text-sm text-text-muted hover:text-accent transition-colors mb-6"
          >
            ← Back to Wiki
          </a>
          <h1 class="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {title}
          </h1>
          <div class="flex flex-wrap items-center gap-2 text-sm text-text-muted">
            <span class="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded">
              {entry.data.type}
            </span>
            <span>·</span>
            <time datetime={entry.data.created.toISOString().split('T')[0]}>
              {entry.data.created.toLocaleDateString('zh-CN')}
            </time>
            {entry.data.updated && (
              <>
                <span>·</span>
                <span>更新于 {entry.data.updated.toLocaleDateString('zh-CN')}</span>
              </>
            )}
          </div>
        </header>

        <div class="prose max-w-none">
          <Content />
        </div>
      </article>

      <!-- Sidebar -->
      <aside class="hidden lg:block w-64 flex-shrink-0 space-y-6">
        <!-- Tags -->
        {entry.data.tags.length > 0 && (
          <div>
            <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Tags</h3>
            <div class="flex flex-wrap gap-1.5">
              {entry.data.tags.map((tag: string) => (
                <span class="px-2 py-0.5 bg-badge-bg text-badge-text text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <!-- Aliases -->
        {entry.data.aliases.length > 0 && (
          <div>
            <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Aliases</h3>
            <div class="flex flex-wrap gap-1.5">
              {entry.data.aliases.map((alias: string) => (
                <span class="px-2 py-0.5 bg-badge-bg text-badge-text text-xs rounded italic">
                  {alias}
                </span>
              ))}
            </div>
          </div>
        )}

        <!-- Related -->
        {relatedRefs.length > 0 && (
          <div>
            <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Related</h3>
            <ul class="space-y-1">
              {relatedRefs.map((ref) => (
                <li>
                  <a href={`/wiki/${ref.slug}`} class="text-sm text-accent hover:text-accent-hover transition-colors">
                    {ref.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <!-- Sources -->
        {sourcesRefs.length > 0 && (
          <div>
            <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Sources</h3>
            <ul class="space-y-1">
              {sourcesRefs.map((ref) => (
                <li>
                  <a href={`/wiki/${ref.slug}`} class="text-sm text-accent hover:text-accent-hover transition-colors">
                    {ref.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 2: 验证构建**

```bash
cd D:/Code/web && npm run build 2>&1 | tail -15
```

Expected: 构建成功，wiki 详情页被静态生成

- [ ] **Step 3: Commit**

```bash
git add src/pages/wiki/[slug].astro
git commit -m "feat: add wiki detail page with sidebar metadata"
```

---

### Task 8: 添加 wiki 页面样式

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: 追加 wiki 样式到 global.css**

在文件末尾追加：

```css
/* Wiki links */
.wiki-link {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.wiki-link:hover {
  color: var(--color-accent-hover);
}

.wiki-link.dead-link {
  color: var(--color-text-muted);
  text-decoration-style: dashed;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add wiki link and dead-link styles"
```

---

### Task 9: 更新导航和 CodePilot 项目

**Files:**
- Modify: `src/config.ts`
- Modify: `src/data/projects.json`

- [ ] **Step 1: 在 nav 中添加 Wiki 入口**

修改 `src/config.ts`：

```ts
export const siteConfig = {
  title: 'Chen-YiY',
  description: 'Personal Tech Blog & Open Source Projects',
  author: 'Chen-YiY',
  github: {
    username: 'Chen-YiY',
  },
  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'Wiki', href: '/wiki' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ],
  social: {
    github: 'https://github.com/Chen-YiY',
    twitter: '',
    email: '',
  },
};
```

- [ ] **Step 2: 在 projects.json 中添加 CodePilot**

修改 `src/data/projects.json`，在 `projects` 数组开头插入：

```json
{
  "name": "CodePilot",
  "featured": true,
  "customDescription": "Claude Code 桌面会话管理器，集成终端、会话管理与代码片段",
  "platform": "Desktop",
  "customTags": ["Tauri", "React", "DevTool", "Claude Code"]
}
```

- [ ] **Step 3: 验证构建**

```bash
cd D:/Code/web && npm run build 2>&1 | tail -15
```

Expected: 构建成功，导航栏出现 Wiki 入口

- [ ] **Step 4: Commit**

```bash
git add src/config.ts src/data/projects.json
git commit -m "feat: add Wiki nav entry and CodePilot project"
```

---

### Task 10: 最终验证

- [ ] **Step 1: 完整构建**

```bash
cd D:/Code/web && npm run build
```

Expected: 零错误完成

- [ ] **Step 2: 本地预览**

```bash
cd D:/Code/web && npm run preview &
```

Expected: 可访问 `/wiki`、`/wiki/mcp`、`/`（有 CodePilot 卡片）

- [ ] **Step 3: 验证关键页面**

在浏览器中检查：
- `/wiki` — 卡片列表、type Tab、tag 筛选
- `/wiki/mcp` — 正文渲染、侧栏 metadata、wikilink 可点击
- `/` — CodePilot 出现在 Featured Projects 中
- 导航栏 — Wiki 链接可点击跳转
