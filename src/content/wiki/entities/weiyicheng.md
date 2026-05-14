---
type: entity
category: person
aliases: [魏依承, davidYichengWei, Wei Yicheng]
related: "[[harness]], [[context-engineering]], [[agentic-skill-design]], [[vibe-coding]], [[ai-agent]]"
tags: [person, agentic-engineering, first-principles, skill-framework]
sources: "[[weiyicheng-agentic-engineering-first-principles]]"
created: 2026-04-25
updated: 2026-04-25
---

# 魏依承 (Wei Yicheng)

## 简介

软件工程师，Agentic Engineering 方法论的提出者。GitHub: davidYichengWei。主张用第一性原理思维从三条不可再分公理出发，演绎推导 AI 辅助开发的最优实践，而非从业界经验归纳。开源了基于 Skill 的模块化 Agentic Engineering 框架。

## 核心贡献

### 三公理体系

从三条独立公理出发演绎推导 Agentic Engineering 的六条最佳实践：

1. **信息损耗公理**（软件工程）：意图转化链每步都可能失真，源头损耗传播最远
2. **LLM 本质公理**（工具）：上下文决定性 + 概率性 + 工作记忆有限且易失
3. **人类认知稀缺公理**（人）：注意力/判断力/决策力是整个系统的瓶颈

### 意图转化链模型

```
人类意图 → 自然语言需求 → 结构化设计 → 形式化代码 → 可执行程序
```

每步变换都可能引入信息损耗，验证手段必须与链上层次对齐。

### 乔哈里窗人机分工

将经典组织心理学模型应用于 AI 协作——按人类/AI 的知识不对称状态决定协作策略：开放区（极致自动化）、盲区（上下文注入）、潜能区（知识杠杆）、未知区（协同探索）。

### 基于 Skill 的模块化框架

开源框架（[GitHub](https://github.com/davidYichengWei/agentic-engineering-framework)），六个模块覆盖 SDLC 全链条，三层渐进加载（L1 元数据 ~100 token → L2 指令 <5K → L3 参考资源按需），Agent-Agnostic 设计。

## 与本 Wiki 的关联

- 魏依承的三公理为 wiki 中已有的归纳性实践结论（Harness 四原语、Progressive Disclosure、Skill 设计等）提供了演绎基础
- Intent Transformation Chain 为 [[harness]] 的"验证循环"和 [[context-engineering]] 的"Context Rot"提供了统一的理论解释
- 乔哈里窗模型是 [[ai-agent]] 中记录的第三种人机分工维度
- 乔哈里窗模型是 wiki 中记录的第三种人机分工维度（vs Claude Code 的认知职能分工、白家杰的流程阶段分工）

## 出自

- [[weiyicheng-agentic-engineering-first-principles|从第一性原理思考 Agentic Engineering]]（2026-04-23）
