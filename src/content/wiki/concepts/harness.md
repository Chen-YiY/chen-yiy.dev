---
type: concept
aliases: [Harness, Agent Harness, 脚手架, Scaffolding, Agent Architecture]
related: "[[ai-agent]], [[agent-tool-design]], [[context-engineering]], [[llm-wiki-pattern]], [[rag-vs-compiled-wiki]], [[hermes-agent]], [[openclaw]], [[agentway]], [[akshay]], [[beren-millidge]], [[baijj]], [[weiyicheng]], [[deepseek]]"
tags: [agent, architecture, harness, progressive-disclosure, context-engineering, harness-engineering]
sources: "[[chase-harness-interview]], [[hermes-agent-articles]], [[openclaw-books]], [[claude-code-source-report]], [[harness-engineering-books]], [[akshay-agent-harness]], [[intuitmachine-agentic-skills]], [[chase-coding-agents-reshaping-epd]], [[erik-schluntz-vibe-coding]], [[baijj-harness-engineering-practice]], [[weiyicheng-agentic-engineering-first-principles]], [[deepseek-v4-announcement]], [[deepseek-v4-technical-report]], [[claudemd-writing-8-best-practices]]"
created: 2026-04-12
updated: 2026-05-11
---

# Harness（Agent 脚手架）

## 简介

Harness 是描述 **LLM 如何与环境交互** 的软件架构层。它不是模型本身，而是围绕模型的工具、协议和流程组合，使 Agent 能够可靠地完成复杂任务。Harrison Chase（LangChain）指出，现代成功 Agent 产品（Claude Code、Manus、Deep Research）共享同一组核心原语，这些原语构成了 Harness。

> "Harness 才是最关键的东西。云模型很棒，但真正让这一切落地的其实是 Harness。" — Harrison Chase

> "If you're not the model, you're the harness." — Vivek Trivedy (LangChain)

**Agent 与 Harness 的区分**：Agent 是一种涌现行为（用户交互到的目标导向实体），Harness 是产生这种行为的机械结构。当有人说"我构建了一个 Agent"，实际意思是构建了一套 Harness 然后接到一个模型上。

## 前提与边界

**前提**：
- Harness 理论建立在 LLM 是无状态处理器（"CPU"）的核心假设之上——模型本身不保留跨轮次状态，所有记忆和持续性由 Harness 层提供
- 适用于需要可靠、重复执行复杂任务的 Agent 场景（如 coding agent、research agent），不适用于纯对话式问答或一次性查询
- Von Neumann 类比假设 LLM 系统会收敛到类似经典计算的架构，这在当前 Transformer 架构下成立，但未来架构可能打破此假设

**边界**：
- 四核心原语来自 Harrison Chase 对 Claude Code、Manus、Deep Research 三个产品的归纳——可能不涵盖所有 Agent 框架的设计空间
- 12 组件分解来自 Akshay 对 Anthropic、OpenAI、LangChain、CrewAI、AutoGen 五大框架的分析，代表 2026 年初的主流实践，新框架可能引入未预见组件
- TerminalBench 实证基于特定基准测试，不同任务域的排名差异可能不同
- "模型变强则 Harness 变薄"的共同演化假设尚未被长期数据验证

### Von Neumann 类比

[[beren-millidge|Beren Millidge]]（2023）在 "Scaffolded LLMs as Natural Language Computers" 中给出精确类比：

| LLM 系统 | 经典计算 | 说明 |
|----------|---------|------|
| LLM 本身 | CPU | 核心处理器，无状态 |
| Context Window | RAM | 速度快但容量有限 |
| 外部数据库 | 磁盘存储 | 容量大但速度慢 |
| 工具集成 | 设备驱动 | 与外部系统交互 |
| Harness | 操作系统 | 管理一切的基础设施 |

> "We have reinvented the Von Neumann architecture." — Millidge

这不是巧合，而是任何计算系统的自然抽象。

### 三层工程结构

围绕模型的三层同心工程：

| 层级 | 范围 | 聚焦点 |
|------|------|--------|
| Prompt Engineering | 设计模型接收的指令 | 单轮交互质量 |
| Context Engineering | 管理模型何时看到什么 | 多轮上下文配置 |
| **Harness Engineering** | 包含前两者 + 应用基础设施 | 完整系统（工具编排、状态、错误、验证、安全） |

### TerminalBench 实证

LangChain 在 TerminalBench 2.0 上证明：只改 Harness 层（同一模型同一权重），从前 30 名外跳到第 5 名。独立研究让 LLM 优化自身 Harness 达到 76.4% 通过率。**两个使用相同模型的产品，仅因 Harness 设计不同，性能差异可达 20+ 排名。**

**同模型跨 Harness 对比**（[[av1dlive-ai-engineer-roadmap-2026|Av1dlive 路线图]] 引用 ML6 数据）：Opus 4.5 在 Claude Code（参考级 Harness）上得分 78%，在 Smolagents（教学级 Harness）上仅 42%。同模型，36 分差距。

## 四核心原语

### 1. System Prompt（系统提示词）

**作用**：驱动 Agent 行为，相当于人类 SOP 的数字化体现。

**组成**（通常由多部分融合）：
- Harness 内置的基础提示（如何使用通用 Tool）
- 用户提供的配置文件（如 `CLAUDE.md`）
- Skill 引用（指向但不预加载）
- Sub-Agent 定义

**设计要点**：System Prompt 不是越长越好——过长的提示会浪费 Context 窗口。关键是通过 [[agent-tool-design|Progressive Disclosure]] 按需加载。

**CLAUDE.md 编写实践**（[[claudemd-writing-8-best-practices|8 条经验]]）：[[boris-cherny|Boris Cherny]] 建议不超过 200 行；"禁止清单"防止不兼容依赖引入；规则需 5 秒可验证；用 Hook 强制执行而非靠记忆。

### 2. Planning Tool（规划工具）

**作用**：给 Agent 一个"思维草稿本"，让它制定和追踪计划。

**形态**：
- 调用 Planning Tool → 把计划放入 Context Window
- 输出待办列表（任务描述 + 状态：待处理/进行中/已完成）
- 计划可写入文件，供后续编辑

**演进**：早期做法是"先规划再逐步执行"（多步骤工作流），但边界情况太多导致系统复杂臃肿。**现代做法**：计划放在文本文件里，Agent 自己参考，没有硬性执行机制。→ 呼应"让模型承担更多职责"的精神。

### 3. Sub-Agent（子智能体）

**作用**：实现 Context 隔离。主 Agent 传递任务字符串，Sub-Agent 启动全新干净 Context。

**优势**：防止主 Context Window 膨胀
**缺点**：Agent 间通信质量决定系统效果
- 典型问题：Sub-Agent 完成大量工作但只返回"完成了"，主 Agent 困惑
- 解决方向：明确告诉 Sub-Agent 需要把关键信息体现在返回结果中

**创建时机**：全靠 Prompt 驱动——灵活但不可靠。这是 Prompt-driven Agent 的根本权衡。

### 4. File System（文件系统）

**作用**：让 LLM 自己管理自己的 Context。Chase 认为这是最核心的原语。

**多重用途**：
| 用途 | 说明 |
|------|------|
| 选择性加载 | Agent 自己决定从文件中读取什么（vs 全部塞入 Context） |
| 持久化存储 | Context 压缩后仍可通过文件恢复 |
| 卸载大结果 | 6万 Token 的 Tool Call 结果存入文件，只展示前 1000 |
| Compaction 转储 | 压缩时原始消息保存到文件，保留回溯能力 |
| Procedural Memory | Agent 可在运行中修改自己的配置文件（= 学习） |

> "让它们自己管理 Context，就像是让它们调用 Tool 的升级版。"

**底层实现**：可以是真实文件系统、数据库、S3 等——关键是对 LLM 暴露文件接口。

## 12 组件系统化分解

[[akshay|Akshay]]（2026-04）综合 Anthropic、OpenAI、LangChain 及更广泛社区的实践，将生产级 Harness 分解为 12 个清晰可分的组件：

### 1. 编排循环（心跳）

实现 Thought-Action-Observation（TAO）/ ReAct 循环：组装 prompt → 调用 LLM → 解析输出 → 执行工具调用 → 回填结果 → 重复。Anthropic 称之为"dumb loop"——所有智能在模型里，Harness 只管轮次。

### 2. 工具（手）

定义成 schema（名字、描述、参数类型），注入 LLM 上下文。工具层负责注册、schema 校验、参数提取、沙箱执行。

### 3. 记忆（多时间尺度）

- 短期：单次 session 对话历史
- 长期（Anthropic）：项目文件 + 自动记忆文件
- 长期（LangGraph）：按 namespace 组织的 JSON Store
- 长期（OpenAI）：SQLite/Redis 支撑的 Session
- Claude Code 三层：轻量索引（~150 字符/条，始终加载）→ 按需拉取主题文件 → 仅搜索访问原始记录

关键原则：Agent 把记忆当"提示"而非"事实"，行动前会再次核验。

### 4. 上下文管理

核心问题：**context rot**（关键内容落在中间位置时，模型表现下降 30%+，Chroma 研究 + Stanford "Lost in the Middle"）。

四种生产级策略：
- **Compaction** — Claude Code 保留架构决策和未解决 bug，丢弃冗余输出
- **Observation masking** — JetBrains Junie 隐藏旧工具输出但保留调用本身
- **Just-in-time retrieval** — Claude Code 常用 grep/glob/head/tail 而非整文件载入
- **Sub-agent delegation** — 子 Agent 做大量探索，最终只返回 1,000-2,000 token 压缩总结

### 5. 提示词构建

分层组装：system prompt → tool definitions → memory files → conversation history → 当前消息。重要上下文放在 prompt 开头和结尾（对应 "Lost in the Middle" 结论）。

OpenAI Codex 严格优先级栈：服务器 system message（最高）→ 工具定义 → developer instructions → user instructions → 对话历史。

### 6. 输出解析

现代 Harness 依赖原生 tool calling（结构化 tool_calls 对象），而非自由文本后解析。有 tool calls → 执行并继续循环；无 tool calls → 最终回答。

### 7. 状态管理

- **LangGraph**：类型化字典 + reducer，checkpoint 在 super-step 边界
- **OpenAI**：四种互斥策略（application memory / SDK sessions / Conversations API / previous_response_id 串接）
- **Claude Code**：git commit 作 checkpoint + 进度文件作 scratchpad

### 8. 错误处理

LangGraph 四类错误：transient（backoff 重试）、LLM-recoverable（作为 ToolMessage 返回模型自调）、user-fixable（中断等人类）、unexpected（向上抛出）。Stripe 生产 Harness 限制最大重试 2 次。

### 9. 防护机制与安全

- **OpenAI**：三层 guardrails（input → output → tool），tripwire 触发即停
- **Anthropic**：权限控制与推理解耦——模型决定"要尝试什么"，工具系统决定"什么是允许的"
- **Claude Code**：~40 个离散工具能力分别门控，三阶段（项目加载建立信任 → 每次调用前检查 → 高风险操作显式确认）

### 10. 验证循环

> "给模型一个验证自己工作的办法，质量会提升 2 到 3 倍。" — Boris Cherny (Claude Code 创建者)

三类验证：规则式（测试/lint/类型检查）、视觉式（Playwright 截图）、LLM-as-judge（子 Agent 评估）。

### 11. 子智能体编排

- **Claude Code**：Fork（字节级拷贝）/ Teammate（独立 pane，文件邮箱）/ Worktree（独立 git 分支）
- **OpenAI SDK**：agents-as-tools（边界明确子任务）/ handoffs（接管整个控制权）
- **LangGraph**：嵌套状态图

## 7 个关键架构决策

每个 Harness 架构师必须面对的选择：

| # | 决策 | 关键考量 |
|---|------|----------|
| 1 | 单 vs 多 Agent | Anthropic 和 OpenAI 同建议：先做极致单 Agent。多 Agent 引入路由开销和上下文损失。工具 >10 个或任务域有清晰边界时才值得拆 |
| 2 | ReAct vs Plan-and-Execute | ReAct 灵活但每步成本高。Plan-and-Execute 分离规划与执行，LLMCompiler 报告速度提升 3.6x |
| 3 | 上下文窗口管理 | 五种策略：时间清理、对话摘要、observation masking、结构化笔记、sub-agent delegation。ACON 研究表明保留 reasoning traces 可减 26-54% token 并保持 95%+ 准确率 |
| 4 | 验证循环设计 | 计算式（确定性真值）vs 推断式（语义捕捉但增延迟）。Thoughtworks 区分 guides（feedforward）和 sensors（feedback） |
| 5 | 权限与安全架构 | 宽松式（快但高风险）vs 保守式（安全但慢）。取决于部署场景 |
| 6 | 工具范围策略 | 工具越多往往性能越差。**Vercel 从 v0 移除 80% 工具效果反而更好**。Claude Code lazy loading 实现 95% 上下文缩减。原则：只暴露当前步骤所需的最小工具集 |
| 7 | Harness 厚度 | 多少逻辑在 Harness 里 vs 留给模型。Anthropic 押注轻 Harness + 模型进化。图式框架押注显式控制 |

## 脚手架隐喻与共同演化

"脚手架"是精确的比喻——建筑脚手架是临时基础设施，让工人够到原本够不着的地方。它不替工人建楼，但没有它工人到不了高层。

**关键洞察**：脚手架在建筑完成后会被拆掉。

随着模型变强，Harness 复杂度应该下降。Manus 在六个月里重写了五次，每次都在删除复杂性：
- 复杂工具定义 → 通用 shell 执行
- "管理 Agent" → 简单结构化 handoff

**共同演化原则**：模型现在是在特定 Harness 在环的情况下被后训练的。Claude Code 的模型学会了使用配套训练过的那套 Harness——紧耦合导致单纯更换工具实现可能降低性能。

**Future-proofing test**：如果模型变强时性能能提升而不需增加 Harness 复杂度，设计就是健康的。

**Harness Ossification**（[[av1dlive-ai-engineer-roadmap-2026|Av1dlive]]）：脚手架不仅应变薄，还可能**固化为过时约束**。Anthropic 提醒："Harness 往往编码了许多关于模型做不到什么的假设；随着模型变强，这些假设会逐渐过时。" 实例：Sonnet 4.5 → Opus 4.5 后，context anxiety 相关的旧设计开始失效。每次模型升级后需重新回放真实流量检测 ossification。

## 五框架实现对比

[[akshay|Akshay]] 首次将五个主流框架的实现策略并排比较：

| 框架 | Harness 实现方式 | 核心特征 |
|------|-----------------|---------|
| **Claude Agent SDK** | `query()` 函数暴露，返回流式异步迭代器 | "Dumb loop"，Gather-Act-Verify 循环 |
| **OpenAI Agents SDK** | Runner 类，async/sync/streamed 三模式 | Code-first（原生 Python），Codex 三层架构（Core + App Server + Client Surfaces） |
| **LangGraph** | 显式状态图（节点=函数，边=条件路由） | 五种执行模式：sequential / parallel / fan-out-fan-in / map-reduce / subgraph |
| **CrewAI** | Flows 层 + Crew 层 | Flows 做路由校验（确定性骨架），Crew 做自主协作（智能注入） |
| **AutoGen → MAF** | Core + AgentChat + Extensions 三层 | 五编排模式：sequential / concurrent / group-chat / handoff / **magentic**（manager 维护动态任务账本） |

## Harness 与 Progressive Disclosure

Harness 的设计深刻体现了 [[agent-tool-design|Progressive Disclosure]] 模式：

1. **Skill**：在 System Prompt 中引用但不预加载 → Agent 需要时按需读取 → Chase 明确称此为 "Progressive Disclosure"
2. **File System**：不预加载所有文件内容 → Agent 自己决定读取什么
3. **Sub-Agent**：不把所有任务结果放入主 Context → 按需通过 Sub-Agent 隔离

这是 [[agent-tool-design|Progressive Disclosure]] 的**第三方独立验证**（Anthropic → Karpathy → Chase）。

## Harness 与本 Wiki 的结构对映

本 LLM Wiki 本身就是一个 Harness 实例（详见 [[wiki-as-harness]]）：

| Harness 原语 | LLM Wiki 对应 |
|-------------|-------------|
| System Prompt | `WIKI.md`（行为规范） |
| Planning Tool | `index.md`（内容导航） |
| Sub-Agent | Claude 子 Agent 搜索（Context 隔离） |
| File System | `wiki/` 文件系统（按需读取页面） |

## Context Compaction（上下文压缩）

当 Context 积累到阈值时压缩：
- 保留最近 ~10 条消息保持连贯性
- 压缩之前的所有消息（Prompt Engineering 指导提取关键信息）
- 原始消息转储到 File System 保留回溯能力
- **创新**：DeepAgents 给 Agent 一个 Tool 让它自己决定何时触发压缩（vs 基于阈值自动触发）

## Memory 三类型

Chase 将 Agent Memory 分为三类：

| 类型 | 含义 | 技术成熟度 | 类比 |
|------|------|-----------|------|
| **Semantic** | 大量事实信息的语义存储 ≈ RAG | 成熟（存储技术） | [[rag-vs-compiled-wiki\|编译式 Wiki]] |
| **Episodic** | 过去的交互/对话记录 | 成熟（查找历史即可） | 对话历史 |
| **Procedural** | 关于"如何做某件事"的指令 = Agent Configuration | 最有趣 | System Prompt + Skill + Tool |

**Procedural Memory 的特殊价值**：在 DeepAgents 中全部表示为 File → Agent 可在运行中更新 → 实现**学习**。这意味着 Agent 不仅仅是使用工具，而是可以修改自己的行为规范。

## Agent 类型

| 类型 | 特征 | 典型场景 |
|------|------|---------|
| **Conversational Agent** | 低延迟、语音交互、少量 Tool 调用 | 客户支持、聊天机器人 |
| **Long Horizon Agent** | 长周期、规划能力、连贯性 | 多数最终是 Coding Agent |

**融合趋势**：Conversational Agent 会通过触发后台 Long Horizon Agent 实现功能融合。

## 真正的护城河

> "Knowledge、Tool——那些属于你特定领域的东西——这些是不会变的。"

Chase 的核心观点：
- Harness 技术本身不是护城河（构建方式会变）
- 领域 Knowledge（指令/SOP）+ Tool（领域专用工具）才是持久价值
- 给企业的建议：把精力集中在构建 Instruction 和 Tool 上

## 产品化实例

### [[hermes-agent|Hermes Agent]]（Nous Research）

精确产品化实现，独特贡献：Procedural Memory 活体化、自主 Tool 发现（agentskills.io）、7 种 Memory 框架、Auxiliary LLM 路由。

### [[openclaw|OpenClaw]]（开源自托管，278K Stars）

**大规模生产验证**——前所未有的规模验证了 Harness 四原语：

| Harness 原语 | OpenClaw 实现 | 额外特性 |
|-------------|-------------|---------|
| System Prompt | SOUL.md + AGENTS.md | 不可变身份层（SOUL.md 创建后不应修改） |
| Planning Tool | Session 树形结构 + HEARTBEAT.md | 分支+回滚（vs 线性计划） |
| Sub-Agent | Agent Pool + 路由规则 | 三种架构（Pipeline/Parallel/Hierarchical） |
| File System | workspace/ 目录 | Pre-Compaction（自动持久化关键信息） |

**四层记忆架构**：扩展了 Memory 三分类——将 Procedural Memory 一分为二：
- **SOUL.md**（不可变 Procedural）：Agent 身份和价值观
- **Skills/**（可变 Procedural）：Agent 运行时可创建/修改的能力
- **MEMORY.md**（Semantic）：向量搜索 + BM25 混合检索
- **Session**（Episodic）：树形结构，支持分支回滚

**Pre-Compaction**：Session 接近 token 上限时，自动触发静默 turn，将重要信息写入 MEMORY.md 和 Daily Log。是 Context Compaction 的生产实现。

**Self-Extending Agent**：Agent 可在运行时写、重载、测试自己的 Skills——"遇到不会→写 skill→修改→重载"。

## 源码级验证：Claude Code（Anthropic）

[[claude-code-source-report|Claude Code 源码研究]] 揭示了 Harness 四原语在产品级系统中的实现深度：

| Harness 原语 | 概念描述 | Claude Code 实际实现 |
|-------------|---------|---------------------|
| System Prompt | "SOP 数字化" | **Runtime Assembly**：静态前缀（cacheable）+ 动态后缀（session-specific），含显式 cache boundary |
| Planning Tool | "思维草稿本" | **分层调度链**：AgentTool → runAgent → query，14 步 pipeline |
| Sub-Agent | "Context 隔离" | **多路径 dispatch**：fork（cache 继承）/ normal（角色隔离）/ background（异步）/ remote / teammate |
| File System | "Agent 自管 Context" | **全生态文件系统**：skills/ + plugins/ + hooks/ + MCP instructions + memory/ + transcript |

**"好行为制度化"**：Claude Code 最深的护城河不是模型更聪明，而是把"好习惯"写进 prompt 和 runtime 规则——不加没要求的功能、不过度抽象、先读代码再改、失败先诊断再换策略、结果如实汇报不能假装测试过。这是 Chase 所说"System Prompt = SOP 数字化"的**极致实现**。

**Agent Specialization**：built-in agents 按认知职能分工——Explore（只读探索）、Plan（只读规划）、Verification（对抗性验证 "try to break it"）、General Purpose（通用执行）。验证独立出来对抗"实现者 bias"。

## Harness Engineering 十条原则

[[agentway|AgentWay]] (@wquguru) 从 Claude Code 源码逆向工程中提炼出系统化的工程原则。核心理念：**System First, Model Second**——模型是 Agent 里最会说话、也最不稳定的部件。

| # | 原则 | 核心判断 |
|---|------|----------|
| 1 | 模型 = 不稳定部件 | 模型会犯错，工具会扩大错误后果，系统只能靠结构维持秩序 |
| 2 | Prompt = 控制面 | 不是人格装饰，是运行时协议（宪法，不是台词）——分层拼装、优先级链、连接记忆系统和缓存成本 |
| 3 | Query Loop = 心跳 | 真正的系统重点在"一轮怎样接下一轮"——输入治理先于推理，模型调用只是循环的一段 |
| 4 | 工具 = 受管执行接口 | 权限先于能力（allow/deny/ask 三元语义），中断是一等语义，高风险工具需高密度约束 |
| 5 | 上下文 = 工作内存 | 治理目标是支持系统继续工作，不是信息越多越好 |
| 6 | 错误路径 = 主路径 | 恢复要分层、可熔断、防死循环 |
| 7 | 恢复目标 = 继续工作 | 续写 > 总结；先恢复呼吸，再讨论信息保真度 |
| 8 | 多代理 = 不确定性分区 | 职责分离 + 独立验证 > 人海战术 |
| 9 | 验证 = 必须独立 | 不能让系统自己给自己打分 |
| 10 | 团队制度 > 个人技巧 | 个人顺手不代表团队稳定复用 |

详见 → [[harness-engineering-books]]

### Claude Code 的五层递进 Harness

| 层级 | Harness | 核心判断 |
|------|---------|---------|
| 1 | 受约束的会话系统 | 分层 prompt，从控制平面而非人格装饰起步 |
| 2 | 代理依赖持续循环 | 跨迭代状态管理，承认上轮问题会进入下轮 |
| 3 | 工具调用服从调度 | 并发/串行分区，上下文修改保持因果秩序 |
| 4 | 高风险工具高密度约束 | Bash 不是普通工具，是风险放大器 |
| 5 | 错误属于主路径 | 恢复分层递进 + 熔断机制 |

## Claude Code vs Codex：两种 Harness 设计哲学

[[agentway|AgentWay]] 的比较研究揭示了两条正交的 Harness 路线。两者都不信任模型，但秩序安放的位置不同：

| 维度 | Claude Code（运行时优先） | Codex（控制面优先） |
|------|------------------------|-------------------|
| 气质 | 现场救火队 | 带档案系统的调度中心 |
| 控制面 | 动态 Prompt 装配线 | 带编号的公文系统（Fragment） |
| 连续性 | 压进 Query Loop | 拆成 Thread/Rollout/State Bridge |
| 工具治理 | 运行时审批链 | Schema + Policy 语言（execpolicy crate） |
| 本地治理 | 现场记忆收编（CLAUDE.md） | 结构化资产挂载（AGENTS.md + hierarchy） |
| 多代理 | 运行时职责分区 | 显式工具化协作（spawn/wait/close agent） |
| 类比 | **运行时共和制** | **控制面立宪制** |

### 三条路线的光谱

| 路线 | 上下文理解 | 代表 |
|------|-----------|------|
| Runtime-first | 上下文 = 工作内存 | Claude Code |
| Policy-first | 上下文 = 结构化单元 | Codex |
| Prompt-piling | 上下文 = Prompt 容器 | [[openclaw\|OpenClaw]] 类系统 |

> Prompt-piling 路线看似"信息更全"，实际更费 token，工作语义也容易被稀释。它解决的是"装进去多少"，不是"继续工作时真正需要保住什么"。

### 给后来者的建议顺序

1. 先定义高风险动作和最小权限模型
2. 再定义主循环或线程生命周期
3. 再定义上下文治理与恢复路径
4. 再定义技能、本地规则与 Hook
5. 最后再扩多代理、平台化和复杂生态

> 工程里很多设计顺序，应该按事故出现的先后排，而不是按演示时的好看程度排。

## 相关概念

- [[ai-agent]] — Harness 是 Agent 的架构实现
- [[agent-tool-design]] — 工具设计哲学（Harness 中的 Tool 设计）
- [[context-engineering]] — 上下文工程（Harness 的核心能力）
- [[llm-wiki-pattern]] — LLM Wiki 本身是 Harness 的一个实例
- [[rag-vs-compiled-wiki]] — File System 原语验证了"编译 > 检索"
- [[mcp]] — MCP 是 Tool 暴露的标准化协议
- [[agentic-skill-design]] — Agent Skill 设计方法论（Fat Skills 的具体设计模式）
- [[weiyicheng-agentic-engineering-first-principles|魏依承]] — 三公理为 Harness 概念提供了演绎基础
- [[deepseek-v4-technical-report|DeepSeek V4]] — 模型厂商针对 Agent 产品做专项优化，验证 Harness 是"系统 API"

## 出自

- [[chase-harness-interview|MAD Podcast 专访]]（Harrison Chase, 2026-03-12）
- [[hermes-agent-articles|Hermes Agent 三篇实践指南]]（Procedural Memory 产品化，2026-04）
- [[openclaw-books|OpenClaw 三份文档编译]]（大规模生产验证，四层记忆，Pre-Compaction）
- [[claude-code-source-report|Claude Code 源码研究报告]]（源码级实现验证，Runtime Assembly，Fork Path）
- [[akshay-agent-harness|一文深度解析 Agent Harness]]（12 组件 + 7 决策系统化，五框架对比，脚手架隐喻，TerminalBench 实证，2026-04-12）
- [[weiyicheng-agentic-engineering-first-principles|从第一性原理思考 Agentic Engineering]]（三公理演绎基础、Skill 六模块框架、Error-Driven Refinement，2026-04-23）
- [[deepseek-v4-technical-report|DeepSeek V4 技术报告解读]]（Agent 产品专项优化验证 Harness 概念，"一直在删"的架构哲学呼应脚手架隐喻，2026-04-25）

## Fat Skills / Thin Harness 三层架构

[[intuitmachine-agentic-skills|IntuitMachine 的 Skill 设计文章]]给出了 Harness 的一个具体化设计方案，与 Akshay 的 12 组件框架形成互补：

```
┌─────────────────────────────────────────────────────────┐
│ FAT SKILLS（90% 价值所在）                               │
│ Markdown 编码 judgment 和 process                       │
├─────────────────────────────────────────────────────────┤
│ THIN HARNESS（~200 行代码）                              │
│ JSON in, text out, read-only by default                 │
├─────────────────────────────────────────────────────────┤
│ DETERMINISTIC APPLICATION                               │
│ 快速、窄而专的目的构建工具                                │
└─────────────────────────────────────────────────────────┘
```

**核心原则**："把 intelligence 往上推到 skills，把 execution 往下压到 deterministic tooling，让 harness 保持轻薄。"

**为什么这很重要**：当这样做时，模型的每一次进步都会自动提升每一个 Skill，而 deterministic layer 保持绝对可靠。

**反模式**：Fat Harness + Thin Skills——40+ tool definitions 吃掉一半上下文窗口、god-tool 带 2-5 秒 MCP 往返延迟、每个 REST endpoint 包成单独工具。这与 Vercel 从 v0 移除 80% 工具效果反而更好的经验一致（详见 [[agent-tool-design]]）。

**餐桌测试**：LLM 能安排 8 人在一张餐桌旁（小规模 latent），但安排 800 人时会编造看似合理实则错误的方案——规模超出 latent 能力边界时，必须切换到 deterministic 工具。Skill 的职责是编排这条边界。

**与已有框架的关系**：
- 与 Chase 四原语的关系：Skill 对应 System Prompt 中的可加载模块，Thin Harness 对应编排循环 + 工具管理 + 状态管理
- 与 Akshay 12 组件的关系：Fat Skills 覆盖组件 5（提示词构建）和 10（验证循环），Thin Harness 覆盖组件 1-4 和 6-9，Deterministic Application 覆盖组件 2（工具）
- 与 AgentWay 十条原则的关系：原则 4（工具 = 受管执行接口）对应 Deterministic Application 层，原则 2（Prompt = 控制面）对应 Fat Skills 层

详见 → [[agentic-skill-design]]

## 验证的人类侧设计：可验证的抽象层

[[erik-schluntz|Erik Schluntz]]（Anthropic）从人类角度补充了验证循环的上层设计（详见 [[erik-schluntz-vibe-coding]]）：

**核心类比**：CTO 用验收测试管理技术专家、PM 通过体验产品验证功能、CEO 借助数据切片抽查财务——他们都不深入底层执行细节。软件开发者需要建立类似的、**无需阅读底层代码即可验证功能**的抽象层。

**叶子节点策略**——系统化技术债管理：

| 区域 | 策略 | 原因 |
|------|------|------|
| 叶子节点（末端功能） | AI 自由发挥，技术债可接受 | 不被其他模块依赖，极少变动 |
| 中间层 | 谨慎委托 | 需要适度审查 |
| 核心架构 | 人工深入保护 | 保证可扩展性和稳定性 |

**动态边界**：随着模型变强，可信任 AI 接管的层级正在向下延伸。Anthropic 内部测试显示，AI 生成优质架构的成功率正在提升。

**22,000 行合并验证**：Anthropic 内部生产环境极限案例——数天前期规划 + 叶子节点限制 + 核心人工介入 + 压力测试检查点。结果：两周工作量压缩到一天。这是 Boris Cherny "2-3x" 验证 ROI 的极端案例——验证不仅是质量保障，更是**效率倍增器**。

## 出自

- [[chase-harness-interview|MAD Podcast 专访]]（Harrison Chase, 2026-03-12）
- [[hermes-agent-articles|Hermes Agent 三篇实践指南]]（Procedural Memory 产品化，2026-04）
- [[openclaw-books|OpenClaw 三份文档编译]]（大规模生产验证，四层记忆，Pre-Compaction）
- [[claude-code-source-report|Claude Code 源码研究报告]]（源码级实现验证，Runtime Assembly，Fork Path）
- [[akshay-agent-harness|一文深度解析 Agent Harness]]（12 组件 + 7 决策系统化，五框架对比，脚手架隐喻，TerminalBench 实证，2026-04-12）
- [[erik-schluntz-vibe-coding|Erik Schluntz 大师课]]（可验证抽象层，叶子节点策略，22K 行合并验证，Compact 时机）
- [[claudemd-writing-8-best-practices|CLAUDE.md 编写 8 条经验]]（System Prompt 实践编写：200 行上限、禁止清单、Hook 驱动，2026-05-11）
- [[av1dlive-ai-engineer-roadmap-2026|AI 工程师路线图 2026]]（Harness 十组件拆解、78% vs 42% 量化验证、Harness Ossification 概念、Write/Select/Compress/Isolate 四原语，2026-05-11）

## 第一性原理演绎验证

[[weiyicheng|魏依承]]（2026-04）从三条不可再分公理出发，演绎推导出了 Harness 的核心设计原则（详见 [[weiyicheng-agentic-engineering-first-principles]]）：

**公理 1：信息损耗** → 意图转化链每步都可能失真 → 必须在每步设置校验点（验证循环的必然性）
**公理 2：LLM 本质** → 上下文决定性 + 概率性 + 有限工作记忆 → Context Engineering + 按需加载 + 细粒度任务拆分的必然性
**公理 3：人类认知稀缺** → 工程师是系统瓶颈 → 最优化认知带宽分配 + AI 承担执行 + 人类专注判断的必然性

**意义**：wiki 中已有的 Harness 实践（Chase 四原语、AgentWay 十条原则、Akshay 12 组件、白家杰四块拼图）全部来自归纳——从业界成功产品中总结共性。魏依承的公理体系为这些归纳结论提供了演绎基础：同一套实践既被业界验证（归纳），又可从基本事实推导（演绎），形成了完整的方法论闭环。

**Skill 六模块框架**：Workflow（SDLC 全链条）/ Best Practices（通用工程知识）/ Standards（项目私有知识）/ Docs（结构化文档）/ Troubleshooting（问题排查）/ Self-Refinement（反馈闭环）。三层加载（L1/L2/L3）是 [[agentic-skill-design|Fat Skills]] 和 [[agent-tool-design|Progressive Disclosure]] 的具体工程实现。

**Error-Driven Context Refinement**：双触发反馈闭环（自动触发 + 手动 Command）。闭环本质：犯错 → 诊断根因 → 检索现有知识 → 创建/更新 Rule/Skill → 预防复发。与 [[hermes-agent|Hermes]] 的自我进化 Skills 和 [[agentic-skill-design|学习循环]] 形成三角验证——同一需求的三种实现路径。

## 落地实践：四块拼图模型

[[baijj|白家杰]]以 JK Launcher 项目为案例，提供了 wiki 首个全量落地记录（详见 [[baijj-harness-engineering-practice]]）。从落地视角将 Harness 重新组织为四块相辅相成的拼图：

### 拼图一：约束与流程

规定 AI 按什么顺序、什么边界做事；协作时谁接哪一棒。核心组件链：

**Rule → Skill → Scripts 渐进下沉**：

| 层级 | 作用 | 约束强度 | 类比 |
|------|------|----------|------|
| Rule | 告诉 AI 什么是底线 | **软约束**（可被忽略/绕过） | 研发制度 |
| Skill | 告诉 AI 固定动作怎么做 | **标准化**（减少临场发挥） | 操作手册 |
| Scripts | 直接检查做没做到 | **硬门禁**（无法糊弄） | 闸机 |

> Rule 不是没用，而是 Rule 只能做"原则约束"，不能做"流程执行"。自然语言约束永远存在解释空间。

### 拼图二：反馈（总验证脚本）

"AI 说做完了" → "脚本判定你通过了才算"。覆盖三类检查：
- **A 类：静态规范**（代码规范、日志格式、文件长度等）
- **B 类：交付门槛**（编译通过、测试通过、测试数量不减少）
- **C 类：工程一致性**（规则文件同步、项目文件完整）

**基线对比机制**：开发前跑一次，开发后跑一次，前后对比 → "是不是你引入的"从主观争论变成客观判定。

> 如果让我从整个 Harness 里挑一个最容易被低估但实际价值极高的模块，我会选事后验证。它补上的不是一个步骤，而是一整个反馈闭环。

### 拼图三：知识库（项目级索引）

不是百科全书，而是**够准的索引**：
- **dev-map**（开发导航图）：某个功能落在哪些文件、某类服务怎么接入、改一个模块可能牵动哪些链路。开发 Agent 维护——谁动代码谁改地图
- **任务看板**（项目态势板）：当前任务、阶段、文档目录、交付结论。PM 维护

### 拼图四：进化

人与 AI 共同驱动 Harness 自身改版：人定方向与闸门，AI 在规矩里高密度落地。规范沉淀进仓库而非依赖 Memory。

**四块缺失的症状**：
- 只有流程没有反馈 → 完成幻觉
- 只有反馈没有流程 → 失败日志难收敛
- 没有知识库 → 同一类功能反复重写
- 没有进化 → 三块冻在某一版，得不到结构性提升

### 最小起步路径

[[baijj|白家杰]]建议的 7 步渐进搭建：

1. **SPEC** — 先磨出能指导开发的设计规格文档
2. **关键 Rule** — 只盯最容易反复出错的底线，不要贪多
3. **高频 Skill** — 编译/测试/验证等固定动作标准化
4. **多 Agent** — 单 Agent 开始失稳时再拆角色
5. **流程定义 + 角色契约** — 多 Agent 变复杂时补
6. **dev-map + 任务看板** — 持续迭代时补
7. **MCP** — 想推闭环到构建/签名/发布时再考虑

> 不要贪大，不要一步到位，先从你最反复、最痛的那个问题开始。
