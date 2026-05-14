---
type: source
title: 如何正确 Vibe Coding？来自 Anthropic 编程智能体负责人的大师课
author: Erik Schluntz (Anthropic) / 机器之心 整理
date: 2026-04-20
source_url: https://www.bestblogs.dev/article/07248488
source_path: raw/articles/erik-schluntz-vibe-coding-2026-04.md
tags: [vibe-coding, anthropic, production, leaf-node, verification, tdd, compact]
ingested: 2026-04-25
updated: 2026-04-25
---

# 如何正确 Vibe Coding（Erik Schluntz, 2026-04-20）

## 摘要

Anthropic 研究员、《构建高效智能体》合著者 Erik Schluntz 的生产级 Vibe Coding 大师课。核心论点：真正的 Vibe Coding 不是"使用 AI 工具"，而是**完全信任 AI 生成代码，开发者专注于可验证的抽象层**。提出了"叶子节点"策略管理技术债、"开发者 = AI 的全职 PM"方法论，并披露了 Anthropic 内部 22,000 行 AI 代码合并进生产环境的极限实战案例。

## 关键要点

- **Vibe Coding 的精确定义**：Karpathy 的定义——"完全沉浸于氛围，拥抱技术发展的指数级增长，并且彻底忘记代码的存在。"不是"使用 AI 工具生成代码"，而是"完全信任 AI 生成代码，开发者专注于更高层次抽象"
- **可验证的抽象层**：CTO 用验收测试、PM 用用户体验、CEO 用关键数据切片——都不深入底层执行细节。开发者需要建立类似的、**无需阅读底层代码即可验证功能**的抽象层
- **叶子节点策略**：将 AI 代码修改限制在不被其他模块依赖的末端功能（"叶子节点"）。即使产生技术债也可接受，因为这些模块极少变动且不会阻碍后续构建。核心架构仍需人工深入保护
- **开发者 = AI 的全职 PM**：15-20 分钟与 AI 共同探索代码库、制定计划、梳理上下文，然后汇入单独提示词执行。**模型任务成功率呈指数级跃升**。把 AI 当第一天入职的新员工引导
- **22,000 行合并案例**：Anthropic 内部生产环境极限实战。四项核心策略：PM 视角深度引导（数天规划）+ 严格划定叶子节点修改范围 + 核心区域人工介入 + 可验证检查点（压力测试）。两周工作压缩到一天
- **AI 能力每 7 个月翻倍**：传统逐行审查将成为瓶颈。参照编译器发展史——开发者必须学会信任更高层级的抽象
- **TDD for Vibe Coding**：Vibe Coding 时**唯一应该看的代码就是测试代码**。强制极简 E2E 测试（快乐路径 + 2 错误场景），不写过度依赖实现的"死胡同测试"
- **Compact 时机策略**：在"人类程序员会停下来吃个午饭"的停顿点压缩。起手式：让 AI 制定计划 → 写入文档 → 立刻 Compact → 丢掉 10 万 token 压缩成几千干净 token
- **Claude Code + Cursor 双工具流**：Claude Code 做主要修改，VS Code/Cursor 走着审查代码和测试。陌生代码库先探索建立全局视图再动手

## 重要引用

> "完全沉浸于氛围，拥抱技术发展的指数级增长，并且彻底忘记代码的存在。" — Karpathy

> "在生产环境中实践氛围编程的核心理念在于：忘记代码的存在，但必须始终关注产品的存在。" — Erik Schluntz

> "核心在于：找到你可以验证的抽象层！" — Erik Schluntz

> "要让 AI 输出高质量工程代码，开发者需要转换思维，把自己当成 Claude 的产品经理。" — Erik Schluntz

> "指数级的核心不仅仅是持续变好，而是它们变好的速度远远超出我们的想象。" — Erik Schluntz

> "在 Vibe Coding 时，我通常唯一会去看的代码就是测试代码。测试过关了，我才觉得靠谱。" — Erik Schluntz

## 前提与边界

- **前提假设**："AI 能力每 7 个月翻倍"是估计值而非精确测量，实际翻倍周期受训练数据、算力投入、架构突破等多因素影响，不确定性较大
- **数据可靠性**：Erik 为 Anthropic 研究员、《构建高效智能体》合著者，权威性高；但其方法论的适用范围基于 Anthropic 内部工程环境，可能在其他组织条件下表现不同
- **不适用场景**：22,000 行合并案例来自 Anthropic 内部的 RL 代码库（离线运行），其他场景（在线服务、安全关键系统）的风险敞口完全不同；"叶子节点"策略假设能准确识别哪些模块是"叶子"，在高度耦合的代码库中该假设难以满足

## 与现有知识的关联

- **叶子节点策略** ↔ [[harness]] "Harness 应随模型变强而变薄" + [[agentic-skill-design]] "餐桌测试"边界——三者描述同一个动态：模型能力边界在不断移动，但需要系统性管理
- **可验证抽象层** ↔ [[harness]] 验证循环（Boris Cherny "2-3x"）——Erik 从人类侧补充了验证循环的上层设计
- **开发者 = PM** ↔ [[vibe-coding]] 四阶段 SOP 规划期 + Chase Builder/Reviewer——Erik 量化了规划投入的 ROI（15-20 min → 指数级提升）
- **22K 行合并** ↔ [[harness]] TerminalBench 实证——从"改 Harness 排名跳 20+"到"Anthropic 内部极限生产验证"的连续证据链
- **Compact 时机** ↔ [[context-engineering]] Compaction 策略——"人类午餐停顿点"是首个来自一线实践者的操作时机指南
- **编译器信任类比** ↔ [[harness]] 脚手架隐喻——两者都用技术史类比论证"Harness/Human 需要信任更高抽象层"
- **TDD** ↔ [[harness]] 验证循环三类（规则式/视觉式/LLM-as-judge）——Erik 的极简 E2E 测试是规则式验证的 Vibe Coding 特化实践
