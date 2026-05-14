---
type: source
title: AI Agentic Skills 设计的关键概念
author: "@IntuitMachine (X/Twitter), WaytoAGI-鹏影 整理"
date: 2026-04-13
source_url: https://x.com/IntuitMachine/status/2043078828583514521
source_path: raw/articles/intuitmachine-agentic-skills-2026-04-13.md
tags: [agent, skills, harness, design-pattern, markdown, diarization]
ingested: 2026-04-15
updated: 2026-04-25
---

# AI Agentic Skills 设计的关键概念

## 摘要

系统化阐述 Agent Skill 设计的 10 个关键概念：从"Skill = 方法调用"的基础认知，到 Fat Skills / Thin Harness 的三层架构，再到自我改进的学习循环和技能设计清单。核心理念：**Markdown 是编程语言，human judgment 是运行时，90% 的价值在 Skills 层，Harness 只需 200 行代码。**

## 关键要点

### 基础认知
- **Skill ≠ Prompt**：Prompt 描述任务（单次使用、上下文绑定），Skill 描述流程（可复用、参数化、与上下文无关）
- **Skill 编码判断而非步骤**：包含 Process（步骤序列）、Judgment（何时做什么）、Context（领域知识）、Constraints（边界与失败模式）
- **Markdown 是最佳载体**：用模型"母语"描述 process、judgment 和 context

### 架构设计
- **Latent vs Deterministic 边界**：混淆两者是 agent 设计最常见的错误。Skill 应编排这条边界：LATENT→DETERMINISTIC→LATENT→DETERMINISTIC→LATENT
- **三层架构**：Fat Skills（90% 价值）→ Thin Harness（~200 行）→ Deterministic Application（窄而专的工具）
- **反模式**：Fat Harness + Thin Skills（40+ tool definitions、MCP 往返延迟、REST endpoint 包装器）

### 核心能力
- **Diarization**：从非结构化源中编译结构化 intelligence——暴露矛盾、标出变化、凝结判断。**SQL 做不出，RAG 做不出，只有模型能做**
- **Resolver**：上下文的路由表——检测任务类型→激活→加载正确文档。"不要把所有东西塞进 system prompt"
- **Purpose-built tools**：专用工具比通用工具快 75 倍（Playwright 100ms vs Chrome MCP 15s）

### 生命周期
- **学习循环**：Skill 执行→收集反馈→/improve 读取反馈→写回新规则→下次自动改进
- **技能即永久升级**：不退化、不遗忘。纪律："如果我得为同一件事向你提两次要求，那你就失败了"
- **参数化调用**：同一 Skill 结构，不同参数 = 完全不同行为（/match-breakout vs /match-lunch vs /match-live）

## 重要引用

> "这不是 prompt engineering。这是软件设计，只不过 markdown 是编程语言，而 human judgment 是运行时。"

> "一个 LLM 可以把 8 个人安排在一张餐桌旁。但你让它安排 800 个人时，它会编出一个看起来很合理、实际上却完全错误的 seating chart。"

> "我的 CLAUDE.md 曾经有 20,000 行……最后真正的修复只有大约 200 行，就是一堆指向文档的指针。"

> "把 intelligence 往上推到 skills。把 execution 往下压到 deterministic tooling。让 harness 保持轻薄。"

> "这才是你获得 Yegge 所说 100x 的方式。不是靠更聪明的模型，而是 fat skills、thin harness，以及把一切都 codify 下来的纪律。"

## 前提与边界

- **前提假设**：75 倍速度优势（Playwright CLI 100ms vs Chrome MCP 15s）来自特定场景的 A/B 对比（浏览器自动化），不能直接推广到所有工具类型
- **数据可靠性**：核心观点基于 IntuitMachine 个人的 Agent 使用经验，为单案例验证而非系统性基准测试
- **不适用场景**："餐桌测试"（8 人 vs 800 人）的阈值依赖具体领域——某些领域（如调度优化）即使超过阈值也有算法化解法，不一定要靠 Skill 拆分；"200 行 Harness"的判断基于 Claude Code 生态，其他 Agent 框架的基础设施需求可能不同

## 与现有知识的关联

| 本源概念 | Wiki 已有概念 | 关系 |
|----------|-------------|------|
| 三层架构（Fat Skills / Thin Harness / Deterministic App） | [[harness]] | 直接具体化——给出 Harness 的"正确"分层方式和量级 |
| Diarization（非结构化→结构化） | [[llm-wiki-pattern]] | 本质相同——LLM Wiki 的 ingest 操作就是 Diarization |
| Resolver（上下文路由表） | [[context-engineering]] | 新维度——上下文不仅是管理，还要按需路由加载 |
| Purpose-built tools | [[agent-tool-design]] | Progressive Disclosure 的工具层实践 |
| 学习循环（自我改进） | [[hermes-agent]] Procedural Memory | 产品化验证——Agent 自我修改自己的 Skills |
| 反模式（Fat Harness） | [[agent-tool-design]] Vercel 案例 | 交叉验证——Vercel 移除 80% 工具效果更好 |
| 餐桌测试（Latent vs Deterministic 边界） | [[agent-tool-design]] | 精确的判断启发式——什么时候该让模型做 vs 代码做 |
| Markdown 是编程语言 | [[harness]] System Prompt = SOP | 深化——不只是"指令载体"，而是"能力编码语言" |

## 设计清单（完整）

STRUCTURE: Skill 有清晰参数、编码 process/judgment/constraints、有 description 字段、latent/deterministic 交替
BOUNDARIES: Judgment 在 Skill、Execution 在 tools、Harness 无 business logic、Tools 快且 purpose-built
LIFECYCLE: 先手工 3-10 样本→稳定后 codify→合适时挂 cron→接自我改进闭环
CONTENT: Markdown 写、包含"如何思考"、明确不做什么、记录优化目标
INTEGRATION: Resolver 可发现、参数有类型、输出有格式、可接 Diarization
