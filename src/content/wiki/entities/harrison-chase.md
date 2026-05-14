---
type: entity
category: person
aliases: [Harrison Chase, Chase, 哈里森·蔡斯]
tags: [langchain, agent, harness, entrepreneur]
sources: "[[chase-harness-interview]], [[chase-coding-agents-reshaping-epd]]"
created: 2026-04-12
updated: 2026-04-19
---

# Harrison Chase

## 简介

LangChain 联合创始人兼 CEO。AI Agent 基础设施领域的关键人物，从 LangChain 框架到 LangGraph 运行时再到 DeepAgents Harness，推动了 Agent 技术栈的演进。提出现代 Agent 架构的**四核心原语**（System Prompt + Planning Tool + Sub-Agent + File System）。

## 核心贡献

- **[[harness|Harness 架构]]**：总结出现代 Agent 系统的四个核心原语，被 Claude Code、Manus、Deep Research 等产品共同验证
- **Progressive Disclosure 命名**：在 Agent Skill 设计中明确使用并推广了这一术语
- **Memory 三分类**：提出 Agent Memory 的三种类型（Semantic、Episodic、Procedural），其中 Procedural Memory = Agent 自我修改配置 = 实现"学习"
- **LangChain 产品线**：
  - **LangChain**（2022）：LLM 应用的 Abstraction 框架
  - **LangGraph**：Agent Runtime，Graph-like Workflow 编排
  - **DeepAgents**：Batteries-included Agent Harness
  - **LangSmith**：Observability ++ 平台（商业产品）

## 职业背景

- **Kensho**（第一家工作）：金融科技初创，机器学习团队。浓厚的工程文化，Google 老兵 + MIT/Harvard 物理博士的组合。Kensho 是著名创始人摇篮（OpenEvidence、Suno、Chai Discovery 等团队出自此处）
- **Robust Intelligence**（第二位员工）：最初做 Adversarial ML，COVID 后转型为 MLOps 平台。做 ML 测试和验证——这后来启发了 LangSmith 的方向
- **LangChain**（2022 秋）：注意到 LLM 应用的共同模式，打包成 Python Package 发布，一两个月后确认巨大机会，与联合创始人 Ankush 创立公司

## 关键思想

1. **Harness > Model**：模型只是基础，真正让 Agent 可靠运作的是围绕模型的脚手架
2. **领域知识是护城河**：Harness 技术本身不是护城河（构建方式会变），领域 Knowledge + Tool 才是持久价值
3. **让模型承担更多职责**：从 Tool 调用 → 自管理 Context → 自触发 Compaction → 自修改 Procedural Memory（学习）
4. **瓶颈从实现转向评审**：编程 Agent 让代码生成成本趋近于零，系统思维成为核心差异化能力（详见 [[chase-coding-agents-reshaping-epd]]）
5. **通才 > 专才（在 Agent 时代）**：一人跨产品/设计/工程省掉沟通开销，Builder/Reviewer 二分角色正在取代传统 EPD 分工

## 与本 Wiki 的关系

- Chase 提出的 Harness 四原语与本 Wiki 的架构存在精确结构对映（详见 [[wiki-as-harness]]）
- Chase 对 Progressive Disclosure 的独立验证强化了 [[agent-tool-design]] 的论点
- LangChain/LangSmith 的 Observability 理念可指导本 Wiki 的质量监控

## 相关概念

- [[harness]] — Chase 定义的核心架构
- [[agent-tool-design]] — 工具设计哲学（Chase 的 Skill 概念是 Progressive Disclosure 的实例）
- [[context-engineering]] — 上下文工程（Chase 的 File System + Compaction 实践）
- [[ai-agent]] — AI Agent（Chase 的 Agent 类型分类和架构定义）
- [[mcp]] — MCP（Chase 认为是标准化暴露 API 的有用协议）

## 出自

- [[chase-harness-interview|MAD Podcast 专访]]（2026-03-12）
- [[chase-coding-agents-reshaping-epd|编程 Agent 如何重塑 EPD]]（2026-03-11）
