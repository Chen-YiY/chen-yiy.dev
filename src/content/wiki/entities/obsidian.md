---
type: entity
category: tool
aliases: [Obsidian, Obsidian MD, 黑曜石]
tags: [pkm-tool, markdown, note-taking, knowledge-graph]
sources: "[[karpathy-llm-wiki]], [[yiren-10th-anniversary-livestream]]"
created: 2026-04-11
updated: 2026-04-25
---

# Obsidian

## 简介

一款基于 Markdown 的个人知识管理工具，以本地文件为核心，支持双向链接（wikilinks）、图谱视图（graph view）、插件生态。Karpathy 将其定位为 LLM Wiki 模式的"IDE"——"Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase."

## 核心特征

- **本地优先**：所有数据以 Markdown 文件存储在本地，无厂商锁定
- **双向链接**：`[[wikilinks]]` 自动追踪反向链接，构建知识图谱
- **图谱视图**：可视化页面间的连接关系，是 LLM Wiki 健康检查的直观工具
- **插件生态**：
  - **Dataview**：对 frontmatter 运行查询，生成动态表格
  - **Marp**：Markdown 转幻灯片
  - **Canvas**：可视化画布
  - **Templater**：模板引擎
- **Web Clipper**：浏览器扩展，将网页转为 Markdown，快速导入 raw/

## 在 LLM Wiki 中的角色

Obsidian 在 [[llm-wiki-pattern|LLM Wiki 模式]] 中担任**可视化与交互层**：
- 人类通过 Obsidian 浏览 wiki 更新、追踪图谱、检查结果
- LLM 通过文件系统创建和编辑 Markdown 文件
- Obsidian 的 graph view 是 wiki 健康度的直观指标——孤儿页面、枢纽页面一目了然

## 相关概念

- [[llm-wiki-pattern]] — Obsidian 是 LLM Wiki 模式的推荐前端
- [[personal-knowledge-management]] — Obsidian 是 PKM 领域的主流工具

## Karpathy 的 Obsidian 技巧

- 设置 Attachment folder path 为固定目录（如 `raw/assets/`）
- 绑定 "Download attachments" 快捷键（如 Ctrl+Shift+D）下载本地图片
- 使用 graph view 查看 wiki 的形状——连接、枢纽、孤儿

## 亦仁的 Obsidian 实践

[[yiren|亦仁]]（生财有术创始人）将 Obsidian + Claude 定位为"工作台中心"：

- **方向转变**：从"Obsidian 往 Cowork 走"变成"Cowork 往 Obsidian 走"——Obsidian 从笔记工具升级为所有工作的数据沉淀中心
- **插件组合**：Claudian 插件 + Eclipse 插件，实现 Claude 直接操作 Obsidian 库
- **数据主权**：Obsidian 做本地笔记，iCloud 备份。"你的数据要归属于你，不归属于任何 AI 公司"
- **核心理念**：Obsidian 是"知识复利"的载体——Notebook、Obsidian、飞书知识库构成"自己的个人 LLM"

## 出自

- [[karpathy-llm-wiki]] — Karpathy 推荐 Obsidian 作为 LLM Wiki 的前端
- [[yiren-10th-anniversary-livestream]] — 亦仁的 Obsidian + Claude 工作台实践
