---
type: source
title: DeepSeek-V4 预览版：迈入百万上下文普惠时代
author: DeepSeek
date: 2026-04-24
source_url: https://www.bestblogs.dev/article/95d5e07c
source_path: raw/articles/DeepSeek-V4-预览版：迈入百万上下文普惠时代-2026-04-25.md
tags: [deepseek, v4, 1m-context, agent, sparse-attention, open-source]
ingested: 2026-04-25
updated: 2026-04-25
---

# DeepSeek-V4 预览版：迈入百万上下文普惠时代（DeepSeek, 2026-04-24）

## 摘要

DeepSeek 官方发布 V4 系列预览版。V4-Pro（1.6T 参数）和 V4-Flash（284B 参数）均标配 1M 上下文。Pro 版在 Agent 能力、世界知识、推理性能上达到开源最佳，比肩顶级闭源模型。采用全新注意力机制（token 维度压缩 + DSA 稀疏注意力）大幅降低计算和显存需求。API 同步上线，模型权重和技术报告开源。

## 关键要点

- **1M 上下文成为标配**：从现在起，所有 DeepSeek 官方服务的标准配置。通过 token 维度压缩和 DSA 稀疏注意力实现
- **V4-Pro 性能**：Agentic Coding 达开源最佳；世界知识大幅领先其他开源模型；推理超越所有已公开开源模型。内部使用体验优于 Sonnet 4.5，接近 Opus 4.6 非思考模式
- **V4-Flash 经济版**：推理能力接近 Pro，简单 Agent 任务旗鼓相当，提供更快捷经济的 API
- **Agent 产品专项优化**：针对 Claude Code、OpenClaw、OpenCode、CodeBuddy 等主流 Agent 产品做了适配
- **双模式**：非思考模式 + 思考模式（支持 reasoning_effort 参数 high/max）

## 重要引用

> "从现在开始，1M（一百万）上下文将是 DeepSeek 所有官方服务的标配。"

> "不诱于誉，不恐于诽，率道而行，端然正己。"

## 前提与边界

- **前提假设**：1M 上下文的实用价值基于合成 benchmark（MRCR），真实工程场景（大型代码库、长 Agent 会话）的表现尚未有公开验证
- **数据可靠性**：官方公告，性能数据来自自家 benchmark，无独立第三方验证。"优于 Sonnet 4.5"来自 85 人内部调研（样本小，潜在自选偏差）
- **不适用场景**：1M 上下文的经济性依赖于 DeepSeek 自有基础设施，其他部署环境（本地、其他云）的成本收益可能不同

## 与现有知识的关联

- **1M 上下文标配** ↔ [[context-engineering]] "Context Rot" — 当百万 token 上下文成本降至可承受，Context Engineering 的策略重心可能从"压缩筛选"转向"全塞进去再管理"
- **Agent 专项优化** ↔ [[harness]] — 模型厂商针对 Claude Code/OpenClaw 做 adapter 优化，验证了 Harness 是 Agent 时代的"系统 API"
- **DSA 稀疏注意力** ↔ [[context-engineering]] "Lost in the Middle" — 注意力机制的改进可能在架构层面缓解而非根治 context rot
