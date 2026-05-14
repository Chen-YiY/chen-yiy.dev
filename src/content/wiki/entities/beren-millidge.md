---
type: entity
category: person
aliases: [Beren Millidge, Millidge]
tags: [ai, llm, architecture, von-neumann]
sources: "[[akshay-agent-harness]]"
created: 2026-04-14
updated: 2026-04-14
---

# Beren Millidge

## 简介

AI 研究者。2023 年在文章 "Scaffolded LLMs as Natural Language Computers" 中提出 LLM 系统的 Von Neumann 类比，被广泛引用。

## 核心贡献

**Von Neumann 类比**——将 LLM 系统映射到经典计算架构：

| LLM 系统 | 经典计算 | 说明 |
|----------|---------|------|
| LLM 本身 | CPU | 核心处理器，无状态 |
| Context Window | RAM | 速度快但容量有限 |
| 外部数据库 | 磁盘存储 | 容量大但速度慢 |
| 工具集成 | 设备驱动 | 与外部系统交互 |
| Harness | 操作系统 | 管理一切的基础设施 |

> "We have reinvented the Von Neumann architecture." — Millidge

**核心洞察**：这不是巧合，而是任何计算系统的自然抽象。当你在 LLM 周围构建基础设施时，你会重新发明计算机体系结构。

## 相关概念

- [[harness]] — Millidge 的 "操作系统" 类比
- [[context-engineering]] — Context Window 作为 "RAM" 的管理
- [[ai-agent]] — Agent 作为 Harness 的涌现行为

## 出自

- [[akshay-agent-harness|一文深度解析 Agent Harness]]（引用 Millidge 2023 原文）
