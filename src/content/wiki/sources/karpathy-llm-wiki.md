---
type: source
title: "LLM Wiki：用 LLM 构建个人知识库的模式"
author: Andrej Karpathy
date: 2026-04-04
source_url: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
source_path: raw/articles/karpathy-llm-wiki-2026-04-04.md
tags: [llm, knowledge-management, wiki, rag, obsidian, personal-pkm]
ingested: 2026-04-11
updated: 2026-04-25
---

# LLM Wiki：用 LLM 构建个人知识库的模式

## 摘要

Karpathy 提出了一种用 LLM 增量构建和维护持久 wiki 的模式，以替代传统 RAG 的即时检索方式。核心理念是：LLM 不仅在查询时检索文档，而是持续编译知识——提取关键信息、整合到已有 wiki 中、更新实体页面、标记矛盾、维持交叉引用。Wiki 是一个**持久复利资产**，每新增一个源材料或提出一个问题，它都会变得更丰富。

## 关键要点

- **RAG 的局限**：每次提问都从原始文档重新检索和合成，没有积累。需要综合五份文档的细微问题时，LLM 每次都要重新拼凑碎片
- **LLM Wiki 的核心差异**：知识编译一次，持续更新。交叉引用已经存在，矛盾已标记，合成已反映所有已读内容
- **三层架构**：
  - **Raw sources**（不可变）→ 原始文档，LLM 只读
  - **The wiki**（LLM 维护）→ Markdown 文件集，LLM 读写
  - **The schema**（CLAUDE.md/AGENTS.md）→ 告诉 LLM 如何组织和操作 wiki
- **三大操作**：
  - **Ingest**：投喂新源 → 阅读、讨论、写摘要、更新索引、更新实体/概念页（单源可触及 10-15 个 wiki 页面）
  - **Query**：提问 → 搜索相关页面、合成答案。**好的答案可以回写为新的 wiki 页面**
  - **Lint**：定期健康检查 → 矛盾、过时、孤儿、缺口
- **关键文件**：
  - `index.md`：内容目录，按类别组织（~100 源、数百页规模下足以替代 embedding RAG）
  - `log.md`：append-only 时间线日志，格式可解析
- **人类角色**：策展源材料、指导分析、提出好问题、思考意义
- **LLM 角色**：摘要、交叉引用、归档、记账——所有让知识库持续有用的繁琐工作
- **Memex 精神**：与 Vannevar Bush 1945 年的 Memex 理念相通——个人策展的知识存储，文档间的连接与文档本身同等重要。Bush 没解决的是"谁来做维护"——LLM 解决了这个问题

## 重要引用

> "The wiki is a persistent, compounding artifact. The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read."

> "Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase."

> "The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping."

> "Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass."

## 前提与边界

- **前提假设**：LLM 能可靠地编译和整合知识（摘要、交叉引用、矛盾标记）；`index.md` 在中等规模（~100 源、数百页）下足以替代 embedding-based RAG 进行内容导航
- **数据可靠性**：基于 Karpathy 的个人实践经验，属于单用户 case study，无大规模多用户验证
- **不适用场景**：知识库规模达到数百页以上时，`index.md` 纯文本索引可能力不从心，需引入向量搜索或更复杂的发现机制；对非文本为主的素材（图像、音频、视频）覆盖不足

## 核心人物

- [[karpathy|Andrej Karpathy]] — 本文作者，LLM Wiki 模式的提出者
- [[vannevar-bush|Vannevar Bush]] — 本文引用的 Memex 概念提出者，作为 LLM Wiki 的思想先驱

## 与现有知识的关联

- 这是本 wiki 的**奠基源文档**——此 wiki 本身就是按照此模式构建的
- 与 [[rag-vs-compiled-wiki]] 直接相关：本文定义了 "compiled wiki" 这一范式
- 延伸到 [[memex]]：知识管理思想从 Bush 1945 年愿景到 LLM 时代的演进
- 实践层面关联 [[personal-knowledge-management]]：PKM 领域的新范式
