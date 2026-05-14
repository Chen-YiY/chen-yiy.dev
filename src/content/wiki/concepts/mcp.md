---
type: concept
aliases: [MCP, Model Context Protocol, 模型上下文协议, AI USB-C]
related: "[[llm-wiki-pattern]], [[context-engineering]], [[ai-agent]], [[rag-vs-compiled-wiki]], [[openclaw]]"
tags: [ai, protocol, mcp, integration, anthropic]
sources: "[[batch-ai-sources]], [[openclaw-books]], [[claude-code-source-report]]"
created: 2026-04-12
updated: 2026-04-25
---

# MCP (Model Context Protocol)

## 定义

Anthropic 于 2024 年推出的开放标准化协议，规范 AI 应用与大模型之间交换上下文信息的方式。被誉为 **"AI 的 USB-C 接口"**——统一了 AI 应用与外部数据源/工具的连接标准，将 M×N 的网状集成问题转化为星型架构。

## 前提与边界

**前提**：
- MCP 解决的是工具集成的 M×N 问题，其价值前提是工具提供者愿意采用统一的标准化协议——当前生态中 Anthropic 积极推动、OpenAI 尚未官方支持，协议的普适性取决于行业采纳度
- 三大原语（Resources/Tools/Prompts）假设工具行为可被清晰地分类为"读""做""交互"三种模式，但实际中某些工具（如数据库客户端）横跨多个类别

**边界**：
- MCP 的上下文爆炸问题是其核心矛盾——每个工具定义消耗 150-300 tokens，在工具密集场景下可能抵消标准化带来的集成收益。按需加载和沙箱执行可缓解但不能根治此问题
- CLI-first 路线（OpenClaw）提出了有效的替代方案：Agent 直接调用已有命令行工具，零额外开发成本。MCP 在结构化保证上的优势 vs CLI-first 在生态复用上的优势，两者在实践中互补
- MCP 的安全模型假设用户能正确判断工具权限请求的风险，但非技术用户可能盲目授权，将安全模型的有效性限制在技术用户群体

## 核心问题

当 M 个 AI 模型需要对接 N 个外部工具时，传统方式需要 M×N 个独立集成。MCP 引入中间协议层，所有模型和工具通过统一接口通信，复杂度降为 M+N。

## 三层架构

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  MCP Host    │────▶│  MCP Client  │────▶│  MCP Server  │
│ (Claude App, │     │  (1:1 连接)   │     │ (数据源/工具) │
│  Cursor IDE) │     │  JSON-RPC 2.0│     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

- **Host**：承载 AI 模型的应用（如 Claude Desktop、Cursor IDE）
- **Client**：运行在 Host 内，与 Server 建立 1:1 连接，处理协议通信
- **Server**：暴露数据/工具/模板的服务端程序（本地或远程）

## 三大核心原语

| 原语 | 用途 | 控制方 | 方法 |
|------|------|--------|------|
| **Resources** | 暴露数据供 LLM 参考 | 应用控制 | list, get, subscribe |
| **Tools** | 暴露可执行功能供 LLM 调用 | 模型控制 | list, invoke |
| **Prompts** | 可复用交互模板/工作流 | 用户控制 | list, get |

**关键区分**：Resources 是"读什么"，Tools 是"做什么"，Prompts 是"怎么交互"。

## 传输机制

| 方式 | 场景 | 状态 |
|------|------|------|
| **Stdio** | 本地进程间通信（stdin/stdout） | ✅ 推荐（本地） |
| **SSE** | 远程通信（HTTP + Server-Sent Events） | ⚠️ 历史方案 |
| **Streamable HTTP** | 远程双向流式通信 | ✅ 推荐标准 |

## 上下文爆炸问题与解决方案

**问题**：每个工具定义消耗 150-300 tokens，100 个工具 = 15,000-30,000 tokens，用户还没说话上下文就满了。

**解决方案——代码执行模式**：
1. **按需加载（渐进式披露）**：不一次全加载，需要时再搜索/浏览
2. **沙箱执行**：AI 写代码调用工具，代码在沙箱中执行，中间数据不过 AI——极大减少 token 消耗
3. **敏感信息隔离**：私密数据在沙箱内处理，AI 只看到最终结果

## 安全模型

- **本地优先**：Server 默认本地运行，不暴露在不安全网络
- **用户同意机制**：资源和工具访问需用户明确授权
- **最小权限**：仅请求和授予必需权限
- **威胁防范**：恶意 Server、Prompt 注入导致工具误用、敏感数据泄露

## 与本 Wiki 其他概念的关系

- **与 [[llm-wiki-pattern]] 的关系**：MCP 是 LLM Agent 与外部工具交互的协议层；LLM Wiki 的 ingest/query/lint 操作可以通过 MCP Tools 暴露给其他 Agent
- **与 [[context-engineering]] 的关系**：MCP 的上下文爆炸问题正是 Context 工程要解决的核心挑战
- **与 [[ai-agent]] 的关系**：MCP 是 AI Agent 使用外部工具的标准协议——Agent 的"手和眼"
- **与 [[rag-vs-compiled-wiki]] 的关系**：MCP Resources 可以连接 RAG 系统，也可以连接编译式 Wiki

## 哲学对立：CLI-first（OpenClaw）

[[openclaw|OpenClaw]] 提出了与 MCP 截然不同的工具集成路线——**CLI-first**：

> "CLI 才是智能体连接世界的终极接口。不需要为每个服务写一个集成，Agent 只要能运行命令行，就能操作一切。"

| 维度 | MCP（Anthropic） | CLI-first（OpenClaw） |
|------|-----------------|---------------------|
| 哲学 | 标准化协议 | Unix 小工具+文本流 |
| 集成方式 | 每个服务写 MCP Server | 直接调用已有 CLI |
| 优势 | 协议级保证、结构化 | 零额外开发、已有生态 |
| 劣势 | 每个服务需适配 | 依赖 CLI 输出解析 |
| 互操作 | — | 通过 mcporter 技能桥接 |

**实践中互补**：`openclaw-claude-code-skill` 通过 MCP 协议桥接 OpenClaw 和 Claude Code，证明两条路线可以共存。

## 源码级发现：MCP = Tool + Behavior 双注入

[[claude-code-source-report|Claude Code 源码研究]] 揭示了 MCP 在生产系统中的真实价值远超"工具注册中心"：

1. **工具 + 行为说明双注入**：`getMcpInstructionsSection()` 不仅注入工具定义，还将 MCP server 提供的 instructions 拼入 system prompt → 模型不仅知道"有什么工具"，还知道"怎么用"
2. **Agent-Specific MCP Servers**：每个 Agent 可在 frontmatter 中定义自己的 MCP server（内联定义或按名引用）→ Agent 不只消费全局 MCP，还可以带自己的外接能力
3. **生命周期管理**：Agent 结束时自动 cleanup 对应的 MCP 连接和 tools

这让 MCP 从"工具桥"升级为**集成平面**——同时注入能力和行为规范。

## 出自

- MCP 基本概念 + 整体架构 + 核心原语 + 传输机制与安全性 + 上下文爆炸的新答案（共 5 份源文件）
- [[openclaw-books|OpenClaw 三份文档编译]]（CLI-first 哲学对立）
- [[claude-code-source-report|Claude Code 源码研究报告]]（MCP Tool + Behavior 双注入、Agent-Specific MCP）
