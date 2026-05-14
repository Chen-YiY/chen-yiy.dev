---
type: entity
category: person
aliases: [Erik Schluntz, Schluntz]
tags: [anthropic, vibe-coding, agent, verification]
sources: "[[erik-schluntz-vibe-coding]]"
created: 2026-04-25
updated: 2026-04-25
---

# Erik Schluntz

## 简介

Anthropic 研究员，《构建高效智能体》（"Building Effective Agents"）合著者。因摔断手臂后被迫"全自动化办公"的经历而深入探索 Vibe Coding 的生产级实践，其大师课被网友 Movez 评价为"胜过 100 门付费课程"。

## 核心贡献

- **可验证的抽象层**：提出开发者应像 CTO（验收测试）、PM（用户体验）、CEO（数据切片）一样，建立无需阅读底层代码即可验证功能的抽象层
- **叶子节点策略**：首个系统化的 AI 编码技术债管理框架——限制 AI 在不被其他模块依赖的末端模块工作，保护核心架构
- **开发者 = AI 的全职 PM**：量化了规划投入的 ROI（15-20 分钟与 AI 共同探索 → 指数级提升任务成功率）
- **22,000 行合并案例**：披露了 Anthropic 内部的极限生产验证——四周策略将两周工作量压缩到一天
- **Compact 时机策略**：在"人类午餐停顿点"压缩，起手式：计划→文档→Compact→丢掉 10 万 token
- **TDD for Vibe Coding**：唯一应看的代码就是测试代码，极简 E2E（快乐路径 + 2 错误场景）
- **Claude Code + Cursor 双工具流**：主力用 Claude Code，审查用 Cursor，手动修指定行

## 相关概念

- [[vibe-coding]] — Erik 的生产级 Vibe Coding 方法论
- [[harness]] — Erik 的"可验证抽象层"和"叶子节点策略"是 Harness 验证循环的人类侧设计
- [[context-engineering]] — Erik 的 Compact 时机策略是一线实践者的操作指南
- [[anthropic]] — 雇主机构

## 出自

- [[erik-schluntz-vibe-coding|如何正确 Vibe Coding（机器之心整理，2026-04-20）]]
