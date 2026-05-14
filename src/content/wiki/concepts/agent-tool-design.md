---
type: concept
aliases: [Agent Tool Design, Seeing Like an Agent, 以 Agent 视角设计, 工具塑形]
related: "[[ai-agent]], [[context-engineering]], [[mcp]], [[llm-wiki-pattern]], [[rag-vs-compiled-wiki]], [[harness]], [[hermes-agent]], [[agentway]]"
tags: [ai, agent, tool-design, progressive-disclosure, anthropic, managed-execution]
sources: "[[seeing-like-an-agent]], [[chase-harness-interview]], [[hermes-agent-articles]], [[openclaw-books]], [[claude-code-source-report]], [[harness-engineering-books]], [[akshay-agent-harness]], [[intuitmachine-agentic-skills]], [[thariq-html-effectiveness-claude-code]]"
created: 2026-04-12
updated: 2026-05-11
---

# Agent 工具设计（以 Agent 视角设计）

## 定义

为 AI Agent 设计工具的哲学与实践——核心原则是**工具的形态必须匹配模型的能力**，而非人类直觉。Anthropic 称之为"Seeing like an agent"（以 Agent 的视角看世界）。

## 前提与边界

**前提**：
- Progressive Disclosure 的有效性根植于 Transformer 注意力机制的特性——模型在少量精选上下文中的表现优于大量噪声上下文，这使得"按需加载"优于"预加载全量"
- Anthropic 的工具设计哲学（"Seeing like an agent"）基于 Claude 模型的特定能力 profile，不同模型（如 GPT 系列、Gemini）可能对工具粒度有不同偏好
- "工具越多性能越差"的结论基于当前模型的选择和编排能力，更强模型可能逆转此趋势

**边界**：
- Vercel 从 v0 移除 80% 工具效果更好的案例来自特定项目（前端组件生成），未必普适于所有领域——某些领域（如 DevOps）可能确实需要大量专业工具
- IntuitMachine 的专用 vs 通用工具量化对比（75x 速度差异）基于浏览器自动化场景，其他场景的倍率可能不同
- "让 Agent 自己找上下文"（RAG→Agent Search）的前提是知识库有良好的文件组织结构，无结构的代码仓库或文档集合可能仍需 RAG 辅助

## 核心框架：工具光谱

设计 Agent 工具时的根本问题：**一个通用工具 vs. 多个专用工具？**

| 极端 | 示例 | 优势 | 劣势 |
|------|------|------|------|
| 一个通用工具 | bash、code execution | 灵活，无选择困难 | 需要模型知道如何使用 |
| 多个专用工具 | 每个场景一个工具 | 明确、易调用 | 选择困难、维护负担 |

类比：给一个人数学题——
- 只给纸笔 → 有限于手算（能力弱但无需学习）
- 给计算器 → 更快但需会操作
- 给电脑 → 最强但需会编程

**原则**：工具要"塑形"（shaped）到模型的技能上。模型能力提升 → 工具设计必须跟随进化。

## 三个关键教训（Anthropic 实战）

### 教训一：工具设计是试错过程

AskUserQuestion 工具经过三次迭代才成功：
1. 在已有工具中加参数 → 失败（职责混淆）
2. 修改输出格式 → 失败（模型不够可靠）
3. **独立工具** → 成功（模型"喜欢"调用，结构化输出可靠）

> 即使最好的设计，如果模型不理解如何使用，也不会工作。

### 教训二：旧工具可能成为新能力的约束

TodoWrite（待办列表）→ Task（动态任务系统）的演进：
- 早期模型需要 todo 保持聚焦
- 模型变强后，todo 提醒让它僵化地坚持旧计划
- 需要跨 Agent 协调 → Task 工具支持依赖、共享、动态修改

> **当模型能力提升，曾经需要的工具可能变成约束。**

### 教训三：让 Agent 自己找上下文

Claude Code 从 RAG 转向 Agent 自主搜索：
- RAG：向量数据库预索引 → Agent 被动接收上下文
- Agent Search：给 Agent Grep 工具 → Agent 自己搜索构建上下文
- 结果：Agent 越聪明，越擅长用工具构建自己的上下文

> "The most consequential tools we've built are the ones that let Claude find its own context."

## Progressive Disclosure（渐进式披露）

Anthropic 正式化的核心设计模式：**不预加载所有信息，让 Agent 按需通过探索递归发现上下文**。

实现方式：
1. Agent 读取一个入口文件（如 skill 文件）
2. 入口文件引用其他文件
3. Agent 按需递归读取
4. 子 Agent 可代劳搜索 → 主 Agent 上下文保持干净

Claude Code Guide Agent 实例：
- 问题：用户偶尔问 Claude Code 自身用法 → 但全部放入 system prompt 会造成 [[context-engineering|上下文腐烂]]
- 方案：子 Agent 专门搜索文档，只返回答案，主 Agent 上下文不受污染
- 效果：**添加能力但不添加新工具**

## 设计决策检查清单

| 问题 | 指导原则 |
|------|----------|
| 该加新工具吗？ | 能否通过 progressive disclosure 实现？工具数是负担 |
| 该移除旧工具吗？ | 模型变强后，旧工具是否成了约束？ |
| 工具形状对吗？ | 观察模型的实际调用模式，而非人类直觉 |
| 上下文管理？ | 工具返回的信息是否过多造成 context rot？ |

### 工具范围的反直觉证据

[[akshay-agent-harness|Akshay]]（2026-04）汇总的生产级证据：

- **Vercel 案例**：从 v0 中**移除了 80% 的工具，效果反而更好**
- **Claude Code lazy loading**：通过按需加载工具实现了 **95% 的上下文缩减**
- **原则**：只暴露当前步骤所需的最小工具集。工具越多，模型选择困难，性能越差

这与 Anthropic 原始发现（AskUserQuestion 工具从合并→分离的演进）和 Chase 的 Progressive Disclosure 一脉相承——**工具是负担，少即是多**。

## 与其他概念的关系

- [[ai-agent]] — 工具设计是 Agent 架构的"最后一英里"
- [[context-engineering]] — Progressive disclosure 是 Context 工程中"即时上下文"策略的实现
- [[rag-vs-compiled-wiki]] — Anthropic 亲历 RAG→Agent Search 转型，验证"Agent 自主发现 > 被动接收"
- [[mcp]] — MCP 提供工具连接协议，但工具本身的设计是独立课题
- [[llm-wiki-pattern]] — LLM Wiki 的 Schema→index→pages 就是 progressive disclosure 的知识管理实现

## 与本 Wiki 的直接关联

本 wiki 的三个核心文件完美体现了 progressive disclosure：
1. `WIKI.md`（Schema）→ Agent 读入口规则
2. `wiki/index.md` → Agent 发现可用页面
3. 具体页面 → Agent 按需深入阅读

这就是为什么本 wiki 能在~30 页规模下高效运行——Agent 不是一次性加载所有页面，而是通过渐进式披露按需定位。

## 第三方验证：Chase（LangChain DeepAgents）

Harrison Chase 在 DeepAgents 中独立实现了相同的 Progressive Disclosure 模式：
- **Skill** 在 System Prompt 中引用但不预加载 → Agent 需要时按需读取
- Chase 明确使用了 "Progressive Disclosure" 这一术语
- 这是继 Anthropic（Claude Code）和 Karpathy（LLM Wiki Schema→index→pages）之后的**第三次独立验证**

三方不约而同 → Progressive Disclosure 不是某个团队的偏好，而是 Agent 系统的**架构必然**。

详见 → [[harness]]（Harness 的 Skill 设计）和 [[wiki-as-harness]]（本 Wiki 即 Harness 实例）

## 第四方验证：Hermes Agent（自主 Tool 发现）

[[hermes-agent|Hermes Agent]] 将 Progressive Disclosure 延伸到新维度——**Agent 不仅自己找上下文，还自己找工具**：

1. **agentskills.io 技能市场**：Agent 发现能力不足 → 自主搜索、安装、学习技能 → 经验沉淀回 Skills
2. **SOUL.md 的生成式设计**：从对话历史（Episodic Memory）中总结生成 System Prompt（Procedural Memory）→ 印证"让模型承担更多职责"
3. **自验证原则**：先验证后回答、先计划后执行、交付即验证、**失败即沉淀**——将 Progressive Disclosure 内化为 Agent 行为准则

这是从"给 Agent 设计工具"到"让 Agent 自主发现并创造工具"的进化。

### 第五方验证：Claude Code 源码（Progressive Disclosure 的运行时架构）

[[claude-code-source-report|Claude Code 源码研究]] 揭示 Progressive Disclosure 不只是设计理念，而是**多层运行时架构**：

- **Skill = first-class primitive**：不是文档，而是 markdown prompt bundle（frontmatter + allowed-tools + 按需注入）
- **MCP instructions = 条件注入**：只在连接 MCP server 时注入 instructions
- **Session-specific guidance = 动态 section**：根据当前可用工具/feature 拼出局部规则
- **Fork cache = byte-identical prefix**：fork 继承父线程 system prompt 和 tool defs，保持完全一致以命中 cache

**Skill 调用的制度化**：源码明确要求"匹配 skill 时**必须**调用 Skill tool，不能只提不执行"——将 Progressive Disclosure 从建议变为运行时约束。

**Agent 调度链**：AgentTool → runAgent → query 的 14 步 pipeline 实现了"按需发现"的工程化——模型不预加载所有信息，而是在运行时通过调度链按需构造子 Agent 的上下文。

## 工具即受管执行接口（AgentWay）

[[harness-engineering-books|AgentWay]] 提出了"工具 = 受管执行接口"的工程原则——工具不应被建模为"模型能力的延长线"，而应被建模为"需要运行时代为管理风险的外部能力"：

1. **并发安全判定**：isConcurrencySafe() → 分区执行。即便执行并发，语义上的上下文演化仍保持确定顺序——并发不破坏因果秩序
2. **权限三元语义**：allow / deny / ask——"会做"不等于"可以做"，理解意图不等于拥有授权
3. **中断是一等语义**：StreamingToolExecutor 区分 sibling error / user interrupted / streaming fallback 三种中断原因，为每种生成 synthetic result
4. **高风险工具特殊治理**：Bash 不是普通工具而是风险放大器——复合命令上限、子命令数量限制、整整一大段 bashPermissions.ts
5. **工具系统保护系统自身**：权限/调度/中断不仅保护用户，更保护运行时的一致性

> 工具不应该被建模为"模型能力的延长线"，而应该被建模为"需要运行时代为管理风险的外部能力"。

### Claude Code vs Codex 的工具治理差异

| 维度 | Claude Code | Codex |
|------|------------|-------|
| 策略 | 运行时审批链（现场拍板） | Schema + Policy 语言（先写制度再执行） |
| Bash | 特殊高压治理（BashTool 专属 prompt + permissions） | 参数化审批（required 字段 + additional_properties 关闭） |
| 并发 | 保守分区 + context modifier 缓存回放 | Schema 约束 + exec policy crate |
| 类比 | 值班经理现场拍板 | 公司先写好制度再看是否合规 |

### Agent 输出格式：Markdown vs HTML

[[thariq|Thariq]]（Claude Code 团队，2026-05）从工具输出格式角度提出了 Markdown vs HTML 的选择问题（详见 [[thariq-html-effectiveness-claude-code]]）：

**HTML 的工具设计优势**：Agent 的输出不仅传递信息，还需要让人类高效审查和反馈。HTML 支持交互控件（滑块、按钮、可拖拽卡片），将"人类反馈"从纯文本输入扩展为可视化操作，缩短了人机协作循环。

**适用边界**：HTML 适合**一次性中间产物**（计划、报告、原型），Markdown 适合**持久文档**（知识库、配置、协作文档）。版本控制是 HTML 的已知痛点。

> 这是 Progressive Disclosure 在输出端的延伸：不是所有信息都要压缩到 Markdown 纯文本里——当输出目标是人类审查时，更丰富的格式可能比更少的 token 更有价值。

## 出自

- [[seeing-like-an-agent|Seeing like an agent]]（Anthropic 官方博客，2026-04-10）
- [[chase-harness-interview|Chase Harness 专访]]（LangChain DeepAgents 的 Progressive Disclosure 实践）
- [[hermes-agent-articles|Hermes Agent 三篇实践指南]]（自主 Tool 发现、SOUL.md 生成式设计）
- [[claude-code-source-report|Claude Code 源码研究报告]]（Progressive Disclosure 的运行时架构实现）
- [[harness-engineering-books|AgentWay 双书]]（工具即受管执行接口、Claude Code vs Codex 工具治理差异）
- [[akshay-agent-harness|一文深度解析 Agent Harness]]（Vercel 80% 工具移除案例、工具范围策略，2026-04-12）

## Purpose-built Tools（专用工具设计）

[[intuitmachine-agentic-skills|IntuitMachine 的 Skill 设计文章]]给出了专用工具 vs 通用工具的量化对比：

| 维度 | 通用工具（Chrome MCP） | 专用工具（Playwright CLI） |
|------|----------------------|--------------------------|
| 操作 | screenshot → find → click → wait → read | 单次浏览器操作 |
| 速度 | 每次操作 15 秒 | 每次操作 100ms |
| 倍率 | 1x | **75x** |

**设计哲学**："软件已经没必要再那么珍贵了。只构建你真正需要的，而且只构建这些。"

**与 Progressive Disclosure 的关系**：Purpose-built tools 是 Progressive Disclosure 在工具层的具体实现——不是提供一个万能工具让模型自己拆步骤，而是预先拆成窄而专的工具，减少模型决策负担和往返延迟。

**与 Vercel 案例的交叉验证**：Vercel 从 v0 移除 80% 工具效果更好，IntuitMachine 量化了原因——通用工具每次操作 15 秒，专用工具 100ms。速度差异在每次 Skill invocation 中复利。

**反模式**：把每个 REST endpoint 包成单独工具的 API wrappers——既不够通用（不如直接 HTTP 调用灵活），也不够专用（没有针对特定工作流优化）。

详见 → [[agentic-skill-design]]
