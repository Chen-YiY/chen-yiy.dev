---
type: source
title: "深度｜LangChain联合创始人：模型不再是主角，智能体时代的Harness正在重塑一切"
author: Harrison Chase (interviewee), Matt Turck (interviewer)
date: 2026-03-12
source_url: https://youtu.be/rSKh6bVuVZI
wechat_url: https://mp.weixin.qq.com/s/tZL-8voYxXJlsxFe_C8R0g
source_path: raw/articles/chase-harness-interview-2026-03-12.md
compiler: Tara Wang
tags: [agent, harness, langchain, progressive-disclosure, memory, context-engineering]
ingested: 2026-04-12
updated: 2026-04-25
---

# Chase Harness Interview

## 摘要

LangChain 联合创始人 Harrison Chase 在 MAD 播客中提出：**Harness（脚手架）才是 AI Agent 时代的关键，而非模型本身**。他定义了现代 Agent 架构的四个核心原语——System Prompt、Planning Tool、Sub-Agent、File System——并论证了 **Progressive Disclosure**（按需加载上下文）和 **Procedural Memory**（Agent 自我修改配置实现学习）是 Agent 系统设计的核心原则。

## 关键要点

- **[[harness|Harness 四原语]]**：System Prompt（驱动行为）+ Planning Tool（思维草稿本）+ Sub-Agent（Context 隔离）+ File System（自主 Context 管理）→ 这四个是 Claude Code、Manus、Deep Research 等成功 Agent 的共同架构
- **Harness > Model**：Manus 的成功在于 Harness 而非底层模型；Claude Code 的价值在 Harness 不只在 Claude（但 Harness 和 UI 高度耦合）
- **[[agent-tool-design|Progressive Disclosure]] 第三方验证**：Skill 在 System Prompt 中引用但不预加载，Agent 需要时按需读取——Chase 明确使用了 "Progressive Disclosure" 这个术语
- **File System = Agent 自管理 Context**：读写文件让 LLM 自己决定加载什么、持久化什么——"让它们自己管理 Context，就像是让它们调用 Tool 的升级版"
- **Memory 三类型**：Semantic（≈RAG）、Episodic（对话历史）、Procedural（指令/Skill/Config = Agent 配置 = 可自我修改的学习机制）
- **Context Compaction 创新**：DeepAgents 给 Agent 一个 Tool 让它自己决定何时触发压缩，而非基于阈值自动触发
- **真正护城河**：不是 Harness 技术，而是领域 Knowledge + Tool——"这些是不会变的"
- **LangChain 产品演进**：LangChain（Abstraction）→ LangGraph（Runtime）→ LangChain 1.0（循环模式聚焦）→ DeepAgents（Batteries-included Harness）→ LangSmith（Observability ++）

## 前提与边界

- **前提假设**：Chase 提出的四原语（System Prompt、Planning Tool、Sub-Agent、File System）来自对 Claude Code、Manus、Deep Research 三个产品的观察归纳，假设这四个原语能覆盖现代 Agent 架构的核心需求
- **数据可靠性**：基于 Chase 个人分析加播客讨论，属于专家观点而非系统性研究；Chase 作为 LangChain 联合创始人可能存在产品立场偏好
- **不适用场景**：四原语可能不覆盖所有 Agent 架构模式（如纯流式管道、嵌入式 Agent）；Chase 对"早期显式规划"的否定可能仅适用于当前模型能力阶段

## 与现有知识的关联

### 强化已有认知

1. **Progressive Disclosure 第三方验证**：Chase（DeepAgents）独立使用了与 Anthropic（Claude Code）和 Karpathy（LLM Wiki）相同的设计模式，三方不约而同 → 此模式不是某个团队的偏好，而是 Agent 系统的**架构必然**
2. **File System ≈ 编译式 Wiki**：Chase 说"File System 让 LLM 自己管理 Context"——这与 [[rag-vs-compiled-wiki|RAG vs 编译式 Wiki]] 的核心论点完全一致：预先编译知识到持久结构，让 Agent 按需发现，而非每次重新检索
3. **Harness = Agent 的"第二大脑"**：System Prompt + Skill + Tool 配置 = [[agent-tool-design|Agent 的 Procedural Memory]]，本质上是 Forte 的 [[second-brain|Second Brain]] 概念在 Agent 领域的映射

### 产生的新洞察

- **LLM Wiki 本身就是一个 Harness**（详见 [[wiki-as-harness]]）：
  - `WIKI.md` = System Prompt（行为规范）
  - `index.md` = Planning Tool（任务导航）
  - Claude 子 Agent 搜索 = Sub-Agent（Context 隔离）
  - `wiki/` 文件系统 = File System（自主 Context 管理）
  - 本 wiki 的 Ingest→Query→Lint 正是 Harness 的循环运行模式

## 重要引用

> "Harness才是最关键的东西。云模型很棒，但真正让这一切落地的其实是Harness。"

> "File System让LLM能够自己管理自己的Context。让它们自己管理Context，就像是让它们调用Tool的升级版。"

> "Knowledge、Tool——那些属于你特定领域的东西——这些是不会变的。"

> "沟通是生活中最难的事情——它是创业最难的部分，是人际关系最难的部分，也是与Agent协作时最难的部分。"

> "以前确实是这样的...先有一个明确的规划步骤...但这会引发各种边界情况...整个流程就变得过于复杂和臃肿了。"

## 出自

- The MAD Podcast with Matt Turck（原始播客）
- Daytona Compute Conference 2026（录制地点）
- Z Potentials（中文编译）
