---
type: source
title: 从第一性原理思考 Agentic Engineering
author: 魏依承 (davidYichengWei)
date: 2026-04-23
source_url: https://www.bestblogs.dev/article/f5d1601a
source_path: raw/articles/从第一性原理思考-Agentic-Engineering-2026-04-25.md
tags: [agentic-engineering, first-principles, context-engineering, skill, verification, knowledge-as-code, johari-window, sdlc]
ingested: 2026-04-25
updated: 2026-04-25
---

# 从第一性原理思考 Agentic Engineering（魏依承, 2026-04-23）

## 摘要

18,901 字方法论文章。作者魏依承从三条不可再分公理出发（软件工程信息损耗、LLM 本质特征、人类认知稀缺），演绎推导出 Agentic Engineering 的六条核心最佳实践，并落地为一个基于 Skill 的六模块开源框架。**首个用第一性原理为 AI 辅助开发实践构建演绎基础的文章**。核心贡献：三公理体系、意图转化链模型、乔哈里窗人机分工模型、AI 全链条角色递进（引导者→协作者→执行者）、多层次验证对齐、Error-Driven Context Refinement 反馈闭环。

## 关键要点

- **三公理体系**：信息损耗（意图转化链每步都可能失真）+ LLM 本质（上下文决定性/概率性/工作记忆有限且易失）+ 人类认知稀缺（注意力/判断力/决策力是系统瓶颈）。三条独立不可互推，共同构成演绎基础
- **意图转化链**：`人类意图 → 自然语言需求 → 结构化设计 → 形式化代码 → 可执行程序`。每步变换都可能引入损耗，源头损耗传播最远、修复代价最高
- **六条最佳实践（从公理演绎推导）**：① Context Engineering（Spec-First + Docs as Code + 渐进式披露）② 基于乔哈里窗的人机分工 ③ AI 全链条参与（角色递进）④ 小任务推进 + 多层次验证 ⑤ Knowledge as Code ⑥ Error-Driven Context Refinement
- **乔哈里窗人机分工**：四个象限映射不同协作策略——开放区（极致自动化）、盲区（上下文注入）、潜能区（知识杠杆）、未知区（协同探索）。分工核心原则：识别任务落在哪个象限，采用对应策略
- **AI 全链条角色递进**：需求阶段（引导者——结构化提问帮助显式化意图）→ 设计阶段（协作者——分析权衡提出替代方案）→ 编码测试阶段（执行者——更大自主性）。需求阶段 AI 不直接给方案，因为人类是最终审批者必须深度理解问题
- **小任务 + 多层次验证**：同时控制三个风险（错误累积/上下文退化/验证成本）。验证层次与意图转化链对齐：意图层（需求评审）→ 实现层（Code Review）→ 行为层（自动化测试）→ 系统层（集成/性能测试）
- **Knowledge as Code**：团队共有知识像代码一样管理——编码为 Skill/Rules，存入仓库，版本化、可 Review、可迭代。AI 成为知识分发载体，拉平团队能力差异
- **Error-Driven Context Refinement**：两种触发途径——自动触发（AI 识别被纠正后自动评估根因）+ 手动触发（用户集中性沉淀经验）。闭环本质：犯错 → 诊断根因 → 检索现有知识 → 创建/更新 Rule/Skill → 预防复发
- **基于 Skill 的六模块框架**：Workflow（SDLC 全链条）/ Best Practices（通用工程知识）/ Standards（项目私有知识）/ Docs（结构化文档）/ Troubleshooting（问题排查）/ Self-Refinement（反馈闭环）。三层渐进加载：L1 元数据（~100 token）→ L2 指令（<5K）→ L3 参考资源（按需）
- **三层价值模型**：L1 加速（同样的事做得更快）/ L2 增强（同样的事做得更好）/ L3 解锁（做以前做不到的事）。本文聚焦 L2/L3——L1 已被现有工具很好覆盖，无需体系化方法
- **Vibe Coding 的系统性批判**：Vibe coding 用速度换取了理解和控制，只追求速度一个维度。Engineering 要求同时考虑整个约束空间（质量/安全/可维护性）。L1 层面 vibe coding 够用，L2/L3 必须用 Engineering 方法

## 重要引用

> "Agentic Engineering 代表了一种截然不同的范式。它是一种工程师与 AI Agent 深度协作的模式——AI 不仅是代码的执行者，也是问题分析、方案设计等环节的思考伙伴；但最终的判断和决策权始终在工程师手中。"

> "LLM 是一个基于上下文进行概率性推理的系统，具有三个并列的本质特征：（1）输出由上下文决定，（2）输出是概率性的，（3）工作记忆是有限且易失的。"

> "Context Engineering 正是解决这一矛盾的系统性方法……其指导原则是：寻找能够最大化产生期望结果可能性的最小、高信号 Token 集。"

> "必须将大任务拆解为可独立验证的子任务，每步由 AI 执行、人类校验，通过后再进入下一步。这同时控制了三个风险：错误累积、上下文退化、验证成本。"

> "把每一次错误都变成进化的机会。与其反复提醒 AI 同样的事，不如把缺失的规范和知识沉淀下来。错误不是负担，而是系统生长的养料。"

> "软件工程师未来大致会往两个方向发展：一是成为最会编排 AI 的人；二是往软件工程的上游发展，成为最会识别'什么是最有价值的问题'的人。"

## 前提与边界

- **前提假设**：三公理被声明为"不可争辩的基本事实"，但"人类认知稀缺"公理来自认知心理学的简化结论——认知不仅是量的稀缺，还有质的差异（领域专长类型、工作记忆模式等）。将公理简化为三条可能遗漏其他独立维度
- **数据可靠性**：18,901 字详细方法论推导，逻辑链条完整。但仅引用 5 篇参考文献（其中 Anthropic 内部研究为自研自引），实证数据偏薄。GitHub Copilot 55% 提速来自 2022 年研究，可能不反映最新数据。框架声称"有真实项目使用经验"但未给出具体案例数据
- **不适用场景**：六条实践和 Skill 框架侧重 SDLC（软件开发生命周期），不直接适用于数据工程、ML Ops、硬件工程等领域。"小任务推进"假设任务可被干净分解——创造性/架构性任务常抗分解。框架设计假设团队有成熟工程实践，初创团队可能没有"最佳实践"可编码。乔哈里窗的二元分（AI 知道/不知道）遗漏"AI 以为知道但实际错了"的过度自信区

## 与现有知识的关联

- **三公理 → 演绎验证已有实践** ↔ [[harness]] Chase 四原语 + AgentWay 十条原则 + Akshay 12 组件 — 魏依承的公理体系为 wiki 中已有的归纳性结论提供了演绎基础
- **Context Engineering 三子实践** ↔ [[context-engineering]] 已有策略 — Spec-First 和 Docs as Code 是对现有"即时上下文"策略的补充（强调产出机制和存放规范）
- **渐进式披露（三层）** ↔ [[agentic-skill-design]] Fat Skills/Thin Harness + [[agent-tool-design]] Progressive Disclosure — 魏依承给出了具体的 L1/L2/L3 三层 token 预算实现
- **乔哈里窗人机分工** ↔ [[ai-agent]] Claude Code 认知职能分工 + 白家杰七角色 — 第三种分工维度：按知识不对称（vs 认知职能 vs 流程阶段）
- **AI 全链条角色递进** ↔ [[harness]] "验证循环" + [[vibe-coding]] "开发者=PM" — 魏依承从公理推导出角色应随 SDLC 阶段变化，为 Erik"开发者=PM"提供了理论解释
- **Knowledge as Code** ↔ [[agentic-skill-design]] Skill 生命周期 + [[harness]] Procedural Memory — 同一理念的不同表述，魏依承强调"知识公有化"和"拉平团队能力差异"
- **Error-Driven Refinement** ↔ [[hermes-agent]] 自我进化 Skills + [[agentic-skill-design]] 学习循环 — 魏依承给出了更具体的双触发机制（自动+手动）
- **多层次验证** ↔ [[harness]] Boris Cherny "2-3x" + [[erik-schluntz-vibe-coding]] 叶子节点策略 + [[baijj-harness-engineering-practice]] 总验证脚本 — 魏依承将验证层次与意图转化链对齐，提供了理论框架
- **对 Vibe Coding 的批判** ↔ [[vibe-coding]] 四阶段 SOP + Erik 大师课 — 魏依承明确了 vibe coding 的适用边界（L1 任务）和不适用场景（L2/L3 任务）
