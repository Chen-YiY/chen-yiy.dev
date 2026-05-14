---
type: source
title: Claude Code 源码深度研究报告
author: Xiao Tan
date: 2026-03-31
source_url: local PDF
tags: [claude-code, source-code, agent-os, prompt-architecture, hooks, mcp, skills, fork, cache]
ingested: 2026-04-12
updated: 2026-04-25
---

# Claude Code 源码深度研究报告

## 源文档概览

| # | 标题 | 作者 | 页数 |
|---|------|------|------|
| 1 | Claude Code 源码深度研究报告（增强完整版） | Xiao Tan (@tvytlx) | 26 |

基于 `@anthropic-ai/claude-code` npm 包的 `cli.js.map` 还原 4756 个源码文件后的系统性研究。

## 核心发现

### 1. Claude Code 不是 prompt，是 Agent Operating System

**总判断**：Claude Code 的强不是来自"神秘 system prompt"，而是来自完整的软件工程系统：
- Prompt 不是静态文本，而是模块化 **runtime assembly**
- Tool 不是裸调，而是走 **permission / hook / analytics / MCP-aware** 执行 pipeline
- Agent 不是一个万能 worker，而是多种 **built-in / fork / subagent** 的分工系统
- Skill 不是说明文档，而是 **prompt-native workflow package**
- MCP 不是单纯工具桥，而是**同时注入工具与行为说明的集成平面**

### 2. System Prompt = Runtime Assembly（不是文本）

`getSystemPrompt()` 的结构：

**静态前缀（cacheable）**：
- 身份定位（getSimpleIntroSection）
- 系统规范（getSimpleSystemSection）
- 做任务哲学（getSimpleDoingTasksSection）
- 风险动作规范（getActionsSection）
- 工具使用规范（getUsingYourToolsSection）
- 语气风格（getSimpleToneAndStyleSection）
- 输出效率（getOutputEfficiencySection）

**动态后缀（session-specific）**：
- session guidance / memory / env info / language / output style
- MCP instructions / scratchpad / function result clearing
- summarize tool results / token budget / brief

**关键设计**：`SYSTEM_PROMPT_DYNAMIC_BOUNDARY` 明确划分 cache 边界——边界前尽量可 cache，边界后是会话特定内容。

### 3. Agent Dispatch Chain（14 步 pipeline）

从 `AgentTool.tsx` → `runAgent.ts` → `query()`：

```
主模型决定调用 Agent → AgentTool.call() 解析输入 → 解析路径类型
(fork/normal/background/remote/teammate) → 选择 agent definition →
构造 prompt messages → 继承/生成 system prompt → 组装工具池 →
创建 ToolUseContext → 注册 hooks/skills/MCP → runAgent() →
query() 产出消息流 → 记录 transcript → 处理 lifecycle → 清理资源
```

### 4. Fork vs Normal — 两种执行路径

| 维度 | Fork Path | Normal Path |
|------|-----------|-------------|
| System Prompt | 继承父线程 | 基于角色定义新生成 |
| Context | 完整继承 | 按需给 |
| Tools | 尽量一致（`useExactTools=true`） | 角色限制 |
| 设计目标 | **Cache 复用 + Context 保留** | **Context 隔离 + 角色专化** |

Fork 保持 byte-identical prefix 以最大化 prompt cache 命中——token 成本作为工程约束纳入设计。

### 5. Built-in Agent Specialization（认知职能分离）

| Agent | 职责 | 关键约束 |
|-------|------|---------|
| Explore | 代码探索 | **绝对只读**，不能创建/修改/删除 |
| Plan | 规划方案 | **只读**，输出 step-by-step plan |
| Verification | 验证结果 | "try to break it"，adversarial validator |
| General Purpose | 通用执行 | — |

Verification Agent 最强：不是"再跑测试"而是对抗性验证。Prompt 明确指出两类失败模式（verification avoidance + 被前 80% 迷惑），强制要求每个 check 带 command + output，最后输出 VERDICT: PASS/FAIL/PARTIAL。

### 6. Skill = First-Class Primitive

- 不是文档，而是 **markdown prompt bundle**
- 带 frontmatter metadata + allowed-tools
- 可按需注入当前上下文
- 匹配 skill 时**必须**调用 Skill tool（不能只提不执行）
- 可把重复工作流压缩成可复用能力包

### 7. Hook = Runtime Policy Layer

工具执行链（14 步 pipeline）：
```
找tool → schema校验 → validateInput → speculative check → PreToolUse hooks →
hook permission → permission决策 → 修正输入 → 执行tool → analytics →
PostToolUse hooks → 失败则PostToolUseFailure hooks
```

Hook 能力：重写输入、阻止执行、权限决策（allow/ask/deny）、注入上下文、更新 MCP tool output。但 hook allow 不自动突破 settings deny 规则——安全模型统一。

### 8. MCP = Tool + Behavior 双注入

- 不仅注入工具，还通过 `getMcpInstructionsSection()` 注入"如何使用工具的说明"
- **Agent-specific MCP servers**：每个 agent 可在 frontmatter 定义自己的 MCP server
- MCP 是**集成平面**而非简单工具注册中心

### 9. "好行为制度化" — 真正的护城河

`getSimpleDoingTasksSection()` 的行为约束：
- 不加没要求的功能
- 不过度抽象
- 先读代码再改代码
- 失败时先诊断再换策略
- 删除确认没用的东西
- 结果如实汇报，不能假装测试过

这不是"提示词技巧"，而是**AI 工程师行为规范的制度化表达**。

### 10. 上下文作为稀缺资源的管理

源码中大量设计围绕上下文优化：
- 静态/动态 prompt 边界（cache economics）
- Fork 共享 cache（byte-identical prefix）
- Skill 按需注入
- MCP instructions 按连接状态注入
- Function result clearing
- Summarize tool results
- Compact / transcript / resume

Token 不是免费空气，是 **runtime 预算**。

## 前提与边界

- **前提假设**：Xiao Tan 对 `cli.js.map` 的逆向工程和源码还原能准确反映 Claude Code 的实际架构和设计意图
- **数据可靠性**：源码级分析深度高，但属于非官方逆向工程，可能存在解读偏差或遗漏；分析的模型版本可能已更新，具体实现细节（如常量值、函数名）随版本变化
- **不适用场景**：源码中的具体实现细节（如 `MAX_ENTRYPOINT_LINES=200`、14 步 pipeline）是特定版本的快照，不应作为稳定的 API 或设计约束引用

## 与已有知识的关联

1. **Prompt Runtime Assembly → 升维 [[harness]] 的 System Prompt**：从"SOP 文本"升级为"可编排运行时资源"
2. **Cache Boundary → 新增 [[context-engineering]] 的工程实践**：token 成本作为 cache 边界的设计约束
3. **14 步 Agent Dispatch → [[harness]] Sub-Agent 的实现深度**：概念到产品的完整 pipeline
4. **Fork Path → [[context-engineering]] Context 隔离新维度**：与 OpenClaw 的 Session 树不同策略
5. **认知职能四角色 → 丰富 [[ai-agent]] 的 Agent Specialization**：研究/规划/执行/验证分离
6. **Skill as Primitive → [[agent-tool-design]] Progressive Disclosure 的运行时实现**
7. **Hook Policy Layer → 新发现的治理维度**
8. **MCP 双注入 → 升维 [[mcp]]**：从"工具桥"到"集成平面"
9. **Agent-Specific MCP → [[harness]] 的扩展**：Agent 可带自己的外接能力
10. **"好行为制度化" → [[harness]] System Prompt = SOP 的极致实现**
