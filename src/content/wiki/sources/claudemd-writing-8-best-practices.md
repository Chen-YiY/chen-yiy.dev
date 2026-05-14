---
type: source
title: 写好 CLAUDE.md 的 8 条经验：让 Claude Code 更懂你的项目
author: 佚名
date: 2026-05-11
source_path: raw/articles/claudemd-writing-8-best-practices.md
tags: [claudemd, claude-code, harness, context-engineering, best-practices]
ingested: 2026-05-11
---

# 写好 CLAUDE.md 的 8 条经验

## 摘要

面向 Claude Code 用户的 CLAUDE.md 编写实战指南。提出 8 条反直觉经验：越短越好（200 行上限）、禁止清单与推荐清单同等重要、规则必须可操作而非模糊、CLAUDE.md 是指针不是图书馆、敏感模块用本地 CLAUDE.md、用 Hook 驱动而非靠记忆、MEMORY.md 做长期记忆回路、CLAUDE.md 代替每次会话的开场白。核心论点：CLAUDE.md 不是一次写完就放那的文件，而是随项目演化的活文档。

## 关键要点

### 1. 越短越好，200 行是上限

- Claude Code 每次会话都加载 CLAUDE.md，每一行多余内容都在挤占上下文空间
- 验证标准：没看过项目的人，读完 CLAUDE.md 30 秒内能回答——什么产品？技术栈？新代码放哪？
- 来源：Boris Cherny（[[boris-cherny|Claude Code 创建者]]）的建议

### 2. 「不要引入什么」和「要引入什么」同等重要

- 没有"禁止清单"的 CLAUDE.md 是危险的——Claude 会出于善意引入它"知道"的最优方案，但可能和项目完全冲突
- `Do NOT introduce unless explicitly requested` 区块可防止后续 10 次会话都在修兼容性问题

### 3. 规则必须可操作，不是可感受

- "写干净的代码"对 AI 等于没说——需要具体到可验证的指令
- **5 秒测试法**：读完规则后 5 秒内能判断一段代码是否符合 → 规则合格；不能 → 改写

### 4. CLAUDE.md 是指针，不是图书馆

- 顶级用户的 CLAUDE.md 是 router，不是知识库
- **渐进式上下文（Progressive Disclosure）**：Tier 1 每次加载（CLAUDE.md）→ Tier 2 按需加载（docs/）→ Tier 3 忽略（archive/）

### 5. 给敏感模块开「本地 CLAUDE.md」

- 在 `src/auth/`、`src/payments/`、`infra/` 下各放本地 CLAUDE.md
- Claude 操作这些目录时自动加载 → 危险区域的护栏

### 6. 让 CLAUDE.md 驱动 Hook，而不是靠记忆

- 写在 CLAUDE.md 里的规则是"请记住"；配了 Hook 的规则是"你必须"
- Hook 是 CLAUDE.md 规则的**强制执行层**

### 7. 利用 CLAUDE.md 建立长期记忆回路

- 在 CLAUDE.md 里加指令让 Claude 自己维护 MEMORY.md
- 比任何"AI 长期记忆 MCP"都简单、可控、可 Git 追踪
- 成本：一个文件。收益：跨会话保留最有价值的 5%

### 8. 用 CLAUDE.md 代替每次会话的「开场白」

- CLAUDE.md 应承载工作风格——让 Claude 从第一句就知道你讨厌什么
- 6 行工作风格声明可省掉每次新会话的前 5 条消息

## 前提与边界

**前提假设**：
- Claude Code 每次会话的上下文窗口有限 → 200 行上限的必要性（但 DeepSeek V4 等 1M 上下文模型可能改变这一假设）
- Claude 不会主动遵守模糊指令 → 需要具体可操作的规则（模型在指令遵循上的进步可能缓解此问题）
- Hook 系统能可靠触发 → 强制执行的可行性

**数据可靠性**：
- 200 行上限来自 Boris Cherny 的个人经验，非量化基准，不同项目复杂度可能需要不同上限
- 无具体 A/B 测试数据支撑

**不适用场景**：
- 文章默认软件开发场景；非代码项目（如本 wiki）的 CLAUDE.md 需要调整格式和内容重心
- 未涉及 CLAUDE.md 四层优先级体系（managed → user → project → local），而这正是本地 CLAUDE.md（#5）和记忆回路（#7）背后的机制

## 与现有知识的关联

- **[[context-engineering]]** — #1（200行上限）和 #4（指针不图书馆）是 Context 工程在 CLAUDE.md 场景的直接应用；#7（MEMORY.md）对应 Harness 的 File System 记忆管理
- **[[harness]]** — CLAUDE.md 本身就是 Harness 四原语中的 System Prompt；#6（Hook 驱动）呼应 AgentWay 原则 #4（工具 = 受管执行接口）
- **[[agent-tool-design]]** — #4 的 Progressive Disclosure 分层与 Anthropic 的工具设计哲学完全对齐
- **[[agentic-skill-design]]** — #3 的"规则可操作性"与 Fat Skills 的"把 intelligence 往上推到 skills"理念一致
- **已记录的 CLAUDE.md 四层体系**（见 [[context-engineering]] 和 [[harness]]）— 文章未提及但暗含了 project → local 层的使用
