---
type: entity
category: person
aliases: [白家杰, baijj]
tags: [harness-engineering, production, multi-agent, game-dev]
sources: "[[baijj-harness-engineering-practice]]"
created: 2026-04-25
updated: 2026-04-25
---

# 白家杰

## 简介

游戏行业工程师（Unity/WPF 技术栈），以 JK Launcher 项目为真实案例撰写了 28,000 字的 Harness Engineering 全量落地记录——wiki 中首个来自生产一线的、按时间顺序的、包含失败和迭代的实战文档。

## 核心贡献

- **四块拼图模型**：约束与流程 + 反馈 + 知识库 + 进化——从落地视角重新组织 Harness 的组件关系
- **Rule → Skill → Scripts 渐进下沉**：系统化的约束硬化路径，从自然语言到可执行检查
- **结构化调度**：三种多 Agent 路线实战 PK 后选定结构化调度（vs 去中心化协作），实战验证
- **七 Agent 角色体系**：PM / 需求分析 / 方案设计 / 闸门总控 / 开发 / 代码审查 / 测试——按软件工程流程阶段分工
- **总验证脚本**：将 Harness 从"软约束"推向"硬验收"的决定性环节
- **角色契约**：每个 Agent 的输入输出边界定义——让角色可替换、可维护
- **Memory 在团队级工程中的定位**：团队对齐的东西必须进仓库，Memory 只是个人润滑剂

## 工程背景

- JK Launcher：Unity 研发流程桌面启动器（WPF + .NET Framework）
- 完全由 AI 写代码，人只搭 Harness
- 人从执行者上移为系统设计者和最后责任人

## 相关概念

- [[harness]] — 四块拼图模型和 Rule/Skill/Scripts 渐进下沉的核心贡献
- [[ai-agent]] — 七 Agent 角色体系和结构化调度
- [[agentic-skill-design]] — Skill = 标准操作手册的实践验证
- [[context-engineering]] — dev-map 和任务看板作为项目级上下文索引

## 出自

- [[baijj-harness-engineering-practice|万字干货！Harness Engineering 如何工程化落地？（腾讯云开发者，2026-04-22）]]
