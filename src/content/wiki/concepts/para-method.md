---
type: concept
aliases: [PARA, PARA 方法, PARA 框架, 项目-领域-资源-归档]
related: "[[code-method]], [[progressive-summarization]], [[personal-knowledge-management]]"
tags: [pkm, organization, information-architecture, knowledge-management]
sources: "[[forte-building-second-brain]]"
created: 2026-04-12
updated: 2026-04-25
---

# PARA 方法

## 定义

Tiago Forte 在 [[forte-building-second-brain|Building a Second Brain]] 中提出的信息组织架构：**Projects → Areas → Resources → Archives**。核心原则是**按行动性而非主题分类**——越可行动的越靠前，越抽象的越靠后。

## 前提与边界

**前提假设**：
- 信息可以按**行动性**（actionability）分类——越可行动的越靠前（Projects），越抽象的越靠后（Archives）
- 四个顶级分类足以覆盖个人信息的全部类型，无需更复杂的分类体系
- 分类标准是动态的：今天的 Project 完成后变成 Archive，新的兴趣随时可以从 Archive 中复活

**适用边界**：
- **分类标准模糊导致实际操作困难**。同一条信息可能同时属于 Projects 和 Areas（例如"写一篇关于健康的博客"既是一个项目，也属于"健康"领域），分类时的判断成本不可忽略
- PARA 假设使用者能清晰区分 Projects 和 Areas 的边界——但现实中"长期目标"与"持续维护领域"的界限往往模糊
- 不适合纯学术研究场景——学术知识更倾向于按主题（topic）组织，而非按行动性组织
- PARA 的"定期重组"需要维护纪律，当笔记量超过数千条时，重组的摩擦力会显著上升
- 在 LLM Wiki 中，PARA 的分类哲学被按知识类型（entities/concepts/topics/sources/insights）的分类替代，因为 LLM 不需要"行动性"这个维度

## 深入解释

### P — Projects（项目）

- **定义**：有明确目标、有截止日期的短期努力
- **例子**：完成一篇博客文章、组织一次活动、发布一个产品
- **特征**：有明确的完成标准，有清晰的"做完"状态
- **为什么排第一**：项目是你当前正在做的具体事情，信息组织的最高优先级

### A — Areas（领域）

- **定义**：需要持续维护的长期责任领域
- **例子**：健康、财务、职业发展、人际关系、写作
- **特征**：没有"完成"状态，只有持续的维护标准
- **与项目的关系**：每个项目通常属于某个领域

### R — Resources（资源）

- **定义**：感兴趣的主题和持续有用的参考资料
- **例子**：设计模板、写作技巧、行业分析、学习笔记
- **特征**：当前没有具体用途，但未来可能有用

### A — Archives（归档）

- **定义**：其他三类中不再活跃的内容
- **特征**：保留但不干扰当前工作；可随时恢复
- **价值**：归档不是删除——它是"冷存储"，未来可能重新激活

### 核心原则

1. **行动性递减**：Projects > Areas > Resources > Archives
2. **四文件夹就够了**：不需要复杂的分类体系，四个顶级分类覆盖所有信息
3. **可跨项目复用**：同一条笔记可以被多个项目和领域引用
4. **定期重组**：随着项目完成和新项目开始，PARA 结构动态调整

## 与 LLM Wiki 目录结构的对比

| PARA | LLM Wiki | 对应关系 |
|------|----------|----------|
| Projects | wiki/topics/ (active) | 当前探索的活跃主题 |
| Areas | wiki/concepts/ (stable) | 持续维护的知识领域 |
| Resources | wiki/sources/, wiki/entities/ | 参考资料和实体信息 |
| Archives | N/A（git 历史即归档） | 由版本控制自然实现 |

## 与其他概念的关系

- [[code-method]] — PARA 是 CODE 中 "Organize" 步骤的具体方法
- [[progressive-summarization]] — PARA 组织后的笔记用渐进式总结提炼
- [[personal-knowledge-management]] — PARA 是 PKM 领域最流行的组织架构之一
- [[llm-wiki-pattern]] — 两种不同的组织哲学：PARA 按行动性，LLM Wiki 按知识类型

## 待探索

- PARA 在 Obsidian vault 中的最佳实践实现
- PARA 与 Zettelkasten 的结合可能性
- 当知识库规模超过 1000 条笔记时 PARA 的可维护性

## 出自

- [[forte-building-second-brain]] — Chapter 5: Organize
