---
type: entity
category: organization
aliases: [Anthropic, Anthropic AI, 安思]
tags: [ai-company, claude, mcp, agent-sdk]
sources: "[[batch-ai-sources]], [[seeing-like-an-agent]], [[akshay-agent-harness]], [[erik-schluntz-vibe-coding]]"
created: 2026-04-12
updated: 2026-04-25
---

# Anthropic

## 简介

AI 安全公司，由前 OpenAI 员工（包括 Dario Amodei、Daniela Amodei 等）于 2021 年创立。核心产品包括 Claude 系列 AI 助手、MCP（Model Context Protocol）开放标准、Agent SDK 开发框架。以"AI 安全优先"的理念著称。

## 核心贡献

- **Claude 系列**：Claude 3/3.5/4 系列 AI 助手，本 wiki 的维护者（吾/Claudian）即基于 Claude
- **[[mcp|MCP（Model Context Protocol）]]**：2024 年推出的开放标准，统一 AI 与外部工具的交互方式，被誉为"AI 的 USB-C"
- **Agent SDK**：用于构建多智能体系统的开发框架
- **Constitutional AI**：通过"宪法"原则指导 AI 行为的训练方法
- **[[context-engineering|Context 工程]]**：Anthropic 官方发布了 Agent 系统设计的最佳实践指南
- **Claude Code 工具设计**：提出"Seeing like an agent"哲学——工具要塑形到模型能力，旧工具需随模型进化（详见 [[agent-tool-design]]）
- **Progressive Disclosure**：Anthropic 正式化的设计模式——Agent 按需递归发现上下文而非预加载
- **验证循环**：Claude Code 创建者 Boris Cherny 指出"给模型一个验证自己工作的办法，质量会提升 2-3 倍"——量化了验证循环的 ROI
- **Vibe Coding 生产实践**：研究员 Erik Schluntz 提出"可验证抽象层"和"叶子节点策略"，并披露 22,000 行 AI 代码合并进生产环境的极限案例（详见 [[erik-schluntz-vibe-coding]]）

## 与本 Wiki 的关系

- 本 wiki 的运行依赖 Anthropic 的 Claude（作为 LLM Agent）
- [[mcp]] 是本 wiki 未来可能采用的工具交互协议
- Anthropic 的多智能体框架（Planner-Generator-Evaluator）是 [[ai-agent]] 概念的重要参考

## 相关概念

- [[mcp]] — Anthropic 创建的协议
- [[ai-agent]] — Anthropic 的多智能体设计框架
- [[context-engineering]] — Anthropic 的 Agent 设计指南
- [[agent-tool-design]] — Anthropic 的工具设计哲学
- [[akshay-agent-harness]] — 外部分析者对 Anthropic Harness 实现的系统化对比

## 出自

- 《有效的 Context 工程》
- 《让 AI 真正做好复杂任务》（Anthropic 官方指南）
- [[seeing-like-an-agent|Seeing like an agent]]（Claude Code 工具设计）
- MCP 系列文档
