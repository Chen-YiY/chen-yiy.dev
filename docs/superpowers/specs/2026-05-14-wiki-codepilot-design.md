# Wiki Digital Garden + CodePilot 项目展示

日期：2026-05-14

## 概述

在现有 Astro 个人站点上新增两项内容：
1. **MyKnowledgeBase Wiki 展示** — 将知识库 wiki 层渲染为可浏览的 Digital Garden 页面
2. **CodePilot 项目展示** — 将 CodePilot 桌面应用加入项目列表

## 需求

- CodePilot 融入现有项目列表（projects.json 配置）
- MyKnowledgeBase 的 wiki/ 层渲染为可读网页，raw/ 不展示
- 使用 Astro Content Collection + 静态生成（方案 A）
- wiki 文件通过软链接接入，不复制文件

## 1. 数据源接入（软链接）

MyKnowledgeBase wiki 目录：`D:\Chen_YiY\Documents\MyKnowledgeBase\wiki\`

在项目中创建软链接：
```
src/content/wiki/ → D:/Chen_YiY/Documents/MyKnowledgeBase/wiki/
```

Windows 下使用 `mklink /D` 创建目录 junction：
```cmd
mklink /J D:\Code\web\src\content\wiki D:\Chen_YiY\Documents\MyKnowledgeBase\wiki
```

在 `astro.config.mjs` 中无需额外配置，Astro 原生支持 content 目录下的子目录。

## 2. Content Collection Schema

在 `src/content.config.ts` 中新增 wiki collection：

```ts
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
    created: z.date(),
    updated: z.date().optional(),
  }),
});
```

`sources` 和 `related` 保留原始 wikilink 字符串（含 `[[...]]`），由 wikilink 插件在渲染时转换。

## 3. Wikilink Remark 插件

新建 `src/lib/remark-wikilinks.ts`：

- 正则匹配 `[[slug]]` 和 `[[slug|显示文本]]`
- 替换为 `<a href="/wiki/{slug}">` 标签
- 目标 slug 不存在时添加 `class="dead-link"` 样式
- 不处理 `![[image]]` 和 `[[page#^block]]` 嵌入

在 astro.config.mjs 的 markdown.remarkPlugins 中注册。

Frontmatter 中的 `sources` 和 `related` 字段也包含 `[[wikilinks]]`，但它们不在 MD body 中，remark 插件不会处理。新建 `src/lib/wiki-utils.ts`：
- `renderWikilinks(text: string)` — 将字符串中的 `[[slug]]` 转为 `<a>` HTML
- `parseWikilinks(text: string)` — 返回 `{ slug, label }[]` 数组，供模板使用
- 详情页模板中用此函数渲染 sources/related 为可点击链接列表

## Slug 策略

wiki/ 下有多个子目录（concepts/、entities/、insights/、topics/、sources/），但文件名是全局唯一的（如 `mcp.md` 只存在于 `concepts/`）。使用扁平 slug：`/wiki/mcp`，不保留子目录前缀。

实现方式：`getStaticPaths()` 遍历所有 wiki 条目，用文件名（不含子目录）作为 slug。如果未来出现同名文件（不同子目录），再改为 `/wiki/concepts/mcp` 的嵌套路径。

## 4. 路由与页面

### 路由表

| 路由 | 文件 | 说明 |
|------|------|------|
| `/wiki` | `pages/wiki/index.astro` | 入口页 |
| `/wiki/[slug]` | `pages/wiki/[slug].astro` | 详情页 |

### 入口页 `/wiki`

- 顶部按 type 分 Tab（concepts / entities / insights / topics / sources）
- 每个 Tab 下卡片列表，显示标题、tags、摘要（正文前 100 字）
- 支持标签筛选

### 详情页 `/wiki/[slug]`

- 左侧主内容：MD 渲染，wikilinks 自动转链接
- 右侧侧栏（桌面端）：type、tags、aliases、created/updated、sources 链接列表、related 链接列表
- 底部：back to wiki 入口

### 导航更新

`src/config.ts` nav 数组新增 `{ label: 'Wiki', href: '/wiki' }`。

## 5. CodePilot 集成

前提：CodePilot 仓库推到 GitHub（用户名 Chen-YiY）。

在 `src/data/projects.json` 新增条目：
```json
{
  "name": "CodePilot",
  "featured": true,
  "customDescription": "Claude Code 桌面会话管理器，集成终端、会话管理与代码片段",
  "platform": "Desktop",
  "customTags": ["Tauri", "React", "DevTool", "Claude Code"]
}
```

推到 GitHub 后运行 `npm run sync:github` 更新 cache。

## 6. 新增/修改文件清单

| 操作 | 文件 |
|------|------|
| 新建 | `src/content/wiki/`（软链接） |
| 修改 | `src/content.config.ts`（新增 wiki collection） |
| 新建 | `src/lib/remark-wikilinks.ts` |
| 新建 | `src/lib/wiki-utils.ts` |
| 修改 | `astro.config.mjs`（注册 remark 插件） |
| 新建 | `src/pages/wiki/index.astro` |
| 新建 | `src/pages/wiki/[slug].astro` |
| 修改 | `src/config.ts`（nav 加 Wiki） |
| 修改 | `src/data/projects.json`（加 CodePilot） |
| 修改 | `src/styles/global.css`（wiki 页面样式、dead-link 样式） |
