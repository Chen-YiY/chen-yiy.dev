---
type: concept
aliases: [CODE, CODE 方法, 知识处理工作流]
related: "[[para-method]], [[progressive-summarization]], [[llm-wiki-pattern]], [[personal-knowledge-management]]"
tags: [pkm, workflow, knowledge-management, capture, organize, distill, express]
sources: "[[forte-building-second-brain]]"
created: 2026-04-12
updated: 2026-04-25
---

# CODE 方法

## 定义

Tiago Forte 在 [[forte-building-second-brain|Building a Second Brain]] 中提出的知识处理四步工作流：**Capture（捕获）→ Organize（组织）→ Distill（提炼）→ Express（表达）**。描述了信息从外部世界进入个人知识库、被加工提炼、最终输出的完整生命周期。

## 前提与边界

**前提假设**：
- 知识的价值在于**重用而非收集**。保存信息的目的是让未来的自己能找到并使用它，而非囤积本身
- 一个人面对信息过载时，只需保留"引起共鸣"的内容即可——共鸣是个人兴趣和需求的天然过滤器
- 知识处理可以拆解为四个独立的、可顺序执行的步骤，且每一步都有明确的输入和输出

**适用边界**：
- CODE 的 Distill 步骤依赖 [[progressive-summarization|渐进式总结]]，而渐进式总结要求**持续的精力和纪律**——大多数人在 Layer 1-2 后就会停止提炼
- Express 步骤假设知识最终都需要"输出"，但许多知识的价值在于潜移默化的理解，不一定有明确的外化形式
- CODE 假设信息有明确的生命周期（捕获→组织→提炼→表达），但在快速变化的场景中，信息可能在未完成完整周期前就已过时
- LLM 自动化后，Capture/Distill 的手动负担大幅降低，但 Organize 的分类判断和 Express 的质量把控仍需人类主导

## 深入解释

### C — Capture（捕获）：保留引起共鸣的内容

- 不追求全面收集，而是遵循内心的共鸣——什么让你感到好奇、惊喜、兴奋
- 捕获标准：它是否启发你？是否有用？是否对你个人有意义？
- 灵感来源：[[richard-feynman|Richard Feynman]] 的 "Twelve Favorite Problems"——用 12 个开放式问题作为信息过滤器
- 捕获的内容形式多样：书摘、照片、语音、会议笔记、灵感闪念

### O — Organize（组织）：为可操作性而组织

- 核心原则：**按行动性组织，而非按主题分类**
- 使用 [[para-method|PARA 方法]]（Projects → Areas → Resources → Archives）分层
- 关键洞察：信息的价值取决于它能否帮助你推进某个具体目标

### D — Distill（提炼）：找到精华

- 使用 [[progressive-summarization|渐进式总结]] 逐层提炼
- 目标是让未来的自己能在数秒内判断一条笔记是否有用
- 提炼不是一次性的——每次重新接触笔记时都可以进一步提炼

### E — Express（表达）：展示你的工作

- 知识只有被使用和分享才有价值
- 表达形式多样：写文章、做演示、教别人、创建项目
- "创造就是把你收集的碎片组合成新的模式"

## 与 LLM Wiki 模式的对映

CODE 方法与 [[llm-wiki-pattern|Karpathy 的 LLM Wiki]] 有结构性对应：

| CODE | LLM Wiki | 共同精神 |
|------|----------|----------|
| Capture | Ingest | 从外部世界收集信息 |
| Organize | wiki/ 目录结构 | 为可检索性而组织 |
| Distill | 源摘要 + 概念页 | 提炼精华，编译知识 |
| Express | Query 回写 + 洞察页 | 知识输出产生复利 |

## 与其他概念的关系

- [[para-method]] — CODE 的 Organize 步骤的具体实现方法
- [[progressive-summarization]] — CODE 的 Distill 步骤的具体技术
- [[llm-wiki-pattern]] — 不同时代的知识管理模式，结构相似但工具不同
- [[personal-knowledge-management]] — CODE 是 PKM 领域最系统化的工作流之一

## 出自

- [[forte-building-second-brain]] — Part Two: The Method
