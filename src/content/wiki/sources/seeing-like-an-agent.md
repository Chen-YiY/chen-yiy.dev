---
type: source
title: "Seeing like an agent: how we design tools in Claude Code"
author: Thariq Shihipar (Anthropic)
date: 2026-04-10
source_url: https://claude.com/blog/seeing-like-an-agent
source_path: "raw/articles/seeing-like-an-agent-2026-04-10.md"
tags: [agent, tool-design, claude-code, progressive-disclosure, anthropic]
ingested: 2026-04-12
updated: 2026-04-25
---

# Seeing like an agent

## 摘要

Anthropic Claude Code 团队关于 Agent 工具设计的官方博客。核心论点：**设计工具需要"以 Agent 的视角看世界"**——工具的形态必须匹配模型的能力，而非人类直觉。通过三个真实案例（AskUserQuestion 迭代、TodoWrite→Task 演进、RAG→Agent 自主搜索），展示了工具设计的试错哲学。

## 关键要点

### 1. 工具设计的光谱
- 一个通用工具（如 bash）vs. 五十个专用工具——答案取决于模型的"技能水平"
- 类比：解决数学题——纸笔（最弱）→ 计算器（中等）→ 电脑（最强），但后者需要你知道如何使用
- **核心原则**：给 Agent 的工具要"塑形"（shaped）到它自己的能力上

### 2. AskUserQuestion 的三次迭代
- **尝试 1**：在 ExitPlanTool 中加参数 → 失败（同时要计划和问题，Claude 混淆）
- **尝试 2**：修改 markdown 输出格式 → 失败（Claude 不够可靠地遵守格式）
- **尝试 3**：独立工具 → 成功（Claude "喜欢"调用它，结构化输出可靠）
- **教训**：即使最好的工具设计，如果 Claude 不理解怎么用，也不会工作

### 3. TodoWrite → Task：能力进化使旧工具成为约束
- TodoWrite + 每 5 轮系统提醒 → 帮助早期模型保持聚焦
- 随模型变强：提醒让 Claude 僵化地坚持旧列表而非灵活调整
- Opus 4.5 擅长子 Agent 协作 → 需要跨 Agent 任务协调
- **Task 工具**取代 TodoWrite：支持依赖、跨 Agent 共享、动态修改/删除
- **关键洞察**：模型能力提升后，曾经需要的工具可能变成约束

### 4. RAG → Agent 自主搜索
- Claude Code 最初使用 RAG（向量数据库预索引代码库）
- RAG 的问题：需要索引/设置、环境脆弱性、最重要的是 Claude 被**给**上下文而非**自己发现**上下文
- 解决：给 Claude Grep 工具 → 让它自己搜索构建上下文
- **与 [[rag-vs-compiled-wiki]] 直接共鸣**：Anthropic 自己的实战验证了"Agent 自主发现 > 被动接收"！

### 5. Progressive Disclosure（渐进式披露）
- 正式概念：通过 Agent Skills 引入——Agent 可递归读取文件以发现上下文
- Claude 从"不能构建自己的上下文"进化到"跨多层文件做嵌套搜索"
- **Claude Code Guide Agent**：用子 Agent 处理文档搜索 → 主 Agent 上下文保持干净
- 新功能的添加标准：能否通过 progressive disclosure 实现，而非必须加新工具

## 重要引用

> "You want to give it tools that are shaped to its own abilities. But how do you know what those abilities are? You pay attention, read its outputs, experiment. You learn to see like an agent."

> "As model capabilities increase, the tools that your models once needed might now be constraining them."

> "The most consequential tools we've built are the ones that let Claude find its own context."

> "Claude was given this context instead of finding the context itself."

## 前提与边界

- **前提假设**：基于 Claude Code 团队在 Anthropic 内部的真实开发实践经验；工具设计哲学的前提是模型能力会持续进化，当前设计可能随模型升级而过时
- **数据可靠性**：Anthropic 一手实践总结，权威性高；三个案例（AskUserQuestion、TodoWrite→Task、RAG→自主搜索）均有真实的迭代过程支撑
- **不适用场景**：工具设计哲学基于 Claude 模型的特定能力特征（如结构化输出偏好、子 Agent 协作能力），可能不直接适用于其他模型架构；小型 Agent 项目可能不需要如此细粒度的工具迭代

## 与现有知识的关联

- **强化 [[rag-vs-compiled-wiki]]**：Anthropic 亲身经历从 RAG 到 Agent 自主搜索的转型——"给 Claude 上下文 vs 让 Claude 找上下文"与"编译式 Wiki vs RAG"是完全相同的二分法
- **实践 [[context-engineering]]**：Progressive disclosure 是"即时上下文"策略的 Anthropic 官方实现
- **深化 [[ai-agent]]**：工具设计是 Agent 架构的"最后一英里"——最好的 Agent 架构也会被糟糕的工具设计拖垮
- **交叉 [[llm-wiki-pattern]]**：LLM Wiki 的 Schema→index→pages 就是 progressive disclosure——Agent 按需发现而非一次性加载
- **连接 [[mcp]]**：MCP 提供工具连接协议，但此文讨论的是工具本身的**设计哲学**
