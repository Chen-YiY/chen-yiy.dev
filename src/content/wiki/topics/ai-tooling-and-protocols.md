---
type: topic
status: active
sources_count: 69
related_entities: "[[anthropic]], [[karpathy]], [[harrison-chase]], [[hermes-agent]], [[openclaw]], [[agentway]], [[akshay]], [[beren-millidge]], [[biscuitbrother]], [[erik-schluntz]], [[baijj]], [[weiyicheng]], [[boris-cherny]], [[thariq]]"
related_concepts: "[[mcp]], [[context-engineering]], [[ai-agent]], [[vibe-coding]], [[llm-wiki-pattern]], [[rag-vs-compiled-wiki]], [[agent-tool-design]], [[harness]], [[agentic-skill-design]], [[ai-knowledge-layer]]"
tags: [ai, mcp, agents, automation, tooling, tool-design]
created: 2026-04-12
updated: 2026-05-11
---

# AI 工具与协议

## 主题概述

AI 应用开发领域涉及的核心协议、工具链和系统设计模式。从 LLM 的基础集成（RAG）到智能体的自主协作（Multi-Agent），再到标准化的工具协议（MCP），形成了一个层次化的技术栈。

## 核心架构层次

```
┌───────────────────────────────────────┐
│  应用层：Vibe Coding / LLM Wiki       │  ← 用户交互
├───────────────────────────────────────┤
│  Agent 层：AI Agent / Multi-Agent     │  ← 自主决策
├───────────────────────────────────────┤
│  优化层：Context 工程 / 渐进式总结     │  ← 上下文管理
├───────────────────────────────────────┤
│  协议层：MCP (Model Context Protocol)  │  ← 工具连接
├───────────────────────────────────────┤
│  检索层：RAG / 编译式 Wiki            │  ← 知识获取
├───────────────────────────────────────┤
│  基础层：LLM (Claude, GPT, etc.)      │  ← 语言模型
└───────────────────────────────────────┘
```

## 关键实体

- [[anthropic|Anthropic]] — Claude、MCP、Agent SDK 的创建者
- [[karpathy|Andrej Karpathy]] — Vibe Coding 概念提出者
- [[harrison-chase|Harrison Chase]] — LangChain 联合创始人/CEO，Harness 四原语提出者
- [[hermes-agent|Hermes Agent]] — Nous Research 开源自我进化 Agent 框架

## 核心概念

### 协议层
- [[mcp|MCP]] — "AI 的 USB-C"，统一 AI 与外部工具的连接标准

### Agent 层
- [[ai-agent|AI Agent]] — 自主感知→规划→执行→评估的 AI 系统
- 多智能体架构：Planner-Generator-Evaluator 三角色协作

### 优化层
- [[context-engineering|Context 工程]] — 动态优化 LLM 上下文配置
- [[rag-vs-compiled-wiki|RAG vs 编译式 Wiki]] — 知识获取的两种范式

### 应用层
- [[vibe-coding|Vibe Coding]] — AI 辅助工程化开发方法论
- [[llm-wiki-pattern|LLM Wiki]] — LLM 维护的知识管理系统

### 设计层
- [[agent-tool-design|Agent 工具设计]] — 以 Agent 视角设计工具的哲学与实践（Progressive Disclosure）

### 架构层
- [[harness|Harness]] — Agent 脚手架四核心原语（System Prompt + Planning Tool + Sub-Agent + File System）

### 知识层
- [[ai-knowledge-layer|AI Knowledge Layer]] — 双层架构（KBL 动态 + BF 静态），LLM Wiki 的品牌化进化

### 工具链
- **n8n**：工作流自动化平台，支持 AI 工作流
- **Dify**：AI Agent 构建平台，支持 MCP 集成
- **OpenClaw/Claude Code**：AI 编程助手
- [[hermes-agent|Hermes Agent]]：自我进化 Agent 框架（自主 Skills + agentskills.io + Auxiliary LLM 路由）
- [[openclaw|OpenClaw]]：开源自托管 Agent 平台（278K Stars, 四层记忆, CLI-first, 多 Agent 架构）
- [[agentway|AgentWay]]：Harness Engineering 工程研究（十条原则, Claude Code vs Codex, 第三路线警告）

## 源材料分类

| 分类 | 文件数 | 核心内容 |
|------|--------|----------|
| MCP | 8 | 协议定义、架构、原语、传输、安全、上下文爆炸 |
| Claude Code | 9 | 使用技巧、接入模型、Skills、操作自身 |
| AI 概念 | 8 | RAG、Context 工程、Vibe Coding、Agent 进化 |
| 自动化 | 9 | n8n 部署与工作流、Dify MCP 集成 |
| Agent 平台 | 7 | OpenClaw、AI 智能体进化 |
| Agent 架构 | 1 | Harness 四原语、Memory 分类、Context Compaction（Chase 专访） |
| Hermes Agent | 4 | 自我进化 Skills、agentskills.io、SOUL.md、Auxiliary LLM 路由、7 种 Memory 框架、Windows 部署、30+ 命令参考、飞书集成 |
| OpenClaw | 3 | 四层记忆、CLI-first vs MCP、Self-Extending Agent、Session 树形结构、多 Agent 三模式、Pre-Compaction、Fallback 链、安全事件 |
| Claude Code 源码 | 1 | Agent OS 架构、Runtime Assembly、14 步 Dispatch Pipeline、Fork vs Normal、Agent 认知分工、Skill = first-class primitive、Hook 策略层、MCP 双注入 |
| Harness Engineering | 2 | 十条工程原则、Query Loop 心跳、工具受管执行、上下文预算治理、Claude Code vs Codex 双路线比较、第三条路线警告 |
| Harness 系统化综述 | 1 | 12 组件分解、7 关键决策、五框架对比（Claude/OpenAI/LangGraph/CrewAI/AutoGen）、脚手架隐喻、TerminalBench 实证、Von Neumann 类比、Vercel 工具案例 |
| Vibe Coding 生产实践 | 1 | 可验证抽象层、叶子节点策略、22K 行合并案例、TDD、Compact 时机、Claude Code+Cursor 双工具流（Erik Schluntz/Anthropic） |
| Harness 全量落地实战 | 1 | 四块拼图模型、Rule/Skill/Scripts 渐进下沉、三种多 Agent 路线 PK、七 Agent 角色体系、总验证脚本、角色契约、dev-map+任务看板、最小起步路径（白家杰/JK Launcher） |
| 硬件 | 2 | 计算硬件与大模型训练 |
| Agentic Engineering 第一性原理 | 1 | 三公理演绎 Agentic Engineering，Skill 三模块渐进加载，六模块 Skill 框架，Error-Driven Context Refinement（魏依承） |
| CLAUDE.md 编写实践 | 1 | 200 行上限、禁止清单、可操作性规则、指针不图书馆、本地 CLAUDE.md、Hook 驱动、MEMORY.md、工作风格编码 |
| HTML 输出格式 | 1 | HTML > Markdown 作为 AI 输出格式，六大优势，五个使用场景，自定义编辑界面，Thariq/Claude Code 团队 |
| AI 工程师路线图 | 1 | 17 周 6 阶段 Agent Engineer 路线图，Harness 十组件，Write/Select/Compress/Isolate，4 种 Eval，生产加固，Benchmark 景观（@Av1dlive） |

## 已形成的认知

1. **MCP 是 AI 工具集成的"标准轨距"**：解决 M×N 集成问题，类似 HTTP 之于 Web
2. **Context 工程是 Agent 系统的基础能力**：上下文窗口不是越大越好，而是要"精而准"
3. **多智能体 > 单智能体**：GAN 式的生成-评估循环产生更高质量输出
4. **本 wiki 是这些概念的综合实践**：LLM Agent + Context 工程 + 编译式知识库
5. **Anthropic 自己放弃了 RAG**：Claude Code 从 RAG 转向 Agent 自主搜索——"给 Agent 上下文不如让 Agent 自己找上下文"（详见 [[seeing-like-an-agent]]）
6. **工具必须随模型能力进化**：曾经有效的工具（TodoWrite）可能变成约束，需持续审视和替换（详见 [[agent-tool-design]]）
7. **Harness > Model，但 Knowledge+Tool > Harness**：Chase 论证 Harness 是 Agent 时代的关键（Manus 成功在于 Harness），但 Harness 技术本身不是护城河，领域 Knowledge 和 Tool 才是持久价值（详见 [[harness]]）
8. **Progressive Disclosure 是三方验证的架构必然**：Anthropic（Claude Code）、Karpathy（LLM Wiki）、Chase（DeepAgents）不约而同采用同一模式 → 不是偏好而是必然
9. **File System = Agent 自管理 Context**：让 LLM 自己决定读取什么、持久化什么——"让它们自己管理 Context，就像是让它们调用 Tool 的升级版"（详见 [[harness]]）
10. **自我进化是 Agent 的分水岭**：Hermes Agent 首次将 Procedural Memory 产品化——Agent 不仅能使用工具，还能创建/修改/优化自己的 Skills。agentskills.io 将"让 Agent 自己找上下文"延伸到"让 Agent 自己找工具"（详见 [[hermes-agent]]）
11. **Auxiliary LLM 路由是 Context 工程的新维度**：主模型思考 + 副模型干脏活——不仅优化上下文内容，还优化获取成本（详见 [[context-engineering]]）
12. **工具集成存在两条哲学路线**：Anthropic 推 MCP（标准化协议），OpenClaw 推 CLI-first（Unix 哲学）。两者在实践中互补——OpenClaw 通过 MCP 桥接 Claude Code（详见 [[mcp]]、[[openclaw]]）
13. **Procedural Memory 应拆分为不可变身份 + 可变能力**：OpenClaw 的四层记忆将 Chase 的 Procedural Memory 一分为二——SOUL.md（不可变身份）和 Skills/（可进化能力）。比 Hermes 的单一 SOUL.md 更细粒度（详见 [[harness]]、[[openclaw]]）
14. **Self-Extending Agent 是光谱不是二值**：本 Wiki（监督进化）→ OpenClaw（反应式自扩展）→ Hermes（主动自进化）。三个点定义了 Agent 自我进化能力的完整光谱（详见 [[ai-agent]]）
15. **"好行为制度化"是最深的护城河**：Claude Code 源码揭示其最大优势不是模型更聪明，而是把"好习惯"写进 prompt 和 runtime 规则。这是 Chase "System Prompt = SOP 数字化"的极致实现（详见 [[harness]]、[[claude-code-source-report]]）
16. **Progressive Disclosure 是运行时架构不是设计理念**：Claude Code 源码中 Skill = first-class primitive、MCP instructions = 条件注入——不是建议而是约束。匹配 skill 时必须调用 Skill tool，制度化到 runtime 层（详见 [[agent-tool-design]]、[[claude-code-source-report]]）
17. **Agent 角色分工存在两个正交维度**：OpenClaw 按数据流分角色（Pipeline/Parallel/Hierarchical），Claude Code 按认知职能分角色（研究/规划/执行/验证）。两种维度正交互补（详见 [[ai-agent]]、[[claude-code-source-report]]）
18. **Harness 是权力分配方式**：Claude Code = 运行时共和制，Codex = 控制面立宪制。笼子的位置决定了系统以后会演化成什么样。三条路线光谱：Runtime-first / Policy-first / Prompt-piling（详见 [[harness]]、[[harness-engineering-books]]）
19. **Prompt 是宪法不是台词**：分层拼装 + 优先级链 + 记忆连接 + 缓存成本。人设解决"它像什么"，控制面解决"它能做什么、做错了怎么办"（详见 [[harness]]）
20. **上下文治理 = 预算治理**：CLAUDE.md 四层、MEMORY.md 索引（不是日记）、Session Memory 骨架、Compact 是受控重启。保存工作语义 > 保存信息量（详见 [[context-engineering]]）
21. **Harness 应随模型进化而变薄**：脚手架隐喻——Manus 六个月五次重写每次删复杂性。Future-proofing test：模型变强时性能提升而不需增加 Harness 复杂度 = 健康设计（详见 [[harness-evolution-scaffolding]]、[[harness]]）
22. **工具越少往往越好**：Vercel 移除 80% 工具效果更好；Claude Code lazy loading 实现 95% 上下文缩减。少即是多（详见 [[agent-tool-design]]、[[akshay-agent-harness]]）
23. **验证需要人类侧的可验证抽象层**：CTO 用验收测试、PM 用用户体验、CEO 用数据切片——都不深入底层。开发者需要类似的无需阅读代码即可验证功能的抽象层。叶子节点策略：AI 在末端模块自由发挥，核心架构人工保护。22K 行 Anthropic 内部生产验证：两周工作压缩到一天（详见 [[harness]]、[[erik-schluntz-vibe-coding]]）
24. **开发者应转变为 AI 的"全职 PM"**：Erik Schluntz 量化了规划投入的 ROI——15-20 分钟与 AI 共同探索、制定计划 → 指数级提升任务成功率。Vibe Coding 时唯一应看的代码是测试代码（极简 E2E）。Compact 时机 = "人类午餐停顿点"（详见 [[vibe-coding]]、[[erik-schluntz-vibe-coding]]）
25. **Harness 落地需要四块拼图：约束与流程 + 反馈 + 知识库 + 进化**：白家杰首个全量落地记录。Rule → Skill → Scripts 渐进下沉（软约束→标准化→硬门禁）。总验证脚本 = 反馈闭环。"真正贵的不是 token，真正贵的是失控。"结构化调度胜出去中心化协作。最小起步 7 步：SPEC → Rule → Skill → 多 Agent → 流程契约 → dev-map → MCP（详见 [[harness]]、[[baijj-harness-engineering-practice]]）
26. **团队级 Harness 中 Memory 应靠边站**：团队对齐的东西必须进仓库（SPEC/Rule/Scripts/dev-map），不能靠会话记忆。"档案进仓库，故事进测试，手册进脚本"（详见 [[baijj-harness-engineering-practice]]、[[harness]]）
27. **魏依承三公理（信息损耗 + LLM 本质 + 人类认知稀缺）为 wiki 已有归纳性结论提供了演绎基础**：乔哈里窗是第三种人机分工维度（vs 认知职能 vs 流程阶段）。Error-Driven Refinement 与 Hermes 自我进化、学习循环形成三角验证（详见 [[weiyicheng-agentic-engineering-first-principles]]）
28. **CLAUDE.md 编写是 Context 工程的"最后一公里"**：200 行上限、禁止清单、5 秒可验证规则、指针不图书馆、Hook 强制执行——将理论转化为用户可直接执行的 checklist。Boris Cherny（Claude Code 创建者）是 200 行上限的权威来源（详见 [[context-engineering]]、[[claudemd-writing-8-best-practices]]）
29. **HTML 是 AI→人类审查场景的最优输出格式，但不适合持久文档**：Thariq（Claude Code 团队）论证 HTML 的信息密度、交互性和分享便利性优于 Markdown。但版本控制是 HTML 的痛点——本 wiki 选择 Markdown 正是基于持久协作需求。HTML 适用于临时中间产物（计划/报告/原型），Markdown 适用于持久知识库（详见 [[vibe-coding]]、[[agent-tool-design]]、[[thariq-html-effectiveness-claude-code]]）
30. **Write/Select/Compress/Isolate 是 Context 工程已有策略的统一命名体系**：Lance Martin（LangChain）将 wiki 已有概念（File System 记忆/即时上下文/Compaction/Sub-Agent）整理为四原语框架。同一实践，不同表述（详见 [[context-engineering]]、[[av1dlive-ai-engineer-roadmap-2026]]）
31. **Harness Ossification：脚手架不仅应变薄，还可能固化为过时约束**：Anthropic 提醒"Harness 编码了关于模型做不到什么的假设"。实例：Sonnet 4.5 → Opus 4.5 后 context anxiety 相关设计失效。每次模型升级需回放真实流量检测 ossification（详见 [[harness]]、[[av1dlive-ai-engineer-roadmap-2026]]）
32. **同模型不同 Harness 可产生 36 分差距**：Opus 4.5 在 Claude Code 78% vs Smolagents 42%。这不是模型差异而是 Harness 工程差异——进一步量化验证了"同一模型的产品，仅因 Harness 不同，性能差异可达 20+ 排名"（详见 [[harness]]、[[av1dlive-ai-engineer-roadmap-2026]]）
