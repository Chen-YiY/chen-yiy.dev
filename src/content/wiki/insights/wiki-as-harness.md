---
type: insight
strength: strong
sources: "[[chase-harness-interview]], [[karpathy-llm-wiki]], [[seeing-like-an-agent]], [[shannholmberg-ai-knowledge-layer]]"
tags: [meta-insight, harness, progressive-disclosure, llm-wiki, self-reference]
created: 2026-04-12
---

# LLM Wiki 即 Harness

## 洞察

本 Wiki 的架构与 Harrison Chase 定义的 Agent Harness 四核心原语存在**精确的结构对映**。这意味着本 Wiki 不仅是在*记录* Agent 架构知识——它本身*就是*一个 Agent Harness 实例。

## 结构映射

| Harness 原语 | LLM Wiki 对应 | 功能一致性 |
|-------------|-------------|-----------|
| **System Prompt** | `WIKI.md`（Schema） | 定义 Agent 行为规范、页面模板、流程规范 |
| **Planning Tool** | `index.md` + `overview.md` | Agent 查询时先读索引定位相关页面，类似"思维草稿本" |
| **Sub-Agent** | Claude 子 Agent 搜索 wiki | Context 隔离——主对话不承载所有页面内容 |
| **File System** | `wiki/` 目录下所有 .md 文件 | Agent 按需读取页面，选择性加载，持久化存储 |

## 三源验证的 Progressive Disclosure

三个独立来源不约而同地确认了 Progressive Disclosure 模式：

| 来源 | 说法 | 实践 |
|------|------|------|
| **Anthropic**（[[seeing-like-an-agent]]） | "给 Agent 上下文不如让 Agent 自己找上下文" | Claude Code 的 Schema→Agent 搜索模式 |
| **Karpathy**（[[karpathy-llm-wiki]]） | Schema→index→pages 三层渐进 | LLM Wiki 的查询流程 |
| **Chase**（[[chase-harness-interview]]） | "只告诉 Agent 它需要知道的东西，在需要知道的时候" | DeepAgents 的 Skill 按需加载 |

本 Wiki 的查询流程（先读 WIKI.md → 读 index.md → 选择性读页面）**同时是三者的实践**。

## Ingest→Query→Lint = Harness 循环

本 Wiki 的三个核心操作对应 Harness 的循环运行模式：

- **Ingest** = Agent 启动，接收外部信息，编译到持久结构
- **Query** = Agent 在循环中运行，按需发现上下文，调用 Tool（读/写 wiki 页面）
- **Lint** = Agent 自检，相当于 Compaction + 质量验证

## Procedural Memory 的 Wiki 映射

Chase 说 Procedural Memory = Agent Configuration（System Prompt + Skill + Tool），且可以自我修改。

本 Wiki 的 `WIKI.md` 就是 Procedural Memory——它定义了 Agent 如何操作 wiki。如果 Agent 在运行中发现 Schema 不完善，它可以修改 `WIKI.md` 本身。这就是**学习**。

## 意义

1. **自指性**：本 Wiki 记录 Agent 架构知识，同时自身就是所记录知识的实例——这是知识的**元认知循环**
2. **验证性**：如果 Chase 的 Harness 理论正确，那么本 Wiki 作为 Harness 实例应该有效——而它的持续运行本身就在验证理论
3. **设计指导**：理解 Wiki 即 Harness 后，可以主动运用 Harness 设计原则来优化 Wiki 架构（如给 Wiki 添加 Context Compaction、更好的 Sub-Agent 调度等）

## Knowledge Layer 视角（@shannholmberg 补充）

[[shannholmberg-ai-knowledge-layer|Shann Holmberg]]提出的 AI Knowledge Layer 双层架构进一步验证了 Wiki 即 Harness 的洞察：

| Knowledge Layer | 本 Wiki 对应 | Harness 原语 |
|----------------|------------|-------------|
| KBL（动态知识库） | `wiki/` 所有页面 | File System |
| BF（品牌基础层） | `WIKI.md`（Schema + 规则） | System Prompt |
| `raw/` inbox | `raw/` 原始素材 | Agent 输入 |

**关键发现**：本 Wiki 的 `WIKI.md` 同时承担了 Schema（控制 LLM 行为）和 BF（锚定规则不可由 Agent 修改）的功能。但 Shann 的设计将两者分离——BF 是独立的、人控的锚点层。这提示了一个优化方向：本 Wiki 是否应该将"风格/语体规则"从 WIKI.md 的操作 Schema 中独立出来？

## 涉及源

- [[chase-harness-interview]] — 定义 Harness 四原语
- [[karpathy-llm-wiki]] — 定义 LLM Wiki 模式（本 Wiki 的蓝图）
- [[seeing-like-an-agent]] — Progressive Disclosure 设计模式
- [[shannholmberg-ai-knowledge-layer]] — AI Knowledge Layer 双层架构
