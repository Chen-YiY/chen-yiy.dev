---
title: Wiki 操作日志
description: 所有 wiki 操作的按时间顺序记录（append-only）
---

# Wiki 操作日志

> 本文件是 append-only 日志。每条记录格式：`## [YYYY-MM-DD] 操作类型 | 对象名称`
> 快速查看最近操作：搜索 `^## \[` 或查看文件底部。

---

<!-- 日志条目追加在上方分隔线之后 -->

## [2026-05-11] ingest | 如何在 2026 年成为一名 AI 工程师（路线图）

- **源文档**：[[av1dlive-ai-engineer-roadmap-2026]]（@Av1dlive，X post，7000+ 字，17 周 6 阶段路线图）
- **操作**：第二十五次 ingest，系统性的 Agent Engineer 培养路线图（harness engineering 为核心）
- **创建页面**：
  - 源摘要：[[av1dlive-ai-engineer-roadmap-2026]]
- **更新概念页**：
  - [[harness]] — 添加 78% vs 42% 同模型跨 Harness 对比数据、Harness Ossification 概念
  - [[context-engineering]] — 添加 Write/Select/Compress/Isolate 四原语框架（Lance Martin/LangChain）
- **关键洞察**：四原语框架是 wiki 已有 Context 工程策略（Compaction/即时上下文/Sub-Agent/文件记忆）的统一命名体系；"Harness Ossification"为脚手架隐喻增加了新维度——脚手架不仅应变薄，还可能固化为过时约束

## [2026-05-11] ingest | 使用 Claude Code：HTML 难以置信的奇效

- **源文档**：[[thariq-html-effectiveness-claude-code]]（Thariq/Claude Code 团队，译：宝玉AI，X post）
- **操作**：第二十四次 ingest，Claude Code 团队成员主张 HTML 优于 Markdown 作为 AI 输出格式（信息密度/视觉清晰度/分享/交互/数据摄取/乐趣）
- **创建页面**：
  - 源摘要：[[thariq-html-effectiveness-claude-code]]
  - 实体：[[thariq]]
- **更新概念页**：
  - [[vibe-coding]] — 添加"HTML 作为 Vibe Coding 的富媒体输出"章节
  - [[agent-tool-design]] — 添加"Agent 输出格式：Markdown vs HTML"章节
- **关键洞察**：HTML 适用于 AI→人类审查的临时中间产物，不适用于持久性知识库（版本控制痛点）。与 wiki 现有 Markdown 实践存在 `[!contradiction]` 张力，已标记

## [2026-05-11] ingest | CLAUDE.md 编写 8 条最佳实践

- **源文档**：[[claudemd-writing-8-best-practices]]（网页文章，佚名）
- **操作**：第二十三次 ingest，CLAUDE.md 编写实战指南（200行上限/禁止清单/可操作性规则/指针不图书馆/本地CLAUDE.md/Hook驱动/MEMORY.md/工作风格编码）
- **创建页面**：
  - 源摘要：[[claudemd-writing-8-best-practices]]
  - 实体：[[boris-cherny]]
- **更新概念页**：
  - [[context-engineering]] — 添加"CLAUDE.md 编写的 Context 工程实践"章节（8 条原则与 Context 工程的映射表）
  - [[harness]] — System Prompt 部分添加 CLAUDE.md 编写实践引用
- **关键洞察**：文章将 wiki 已有的 Context 工程和 Harness 理论具体化为用户可直接执行的 CLAUDE.md 编写 checklist；"禁止清单"思路和"5 秒可验证"测试法是 wiki 中未显式提炼的新贡献

## [2026-04-25] ingest | 亦仁十周年直播分享（一个人 + AI + 一群人）

- **源文档**：[[yiren-10th-anniversary-livestream]]（PDF OCR 提取，16 页纯矢量图形 → PyMuPDF 渲染 PNG → analyze_image OCR）
- **操作**：第二十二次 ingest，生财有术创始人亦仁的系统化 AI 实践分享（工具清单/决策框架/心法/人机合一/八大方向）
- **创建页面**：
  - 源摘要：[[yiren-10th-anniversary-livestream]]
  - 实体：[[yiren]]、[[shengcaiyoushu]]
- **更新实体页**：
  - [[obsidian]] — 添加亦仁的 Obsidian + Claude 工作台实践
- **更新概念页**：
  - [[llm-wiki-pattern]] — 添加"亦仁的创业者实践"章节
  - [[vibe-coding]] — 添加"亦仁的创业者视角"章节
  - [[context-engineering]] — 添加亦仁关联引用
- **关键洞察**：亦仁的 Obsidian + Claude 工作流是 LLM Wiki 模式在创业者场景的完整实例；数据主权理念与 raw/ 不可变层完全对齐；"把一个人研究透"是 Context Engineering 的极致应用

## [2026-04-25] ingest | DeepSeek V4 发布（官方公告 + 技术报告解读）

- **源文档**：[[deepseek-v4-announcement]] + [[deepseek-v4-technical-report]]
- **操作**：第二十一次 ingest（双源合并），DeepSeek V4 系列发布（V4-Pro 1.6T + V4-Flash 284B），1M 上下文标配，CSA+HCA 混合注意力，KV cache 压缩 90%
- **创建页面**：
  - 源摘要：[[deepseek-v4-announcement]]、[[deepseek-v4-technical-report]]
  - 实体：[[deepseek]]
- **更新概念页**：
  - [[context-engineering]] — 添加"百万上下文时代：策略重估"章节
  - [[ai-agent]] — 添加 Agent 产品专项优化信息
  - [[harness]] — 添加"模型厂商验证 Harness = 系统 API"
- **关键洞察**：1M 上下文成本降至可承受可能改变 Context Engineering 策略重心；模型厂商针对 Agent 产品做 adapter 优化验证 Harness 概念

## [2026-04-25] ingest | 从第一性原理思考 Agentic Engineering (魏依承, 2026-04-23)

- **源文档**：[[weiyicheng-agentic-engineering-first-principles]]
- **操作**：第二十次 ingest，18,901 字方法论文章，首个用三公理演绎推导 Agentic Engineering 实践的系统性文章
- **创建页面**：
  - 源摘要：[[weiyicheng-agentic-engineering-first-principles]]
  - 实体：[[weiyicheng]]
- **更新概念页**：
  - [[context-engineering]] — 添加魏依承公理化推导（Spec-First / Docs as Code / 渐进式披露三子实践）
  - [[harness]] — 添加第一性原理演绎验证章节（三公理 → Harness 设计的必然性）+ Skill 六模块框架 + Error-Driven Refinement
  - [[vibe-coding]] — 添加系统性批判章节（L1/L2/L3 适用边界）
  - [[ai-agent]] — 添加乔哈里窗人机分工模型（第三种分工维度）
  - [[agentic-skill-design]] — 添加三层渐进加载验证 + Error-Driven Context Refinement
- **更新主题页**：[[ai-tooling-and-protocols]]
- **关键洞察**：三公理为 wiki 已有的 19 个源的归纳性结论提供了演绎基础；乔哈里窗是第三种人机分工维度

## [2026-04-25] lint+schema | Wiki Schema 升级 + 全量 Lint + 前提与边界回填

- **操作**：三轮连续维护操作
- **Schema 升级**：WIKI.md Ingest 流程新增步骤 3「质疑源材料」和步骤 7「主动对标」；源摘要模板和概念页模板新增「前提与边界」必含字段
- **全量 Lint**：7 维度健康检查（矛盾/断链/孤岛/缺口/索引/日志/字段完整性），修复 `[[index.md]]`→`[[index]]` 断链
- **前提与边界回填**：4 Agent 并行回填全部 35 页面（16 概念页 + 19 源摘要页），每页补充前提假设/数据可靠性/不适用场景三维度分析
- **影响范围**：全部 35 页 frontmatter `updated` 更新为 `2026-04-25`

## [2026-04-25] ingest | 万字干货！Harness Engineering 如何工程化落地？ (白家杰 / 腾讯云开发者, 2026-04-22)

- **源文档**：[[baijj-harness-engineering-practice]]
- **操作**：第十九次 ingest，28,000 字 Harness Engineering 全量落地实战记录
- **创建页面**：
  - 源摘要：[[baijj-harness-engineering-practice]]
  - 实体：[[baijj]]
- **更新页面**：[[harness]]（+四块拼图模型+Rule/Skill/Scripts 渐进下沉+最小起步路径）、[[ai-agent]]（+三种多 Agent 路线实战 PK+七 Agent 角色体系+角色契约）、[[agentic-skill-design]]（+Rule/Skill/Scripts 三层分离实践验证）、[[ai-tooling-and-protocols]]（+新源分类）、[[index]]、[[log]]、[[overview]]
- **触及页面数**：2 个新页面 + 3 个更新 + 3 个基础设施 = 8
- **跨源连接**：
  - 四块拼图模型 → [[harness]] Chase 四原语 + Akshay 12 组件的落地视角重新分组
  - Rule → Skill → Scripts 渐进下沉 → [[harness]] AgentWay "验证必须独立"的工程实践验证
  - 结构化调度胜出 → [[ai-agent]] OpenClaw 三模式 + Claude Code 认知职能分工的实战验证
  - 七 Agent 角色体系 → [[ai-agent]] Claude Code 四角色按软件工程流程阶段的另一种正交维度
  - 总验证脚本 = 反馈闭环 → [[harness]] Boris Cherny "2-3x" 验证循环的工程实现
  - 角色契约 → [[harness]] System Prompt = SOP 数字化的接口化升级
  - 基线对比 → [[harness]] 错误处理的客观化延伸
  - Memory 应靠边站 → [[hermes-agent]] 7 种 Memory + [[openclaw]] 四层记忆的个人 vs 团队定位差异
  - 最小起步路径 → [[erik-schluntz-vibe-coding]] "开发者 = PM" 的完整项目级落地补充
  - PM = 总路由器 → [[harness]] Chase Builder/Reviewer 的流程级实现

## [2026-04-25] ingest | 如何正确 Vibe Coding (Erik Schluntz / 机器之心, 2026-04-20)

- **源文档**：[[erik-schluntz-vibe-coding]]
- **操作**：第十八次 ingest，Anthropic 研究员 Erik Schluntz 的 Vibe Coding 生产级大师课
- **创建页面**：
  - 源摘要：[[erik-schluntz-vibe-coding]]
  - 实体：[[erik-schluntz]]
- **更新页面**：[[vibe-coding]]（+Erik 生产级实践）、[[context-engineering]]（+Compact 时机指南）、[[harness]]（+可验证抽象层+叶子节点策略）、[[anthropic]]（+Erik 贡献）、[[ai-tooling-and-protocols]]（+新源分类+2 条认知）、[[index]]、[[log]]、[[overview]]
- **触及页面数**：2 个新页面 + 5 个更新 + 3 个基础设施 = 10
- **跨源连接**：
  - 可验证抽象层 → [[harness]] 验证循环的人类侧设计，补充 Boris Cherny 的机器侧
  - 叶子节点策略 → [[agentic-skill-design]] "餐桌测试"边界的工程化实践，[[harness]] "Harness 应变薄"的代码管理维度
  - 开发者 = PM（15-20 min → 指数级提升）→ [[vibe-coding]] 四阶段 SOP 规划期的量化验证
  - 22K 行合并案例 → [[harness]] TerminalBench 实证的 Anthropic 内部连续证据
  - Compact 时机（"人类午餐停顿点"）→ [[context-engineering]] 首个一线操作时机指南
  - 编译器信任类比 → [[harness]] 脚手架隐喻的历史技术类比验证
  - TDD for Vibe Coding → [[harness]] 规则式验证的 Vibe Coding 特化实践
  - Claude Code + Cursor 双工具流 → 首个来自 Anthropic 内部的工具链搭配指南

## [2026-04-19] ingest | 编程 Agent 如何重塑工程、产品和设计 (Harrison Chase, 2026-03-11)

- **源文档**：[[chase-coding-agents-reshaping-epd]]
- **操作**：第十七次 ingest，Chase 分析编程 Agent 对 EPD 的系统性影响
- **创建页面**：
  - 源摘要：[[chase-coding-agents-reshaping-epd]]
- **更新页面**：[[harrison-chase]]（+关键思想 #4#5、+新源）、[[vibe-coding]]（+Chase EPD 视角）、[[harness]]（+新源）、[[index]]、[[log]]、[[overview]]
- **触及页面数**：1 个新页面 + 3 个更新 + 3 个基础设施 = 7
- **跨源连接**：
  - Builder/Reviewer 二分 → [[harness]] Agent 角色分工的组织维度补充
  - PRD = 结构化 prompt → PRD 和 System Prompt 在 Agent 时代趋同
  - 瓶颈从实现转向评审 → 系统思维成为核心差异化，与 [[harness]] "Harness > Model" 一致
  - 通才价值暴涨 → [[vibe-coding]] 降低实现门槛后跨领域判断力成为稀缺资源
  - 好的 PM 更好差的 PM 更差 → [[agentic-skill-design]] Latent vs Deterministic 的组织层类比

## [2026-04-19] ingest | AI 知识层：让每个 Agent 都变聪明的双层系统 (@shannholmberg / 蓝衣剑客, 2026-04)

- **源文档**：[[shannholmberg-ai-knowledge-layer]]
- **操作**：第十六次 ingest，AI Knowledge Layer 双层架构（KBL + BF）
- **创建页面**：
  - 源摘要：[[shannholmberg-ai-knowledge-layer]]
  - 概念：[[ai-knowledge-layer]]
- **更新页面**：[[llm-wiki-pattern]]（+BF 层、Graphify 71.5x）、[[rag-vs-compiled-wiki]]（+三阶段演进、量化证据）、[[context-engineering]]（+第三阶段定位）、[[wiki-as-harness]]（+Knowledge Layer 视角）、[[index]]、[[log]]、[[overview]]
- **触及页面数**：2 个新页面 + 4 个更新 + 3 个基础设施 = 9
- **跨源连接**：
  - KBL + BF 双层架构 → [[llm-wiki-pattern]] 的进化版，新增静态锚点层
  - BF（品牌基础层）≈ 不可变 System Prompt → 与 [[harness]] System Prompt 原语精确对应
  - 三阶段演进（RAG→Agentic RAG→Context Engineering）→ [[rag-vs-compiled-wiki]] 的历史维度
  - Graphify 71.5x token 节省 → 新量化证据，与 Karpathy 和饼干哥哥数据形成三角验证
  - Knowledge Layer = 第三阶段基础设施 → [[context-engineering]] 的新定位
  - 验证门控 + 置信度标签 → [[agentic-skill-design]] 质量控制的具体机制
  - 本 Wiki 的 WIKI.md 同时承担 Schema + BF 功能 → [[wiki-as-harness]] 的优化方向提示
  - 从个人到组织的规模化路径 → [[second-brain]] 的团队扩展维度

## [2026-04-19] ingest | Hermes Agent 在 Win 系统本地部署保姆级教程 (张梦飞i / 李琛, 2026-04)

- **源文档**：[[zhangmengfei-hermes-windows-deploy]]
- **操作**：第十五次 ingest，Hermes Agent Windows 部署实操教程
- **创建页面**：
  - 源摘要：[[zhangmengfei-hermes-windows-deploy]]
- **更新页面**：[[hermes-agent]]（+Windows 部署方案、命令参考 30+ 条、飞书集成）、[[index]]、[[log]]、[[overview]]、[[ai-tooling-and-protocols]]
- **触及页面数**：1 个新页面 + 1 个更新 + 4 个基础设施 = 6
- **跨源连接**：
  - Windows 部署方案（一键 + WSL）→ 补全 [[hermes-agent]] 的部署实操层
  - 30+ 条命令参考 → 首次系统整理 Hermes CLI 命令集
  - 飞书集成流程 → 补全 [[hermes-agent]] 的消息平台配置细节
  - Z.AI/智谱作为 LLM provider → 新增国内 LLM provider 具体使用案例
  - 网络是最大障碍的踩坑经验 → 实践维度的补充

## [2026-04-15] ingest | 如何在 6 个月内成为 AI 自动化工程师 (@DeRonin_ / WaytoAGI-鹏影, 2026-04-15)

- **源文档**：[[deronin-ai-automation-roadmap]]
- **操作**：第十四次 ingest，AI 自动化工程师 6 个月职业路线图（10000+ 字）
- **创建页面**：
  - 源摘要：[[deronin-ai-automation-roadmap]]
- **更新页面**：[[index]]、[[log]]、[[overview]]、[[ai-tooling-and-protocols]]
- **触及页面数**：1 个新页面 + 4 个更新 = 5
- **跨源连接**：
  - n8n 作为推荐工具 → [[ai-tooling-and-protocols]] 的 n8n 详细定位首次补全
  - "Prompts 就是代码，需要版本控制" → [[harness]] 的 System Prompt = SOP 的实践运维维度
  - Agent vs 固定工作流判断框架 → [[agentic-skill-design]] Latent vs Deterministic 的实践补充
  - "Agent 反而是过度设计" → [[agent-tool-design]] 工具越少越好的实践验证
  - 定价量化数据 → wiki 首次引入 AI 自动化服务的商业定价参考

## [2026-04-15] ingest | AI Agentic Skills 设计的关键概念 (@IntuitMachine / WaytoAGI-鹏影, 2026-04-13)

- **源文档**：[[intuitmachine-agentic-skills]]
- **操作**：第十三次 ingest，Agent Skill 设计 10 大关键概念
- **创建页面**：
  - 源摘要：[[intuitmachine-agentic-skills]]
  - 概念：[[agentic-skill-design]]
- **更新页面**：[[harness]]（+Fat Skills / Thin Harness 三层架构）、[[agent-tool-design]]（+Purpose-built tools 量化对比）、[[index]]、[[overview]]
- **触及页面数**：2 个新页面 + 2 个更新 + 3 个基础设施 = 7
- **跨源连接**：
  - 三层架构（Fat Skills / Thin Harness / Deterministic App）→ 对 [[harness]] 的具体化设计，与 Akshay 12 组件、AgentWay 十条原则形成三角验证
  - Diarization（非结构化→结构化 intelligence）→ 本质等同于 [[llm-wiki-pattern]] 的 ingest 操作，增加了"暴露矛盾、标出变化"的精确描述
  - Resolver（上下文路由表）→ [[context-engineering]] 的新维度——按需路由加载而非预加载
  - Purpose-built tools（75x 速度优势）→ [[agent-tool-design]] Progressive Disclosure 的工具层实践，与 Vercel 80% 工具移除案例交叉验证
  - 学习循环 → [[hermes-agent]] Procedural Memory 自我改进的产品化验证
  - 餐桌测试 → Latent vs Deterministic 边界的精确判断启发式

## [2026-04-14] ingest | 一篇文章卖了20万——LLM Wiki 内容创作3.0系统 (饼干哥哥, 2026-04-13)

- **源文档**：[[biscuitbrother-llm-wiki-3.0]]
- **操作**：第十二次 ingest，饼干哥哥的 LLM Wiki 内容创作3.0系统实践经验
- **创建页面**：
  - 源摘要：[[biscuitbrother-llm-wiki-3.0]]
  - 实体：[[biscuitbrother]]
- **更新页面**：[[llm-wiki-pattern]]、[[rag-vs-compiled-wiki]]、[[second-brain]]、[[memex]]、[[index]]、[[overview]]
- **触及页面数**：2 个新页面 + 4 个更新 + 3 个基础设施 = 9
- **跨源连接**：
  - 三步编译法（浓缩→质疑→对标）→ 对 Karpathy 原始 Ingest 流程的实践进化，质疑和对标解决了"摘要不生成新知识"盲区 → 丰富 [[llm-wiki-pattern]]
  - 2.0→3.0 命名框架 → 将 [[rag-vs-compiled-wiki]] 的抽象对比落地为可传播的进化叙事
  - RAG 失败量化数据（37处冲突 + 60+篇未引用）→ 为 [[rag-vs-compiled-wiki]] 提供生产级实证
  - 维护成本诊断（"成本增速超过价值"）→ 深化 [[second-brain]] 的失败根因分析
  - Memex 80年闭环叙事 → 补全 [[memex]] 的历史叙事最后一环（Bush→Forte→Karpathy→饼干哥哥商业验证）

## [2026-04-14] ingest | 一文深度解析 Agent Harness (Akshay, 2026-04-12)

- **源文档**：[[akshay-agent-harness]]
- **操作**：第十一次 ingest，Akshay 的 Agent Harness 系统化综述（X 长文）
- **创建页面**：
  - 源摘要：[[akshay-agent-harness]]
  - 实体：[[akshay]]、[[beren-millidge]]
  - 洞察：[[harness-evolution-scaffolding]]
- **更新页面**：[[harness]]、[[ai-agent]]、[[context-engineering]]、[[agent-tool-design]]、[[index]]、[[overview]]
- **触及页面数**：4 个新页面 + 4 个更新 + 3 个基础设施 = 11
- **跨源连接**：
  - 12 组件系统化 → 将 Chase 四原语 + AgentWay 十条原则整合为统一组件框架 → 深化 [[harness]]
  - Von Neumann 类比（Millidge）→ 为"Harness = 操作系统"提供经典计算理论支撑 → 丰富 [[harness]] 简介
  - 五框架横向对比（Claude Agent SDK / OpenAI / LangGraph / CrewAI / AutoGen）→ 丰富 [[ai-agent]] 框架实现层
  - Chroma/Stanford context rot 量化数据 + Observation Masking + ACON 研究 → 强化 [[context-engineering]] 证据链
  - Vercel 80% 工具移除案例 → 补充 [[agent-tool-design]] 工具范围策略
  - 脚手架隐喻与共同演化原则 → 新洞察 [[harness-evolution-scaffolding]]，与 Chase"不是护城河"+ AgentWay"模型=不稳定部件"形成演化叙事
  - TerminalBench 实证 + Boris Cherny 验证引言 → 量化支撑 [[harness]] 核心论点

## [2026-04-12] batch-ingest | Harness Engineering 双书 (AgentWay/@wquguru, 2026-04-01)

- **源文档**：[[harness-engineering-books]]
- **操作**：第十次 ingest，2 份 AgentWay 文档（88+54 页）的批量编译
- **创建页面**：
  - 源摘要：[[harness-engineering-books]]
  - 实体：[[agentway]]
- **更新页面**：[[harness]], [[context-engineering]], [[ai-agent]], [[agent-tool-design]]
- **触及页面数**：2 个新页面 + 4 个更新 + 4 个基础设施 = 10
- **跨源连接**：
  - Harness Engineering 十条原则 → 系统化 [[harness]] 的工程实践层（此前 Chase 四原语是理论层）
  - Query Loop = 心跳 → 深化 [[ai-agent]] 的核心认知循环（Think→Act→Observe 的工程实现）
  - 上下文 = 工作内存 → 深化 [[context-engineering]] 的预算治理视角（CLAUDE.md 四层 + MEMORY.md 索引设计 + Compact 受控重启）
  - 工具 = 受管执行接口 → 丰富 [[agent-tool-design]]（权限三元语义 + 中断一等语义 + Bash 风险放大器）
  - Claude Code vs Codex → 与 [[openclaw]] 形成三维对比（Runtime-first / Policy-first / Prompt-piling）
  - Prompt = 控制面（宪法不是台词）→ 深化 [[harness]] 的 System Prompt 原语
  - 第三条路线警告 → 补充 [[context-engineering]] 的反面案例（Prompt 堆叠路线）

## [2026-04-12] ingest | Claude Code 源码深度研究报告 (Xiao Tan, 2026-03)

- **源文档**：[[claude-code-source-report]]
- **操作**：第九次 ingest，Xiao Tan 对 Claude Code 源码的逆向工程分析（26 页 PDF）
- **创建页面**：
  - 源摘要：[[claude-code-source-report]]
- **更新页面**：[[harness]], [[agent-tool-design]], [[context-engineering]], [[mcp]], [[ai-agent]]
- **触及页面数**：1 个新页面 + 5 个更新 + 4 个基础设施 = 10
- **跨源连接**：
  - System Prompt = Runtime Assembly（静态前缀 cacheable + 动态后缀 session-specific）→ 源码级验证 [[harness]] 的 System Prompt 原语
  - Agent Dispatch Chain（14 步 pipeline）→ 源码级验证 [[harness]] 的 Planning Tool 原语
  - Fork vs Normal 路径（cache 继承 vs 角色隔离）→ 丰富 [[context-engineering]] 的上下文管理实现
  - Skill = first-class primitive（markdown prompt bundle）→ 源码级验证 [[agent-tool-design]] 的 Progressive Disclosure
  - MCP = Tool + Behavior 双注入 + Agent-Specific MCP → 重新定义 [[mcp]] 为"集成平面"
  - Agent 按认知职能分工（Explore/Plan/Verification/General）→ 丰富 [[ai-agent]] 的角色分工维度
  - "好行为制度化" = Chase "System Prompt = SOP 数字化"的极致实现 → 深化 [[harness]]

## [2026-04-12] batch-ingest | OpenClaw 橙皮书+蓝皮书+傅盛日记

- **源文档**：[[openclaw-books]]
- **操作**：第八次 ingest，3 份 OpenClaw 文档（98+189+33 页）的批量编译
- **创建页面**：
  - 源摘要：[[openclaw-books]]
  - 实体：[[openclaw]]
- **更新页面**：[[harness]], [[ai-agent]], [[context-engineering]], [[mcp]], [[hermes-agent]]
- **触及页面数**：2 个新页面 + 5 个更新 + 4 个基础设施 = 11
- **跨源连接**：
  - OpenClaw 四层记忆（SOUL/TOOLS/USER/Session）= Chase Memory 三分类的扩展（Procedural 被拆分为不可变身份+可变能力）→ 强化 [[harness]]
  - CLI-first vs MCP → [[mcp]] 的哲学对立面，工具集成存在两条路线
  - Self-Extending Agent 光谱 → 本 Wiki（监督）/ OpenClaw（反应式）/ Hermes（主动）的三点定位
  - Session 树形结构 → [[context-engineering]] 的 Context 隔离新机制（分支+回滚）
  - Pre-Compaction → [[harness]] 的 Compaction 概念的生产实现
  - Fallback 链 → [[hermes-agent]] 的 Auxiliary LLM 路由的简化版对照
  - 多 Agent 三模式（Pipeline/Parallel/Hierarchical）→ 丰富 [[ai-agent]]
  - ClawHavoc 安全事件 → [[mcp]] 安全考量的现实验证

## [2026-04-12] batch-ingest | Hermes Agent 三篇实践指南

- **源文档**：[[hermes-agent-articles]]
- **操作**：第七次 ingest，3 篇 Hermes Agent 实践文章的批量编译
- **创建页面**：
  - 源摘要：[[hermes-agent-articles]]
  - 实体：[[hermes-agent]]
- **更新页面**：[[harness]], [[agent-tool-design]], [[ai-agent]], [[context-engineering]]
- **触及页面数**：2 个新页面 + 4 个更新 + 4 个基础设施 = 10
- **跨源连接**：
  - Hermes Agent = [[harness]] 四原语的产品化实例（SOUL.md=System Prompt, skills分类=Planning Tool, 子任务=Sub-Agent, ~/.hermes/=File System）
  - 自我进化 Skills = Chase 的 Procedural Memory 活体实现 → 强化 [[harness]]
  - agentskills.io 自主 Tool 发现 = [[agent-tool-design]] 的"让 Agent 自己找上下文"延伸到 Tool 维度
  - Auxiliary LLM 路由 = [[context-engineering]] 的新模式（不仅优化上下文内容，还优化获取成本）
  - 7 种 Memory 框架对应 Chase 的 Memory 三分类 → 验证 [[harness]] 的理论框架
  - SOUL.md 从对话历史自动生成 = Episodic → Procedural Memory 转化路径的实例

## [2026-04-12] ingest | Chase Harness 专访 (Harrison Chase, 2026-03-12)

- **源文档**：[[chase-harness-interview]]
- **操作**：第六次 ingest，LangChain 联合创始人 Harrison Chase 在 MAD 播客的专访
- **创建页面**：
  - 源摘要：[[chase-harness-interview]]
  - 实体：[[harrison-chase]]
  - 概念：[[harness]]
  - 洞察：[[wiki-as-harness]]（四源综合 meta-insight！）
- **更新页面**：[[ai-agent]], [[agent-tool-design]], [[context-engineering]], [[ai-tooling-and-protocols]]
- **触及页面数**：4 个新页面 + 3 个更新 + 3 个基础设施 = 10
- **跨源连接**：
  - Chase 的 Harness 四原语与 LLM Wiki 架构精确对映 → 产生 [[wiki-as-harness]] meta-insight
  - Chase 对 Progressive Disclosure 的独立使用是第三次验证（Anthropic + Karpathy + Chase）→ 强化 [[agent-tool-design]]
  - File System 让 Agent 自管理 Context → 验证 [[rag-vs-compiled-wiki]] 的"编译 > 检索"
  - Context Compaction 创新给 Agent 自触发 Tool → 丰富 [[context-engineering]] 的策略三
  - Memory 三分类（Semantic/Episodic/Procedural）→ 丰富 [[ai-agent]] 的理论框架
  - "Harness > Model" 和 "Knowledge+Tool = 护城河" → 新的战略洞察

## [2026-04-12] ingest | Seeing like an agent (Thariq Shihipar, 2026-04-10)

- **源文档**：[[seeing-like-an-agent]]
- **操作**：第五次 ingest，Anthropic Claude Code 团队官方博客
- **创建页面**：
  - 源摘要：[[seeing-like-an-agent]]
  - 概念：[[agent-tool-design]]
- **更新页面**：[[context-engineering]], [[rag-vs-compiled-wiki]], [[ai-agent]], [[anthropic]], [[ai-tooling-and-protocols]]
- **触及页面数**：2 个新页面 + 4 个更新 + 3 个基础设施 = 9
- **跨源连接**：
  - Anthropic 从 RAG → Agent 自主搜索 → 直接验证 [[rag-vs-compiled-wiki]] 的"编译 > 检索"论点
  - Progressive Disclosure 与 [[llm-wiki-pattern]] 的 Schema→index→pages 精确对应
  - 工具设计哲学丰富 [[ai-agent]] 的"最后一英里"视角
  - 子 Agent 搜索模式是 [[context-engineering]] "即时上下文"策略的官方实践

## [2026-04-11] ingest | LLM Wiki (Karpathy, 2026-04-04)

- **源文档**：[[karpathy-llm-wiki]]
- **操作**：首次 ingest，作为 wiki 的奠基源文档
- **创建页面**：
  - 源摘要：[[karpathy-llm-wiki]]
  - 实体：[[karpathy]], [[vannevar-bush]]
  - 概念：[[llm-wiki-pattern]], [[rag-vs-compiled-wiki]], [[memex]]
  - 主题：[[personal-knowledge-management]]
- **触及页面数**：7 个新页面 + index.md + log.md + overview.md
- **备注**：此 wiki 本身按照 Karpathy 描述的 LLM Wiki 模式构建

## [2026-04-11] lint | 首次全量健康检查

- **检查结果**：
  - 矛盾：0 ✅
  - 断链：0 ✅
  - 孤儿页面：0 ✅
  - 缺失交叉引用：4 处 → 已修复
  - 缺失实体页：1 个（Obsidian）→ 已创建
  - 索引完整度：100% ✅
- **修复操作**：
  - 补全 [[karpathy-llm-wiki]] 对 [[karpathy]] 和 [[vannevar-bush]] 的链接
  - 补全 [[llm-wiki-pattern]] 对 [[karpathy]] 和 [[vannevar-bush]] 的反向链接
  - 补全 [[rag-vs-compiled-wiki]] 对 [[karpathy]] 的反向链接
  - 创建 [[obsidian]] 工具实体页（被提及 5+ 次但缺少独立页面）
  - 更新 [[index]] 索引（+1 实体页）
- **触及页面数**：7 个（4 个修复 + 1 个新建 + 2 个基础设施更新）

## [2026-04-12] ingest | Building a Second Brain (Tiago Forte, 2022)

- **源文档**：[[forte-building-second-brain]]
- **操作**：第二次 ingest，首次跨源整合
- **创建页面**：
  - 源摘要：[[forte-building-second-brain]]
  - 实体：[[tiago-forte]], [[richard-feynman]], [[david-allen]]
  - 概念：[[code-method]], [[para-method]], [[progressive-summarization]], [[second-brain]]
  - 洞察：[[code-to-llm-wiki-evolution]]（首次跨源洞察！）
- **更新页面**：[[personal-knowledge-management]]（源数量 1→2，新增实体/概念链接）
- **触及页面数**：8 个新页面 + 4 个更新 + 3 个基础设施 = 15
- **跨源连接**：
  - Forte 引用 Bush/Memex → 链接到已有 [[vannevar-bush]] 和 [[memex]] 页面
  - CODE 与 LLM Wiki Ingest/Query/Lint 的结构性对映 → 产生 [[code-to-llm-wiki-evolution]] 洞察
  - 渐进式总结与"编译"概念的精确对应 → 更新 [[rag-vs-compiled-wiki]]

## [2026-04-12] ingest | How to Take Smart Notes (Sönke Ahrens, 2017)

- **源文档**：[[ahrens-smart-notes]]
- **操作**：第三次 ingest，三源交汇
- **创建页面**：
  - 源摘要：[[ahrens-smart-notes]]
  - 实体：[[niklas-luhmann]], [[sonke-ahrens]]
  - 概念：[[zettelkasten]]
  - 洞察：[[atomic-notes-lineage]]（三源综合洞察！）
- **更新页面**：[[personal-knowledge-management]]（源数量 2→3，新增 Luhmann/Ahrens/Zettelkasten）
- **触及页面数**：5 个新页面 + 1 个更新 + 3 个基础设施 = 9
- **跨源连接**：
  - Luhmann 的 Zettelkasten → Forte 在 BASB 注释中引用为先驱
  - Zettelkasten 的"原子笔记+链接" → 与 LLM Wiki 的页面结构高度一致
  - Ahrens 的"写作即思考" → Karpathy 的"LLM 写 wiki" → LLM 在替人类"思考"
  - 产生三源综合洞察 [[atomic-notes-lineage]]：60 年"原子+链接"作为 PKM 通用协议

## [2026-04-12] batch-ingest | AI 学习资料（43 份文件）

- **源文档**：[[batch-ai-sources]]
- **操作**：批量 ingest，43 份文件按 6 个主题集群分类处理
- **分类**：MCP(8) / AI概念(8) / Claude Code(9) / 自动化(9) / Agent平台(7) / 硬件(2)
- **创建页面**：
  - 源摘要：[[batch-ai-sources]]（批量合并摘要）
  - 实体：[[anthropic]]
  - 概念：[[mcp]], [[context-engineering]], [[ai-agent]], [[vibe-coding]]
  - 主题：[[ai-tooling-and-protocols]]
- **触及页面数**：6 个新页面 + 3 个基础设施更新 = 9
- **备注**：批量 ingest 采用"主题集群编译"策略——多个源文件编译成一个概念页
- **与已有知识的连接**：
  - MCP 的上下文爆炸问题 → 链接到 [[context-engineering]]
  - Context 工程的结构化笔记策略 → 链接到 [[llm-wiki-pattern]]（本 wiki 即是实践）
  - Vibe Coding 的 Process-Log → 与 wiki/log.md 精神一致
  - AI Agent 的 Think-Act-Observe 循环 → 与 LLM Wiki 的 Ingest-Query-Lint 一致
