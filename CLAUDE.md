# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chen-YiY 的个人技术博客与开源项目展示站，部署于 https://chen-yiy.dev。基于 Astro 5 构建，静态生成（SSG），无服务端运行时。

## Commands

```bash
npm run dev          # 启动开发服务器 (astro dev)
npm run build        # 生产构建 (astro build)
npm run preview      # 预览构建产物 (astro preview)
npm run sync:github  # 同步 GitHub 仓库数据到 src/data/github-cache.json
```

没有测试套件和 linter 配置。

## Architecture

### 技术栈

Astro 5 + React 19 + Tailwind CSS v4 + MDX。Astro 负责页面路由和静态生成，React 组件通过 `client:load` 水合用于需要交互的部分（项目筛选/排序、目录导航）。

### 页面路由 (src/pages/)

| 路由 | 文件 | 说明 |
|------|------|------|
| `/` | `index.astro` | 首页：Hero + 精选项目 + 最新文章 |
| `/projects` | `projects.astro` | 项目列表，支持筛选和排序 |
| `/blog` | `blog/index.astro` | 文章列表 |
| `/blog/[slug]` | `blog/[...slug].astro` | 文章详情，含 TOC 侧栏和前后导航 |
| `/about` | `about.astro` | 个人介绍页 |
| `/rss.xml` | `rss.xml.ts` | RSS feed |

### 数据流

1. `npm run sync:github` → Python 脚本 (`scripts/sync-github.ts`) 调用 GitHub API → 写入 `src/data/github-cache.json`
2. `src/data/projects.json` 存储补充元数据（featured、customDescription、customTags、platform、hidden）
3. `src/lib/github.ts` 的 `getProjects()` 合并两个数据源，过滤 hidden 项目
4. 页面通过 `getProjects()` 和 `getCollection('blog')` 获取数据

**注意**: `github-cache.json` 在 `.gitignore` 中，需要手动运行 sync 命令更新。

### 组件结构

- `src/components/projects/` — ProjectGrid.tsx（筛选/排序逻辑）和 ProjectCard.tsx，React 组件
- `src/components/blog/` — BlogList.tsx 和 TOC.tsx，React 组件
- `src/layouts/BaseLayout.astro` — 全局布局，含响应式导航（桌面/移动端）和页脚

### 样式

Tailwind v4 使用 CSS `@theme` 定义设计令牌（见 `src/styles/global.css`），不用 `tailwind.config.js`。颜色变量：`bg-primary`、`bg-secondary`、`text-primary`、`text-secondary`、`accent` 等。字体：Inter（正文）+ JetBrains Mono（代码）。

### Content Collections

博客文章为 MDX 格式，存放在 `src/content/blog/`。Schema 定义在 `src/content.config.ts`：title、date、summary、tags（可选）、draft（默认 false，draft 文章不展示）。

### 路径别名

`@/*` → `src/*`（在 tsconfig.json 中配置）。

## Key Conventions

- 站点语言为中文（`lang="zh-CN"`），但代码和 UI 文本目前用英文
- 日期格式使用 `zh-CN` locale
- React 组件仅用于需要客户端交互的场景，静态内容用 Astro 组件
- Python 路径固定为 `D:/Python/Anaconda_envs/envs/data_analysis_pratice/python.exe`（sync 脚本依赖）
