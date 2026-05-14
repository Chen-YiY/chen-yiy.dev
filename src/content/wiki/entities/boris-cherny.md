---
type: entity
category: person
aliases: [Boris Cherny, Cherny]
tags: [anthropic, claude-code, harness]
sources: "[[harness-engineering-books]], [[claudemd-writing-8-best-practices]], [[baijj-harness-engineering-practice]]"
created: 2026-05-11
updated: 2026-05-11
---

# Boris Cherny

## 简介

Claude Code 创建者，[[anthropic|Anthropic]] 工程师。提出"验证循环"对 Agent 质量的关键作用，并明确建议 CLAUDE.md 不超过 200 行。

## 核心贡献

- **Claude Code 创建者** — 设计并构建了 Claude Code 的 Harness 架构
- **验证循环 ROI 量化** — "给模型一个验证自己工作的办法，质量会提升 2 到 3 倍"
- **CLAUDE.md 200 行上限** — 明确建议 CLAUDE.md 不要超过 200 行，基于上下文窗口预算考量
- **claude-code-best-practice 项目** — 公开的 Claude Code 最佳实践指南

## 相关概念

- [[harness]] — Claude Code 是 Harness 四原语的生产级实现
- [[context-engineering]] — 200 行上限是 Context 预算治理的具体实践
- [[vibe-coding]] — Claude Code 是 Vibe Coding 的核心工具之一

## 出处

- [[harness-engineering-books|AgentWay Harness Engineering 双书]]（源码逆向分析引用）
- [[claudemd-writing-8-best-practices|CLAUDE.md 编写 8 条经验]]（200 行上限建议的直接引用）
