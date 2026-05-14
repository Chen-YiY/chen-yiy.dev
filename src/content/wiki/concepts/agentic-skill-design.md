---
type: concept
aliases: [Agent Skill Design, Skill 设计模式, Fat Skills Thin Harness, Agentic Skills]
related: "[[harness]], [[agent-tool-design]], [[context-engineering]], [[llm-wiki-pattern]], [[hermes-agent]]"
tags: [agent, skills, design-pattern, markdown, diarization, harness]
sources: "[[intuitmachine-agentic-skills]], [[baijj-harness-engineering-practice]], [[weiyicheng-agentic-engineering-first-principles]]"
created: 2026-04-15
updated: 2026-04-25
---

# Agentic Skill Design（Agent 技能设计）

## 定义

Agent Skill Design 是一套关于如何设计 AI Agent 技能（Skill）的系统化方法论。核心主张：**Skill 不是提示词，而是用 Markdown 编写的方法调用——编码判断、流程和约束，通过参数化支持多种用例，90% 的系统价值存在于 Skills 层。**

## 前提与边界

**前提假设**：
- **90% 的系统价值可以在 Skill 层用 Markdown 编码**。判断、流程、约束等核心 intelligence 不需要代码实现——LLM 天然理解 Markdown 中的过程描述和条件逻辑
- Skill 的生命周期足够长，值得投入精力 codify——一次性任务不适合固化成 Skill
- LLM 能可靠地遵循 Markdown 中编码的多步流程和约束条件，不会在执行中遗漏或扭曲关键步骤

**适用边界**：
- **"餐桌测试"的阈值（8 人 vs 800 人）依赖具体领域和模型能力**。当前的 latent/deterministic 边界并非固定不变——随着模型能力提升，latent 可靠处理的规模也在增长。每个领域需要独立校准自己的"餐桌阈值"
- Fat Skills 假设 Markdown 足以表达所有必要的判断和流程，但某些高度动态的决策逻辑（如实时竞价、高频交易）可能需要代码级别的确定性执行
- Skill 的自我改进循环（`/improve`）依赖充足的反馈样本——冷启动阶段（3-10 个实例）可能不足以捕获所有边界情况
- "一个参数化 Skill 解决多种场景"的设计可能导致 Skill 内部复杂度膨胀，反而不如拆分为多个聚焦的 Skill 易于维护
- 目前的验证主要集中在**文本处理和信息编译**领域（diarization、knowledge management），在物理操作、实时交互等领域的适用性尚待验证

## 核心原则

### Skill = 方法调用 ≠ Prompt

| 维度 | Prompt | Skill |
|------|--------|-------|
| 描述 | 任务（做什么） | 流程（怎么做） |
| 寿命 | 单次使用 | 可重复调用 |
| 绑定 | 与上下文紧耦合 | 参数化、上下文无关 |
| 内容 | 指令 | Process + Judgment + Context + Constraints |

### 三层架构

```
┌─────────────────────────────────────────────┐
│ FAT SKILLS（90% 价值所在）                    │
│ Markdown 编码 judgment 和 process            │
├─────────────────────────────────────────────┤
│ THIN HARNESS（~200 行代码）                   │
│ JSON in, text out, read-only by default     │
├─────────────────────────────────────────────┤
│ DETERMINISTIC APPLICATION                    │
│ 快速、窄而专的目的构建工具                    │
└─────────────────────────────────────────────┘
```

**反模式**：Fat Harness + Thin Skills——40+ tool definitions 吃掉上下文窗口、MCP 往返延迟 2-5 秒、每个 REST endpoint 包成单独工具。

### Latent vs Deterministic 边界

**混淆潜在空间和确定性操作是 Agent 设计最常见的错误。**

- **Latent（模型做）**：Judgment、Synthesis、Pattern recognition、Interpretation、Quality assessment
- **Deterministic（代码做）**：Database queries、Arithmetic、File operations、API calls、Combinatorial optimization

**餐桌测试**：LLM 能安排 8 人在一张餐桌旁（小规模 latent），但让它安排 800 人时会编造看似合理实则错误的方案（规模超出 latent 能力边界）。

**正确结构**：LATENT → DETERMINISTIC → LATENT → DETERMINISTIC → LATENT（判断→执行→判断→执行→验证）

## 关键能力

### Diarization（编译）

> 从非结构化源中提取结构化 intelligence——暴露矛盾、标出变化、凝结判断。

- 产出：结构化档案、矛盾标记、时间变化追踪、Analyst judgment
- **SQL 做不出、RAG pipeline 做不出**——只有模型能同时保留矛盾、注意到变化并综合成 intelligence
- **与 [[llm-wiki-pattern|LLM Wiki]] 本质相同**：LLM Wiki 的 ingest 操作就是 Diarization

### Resolver（路由）

> 上下文的路由表——检测任务类型，自动加载正确文档。

- 内建模式：每个 Skill 有 `description` 字段，模型自动匹配用户意图与 Skill descriptions
- 教训：CLAUDE.md 从 20,000 行优化到 200 行——从"什么都塞进去"变成"一堆指向文档的指针"
- **设计启示**：Skills 应该是可发现的，而不是靠死记硬背

### Purpose-built Tools（专用工具）

专用工具比通用工具快 **75 倍**（Playwright 100ms vs Chrome MCP 15s）。

- 坏：什么都能做但做得很慢的通用工具（screenshot → find → click → wait → read）
- 好：只做一件事但做得很快的专用工具
- "软件已经没必要再那么珍贵了。只构建你真正需要的，而且只构建这些。"

## 生命周期

### 学习循环

Skill 在真实任务上执行 → 收集反馈 → `/improve` 读取反馈提取模式 → 写回新规则 → 下次自动改进

示例：OK ratings 从 12% 降到 4%（通过识别"说 AI infrastructure 但 80% 代码在 billing → 应分类为 FinTech"）。

### 技能即永久升级

"每一个 Skill 都是系统的一次永久升级。它不会退化。不会遗忘。它会在你睡觉时，于凌晨 3 点运行。"

纪律：
- 不做一次性工作——重复任务必须固化成 Skill
- 先手工做 3-10 个样本→用户批准→codify 成文件→合适时挂 cron
- "如果我得为同一件事向你提两次要求，那你就失败了"

### 参数化调用

同一 Skill 结构，不同参数 = 完全不同行为：
- `/match-breakout`（1200 人，sector affinity 聚类）→ `/match-lunch`（600 人，跨行业混配）→ `/match-live`（所有人，1:1 配对 200ms）

**设计启示**：一个参数化 Skill 能解决的事情，不要拆成 3 个 Skill。

## 与其他概念的关系

| 关系 | 概念 | 说明 |
|------|------|------|
| 具体化 | [[harness]] | Skill Design 是 Harness 架构中"Fat Skills"层的设计方法论 |
| 工具层实践 | [[agent-tool-design]] | Purpose-built tools 是 Progressive Disclosure 在工具层的实现 |
| 上下文路由 | [[context-engineering]] | Resolver 是上下文工程的新维度——按需路由而非预加载 |
| 编译操作 | [[llm-wiki-pattern]] | Diarization = LLM Wiki 的 ingest 操作 |
| 自我进化 | [[hermes-agent]] | 学习循环 = Procedural Memory 的自我改进机制 |
| 语言载体 | [[harness]] | "Markdown 是编程语言"深化了"System Prompt = SOP 数字化" |

## 设计清单

### STRUCTURE
- □ Skill 有清晰参数（每次 invocation 中什么会变化）
- □ Skill 编码了 process、judgment 和 constraints（什么是不变的）
- □ Skill 有 description 字段，供 resolver 匹配
- □ 各步骤在 latent 与 deterministic 之间合理交替

### BOUNDARIES
- □ Judgment 留在 skill 里（latent）
- □ Execution 外包给窄而专的 tools（deterministic）
- □ Harness 中不放 business logic
- □ Tools 要快、而且是 purpose-built

### LIFECYCLE
- □ 先手工执行（3-10 个实例）
- □ 模式稳定后再 codify
- □ 合适时挂 cron
- □ 接上自我改进闭环

### CONTENT
- □ 用 markdown 写（模型原生语言）
- □ 包含"该如何思考这件事"，而不仅是"做什么"
- □ 明确写出什么不要做，以及边界情况
- □ 记录它优化的目标是什么

### INTEGRATION
- □ Resolver 能通过 description 找到它
- □ 参数有清晰类型/要求
- □ 输出格式已指定
- □ 在需要的地方能接上 diarization

## 待探索

- Diarization 在非文本领域的应用（图像、音频、视频素材的编译）
- 学习循环的量化评估：改进多少轮后收敛？
- Resolver 路由的冲突解决策略——多个 Skill 匹配同一意图时的优先级
- "Fat Skills"的边界——什么情况下 Skill 应该拆分为多个子 Skill？

## 第一性原理演绎验证：Skill 三层渐进加载

[[weiyicheng|魏依承]]（2026-04）从 LLM 工作记忆有限性公理出发，为 Skill 的渐进式披露推导出具体的三层 token 预算（详见 [[weiyicheng-agentic-engineering-first-principles]]）：

| 层级 | 内容 | 加载时机 | Token 成本 |
|------|------|----------|-----------|
| **L1: Metadata** | YAML frontmatter（name, description） | Agent 启动时 | ~100/Skill |
| **L2: Instructions** | SKILL.md 主体指令 | Skill 被触发时 | < 5K |
| **L3: Resources** | references/、scripts/、assets/ | 被显式引用或调用时 | 按需 |

项目可以安装数十个 Skills（仅消耗 L1 元数据），只有当前任务实际使用的 Skill 才消耗完整上下文。这为 Fat Skills/Thin Harness 架构中的"90% 价值在 Skills 层"提供了工程实现细节。

**Skill 与 Rules 的互补**：Rules 是全量预加载的静态上下文（极轻量，任何阶段都需要）；Skills 是按需触发的专项能力（编码规范、架构约束等应放在 Skills 中）。混淆两者会导致要么上下文爆炸（Rules 太重），要么关键知识缺失（该预加载的放进了 Skills）。

**六模块 Skill 框架**：Workflow / Best Practices / Standards / Docs / Troubleshooting / Self-Refinement。Workflow 是主驱动链，按需拉取其他模块；Self-Refinement 横跨所有模块，监听错误信号并沉淀经验。这与白家杰的"四块拼图"形成互补——白家杰从落地视角描述"需要什么"，魏依承从 Skill 载体视角描述"怎么承载"。

## Error-Driven Context Refinement：自下而上的知识生长

魏依承提出双触发反馈闭环（与 [[hermes-agent|Hermes]] 的自我进化 Skills 和上文的学习循环形成三角验证）：

| 触发方式 | 机制 | 适用场景 |
|----------|------|----------|
| **自动触发** | AI 识别被纠正后自动评估根因，搜索现有 Rules/Skills | 日常协作中的即时反馈 |
| **手动 Command** | 用户主动发起，AI 回顾对话历史识别错误模式 | 一轮密集协作后的集中沉淀 |

**闭环本质**：犯错 → 诊断根因 → 检索现有知识 → 创建/更新 Rule/Skill → 预防复发。

**与学习循环的关系**：学习循环（IntuitMachine）强调 Skill 在真实任务上执行后收集反馈；Error-Driven Refinement 强调从错误中提取经验。两者互补——前者自上而下优化已有 Skill，后者自下而上从错误中生长新知识。

## 实战验证：Rule / Skill / Scripts 三层分离

[[baijj|白家杰]]在 JK Launcher 项目中验证了 Skill 的三层分离实践（详见 [[baijj-harness-engineering-practice]]）：

**核心发现**：Rule 告诉 AI "必须做"，Skill 告诉 AI "怎么做"，Scripts 直接检查"做没做到"。三者不是替代关系而是渐进下沉：

- **Rule → Skill**：Rule 既讲原则又讲流程会越写越长。Skill 接管"怎么做"后，Rule 只保留真正的红线
- **Skill → Scripts**：Skill 仍然是自然语言，AI 可能忽略/绕过/解释性执行。Scripts 是最终裁判
- **维护成本递减**：修改编译流程只需改编译 Skill，不需要全项目搜索 Rule 里的旧命令

**与 Fat Skills/Thin Harness 三层架构的对应**：
- 白家杰的 Skill 对应 Fat Skills 层（Markdown 编码的标准化流程）
- 白家杰的 Scripts 对应 Deterministic Application 层（可执行的硬性检查）
- 白家杰的 Rule 对应 Thin Harness 层的约束声明

> Rule 不是没用，而是 Rule 只能做"原则约束"，不能做"流程执行"。
