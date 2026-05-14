---
type: source
title: Hermes Agent 三篇实践指南
author: DracoVibeCoding / 大象AI共学 / waytoagi (岚叔)
date: 2026-04
source_url: https://mp.weixin.qq.com/s/jn_0Sx8TqKRkg5XJCAOPag, https://mp.weixin.qq.com/s/kdSIM6EXPpdGu-sQqkQgBA, https://waytoagi.feishu.cn/wiki/VKuaw7GETi9J5Mkx3mncDrQCnke
tags: [hermes, agent, self-evolving, skills, memory, tool-design]
ingested: 2026-04-12
updated: 2026-04-25
---

# Hermes Agent 三篇实践指南

## 源文档概览

| # | 标题 | 作者 | 来源 |
|---|------|------|------|
| 1 | Hermes Agent 的七个冷知识 | DracoVibeCoding | 微信公众号 |
| 2 | 那个会自己"进化"的 Hermes Agent 来了 | 大象AI共学 | 微信公众号 |
| 3 | 上手 Hermes Agent 后建议先尝试的十件事情 | waytoagi (岚叔) | 飞书文档 |

## 核心发现

### 1. 自我进化 Skills（Procedural Memory 的活体实现）

Hermes Agent 最核心的特性：**从经验中创建技能，使用中不断改进**。这恰好是 Chase 提出的 Procedural Memory（[[harness]]）的具体产品化实现——Agent 不仅使用工具，而是可以修改自己的行为规范（skills）。

工作循环：
```
任务 → 评估能力 → 不足则搜索 agentskills.io → 安装 → 执行 → 记录经验 → 优化技能
```

### 2. agentskills.io — 自主 Tool 发现市场

开放的技能市场标准。Agent 发现能力不足时，**自主搜索、安装、学习技能**。这是 [[agent-tool-design]] 中"让 Agent 自己找上下文"理念在 Tool 维度的延伸——不仅自己找上下文，还自己找工具。

### 3. SOUL.md — System Prompt 的产品化

`~/.hermes/SOUL.md` = Agent 人格/行为定义文件 = Harness 的 System Prompt 原语（[[harness]]）。

**独特实践**：先和 Agent 聊两天展现风格，再让 Agent **从对话历史中总结生成 SOUL.md**。这验证了 Chase 的 Episodic Memory → Procedural Memory 转化路径。

### 4. Auxiliary LLM 路由 — Context 工程的新模式

**设计**：主模型专注思考，便宜/专用副模型处理搜索、压缩、视觉等"脏活"。

这是 [[context-engineering]] 中"即时上下文"策略的成本优化实现——不仅管理上下文内容，还管理上下文的**获取成本**。

### 5. 7 种外部记忆框架（Memory Harness）

| 系统 | 适合场景 | 一句话 |
|------|---------|--------|
| Holographic | 本地优先、结构化事实 | 可控清晰 |
| ByteRover | 项目知识沉淀 | 长期积累 |
| Honcho | 长期理解用户 | 越用越懂你 |
| Mem0 | 自动提炼 | 上手顺 |
| RetainDB | 云端记忆后端 | 功能完整 |
| Hindsight | 复杂项目关系 | 知识图谱型 |
| OpenViking | 大体量背景知识 | 分层上下文 |

对应 Chase 的 Memory 三分类：Holographic/ByteRover ≈ Semantic，Mem0/Honcho ≈ Episodic，Skills 系统 ≈ Procedural。

### 6. 自验证原则

Hermes Agent 内置的工作方法论：
- **先验证后回答**：不确定时先查工具，不靠猜测
- **先计划后执行**：3 步以上任务先列方案标风险
- **交付即验证**：做完主动给出验证方法
- **失败即沉淀**：失败时分析原因并沉淀为 Skill

## 前提与边界

- **前提假设**：Hermes 的自我进化能力依赖于 agentskills.io 技能市场的生态丰富度和 Skill 质量控制；Auxiliary LLM 路由假设主模型与副模型间的分工能可靠协调
- **数据可靠性**：来源于产品文档、微信公众号和飞书社区实践，属于早期用户报告，缺乏长期大规模使用验证
- **不适用场景**：Windows 部署门槛高（需 WSL2 + VPN），对 Windows 原生用户不友好；技能市场的质量参差不齐可能影响自我进化的可靠性

## 与已有知识的关联

1. **Hermes = Harness 的产品化实例**：SOUL.md(System Prompt) + index(Planning Tool) + 子任务(Sub-Agent) + 文件系统(File System) → 精确对映 [[harness]] 四原语
2. **自我进化 Skills = Procedural Memory 实现**：Agent 修改自己的 Skill 文件 = Chase 的"Agent 可在运行中更新 Procedural Memory" → 详见 [[harness]]
3. **agentskills.io = 自主 Tool 发现**：延伸 [[agent-tool-design]] 的"让 Agent 自己找上下文"到 Tool 维度
4. **Auxiliary LLM 路由**：新发现的 [[context-engineering]] 模式——不仅优化上下文内容，还优化获取成本
5. **7 种 Memory 框架**：对应 Chase 的 Memory 三分类的产品化实现 → 详见 [[harness]]
