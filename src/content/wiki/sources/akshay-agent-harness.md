---
type: source
title: 一文深度解析 Agent Harness
author: Akshay
date: 2026-04-12
source_url: https://x.com/akshay_pachaar/status/2041146899319971922
source_path: raw/articles/akshay-agent-harness-2026-04.md
tags: [harness, agent, architecture, comparison, production, langchain, anthropic, openai]
ingested: 2026-04-14
updated: 2026-04-25
---

# 一文深度解析 Agent Harness（Akshay, 2026-04-12）

## 摘要

Akshay 发表于 X 的长文，综合 Anthropic、OpenAI、LangChain 及更广泛实践者社区的做法，系统化定义了 Agent Harness 的 12 个组成部分、7 个关键架构决策，以及 5 个主流框架（Claude Agent SDK、OpenAI Agents SDK、LangGraph、CrewAI、AutoGen）的实现对比。核心论点：Harness 不是模型的外壳，而是产生 Agent 行为的机械结构——**"If you're not the model, you're the harness."**

## 关键要点

- **Harness 的精确定义**：包裹 LLM 的整套软件基础设施——编排循环、工具、记忆、上下文管理、状态持久化、错误处理、护栏。Agent 是涌现行为，Harness 是产生行为的机械结构
- **LangChain TerminalBench 2.0 实证**：只改 Harness 层（同一模型同一权重），从前 30 名外跳到第 5 名。独立研究让 LLM 优化自身 Harness 达到 76.4% 通过率
- **Von Neumann 类比**（Beren Millidge, 2023）：LLM = CPU, Context Window = RAM, 外部数据库 = 磁盘, 工具集成 = 设备驱动, Harness = 操作系统。"We have reinvented the Von Neumann architecture"
- **三层工程结构**：Prompt Engineering → Context Engineering → Harness Engineering（前者包含于后者）
- **12 个组件系统化分解**：编排循环、工具、记忆、上下文管理、提示词构建、输出解析、状态管理、错误处理、防护机制、验证循环、子智能体编排、（第 12 项为动态循环机制）
- **7 个关键架构决策**：单/多 Agent、ReAct vs Plan-and-Execute、上下文窗口策略、验证循环设计、权限安全架构、工具范围策略、Harness 厚度
- **脚手架隐喻与共同演化**：Harness 应随模型变强而变薄。Manus 六个月重写五次，每次都在删除复杂性。"Future-proofing test"：如果模型变强时性能提升而不需增加 Harness 复杂度，设计就是健康的
- **框架实现对比**：Claude Agent SDK（dumb loop, Gather-Act-Verify）、OpenAI Agents SDK（code-first, Codex 三层架构）、LangGraph（显式状态图, 五种执行模式）、CrewAI（Flows 层）、AutoGen（五编排模式含 magentic）
- **验证循环的关键性**：Claude Code 创建者 Boris Cherny："给模型一个验证自己工作的办法，质量会提升 2-3 倍"
- **工具范围的反直觉证据**：Vercel 从 v0 中移除了 80% 的工具，效果反而更好。Claude Code 通过 lazy loading 实现了 95% 的上下文缩减
- **ACON 研究**：保留 reasoning traces 而非原始工具输出，可在 95%+ 准确率下减少 26-54% token 使用

## 重要引用

> "If you're not the model, you're the harness." — Vivek Trivedy (LangChain)

> "We have reinvented the Von Neumann architecture." — Beren Millidge

> "Harness 只是一个 dumb loop，所有智能都在模型里。" — Anthropic

> "给模型一个验证自己工作的办法，质量会提升 2 到 3 倍。" — Boris Cherny (Claude Code 创建者)

> "问题不在你的模型。问题在模型之外的所有东西。"

## 前提与边界

- **前提假设**：12 组件框架和 7 个架构决策综合自 Anthropic、OpenAI、LangChain、CrewAI、AutoGen 五大框架的公开文档与社区讨论，代表了 Akshay 的个人分析视角
- **数据可靠性**：LangChain TerminalBench 2.0 排名数据（同一模型改 Harness 从前 30 名外跳到第 5 名）和 ACON 研究的 token 节省数据（26-54%）为可验证的量化证据；Boris Cherny 的"2-3x"引用来自公开演讲但缺乏独立复现
- **不适用场景**：结论基于 2026 年 4 月的框架版本，框架 API 和设计理念可能在后续版本中发生重大变化；五框架对比侧重 orchestrator 层，未深入安全、合规、企业级权限等维度

## 与现有知识的关联

- **系统化整合**：将此前 [[chase-harness-interview|Chase 四原语]]、[[harness-engineering-books|AgentWay 十条原则]]、[[claude-code-source-report|源码研究]] 的分散验证整合为统一的 12 组件框架
- **横向对比**：首次将 Anthropic、OpenAI、LangGraph、CrewAI、AutoGen 五框架并排比较实现策略
- **预测性洞察**：脚手架隐喻（Harness 应随模型进化而变薄）为此前的"Harness 不是护城河"提供了演化方向
- **验证循环独立强调**：Cherny 的 2-3x 引用量化了此前 [[agent-tool-design|AgentWay 的"验证必须独立"原则]]的效果
