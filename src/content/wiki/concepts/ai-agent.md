---
type: concept
aliases: [AI Agent, AI 智能体, 智能体, Autonomous Agent]
related: "[[mcp]], [[context-engineering]], [[llm-wiki-pattern]], [[code-method]], [[harness]]"
tags: [ai, agent, autonomy, multi-agent, llm]
sources: "[[batch-ai-sources]], [[seeing-like-an-agent]], [[chase-harness-interview]], [[hermes-agent-articles]], [[openclaw-books]], [[claude-code-source-report]], [[harness-engineering-books]], [[akshay-agent-harness]], [[baijj-harness-engineering-practice]], [[weiyicheng-agentic-engineering-first-principles]], [[deepseek-v4-announcement]], [[deepseek-v4-technical-report]]"
created: 2026-04-12
updated: 2026-04-25
---

# AI Agent（智能体）

## 定义

能够自主感知环境、制定计划、使用工具、执行动作、评估结果以完成目标的 AI 系统。核心能力：**目标导向 + 工具使用 + 记忆 + 反馈循环**。区别于 Workflow（预设固定流程），Agent 具有自主决策能力。

## 前提与边界

**前提**：
- Agent 的自主决策能力上限取决于底层模型的推理能力和工具设计质量——模型无法推理出它"想不到"的路径，工具无法执行它"够不到"的操作
- 五阶段进化模型（工具使用→规划→自修正→记忆→多智能体）呈现线性递进，但实际系统可能跳跃阶段或在某阶段长期停留
- 多智能体协作假设子 Agent 间可通过结构化通信（如文件交换）传递足够信息，但信息损失不可避免

**边界**：
- Agent 与 Workflow 的界限在特定场景下模糊——带条件分支的 Workflow 可表现出类 Agent 行为，高度约束的 Agent 本质上是 Workflow
- Agent 的"自主性"光谱很宽：从"在预设选项中选择"到"自主发现新工具和新策略"，两者差异巨大但常被混为一谈
- 多智能体架构的协调成本（路由开销、上下文损失、通信质量）在复杂任务中可能抵消分工收益——Anthropic 和 OpenAI 均建议先做极致单 Agent

## 五阶段进化

| 阶段 | 能力 | 典型应用 |
|------|------|----------|
| 1. 基础工具使用 | 执行预定义简单任务 | 天气查询、基础客服 |
| 2. 任务规划 | 分解复杂任务制定计划 | 营销自动化 |
| 3. 自我修正 | 反思错误调整策略 | 智能编程助手 |
| 4. 记忆增强 | 长期记忆与个性化 | 个性化推荐 |
| 5. 多智能体协作 | 多专业 Agent 协同 | 虚拟团队项目管理 |

## 核心认知循环

```
思考 (Think) → 行动 (Act) → 观察 (Observe) → 思考...
```
- **ReAct 框架**：显式推理 + 行动反馈
- **自反思框架**：通过自我批评优化决策链

### Query Loop：Agent 系统的心跳（AgentWay）

[[harness-engineering-books|AgentWay]] 提出，一个代理系统是否成熟，先看它有没有循环。Query Loop 不是简单的"循环调用模型"，而是完整生命周期管理：

1. **输入治理先于推理**：memory 预取 → skill 发现 → 截取有效消息 → tool result budget → history snip → microcompact → context collapse → autocompact → 才进入模型调用
2. **模型输出是事件流**：不是"最终答案"，而是文本 + tool_use block + usage + stop reason + API 错误的复合事件
3. **中断必须收口**：synthetic tool_result 补齐已发出但未完成的 tool_use——不完整的执行轨迹迟早变成运维问题
4. **停止条件多维**：区分正常完成 / 有 tool_use 需 follow-up / 用户中断 / 恢复路径 / API 错误
5. **恢复分层递进**：prompt-too-long → collapse drain → reactive compact → 熔断

> 缺少循环结构的系统也许能做出漂亮 demo，但更接近一次性表演而不是运行时。

## Anthropic 的 Agent 类型谱系

| 类型 | 特征 |
|------|------|
| 增强型 LLM | 配备检索/工具/记忆，但不自主规划 |
| 提示链工作流 | 串行分解，多 LLM 轮流处理 |
| 路由式工作流 | LLM 分类 input，分派到子任务 |
| 并行式工作流 | 分治独立子任务 |
| 协调-执行式 | 中央 LLM 动态分解，worker LLM 执行 |
| 评估-优化式 | Evaluator 反馈，迭代改进 |
| **真正的 Agent** | LLM 自主指导执行过程和工具使用 |

## 多智能体架构（Anthropic Harness 框架）

灵感来自 GAN（生成对抗网络）：**一个 AI 生成，另一个评估，循环迭代**。

| 角色 | 职责 |
|------|------|
| **规划者 (Planner)** | 一两句话扩展为完整规格书；说清"做什么"而非"怎么做" |
| **实现者 (Generator)** | 按规格书逐冲刺实现，自我检查，Git 版本管理 |
| **评估者 (Evaluator)** | 模拟真实用户测试，按冲刺合约验收，提交 bug 报告 |

**核心设计**：三个角色通过**文件交换**结构化产出物，而非直接对话——避免一个 AI 的表达方式影响另一个的判断。

### 关键发现

- 单智能体（$9, 20min）：核心功能坏掉，无特色功能
- 三智能体（$200, 6h）：16 个功能，10 个冲刺，核心玩法可用
- 博物馆网站经历 9 轮迭代后第 10 轮突然转向 CSS 3D——**创意跃迁是单次生成不可能出现的**

## Agent 工具设计

工具设计是 Agent 架构的"最后一英里"。Anthropic Claude Code 团队的核心经验：

1. **工具要塑形到模型能力**：一个通用工具 vs. 多个专用工具取决于模型的"技能水平"
2. **旧工具可能成为约束**：TodoWrite（待办列表）帮助早期模型，但限制更强模型的灵活性 → 演进为 Task 工具
3. **让 Agent 自己找上下文**：从 RAG（被动接收）→ Grep 工具（主动搜索），Agent 越聪明越擅长自己构建上下文
4. **Progressive Disclosure**：不预加载所有信息，让 Agent 按需递归发现；用子 Agent 处理搜索，主 Agent 上下文保持干净

详见 → [[agent-tool-design]]

## Harness 架构

Harrison Chase（LangChain）总结出现代 Agent 系统的四个核心原语（详见 [[harness]]）：

1. **System Prompt** — 驱动 Agent 行为，通常由 Harness 内置 + 用户配置 + Skill 引用融合
2. **Planning Tool** — "思维草稿本"，制定计划但不强制执行（让 Agent 自己跟踪）
3. **Sub-Agent** — Context 隔离，防止主 Context 膨胀；挑战在于 Agent 间通信质量
4. **File System** — 让 Agent 自己管理 Context：选择性加载、持久化存储、卸载大结果

> "Harness 才是最关键的东西。云模型很棒，但真正让这一切落地的其实是 Harness。" — Chase

### Agent 类型二分法（Chase）

| 类型 | 特征 | 典型场景 |
|------|------|---------|
| **Conversational Agent** | 低延迟、语音交互、少量 Tool 调用 | 客户支持 |
| **Long Horizon Agent** | 长周期、规划能力、连贯性 | 多数最终是 Coding Agent |

**融合趋势**：Conversational Agent 通过触发后台 Long Horizon Agent 实现功能融合。

### Memory 三分类（Chase）

| 类型 | 含义 | 类比 |
|------|------|------|
| Semantic | 事实信息存储 ≈ RAG | [[rag-vs-compiled-wiki]] |
| Episodic | 过去的交互/对话记录 | 对话历史 |
| Procedural | "如何做某件事"的指令 = Agent 配置 | System Prompt + Skill |

**Procedural Memory 最有趣**：Agent 可自我修改配置文件 = 实现**学习**。

### 自我进化的 Agent：Hermes

[[hermes-agent|Hermes Agent]]（Nous Research）是首个将 Procedural Memory **产品化**的 Agent 框架：

- **自我进化 Skills**：从任务经验中自动提取技能 → 使用中持续优化 → 失败时分析原因并沉淀为 Skill
- **自主 Tool 发现**：agentskills.io 开放技能市场——Agent 自主搜索、安装、学习
- **SOUL.md**：从对话历史自动总结生成行为规范（Episodic → Procedural 转化）
- **Auxiliary LLM 路由**：主模型思考 + 副模型干活——成本优化新维度

工作循环：`任务 → 评估能力 → (不足→搜索市场→安装) → 执行 → 记录经验 → 优化技能`

### Self-Extending Agent 光谱

三个系统实现了不同"自我进化"程度：

| 维度 | 本 Wiki (Claudian) | [[openclaw|OpenClaw]] | [[hermes-agent|Hermes]] |
|------|-------------------|----------|-------------|
| 触发方式 | 人类指令 (ingest) | 任务需求（遇到不会→写 skill） | 自主发现（主动搜索市场） |
| 进化内容 | wiki 页面 | Skills（运行时写/重载） | Skills + SOUL.md |
| 市场发现 | 无 | ClawHub (13,729) | agentskills.io |
| 监督程度 | 高 | 中 | 低 |

光谱：**监督进化 → 反应式自扩展 → 主动自进化**

### 多 Agent 标准架构模式（OpenClaw）

[[openclaw|OpenClaw]] 蓝皮书总结三种标准模式：

| 模式 | 结构 | 适用场景 |
|------|------|---------|
| **Pipeline**（流水线） | A→B→C | 内容生产 |
| **Parallel**（并行） | 分发→多路→汇总 | 市场调研 |
| **Hierarchical**（层级） | 主 Agent 协调子 Agent | 复杂项目管理 |

每 Agent 可配置：独立工作区、沙箱、工具白/黑名单、成本上限。支持 SharedMemory 实现跨 Agent 通信（传递摘要而非全文 → 防止上下文爆炸）。

### Agent Specialization 按认知职能分工（Claude Code 源码）

[[claude-code-source-report|Claude Code 源码研究]] 确认了按**认知职能**而非数据流分工的 built-in agents：

| Agent | 认知职能 | 关键约束 |
|-------|---------|---------|
| Explore | **研究/探索** | 绝对只读，Bash 只允许 ls/git status/cat 等 |
| Plan | **规划/设计** | 只读，输出 step-by-step plan + Critical Files |
| Verification | **对抗性验证** | "try to break it"，必须跑命令不能只看代码 |
| General Purpose | **通用执行** | — |

**与 OpenClaw 对比**：OpenClaw 按数据流分角色（Pipeline/Parallel/Hierarchical），Claude Code 按认知职能分角色（研究/规划/执行/验证）。两种正交维度。

**Verification Agent 的设计精妙**：prompt 明确指出"verification avoidance"和"被前 80% 迷惑"两类失败模式，强制要求每个 check 带 command + output observed，输出 VERDICT: PASS/FAIL/PARTIAL。将验证从"实现者自查"变为"独立者对抗"。

## 与本 Wiki 的关系

- **本 wiki 的维护者（吾/Claudian）本质上是一个 AI Agent**——具备所有五阶段能力
- [[llm-wiki-pattern|LLM Wiki]] 的 Ingest/Query/Lint 操作就是 Agent 的 Think/Act/Observe 循环
- [[context-engineering|Context 工程]] 是 Agent 设计的基础能力
- [[mcp|MCP]] 是 Agent 使用外部工具的标准协议

## 出自

- 《AI 智能体的进化》（5 阶段谱系）
- 《让 AI 真正做好复杂任务》（Anthropic Harness 框架）
- 《有效的 Context 工程》（Agent 类型谱系）
- [[seeing-like-an-agent|Seeing like an agent]]（Agent 工具设计哲学）
- [[chase-harness-interview|Chase Harness 专访]]（Harness 四原语、Memory 分类、Agent 类型）
- [[hermes-agent-articles|Hermes Agent 三篇实践指南]]（自我进化 Agent、Procedural Memory 产品化）
- [[openclaw-books|OpenClaw 三份文档编译]]（多 Agent 架构、Self-Extending 光谱、Moltbook 社会化）
- [[claude-code-source-report|Claude Code 源码研究报告]]（认知职能四角色、Fork vs Normal、14 步 Dispatch Pipeline）
- [[akshay-agent-harness|一文深度解析 Agent Harness]]（12 组件系统化、五框架实现对比、脚手架隐喻，2026-04-12）
- [[weiyicheng-agentic-engineering-first-principles|从第一性原理思考 Agentic Engineering]]（乔哈里窗人机分工、AI全链条角色递进、意图转化链模型，2026-04-23）
- [[deepseek-v4-technical-report|DeepSeek V4 技术报告解读]]（模型厂商首次针对 Agent 产品做专项 adapter 优化——Claude Code/OpenClaw/OpenCode/CodeBuddy，2026-04-25）

### 五框架 Harness 实现对比（Akshay 系统化）

[[akshay|Akshay]]（2026-04）首次将五个主流框架的 Agent 实现策略并排比较：

**Claude Agent SDK（Anthropic）**：
- 通过 `query()` 函数暴露 Harness，返回流式异步迭代器
- Runtime 是 "dumb loop"，所有智能在模型里
- 使用 Gather-Act-Verify 循环：搜索文件→编辑文件→运行测试→重复

**OpenAI Agents SDK**：
- Runner 类实现，支持 async / sync / streamed 三模式
- Code-first 设计：工作流逻辑直接写在原生 Python，不依赖图 DSL
- Codex 扩展为三层架构：Core（agent + runtime）→ App Server（双向 JSON-RPC）→ Client Surfaces（CLI/VS Code/Web）
- 所有端面共用同一 Harness → Codex models 在 Codex surfaces 上比通用聊天窗口表现更好

**LangGraph（LangChain）**：
- Harness 建模为显式状态图：节点=函数，边=条件路由，状态在节点间流动
- 五种执行模式：sequential / parallel / fan-out-fan-in / map-reduce / subgraph delegation
- 状态管理：类型化字典 + reducer，checkpoint 在 super-step 边界

**CrewAI**：
- Flows 层增加"在需要的地方加入智能、其余保持确定性骨架"的路径
- Flows 负责路由和校验，Crew 负责自主协作

**AutoGen → Microsoft Agent Framework**：
- 最早推动 conversation-driven orchestration
- 三层架构：Core + AgentChat + Extensions
- 五种编排模式：sequential / concurrent（fan-out/fan-in）/ group chat / handoff / **magentic**（manager Agent 维护动态任务账本协调专家 Agent）

**核心差异维度**：

| 维度 | Anthropic | OpenAI | LangGraph | CrewAI | AutoGen |
|------|-----------|--------|-----------|--------|---------|
| Harness 哲学 | 轻量 dumb loop | Code-first | 显式状态图 | 确定性+智能分层 | Conversation-driven |
| 编排模式 | Gather-Act-Verify | Runner | 图节点路由 | Flows + Crew | 5 种含 magentic |
| 状态管理 | Git commit | 4 种互斥策略 | Super-step checkpoint | — | — |
| 设计倾向 | 模型承担更多 | 原生代码控制 | 显式控制流 | 混合 | 对话驱动 |

### 三种多 Agent 路线实战 PK（白家杰）

[[baijj|白家杰]]在 JK Launcher 项目中实战比较了三种多 Agent 形态（详见 [[baijj-harness-engineering-practice]]）：

| 路线 | 吸引力 | 实际问题 | 结果 |
|------|--------|----------|------|
| **单 Agent 强化** | 成本最低、改造最少 | 角色冲突越来越严重，长链路任务失稳 | 早期有效，不能成为最终形态 |
| **去中心化协作** | 灵活、像 AI 团队自由讨论 | 路径不稳定、责任不清、难长期维护 | **被明确放弃** |
| **结构化调度** | 流程清晰、可审计、可维护 | 前期设计成本更高、产物更多 | **最终选择** |

> 真正贵的不是 token，真正贵的是失控。

### 乔哈里窗人机分工（按知识不对称）

[[weiyicheng|魏依承]]将经典组织心理学的乔哈里窗模型应用于 AI 协作（详见 [[weiyicheng-agentic-engineering-first-principles]]）：

| 象限 | 知识状态 | 协作策略 | 典型场景 |
|------|----------|----------|----------|
| **开放区** | 人类知道 + AI 知道 | 极致自动化 | 样板代码生成、单元测试、格式化 |
| **盲区** | 人类知道 + AI 不知道 | 上下文注入 | 项目编码规范、架构约束、业务逻辑 |
| **潜能区** | 人类不知道 + AI 知道 | 知识杠杆 | 陌生技术栈、不熟悉的编译器报错 |
| **未知区** | 人类不知道 + AI 不知道 | 协同探索 | 复杂根因分析、全新架构设计 |

**分工原则**：识别当前任务落在哪个象限，采用对应的协作策略。盲目全交 AI（忽略盲区）或全自己做（浪费潜能区），都不是最优解。

**启发式判断**：问两个问题——(1) 这个任务是否涉及团队私有知识？(2) 我自己是否清楚该怎么做？两个答案的组合直接映射到四个象限。

**与已有分工维度的关系**：这是 wiki 中记录的第三种人机分工维度——Claude Code 按**认知职能**分工（研究/规划/验证/执行），白家杰按**流程阶段**分工（需求/设计/开发/审查/测试），魏依承按**知识不对称**分工。三种维度正交且互补。

### 七 Agent 角色体系（按软件工程流程阶段）

[[baijj|白家杰]]最终稳定成七个固定角色——不是拍脑袋拆的，而是被问题一步步逼出来的：

| 角色 | 职责 | 解决什么问题 |
|------|------|-------------|
| PM（项目经理） | 路由、交接、回退、进度管理 | 流程有序串起来 |
| 需求分析 | 模糊诉求 → 结构化需求 | 想做什么 |
| 方案设计 | 需求 → 技术方案 | 打算怎么做 |
| 闸门总控 | 可行性和风险把关 | 现在能不能做 |
| 开发实现 | 落地代码和实现 | 真正做出来 |
| 代码审查 | 需求/方案一致性、技术质量 | 是不是按要求做的 |
| 测试验证 | 功能正确性、稳定性、回归 | 做出来的能不能用 |

**关键约束**：PM = 总路由器不是总专家。PM 只做路由不做专业判断。下游不能直接改上游文档，只能提出阻塞项由 PM 打回。

**角色契约**：每个 Agent 有输入输出边界定义（必须读什么、必须写什么、什么情况阻塞、什么情况交回 PM）。使角色可替换、可维护，不依赖人记住。

**与 Claude Code 认知职能分工的对比**：白家杰按**软件工程流程阶段**分角色（需求→设计→开发→审查→测试），Claude Code 按**认知职能**分角色（研究→规划→验证→执行）。两种维度正交且互补。
