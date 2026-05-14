---
type: entity
category: organization
aliases: ["AgentWay", "agentway.dev", "@wquguru"]
tags: [harness, engineering, claude-code, codex, research]
related: "[[harness]], [[claude-code-source-report]], [[harness-engineering-books]]"
created: 2026-04-12
updated: 2026-04-12
---

# AgentWay (@wquguru)

## 简介

AgentWay 是一个专注于 AI Agent 系统工程研究的组织/作者群体，核心作者为 @wquguru。以 Claude Code 源码逆向工程和 Harness 工程化为研究主线，提出了"Harness Engineering"这一工程学科概念。

核心理念：**System First, Model Second**——AI Agent 的可靠性不取决于模型有多聪明，而取决于 Harness（约束结构）有多扎实。

## 主要贡献

### Harness Engineering 十条原则

从 Claude Code 源码中提炼的工程原则体系（详见 [[harness]]）：

1. 模型 = 不稳定部件
2. Prompt = 控制面
3. Query Loop = 心跳
4. 工具 = 受管执行接口
5. 上下文 = 工作内存
6. 错误路径 = 主路径
7. 恢复目标 = 继续工作
8. 多代理 = 不确定性分区
9. 验证 = 必须独立
10. 团队制度 > 个人技巧

### Claude Code vs Codex 比较框架

首次系统性比较两大 AI Coding Agent 的 Harness 设计哲学，识别出两条正交路线：
- **Claude Code**：运行时优先（Runtime Discipline）
- **Codex**：控制面优先（Policy and Local Rules）

### 第三条路线警告

识别出"Prompt 堆叠"路线（如 OpenClaw 类系统）——看似"信息更全"，实际更费 token 且工作语义不稳。

## 核心洞察风格

- 文风冷峻，拒绝乐观叙事（"做系统的人，不过是把必然会来的摧残，提前写进控制流"）
- 从源码结构出发，提炼运行时设计原则（不是功能表，不是产品评测）
- 重视"事故记忆"——很多设计是从事故复盘中塑出来的
- 强调"比较的重点在骨头，不在名字"

## 已发布文档

| 文档 | 页数 | 主题 |
|------|------|------|
| Harness Engineering: Claude Code 设计指南 | 88 | 单体解剖：十条原则 |
| Claude Code 和 Codex 的 Harness 设计哲学 | 54 | 比较解剖：两套 Harness 路线 |

在线版：harness-books.agentway.dev

## 与本 Wiki 的关系

- AgentWay 的研究为本 Wiki 的 [[harness]] 概念提供了**工程原则层面**的补充——此前主要来自 Chase 的四原语（理论层）和 Hermes/OpenClaw 的产品实例，AgentWay 补充了源码级实现原则
- "Prompt = 控制面"的观点深化了 [[harness]] 的 System Prompt 原语
- "上下文 = 工作内存"的观点深化了 [[context-engineering]] 的预算治理视角
- Claude Code vs Codex 对比与本 Wiki 已有的 [[openclaw]] 分析形成三维参照
