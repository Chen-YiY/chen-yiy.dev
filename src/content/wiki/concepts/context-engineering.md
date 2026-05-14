---
type: concept
aliases: [Context Engineering, 上下文工程, 上下文工程学]
related: "[[mcp]], [[llm-wiki-pattern]], [[progressive-summarization]], [[ai-agent]], [[harness]], [[agentway]]"
tags: [ai, context, prompt-engineering, agent, optimization]
sources: "[[batch-ai-sources]], [[seeing-like-an-agent]], [[chase-harness-interview]], [[harness-engineering-books]], [[akshay-agent-harness]], [[shannholmberg-ai-knowledge-layer]], [[erik-schluntz-vibe-coding]], [[weiyicheng-agentic-engineering-first-principles]], [[deepseek-v4-announcement]], [[deepseek-v4-technical-report]], [[yiren-10th-anniversary-livestream]], [[claudemd-writing-8-best-practices]]]"
created: 2026-04-12
updated: 2026-05-11
---

# Context 工程 (上下文工程)

## 定义

Prompt 工程的自然进化。Prompt 工程专注单轮 AI 交互的生成质量；**Context 工程关注在多轮 LLM 推理过程（Agent 运行）中，动态优化整个 LLM 所接触的上下文信息配置**。目标：以尽可能少且必要的 tokens，最大化生成质量。

## 前提与边界

**前提**：
- 基于 Transformer 架构的注意力衰减特性——关键信息落在上下文中间位置时模型表现下降，这是当前架构的内在约束，非工程手段可根治
- Context rot 的量化数据（30%+ 下降）来自 Chroma 研究和 Stanford "Lost in the Middle"，基于特定模型和任务类型；不同模型规模、不同任务领域的衰减曲线可能有差异
- ACON 研究的 26%-54% token 节省数据基于特定实验设置，泛化性有待更多场景验证

**边界**：
- Compaction、Observation Masking、Sub-agent Delegation 等策略的有效性高度依赖具体工程实现质量——拙劣的压缩比不压缩更糟
- "即时上下文"策略（grep/glob/head/tail）的前提是知识已按可检索结构组织（如本 wiki 的 index.md + 页面体系），对无结构原始数据不适用
- Auxiliary LLM 路由引入了额外的系统复杂性和延迟，仅在主模型调用成本显著高于副模型时才有正 ROI

## 核心问题：Context Rot（上下文腐烂）

最大上下文窗口 ≠ 最佳注意力窗口。对话越长，模型回复质量越差：
- **回答深度降低**：难以结合前文细节
- **混乱归因**：胡乱关联不相关细节
- **忘记前序指令**：丢失早期约束

质量下降的三大因素（Chroma 团队实验）：
1. Context 输入越长 → 注意力被稀释
2. 问题与关键信息语义相似度越低 → 越难匹配
3. 关键信息与干扰内容语义相似度越高 → 干扰增强

三个因素**相互放大**。如 Gemini 2.5 Pro 的 1M 窗口，在约 4 万 tokens 时推理质量即开始下降。

**关键量化数据**（[[akshay-agent-harness|Akshay]] 综合研究）：
- **Chroma 研究**：关键内容落在上下文中间位置时，模型表现下降 **30%+**
- **Stanford "Lost in the Middle"**：得出类似结论——模型对上下文中间部分的信息关注最少
- 即使百万 token 窗口，随内容增多，指令遵循能力依旧下降

## Write/Select/Compress/Isolate 四原语

Lance Martin（LangChain）提出的 Context Engineering 四原语框架（[[av1dlive-ai-engineer-roadmap-2026|Av1dlive 路线图]] 引用）：

| 原语 | 含义 | 操作时机 | wiki 已有概念对应 |
|------|------|----------|------------------|
| **Write** | 便笺本、内存文件，持久化 Agent 状态 | Agent 需要记住信息时 | File System 记忆、MEMORY.md |
| **Select** | 使用时检索，按需加载上下文 | Agent 需要特定信息时 | 即时上下文、grep/glob/head/tail |
| **Compress** | 上下文窗口 85-95% 时摘要压缩 | 上下文接近窗口限制时 | Compaction |
| **Isolate** | 给 sub-agents 分配独立上下文窗口 | 任务可并行/可隔离时 | Sub-Agent delegation |

> 这是 wiki 已有 Context 工程策略（Compaction/即时上下文/Sub-Agent/文件记忆）的统一命名体系——同一个实践，不同框架的表述。

## 三类策略

### 策略一：写好 System Prompt
- 启发式引导，而非僵化规则
- 结构化提示（XML 标签 / Markdown 分割）
- 精选最小可行的 Agent 工具集（自包含、LLM 可理解、功能重叠少）
- 谨慎使用 few-shot（过度使用导致生成风格僵化）

### 策略二：即时上下文（On-demand Context）
- Agent 自主导航与检索，动态获取所需内容
- 渐进式披露：先看元信息（文件名、大小），再决定是否深入
- 类似 [[llm-wiki-pattern|LLM Wiki]] 的 index.md → 页面 的两级检索
- **Anthropic 官方实践**：Claude Code 用子 Agent（Claude Code Guide）做文档搜索 → 只返回答案，主 Agent 上下文保持干净（详见 [[agent-tool-design]]）
- **Chase/DeepAgents 实践**：File System 让 Agent 自己管理 Context——选择性加载、持久化存储、卸载大结果。Chase：*"让它们自己管理 Context，就像是让它们调用 Tool 的升级版"*（详见 [[harness]]）

**生产级上下文管理四策略**（[[akshay-agent-harness|Akshay]] 系统化）：

| 策略 | 实践者 | 做法 |
|------|--------|------|
| Compaction | Claude Code | 保留架构决策和未解决 bug，丢弃冗余工具输出 |
| Observation Masking | JetBrains Junie | 隐藏旧工具输出但保留调用本身 |
| Just-in-time Retrieval | Claude Code | 常用 grep/glob/head/tail 而非整文件载入 |
| Sub-agent Delegation | 通用 | 子 Agent 做大量探索，最终只返回 1,000-2,000 token 压缩总结 |

**ACON 研究**：通过优先保留 reasoning traces 而非原始工具输出，可在保持 **95%+ 准确率**的同时减少 **26%-54%** 的 token 使用。证据表明推理过程比执行结果更具上下文价值。

### 魏依承的公理化推导：三个子实践

[[weiyicheng|魏依承]]（2026-04）从三条公理出发，为 Context Engineering 推导出三个具体的子实践（详见 [[weiyicheng-agentic-engineering-first-principles]]）：

**Spec-First（用结构化文档锚定意图）**：编码前先与 AI 协作产出 spec 文档，将意图、约束和验收标准显式化。Spec 对抗 Context Rot 的锚点——无论对话如何膨胀，AI 都可以重新加载 spec 恢复完整理解。

**Docs as Code（文档是一等公民）**：将完成的 spec/设计文档保存在仓库中，与源代码共同版本化。三个价值：可检索性（AI 直接从仓库获取上下文）、一致性（文档代码同仓库同分支）、可协作性（知识不再锁在个人对话历史中）。

**渐进式披露（按需展开）**：三层加载机制——L1 元数据（~100 token/Skill，启动时加载）→ L2 指令（<5K，Skill 触发时加载）→ L3 参考资源（按需）。项目可安装数十个 Skills 仅消耗 L1 元数据。

> 模型能力是给定常量，上下文管理才是团队真正能控制的提效杠杆。

### 策略三：超长程任务的无限上下文设计

| 方案 | 原理 | 适用场景 |
|------|------|----------|
| **压缩 (Compaction)** | 上下文接近窗口限制时"有损压缩"，仅保留核心决策 | 多轮对话交互 |
| **结构化笔记** | Agent 定期将重要记忆写入外部文件，后续按需拉回 | 持久化工作记忆 |
| **多智能体架构** | 分而治之，每个子 Agent 上下文压力小 | 复杂任务分解 |

**Compaction 的进化（Chase/DeepAgents）**：
- 传统做法：Context 达到 80% 阈值时自动压缩
- **创新**：给 Agent 一个 Tool，让它自己决定何时触发压缩（如任务切换时、历史不再相关时）
- 压缩时原始消息转储到 File System 保留回溯能力
- 符合"让模型承担更多职责"的精神（详见 [[harness]]）

**成本优化模式：Auxiliary LLM 路由（Hermes Agent）**：
- [[hermes-agent|Hermes Agent]] 引入"副驾 LLM 路由中心"：为主模型和副模型分配不同任务
- **设计目的**：让主模型专注思考，便宜/专用副模型处理搜索、压缩、视觉等"脏活"
- 支持为不同任务类型指定独立模型和提供商
- Context 工理不仅管理上下文**内容**，还管理上下文的**获取成本**
- 启示：随着模型多样化（强/快/便宜/专用），按任务路由到不同模型是 Context 工程的新维度

**Fallback 链（OpenClaw）**：
- [[openclaw|OpenClaw]] 的三级 Fallback（Sonnet → Haiku → DeepSeek）是 Auxiliary LLM 路由的简化版
- 串行降级而非并行专用路由——目标更侧重可用性+成本而非专业化
- 配合预算限制：perRequest/hourly/daily 三级成本上限 + 循环推理检测
- 社区教训：OpenClaw 多轮工具调用可消耗传统聊天 100 倍 Token——成本控制是 Context 工程的必选项

**源码级实践：Claude Code 的 Cache Boundary（Xiao Tan 源码研究）**：
- [[claude-code-source-report|Claude Code 源码研究]] 揭示了上下文管理的工程级实现
- `SYSTEM_PROMPT_DYNAMIC_BOUNDARY`：显式划分静态前缀（cacheable）和动态后缀（session-specific）
- **Fork Path 的 cache 优化**：继承父线程 system prompt + tool defs，保持 byte-identical prefix 以命中 cache
- "Token 不是免费空气，是 runtime 预算"——从成本控制层面设计上下文架构
- Skill 按需注入、MCP instructions 按连接状态注入、function result clearing、summarize tool results → 全方位上下文预算管理

> [!important] 与 LLM Wiki 的直接关联
> 本 wiki 的 `WIKI.md`（Schema）和 `wiki/overview.md` 正是"结构化笔记"策略的实例——LLM 每次会话先读 Schema 和 overview.md 来重建上下文，而非从零开始。`index.md` 是"即时上下文"的实现——按需定位相关页面。本 wiki 本身就是 Context 工程的一个实践案例。

## 与其他概念的关系

- [[mcp]] — MCP 的上下文爆炸问题是 Context 工程要解决的核心挑战
- [[llm-wiki-pattern]] — LLM Wiki 的 Schema/index/overview 是 Context 工程的实践
- [[progressive-summarization]] — 渐进式总结是 Context 工程中"压缩"策略的一种实现
- [[ai-agent]] — Context 工程是 AI Agent 系统设计的基础能力
- [[agent-tool-design]] — Anthropic 的工具设计哲学直接体现了 Context 工程原则
- [[harness]] — Harness 的 File System 和 Compaction 机制是 Context 工程的架构实现
- [[hermes-agent]] — Auxiliary LLM 路由是 Context 工程的成本优化新模式
- [[openclaw]] — Pre-Compaction、Fallback 链、Session 树形分支是 Context 工理的生产实践
- [[anthropic]] — Claude Code 源码揭示 Cache Boundary、Fork Path、Skill 按需注入的工程级实现
- [[harness-engineering-books]] — "上下文 = 工作内存"原则，CLAUDE.md 四层体系，MEMORY.md 索引设计，Compact 是受控重启
- [[erik-schluntz-vibe-coding]] — Compact 时机操作指南（"人类午餐停顿点"），起手式 Compact 策略
- [[weiyicheng-agentic-engineering-first-principles|魏依承]] — 三公理为 Context Engineering 提供了演绎基础（上下文决定性 → 高信噪比供给的必然性；工作记忆有限性 → 按需注入的必然性）
- [[deepseek-v4-technical-report|DeepSeek V4]] — 1M 上下文标配 + KV cache 压缩 90%，可能改变 Context Engineering 策略重心。CSA+HCA 是架构层的"即时上下文策略"
- [[yiren-10th-anniversary-livestream|亦仁直播]] — "把一个人研究透"（全量灌入 NotebookLM 深度分析）是 Context Engineering 的极致应用；微信群聊/公众号全量导出→灌入→提问的模式展现了"全塞进去再管理"的实践

### 源码级实践：上下文即预算制度（AgentWay Harness Engineering）

[[harness-engineering-books|AgentWay 双书]] 揭示了 Claude Code 如何将上下文治理落实到源码级细节：

**CLAUDE.md 四层体系**：managed → user → project → local，离工作目录越近优先级越高。长期协作规则与临场对话从结构上分离。

**MEMORY.md = 索引不是日记**：硬限制 MAX_ENTRYPOINT_LINES=200, MAX_ENTRYPOINT_BYTES=25000。超过直接截断并追加警告——"把细节移到 topic files"。入口文件一旦既当目录又当正文，整套记忆系统就退化成摆设。

**Session Memory**：固定模板（Current State/Task/Files/Errors/Worklog），MAX_TOTAL=12000 tokens。不追求完整复刻对话，而求压缩出"未来继续干活所必需的骨架"。

**Compact = 受控重启**：不只是摘要——会恢复计划、文件、技能、工具附件和 Hook 状态。源码注释：`per-skill truncation beats dropping`（裁开头保住关键指令 > 整个扔掉）。

**恢复也有预算**：为 compact 本身预留 20,000 tokens 输出预算 + 13,000 buffer。compact 自己也可能 prompt-too-long → truncateHeadForPTLRetry() 是 last-resort escape hatch。

**一线实践者的 Compact 时机操作指南**（[[erik-schluntz-vibe-coding|Erik Schluntz 实战经验]]）：

> Erik Schluntz（Anthropic 研究员）提供了首个来自一线实践者的操作时机指南：
> - **时机选择**：在"人类程序员会停下来吃个午饭"的停顿点压缩——不是一个固定阈值，而是语义停顿点
> - **起手式 Compact**：让 AI 找出所有相关文件 → 制定计划 → 写入文档 → **立刻 Compact** → 丢掉制定计划时耗费的 10 万 token，压缩成只有几千个干净 token
> - 这与 AgentWay 的"Compact = 受控重启"精确对应——Erik 的操作建议是"重启时机"的具体化

> 上下文系统应该优先保留能维持行动语义的东西，而不是优先保留看起来信息量最大的东西。

### CLAUDE.md 编写的 Context 工程实践

[[claudemd-writing-8-best-practices|CLAUDE.md 编写 8 条经验]] 将 Context 工程原则落地为用户可直接执行的编写指南：

**核心原则与 Context 工程的映射**：

| 编写原则 | Context 工程对应 | 本质 |
|----------|-----------------|------|
| 200 行上限 | 上下文预算治理 | 系统提示词是常驻内存，不是存储 |
| 禁止清单 | 负向约束 > 正向建议 | 防止不兼容依赖的成本远高于修复 |
| 可操作性规则 | 5 秒可验证测试 | 模糊指令 = 上下文噪音 |
| 指针不图书馆 | Progressive Disclosure | Router > Database |
| 本地 CLAUDE.md | 四层优先级（project → local） | 危险区域的上下文预算加厚 |
| Hook 驱动 | 工具 = 受管执行接口 | "请记住" vs "你必须" |
| MEMORY.md | File System 记忆管理 | 成本一个文件，收益跨会话 5% |
| 工作风格编码 | System Prompt = SOP 数字化 | 消除重复性上下文开销 |

**新贡献**（wiki 已有理论中未显式提炼的）：
- **"禁止清单"思路**：Context 工程关注"给什么"，但同样重要的是"明确不给什么"——防止模型善意引入不兼容方案
- **5 秒可验证测试法**：判断规则质量的具体标准——读完规则 5 秒内能判断代码是否符合 → 合格
- **工作风格编码**：将用户偏好从临场表达转为制度化声明，消除每次会话重复传达的开销

## 百万上下文时代：策略重估

[[deepseek|DeepSeek]] V4（2026-04-24）将 1M 上下文变为标配，KV cache 压到 V3.2 的 10%（详见 [[deepseek-v4-technical-report]]）。

> 百万 token 不是一个新的能力，是同一个上下文窗口被压到可以承担的成本。

**策略影响**：当上下文从"昂贵稀缺"变为"廉价充足"，Context Engineering 的策略重心可能需要调整：

| 维度 | 旧假设（上下文稀缺） | 新可能（上下文廉价） |
|------|---------------------|---------------------|
| 加载策略 | 精心筛选最小必要集 | "全塞进去看看再说" |
| 压缩策略 | Compaction 是刚需 | 长序列可能直接保留 |
| 检索策略 | 即时上下文（grep/glob） | 全量加载 + 稀疏注意力 |
| 成本约束 | token 是预算 | KV cache 成本下降 90% |

**但 Context Rot 仍在**：CSA+HCA 稀疏注意力在架构层面缓解了"Lost in the Middle"，但不等于消除。模型的注意力分配仍然是概率性的——关键信息落在被压缩的块中时仍可能丢失。1M 上下文的可用性提升 ≠ 1M 上下文的可靠性提升。

**CSA 稀疏选择的类比**：V4 的 CSA（先压缩 KV，再用轻量 indexer 做 top-k 选择）在架构层面实现了类似"即时上下文策略"的功能——不是全量 attend，而是按需检索。这是 [[harness]] "Progressive Disclosure" 在注意力机制层的自然对应。

**CSA + HCA 分工**：
- CSA（温和压缩 + 稀疏选择）→ 类似 Agent 从 index.md 精确定位相关页面
- HCA（激进压缩 + dense）→ 类似 overview.md 提供全局概览
- 两者交替 → 类似 wiki 查询时的"先概览后深入"

## 出自

- 《有效的 Context 工程》（16 页 PDF）
- [[seeing-like-an-agent|Seeing like an agent]]（Anthropic 官方博客，2026-04-10）
- [[chase-harness-interview|Chase Harness 专访]]（File System 作为 Context 管理、Agent 自触发 Compaction）
- [[hermes-agent-articles|Hermes Agent 三篇实践指南]]（Auxiliary LLM 路由、7 种 Memory 框架）
- [[openclaw-books|OpenClaw 三份文档编译]]（Pre-Compaction、Fallback 链、Session 树形分支）
- [[claude-code-source-report|Claude Code 源码研究报告]]（Cache Boundary、Fork Path、Skill 按需注入）
- [[akshay-agent-harness|一文深度解析 Agent Harness]]（Chroma/Stanford context rot 量化数据、Observation Masking、ACON 研究，2026-04-12）
- [[shannholmberg-ai-knowledge-layer|AI 知识层]]（Context Engineering = RAG 演进第三阶段，Knowledge Layer 是基础设施）
- [[erik-schluntz-vibe-coding|Erik Schluntz 大师课]]（Compact 时机操作指南——"人类午餐停顿点"，起手式 Compact 策略）
- [[weiyicheng-agentic-engineering-first-principles|从第一性原理思考 Agentic Engineering]]（三公理演绎推导 Context Engineering 三子实践：Spec-First / Docs as Code / 渐进式披露，2026-04-23）
- [[deepseek-v4-technical-report|DeepSeek V4 技术报告解读]]（CSA+HCA 混合注意力、KV cache 压缩 90%、1M 上下文标配的策略影响，2026-04-25）
- [[claudemd-writing-8-best-practices|CLAUDE.md 编写 8 条经验]]（Context 工程原则在 CLAUDE.md 编写场景的具体化实践：200 行上限、禁止清单、可操作性规则、工作风格编码，2026-05-11）
- [[av1dlive-ai-engineer-roadmap-2026|AI 工程师路线图 2026]]（Write/Select/Compress/Isolate 四原语框架、上下文 85-95% 压缩阈值、20K token offload 策略，2026-05-11）
