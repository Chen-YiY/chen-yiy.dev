---
type: insight
strength: strong
sources: "[[akshay-agent-harness]], [[chase-harness-interview]], [[harness-engineering-books]]"
related: "[[harness]], [[ai-agent]], [[context-engineering]]"
tags: [harness, evolution, scaffolding, co-evolution, architecture]
created: 2026-04-14
---

# Harness 应随模型进化而变薄——脚手架隐喻与共同演化原则

## 洞察陈述

Harness 不是越厚越好。随着模型能力增强，Harness 的复杂度应该下降而非上升——脚手架在建筑完成后会被拆掉。

## 论证

此前 wiki 中已有两个相关但独立的认知：
1. **Chase**：Harness 技术本身不是护城河，Knowledge + Tool 才是持久价值
2. **AgentWay**：模型是最不稳定部件，Harness 的职责是结构维持秩序

[[akshay-agent-harness|Akshay]] 的脚手架隐喻将这两条线索统一为**演化方向**：Harness 的终极目标不是变得更复杂，而是**让自己变得不必要**。

## 证据

1. **Manus 实证**：六个月里重写了五次，每次都在删除复杂性——复杂工具定义 → 通用 shell 执行，"管理 Agent" → 简单结构化 handoff
2. **Claude Code 的演进**：Anthropic 会定期把 Harness 里的规划步骤删掉，因为新模型版本把某些能力内化了
3. **LangChain TerminalBench**：同一个模型 + 更好的 Harness = 排名提升 25+ 位。但反过来说，如果 Harness 设计得当，未来更强的模型能直接受益而不需加厚

## 影响

这个洞察对 Harness 设计有直接的检验价值——**Future-proofing test**：如果模型变强时性能能提升而不需增加 Harness 复杂度，设计就是健康的。如果每次模型升级都需要加新的 Harness 逻辑来"兜底"，设计可能有问题。

它也与此前 [[wiki-as-harness]] 洞察产生共鸣：本 wiki 的 WIKI.md（Schema）设计是否也遵循"变薄"原则？当 Claude 模型变强时，WIKI.md 的规则应该能精简而非膨胀。
