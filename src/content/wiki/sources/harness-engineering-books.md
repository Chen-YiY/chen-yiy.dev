---
type: source
title: "Harness Engineering: Claude Code 设计指南 + Claude Code 和 Codex 的 Harness 设计哲学"
author: "@wquguru (AgentWay)"
date: 2026-04-01
source_url: https://harness-books.agentway.dev/
tags: [harness, claude-code, codex, runtime, control-plane, engineering]
related: "[[harness]], [[agent-tool-design]], [[context-engineering]], [[ai-agent]], [[claude-code-source-report]]"
ingested: 2026-04-12
updated: 2026-04-25
---

# Harness Engineering 双书

## 基本信息

两份姊妹文档，由 AgentWay (@wquguru) 于 2026-04-01 发布：

1. **《Harness Engineering: Claude Code 设计指南》**（88 页）—— 单体解剖：从 Claude Code 源码抽象出可控 AI 编程系统的工程原则
2. **《Claude Code 和 Codex 的 Harness 设计哲学》**（54 页）—— 比较解剖：Claude Code vs Codex 的 Harness 设计路线对比

核心立场：**System First, Model Second**。重点不在模型能力，而在 Harness 如何组织约束与执行。

## 核心发现

### 发现一：Harness Engineering 十条原则（Book 1）

| # | 原则 | 核心判断 |
|---|------|----------|
| 1 | 把模型当不稳定部件，不要当同事 | 模型会犯错，工具会扩大错误后果，系统只能靠结构维持秩序 |
| 2 | Prompt 是控制面的一部分 | 不是人格装饰，是运行时协议（宪法，不是台词） |
| 3 | Query loop 才是代理系统的心跳 | 真正的系统重点在"一轮怎样接下一轮" |
| 4 | 工具是受管执行接口 | 权限先于能力，中断是一等语义 |
| 5 | 上下文是工作内存 | 治理目标是支持系统继续工作，不是信息越多越好 |
| 6 | 错误路径就是主路径 | 恢复要分层、可熔断、防死循环 |
| 7 | 恢复的目标是继续工作 | 续写 > 总结，先恢复呼吸再讨论保真度 |
| 8 | 多代理的意义是把不确定性分区 | 职责分离 + 独立验证 > 人海战术 |
| 9 | 验证必须独立 | 不能让系统自己给自己打分 |
| 10 | 团队制度比个人技巧重要 | 个人顺手不代表团队稳定复用 |

### 发现二：Claude Code 的五层 Harness（Book 1）

从源码中提炼的递进约束层：

| 层级 | Harness | 关键源码位置 |
|------|---------|-------------|
| 1 | 受约束的会话系统 | prompts.ts（分层 prompt） |
| 2 | 代理依赖持续循环 | query.ts（跨迭代状态） |
| 3 | 工具调用服从调度 | toolOrchestration.ts（并发/串行分区） |
| 4 | 高风险工具高密度约束 | BashTool/prompt.ts + bashPermissions.ts |
| 5 | 错误属于主路径 | query.ts 恢复分支 + autoCompact.ts 熔断 |

### 发现三：Query Loop 的架构角色（Book 1）

Query Loop 不只是"循环调用模型"，而是一套完整的生命周期管理：

- **输入治理先于推理**：memory 预取 → skill 发现 → 截取有效消息 → tool result budget → history snip → microcompact → context collapse → autocompact → 才进入模型调用
- **模型输出是事件流**：不是"最终答案"，而是 assistant 文本 + tool_use block + usage 更新 + stop reason + API 错误
- **中断必须收口**：synthetic tool_result 补齐已发出但未完成的 tool_use
- **恢复分层递进**：prompt-too-long → collapse drain → reactive compact → 熔断
- **停止条件多维**：区分正常完成、有 tool_use 需 follow-up、用户中断、恢复路径、API 错误

### 发现四：两种 Harness 设计哲学（Book 2）

Claude Code 和 Codex 都不信任模型，但秩序安放的位置不同：

| 维度 | Claude Code（运行时优先） | Codex（控制面优先） |
|------|------------------------|-------------------|
| 气质 | 现场救火队 | 带档案系统的调度中心 |
| 控制面 | 动态 Prompt 装配线 | 带编号的公文系统（Fragment） |
| 连续性 | 压进 Query Loop | 拆成 Thread/Rollout/State Bridge |
| 工具治理 | 运行时审批链 | Schema + Policy 语言 |
| 本地治理 | 现场记忆收编（CLAUDE.md） | 结构化资产挂载（AGENTS.md） |
| 多代理 | 运行时职责分区 | 显式工具化协作 |
| 类比 | 运行时共和制 | 控制面立宪制 |

### 发现五：上下文是预算制度，不是仓库（Book 1）

- **CLAUDE.md 体系**：managed → user → project → local 四层，离工作目录越近优先级越高
- **MEMORY.md = 索引不是日记**：MAX_ENTRYPOINT_LINES=200, MAX_ENTRYPOINT_BYTES=25000 硬限制
- **Session Memory**：固定模板（Current State/Task/Files/Errors/Worklog），MAX_TOTAL=12000 tokens
- **Compact 不是聊天总结**：是受控重启——恢复计划、文件、技能、工具附件和 hook 状态

### 发现六：工具是受管执行接口（Book 1）

- **并发安全判定**：isConcurrencySafe() → 分区 → 并发批次先缓存 context modifier 再按原始顺序回放
- **权限三元语义**：allow / deny / ask——"会做"≠"可以做"
- **Bash 是风险放大器**：不是普通工具，需要特殊高压治理（复合命令上限、子命令数量限制）
- **工具系统保护的不仅是用户**：更是系统自身的一致性

### 发现七：错误恢复的工程哲学（Book 1）

- **恢复分层**：先排空已知积压（collapse drain）→ 再重压缩（reactive compact）→ 熔断
- **续写 > 总结**：max_output_tokens 先提 cap 直接重跑，失败再要求模型从半句接着写
- **恢复也要受治理**：consecutiveFailures 计数 → circuit breaker → MAX_CONSECUTIVE=3
- **compact 自己也会爆**：truncateHeadForPTLRetry() → last-resort escape hatch
- **中断也是失败态**：需要语义收尾，不能留悬空 tool_use

### 发现八：第三条路线的警告（Book 2）

> 很多系统主要靠堆叠 bootstrap 文本、角色设定、技能目录和工作区说明来维持连续性。这种路线看上去像"信息更全"，实际往往更费 token，也更容易把工作语义冲淡。

三条路线对比：
- **Claude Code**：上下文 = 工作内存，先想什么该保住、什么该压缩
- **Codex**：上下文 = 结构化单元，先想来源类型、作用域和状态承接
- **OpenClaw 类**：上下文 = Prompt 容器，先想还能再塞什么，超了再说

### 发现九：给后来者的建议（Book 2）

1. 先定义高风险动作和最小权限模型
2. 再定义主循环或线程生命周期
3. 再定义上下文治理与恢复路径
4. 再定义技能、本地规则与 Hook
5. 最后再扩多代理、平台化和复杂生态

> 工程里很多设计顺序，应该按事故出现的先后排，而不是按演示时的好看程度排。

## 前提与边界

- **前提假设**：十条原则和五层 Harness 架构基于对 Claude Code 和 Codex 特定版本的分析，假设这两个产品的设计选择具有工程普适性
- **数据可靠性**：@wquguru (AgentWay) 的独立研究，分析严谨但属于第三方解读而非官方文档；两份文档的观点一致性高，增强了可信度
- **不适用场景**：十条原则来自两个产品的对比归纳，泛化到更广泛的 Agent 系统时需验证；"运行时共和制 vs 控制面立宪制"的二分法可能遗漏其他架构路线（如 OpenClaw 的 Prompt-piling）

## 与 Wiki 已有知识的连接

- 十条原则 → 系统化 [[harness]] 的工程实践
- Query Loop 心跳 → 深化 [[ai-agent]] 的核心认知循环
- 上下文预算治理 → 深化 [[context-engineering]] 的策略体系
- 受管执行接口 → 丰富 [[agent-tool-design]] 的工具哲学
- Claude Code vs Codex → 与 [[openclaw]] 形成三维对比（Runtime-first / Policy-first / Prompt-piling）
- Prompt = 控制面 → 深化 [[harness]] 的 System Prompt 原语
- 第三条路线警告 → 补充 [[context-engineering]] 的反面案例

## 出自

- 《Harness Engineering: Claude Code 设计指南》（88 页，2026-04-01）
- 《Claude Code 和 Codex 的 Harness 设计哲学》（54 页，2026-04-01）
