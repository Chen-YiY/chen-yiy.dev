---
type: concept
aliases: [Progressive Summarization, 渐进式总结, PS, 逐层提炼]
related: "[[code-method]], [[para-method]], [[rag-vs-compiled-wiki]], [[llm-wiki-pattern]]"
tags: [pkm, distillation, note-taking, knowledge-management]
sources: "[[forte-building-second-brain]]"
created: 2026-04-12
updated: 2026-04-25
---

# 渐进式总结 (Progressive Summarization)

## 定义

Tiago Forte 在 [[forte-building-second-brain|Building a Second Brain]] 中提出的知识提炼技术：通过**五层递进的标注和总结**，逐层提炼笔记中的精华，使未来的自己能在数秒内判断一条笔记是否有价值并快速定位关键信息。

## 前提与边界

**前提假设**：
- 每一层总结都能**保留关键信息**，不会在提炼过程中丢失对后续使用至关重要的细节
- 笔记会被**反复接触**——渐进式总结的价值来自多次重读时的逐层加深，而非一次性完成
- 未来的自己需要快速判断"这条笔记是否与当前任务相关"，而非获取完整信息

**适用边界**：
- **五层设计在实践中很少有人能坚持到 Layer 4+**。Layer 1（粗体）和 Layer 2（高亮）成本低、收益明显，但 Layer 3（执行摘要）需要真正的理解和重写，Layer 4（跨源整合）更是接近"创作"而非"总结"
- 总结层数与信息损失之间存在张力——层数越高越易读，但也离原始语境越远，可能引入理解偏差
- 渐进式总结是**慢系统**：它假设你有时间反复审视笔记，不适合需要即时产出的高压场景
- LLM 自动化可以执行 Layer 1-3，但 Layer 4 的跨源整合仍需人类判断——哪些连接是有意义的，LLM 可能给出"看似合理实则浅薄"的关联

## 深入解释

### 五层结构

| 层级 | 操作 | 目的 |
|------|------|------|
| Layer 0 | 原始笔记 | 完整保留原始内容，作为事实来源 |
| Layer 1 | **粗体**标注关键段落 | 在快速浏览时定位重要部分 |
| Layer 2 | ==高亮==粗体中的关键词句 | 从已标注部分进一步提炼核心 |
| Layer 3 | 用自己的话写执行摘要 | 将外部知识内化为个人理解 |
| Layer 4 | 重新混合——跨源整合成新作品 | 创造新知识，发现新连接 |

### 核心原则

1. **不必一次做完**：渐进式总结发生在多次接触笔记的过程中——每次阅读都可以多提炼一层
2. **保留原文**：永远保留原始笔记（Layer 0），摘要只是附加层——这呼应了 LLM Wiki 的 "raw/ 不可变"原则
3. **为未来的自己服务**：提炼的目标不是完美摘要，而是让未来的你快速判断"这条笔记是否与当前任务相关"
4. **80/20 法则**：大多数笔记只到 Layer 1-2 即可；只有反复使用的高价值笔记才值得推到 Layer 3-4

## 与 LLM Wiki 和 RAG 的关系

渐进式总结本质上就是 Karpathy 所说的"编译"过程：

- **RAG 模式**：每次查询都回到 Layer 0（原始文档）重新检索 → 无积累
- **编译式 Wiki**：笔记已经经过 Layer 1-3 的提炼 → 查询时直接使用已编译知识
- **LLM Wiki 的源摘要页**：相当于 Layer 3 的执行摘要
- **LLM Wiki 的概念页**：相当于 Layer 4 的重新混合

> [!important] 关键洞察
> 渐进式总结与 LLM Wiki 的 [[rag-vs-compiled-wiki|"编译 vs 检索"对比]] 完美对应：渐进式总结的层数就是"编译深度"。层数越高，后续检索越快、越准确，但前期投入也越大。

## 实际应用

- 在 Obsidian 中：Layer 1 用粗体 `**text**`，Layer 2 用高亮 `==text==`，Layer 3 在笔记顶部写 "## 摘要" 段落
- 在 LLM Wiki 中：LLM Agent 自动完成 Layer 1-3（源摘要页），Layer 4 对应概念页和洞察页

## 与其他概念的关系

- [[code-method]] — 渐进式总结是 CODE 中 "Distill" 步骤的核心技术
- [[llm-wiki-pattern]] — LLM Wiki 的 ingest 流程自动化了渐进式总结的 Layer 1-3
- [[rag-vs-compiled-wiki]] — 渐进式总结是"编译"范式的具体实现
- [[personal-knowledge-management]] — PKM 领域最实用的知识提炼技术

## 出自

- [[forte-building-second-brain]] — Chapter 6: Distill
