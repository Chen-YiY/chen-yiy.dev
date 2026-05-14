---
type: concept
aliases: [Vibe Coding, 氛围编程, 氛围编码]
related: "[[ai-agent]], [[llm-wiki-pattern]], [[context-engineering]]"
tags: [ai, coding, development, workflow, vibe-coding]
sources: "[[batch-ai-sources]], [[chase-coding-agents-reshaping-epd]], [[erik-schluntz-vibe-coding]], [[weiyicheng-agentic-engineering-first-principles]], [[yiren-10th-anniversary-livestream]], [[thariq-html-effectiveness-claude-code]]"
created: 2026-04-12
updated: 2026-05-11
---

# Vibe Coding（氛围编程）

## 定义

一套从模糊想法到商业级产品的工程化 AI 辅助开发方法论。核心认知：**你不是程序员，你是包工头；代码只是结果，上下文才是灵魂**。AI 是执行力超强但没有大局观的顶级程序员。术语由 [[karpathy|Andrej Karpathy]] 提出。

## 前提与边界

**前提**：
- 假设开发者有足够的领域知识来充当"PM"角色——能判断需求是否合理、方案是否可行、结果是否正确；缺乏领域知识时，开发者无法有效验证 AI 产出
- 假设 AI 处理编码任务的能力持续快速提升（Erik Schluntz 引用"每 7 个月翻倍"的观察，但未给出严格数据来源）
- Process-Log 策略假设项目状态可通过结构化文本充分表达，且 LLM 能从压缩记录中准确恢复上下文

**边界**：
- 四阶段 SOP 来自中文社区的实战总结，其流程设计（心法→规划→开发→避坑）反映特定开发文化和产品类型，可能不完全适用于其他场景（如系统编程、算法竞赛、嵌入式开发）
- "小白人设"策略在部署和接口对接等环节有效，但涉及架构决策和性能优化时，缺乏技术深度的"小白"视角可能导致 AI 给出次优方案
- 叶子节点策略假设系统有清晰的核心/叶子边界，但实际项目中边界常随重构动态变化

## 四阶段 SOP

### 阶段一：心法确立
- 最大的错误：上来就让 AI "给我写个xx功能的代码"
- 正确方式：先有清晰的 PRD、原型描述、技术架构、数据库设计

### 阶段二：规划期
1. **市场与竞品调研** — 用 AI 的 Deep Research
2. **PRD 生成** — 模糊想法 → 具体 Feature List
3. **原型验证** — 先生成原型确认需求（最低成本试错）
4. **技术方案** — "我是技术小白，请 CTO 帮我出方案"

### 阶段三：开发期
1. **定结构**：让 AI 生成项目目录树
2. **集中管理上下文**：PRD/技术规格书/数据库设计 → `docs/PRD.md`
3. **建立 TodoList**：AI 拆解任务，逐个击破

### 阶段四：避坑
- 部署问题：坚持"小白人设"，要求逐条命令+解释
- 接口对接：把官方文档直接扔给 AI，不让 AI 瞎编参数
- System Prompt：角色设定 + 交互原则 + 技术栈宪法 + 编码规范

## Process-Log（外部记忆体）

Vibe Coding 的关键创新——在项目根目录创建 `process-log.md`：
- 记录：当前阶段、最近完成、待解决、关键决策
- 每次新对话开场白："请先读取 process-log.md"
- 这与 [[context-engineering|Context 工程]] 的"结构化笔记"策略完全一致

## 与本 Wiki 的关系

> [!important] LLM Wiki 就是 Vibe Coding 的"知识版"
> 本 wiki 的 `WIKI.md`（Schema）= Vibe Coding 的 System Prompt
> `wiki/log.md` = Vibe Coding 的 Process-Log
> `wiki/index.md` = Vibe Coding 的项目目录树
> `wiki/overview.md` = Vibe Coding 的技术规格书
> LLM Wiki 和 Vibe Coding 共享同一套"上下文管理"哲学——**用结构化文件管理 AI 的认知边界**。

## 与其他概念的关系

- [[ai-agent]] — Vibe Coding 中 AI 充当"实现者"Agent，人类是"规划者"
- [[context-engineering]] — Vibe Coding 的核心就是 Context 工程
- [[llm-wiki-pattern]] — 两者都是"结构化文件 + LLM Agent"的模式
- [[karpathy]] — Karpathy 是 "vibe coding" 术语的提出者

## 第一性原理视角的系统性批判

[[weiyicheng|魏依承]]（2026-04）从三条公理出发对 Vibe Coding 进行了系统性批判（详见 [[weiyicheng-agentic-engineering-first-principles]]）：

**核心论点**：Vibe Coding 的本质是**用速度换取理解和控制**。它只优化"速度"一个维度，而 Engineering 要求同时考虑整个约束空间（质量、安全、可维护性）。

**适用边界**：
- **L1 层面**（加速：同样的事做得更快）——Vibe Coding 足够用。约束少、上下文简单、正确性容易验证
- **L2/L3 层面**（增强/解锁）——必须用 Engineering 方法。约束空间复杂、上下文庞大、验证困难

**信息损耗视角**：Vibe Coding 等于只在意图转化链的末端（"设计→代码"）使用 AI。上游的损耗已经累积，AI 生成的代码再快也可能是在"高效地做错误的事"。AI 没有参与需求澄清和设计阶段，在编码阶段缺少理解意图的关键上下文。

**错误累积视角**：全自主模式（让 AI 独立完成整个任务）的问题可从公理推导——概率性输出在长链中偏差累积、上下文在过程中退化（早期关键约束被挤出）、验证被推迟到最后形成高成本审计。

## Chase 的 EPD 视角

[[harrison-chase|Harrison Chase]]从组织设计角度分析了 Vibe Coding 的系统性影响（[[chase-coding-agents-reshaping-epd]]）：

**PRD 已死 → PRD 万岁**：传统 PRD→设计稿→代码流程终结，但描述意图的文字仍是原型的必备伴侣。"未来的 PRD 可能就是结构化的、带版本管理的 prompt"——PRD 和 System Prompt 在 Agent 时代趋同。

**Builder/Reviewer 二分**：通才可以独自用 Agent 构建小功能（Builder），但大型复杂功能仍需顶尖系统思维者深度评审（Reviewer）。实现成本趋近于零后，**瓶颈从实现转向评审**。

**通才价值暴涨**：一人跨产品/设计/工程，省掉沟通开销，只和 Agent 沟通。这验证了 Vibe Coding 降低实现门槛后，跨领域判断力成为稀缺资源。

## Erik Schluntz 的生产级实践

[[erik-schluntz|Erik Schluntz]]（Anthropic 研究员、《构建高效智能体》合著者）从生产环境第一线提出的 Vibe Coding 方法论（详见 [[erik-schluntz-vibe-coding]]）：

### 可验证的抽象层

"忘记代码，关注产品"的工程化落地。CTO 用验收测试、PM 用用户体验、CEO 用关键数据切片——他们都不深入底层执行细节。开发者需要建立类似的、**无需阅读底层代码即可验证功能**的抽象层。

### 叶子节点策略

首个系统化的 AI 编码技术债管理框架：

```
┌───────────────────────────────────────┐
│  核心架构（人工深入保护）              │ ← 高变动、高依赖
│  ┌─────────────────────────────────┐  │
│  │  中间层（谨慎委托）              │  │
│  │  ┌───────────────────────────┐  │  │
│  │  │  叶子节点（AI 自由发挥）  │  │  │ ← 低变动、无依赖
│  │  │  技术债可接受             │  │  │
│  │  └───────────────────────────┘  │  │
│  └─────────────────────────────────┘  │
└───────────────────────────────────────┘
```

随着模型能力提升，可信任 AI 接管的代码层级正在**向下延伸**——Anthropic 内部测试新版模型时，AI 生成优质架构的成功率正在提升。

### 开发者 = AI 的全职 PM

- 投入 15-20 分钟与 AI 共同探索代码库、制定计划、梳理上下文
- 把梳理后的上下文和规范汇入单独提示词，再让 AI 执行
- 模型任务成功率呈**指数级跃升**
- 核心理念：把 AI 当第一天入职的新员工引导——直接抛出"实现功能"指令注定失败

### 22,000 行合并案例

Anthropic 内部极限生产验证——四项策略：

| 策略 | 做法 |
|------|------|
| PM 视角深度引导 | 耗费**数天**进行前期规划与需求梳理 |
| 严格划定修改范围 | 限制在允许技术债的叶子节点 |
| 核心区域人工介入 | 必须保证扩展性的核心逻辑严格执行审查 |
| 可验证检查点 | 长时间压力测试 + 极易验证的 I/O 标准 |

结果：两周工作量压缩到一天。

### TDD for Vibe Coding

> "在 Vibe Coding 时，我通常唯一会去看的代码就是测试代码。测试过关了，我才觉得靠谱。" — Erik Schluntz

极简 E2E 测试策略：强制"只写 3 个端到端测试——快乐路径 + 错误场景 1 + 错误场景 2"。避免 Claude 写出过度依赖具体实现的"死胡同测试"。

### 工具链协同

- **Claude Code 做主要修改**，VS Code/Cursor 走着审查代码和测试
- 针对已知具体位置的修改，直接用 Cursor 手动改
- 陌生代码库：先用 Claude Code 探索（"Auth 代码在哪？""哪些功能类似？"），建立全局视图再动手

## 亦仁的创业者视角

[[yiren|亦仁]]（生财有术创始人）从创业者角度对 AI 编程提出了极简定位（[[yiren-10th-anniversary-livestream]]）：

**"AI 编程 = AI 时代的英语"**：不是专业技能，而是基础素养。每个人都要学 AI 编程，不只是程序员。"不懂 AI 编程，就像以前不懂英语——你就是 AI 时代的文盲。"

**AI 编程作为底座**：学了 AI 编程后发现"其他 AI 东西都不用专门学了"——各种工作流、新产品都可以用 AI 编程解决。AI 编程成为切入所有其他 AI 方向的底层能力。

**正反馈上瘾**："AI 编程比打游戏还上瘾。正反馈太强。"——与 Erik Schluntz 的"开发者 = AI 的全职 PM"形成互补：Erik 强调前期规划的重要性，亦仁强调快速正反馈的驱动作用。

**实战案例**：郭东超，完全不懂代码，学完 AI 编程做了个小程序，在小红书抖音推广，上个月做到百万播放、几万付费会员。

## HTML 作为 Vibe Coding 的富媒体输出

[[thariq|Thariq]]（Claude Code 团队，2026-05）提出 HTML 优于 Markdown 作为 AI 输出格式（详见 [[thariq-html-effectiveness-claude-code]]）：

**与 Vibe Coding 的关联**：HTML 是"开发者 = AI 的 PM"理念的**可视化延伸**。Erik Schluntz 强调前期规划，亦仁强调快速正反馈——HTML 同时服务两者：规划阶段用 HTML 做方案对比和交互原型，开发阶段用 HTML 做代码审查报告和可视化验证。

**核心价值**：
- **信息密度** — 表格、SVG 图表、交互控件等超越 Markdown 的表现力
- **双向交互** — 滑块微调参数、一键复制回 Claude Code，形成人机协作闭环
- **"保持人在循环中"** — 解决"两眼一抹黑任由 AI 做决定"的恐惧

**适用边界**：HTML 适合 AI→人类审查的**中间产物**（计划、报告、原型），不适合人类→人类协作的**持久文档**（版本控制痛点）。

> [!contradiction] 与本 wiki 实践的张力
> 本 wiki 全部使用 Markdown，核心原因是版本控制和多人协作。Thariq 的 HTML 论点适用于临时性中间产物，不适用于 wiki 这类持久性知识库。两者解决不同层面的问题。

## 出自

- 《Vibe Coding 从 0 到 1 实战 SOP》
- [[karpathy]] 在社交媒体上的 vibe coding 讨论
- [[chase-coding-agents-reshaping-epd|Chase: 编程 Agent 如何重塑 EPD]]（Builder/Reviewer 二分、PRD = prompt）
- [[erik-schluntz-vibe-coding|Erik Schluntz 大师课]]（可验证抽象层、叶子节点策略、22K 行合并、TDD、Compact 时机、双工具流）
- [[weiyicheng-agentic-engineering-first-principles|从第一性原理思考 Agentic Engineering]]（Vibe Coding 适用边界：L1 够用 / L2-L3 必须用 Engineering，2026-04-23）
- [[thariq-html-effectiveness-claude-code|HTML 难以置信的奇效]]（HTML 作为 Vibe Coding 富媒体输出格式，2026-05-11）
