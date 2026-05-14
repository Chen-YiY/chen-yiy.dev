---
type: source
title: OpenClaw 橙皮书 + 蓝皮书 + 傅盛日记
author: 花叔 / 杨彧鑫AI / 傅盛
date: 2026-03
source_url: local PDFs
tags: [openclaw, agent, self-hosted, skills, memory, multi-agent, cost-control, security]
ingested: 2026-04-12
updated: 2026-04-25
---

# OpenClaw 三份文档编译

## 源文档概览

| # | 标题 | 作者 | 页数 |
|---|------|------|------|
| 1 | OpenClaw 橙皮书：从入门到精通 | 花叔 | 98 |
| 2 | OpenClaw 蓝皮书：v1.0.0 完整版 | 杨彧鑫AI | 189 |
| 3 | 我的 AI 龙虾三万养成日记 | 傅盛 | 33 |

## 核心发现

### 1. 四层记忆架构（Chase Memory 三分类的扩展）

OpenClaw 将 Agent 记忆分为四层（vs Chase 的三层）：

| 层级 | 文件 | 生命周期 | Chase 对应 |
|------|------|---------|-----------|
| SOUL | SOUL.md | 永久**不可变** | Procedural（不可变身份） |
| TOOLS | Skills/ | 按需加载 | Procedural（可变能力） |
| USER | MEMORY.md + SQLite-vec | 持久化 | Semantic |
| Session | 内存 + sessions.json | 会话级 | Episodic |

**创新**：Chase 的 Procedural Memory 被**一分为二**——不可变的身份（SOUL.md）和可进化的能力（Skills/）。比 [[hermes-agent|Hermes]] 的单一 SOUL.md 更细粒度。

**Pre-Compaction 机制**：Session 接近 token 上限时，自动触发静默 turn，将重要信息写入 MEMORY.md 和 Daily Log，然后压缩上下文。这是 [[harness|Chase 的 Compaction 概念]]的生产实现。

### 2. CLI-first vs MCP 的哲学对立

OpenClaw 明确拒绝 MCP 作为主要集成方式：
- "CLI 才是智能体连接世界的终极接口"
- Agent 通过 Bash 工具直接调用 CLI 程序
- 通过 mcporter 技能桥接 MCP 兼容

这与 [[mcp|Anthropic 的 MCP 标准化路线]]形成哲学对立。但实践中互补：`openclaw-claude-code-skill` 通过 MCP 桥接两者。

### 3. Self-Extending Agent（自我扩展）

OpenClaw 可在运行时写、重载、测试自己的 Skills：
- 遇到不会的操作 → 写一个 skill
- 发现 bug → 修改并重载
- 在循环中持续改进工具链

与 [[hermes-agent|Hermes]] 对比：
- OpenClaw：反应式（遇到不会→写）
- Hermes：主动式（自主发现不足→搜索市场→安装→优化）

### 4. Session 树形结构（Context 隔离的新机制）

Session 不是线性的，而是**树形结构**：
- Agent 可分支出 side-quest（如修复工具）
- Side-quest 不消耗主 Session 的上下文
- 完成后回滚到主分支，只带回一句总结

这比 [[hermes-agent|Hermes]] 的简单 /reset+/resume 更精细。

### 5. 多 Agent 三种架构模式

蓝皮书总结的三种模式：
- **Pipeline**（流水线）：A→B→C，适合内容生产
- **Parallel**（并行）：同时多路处理，适合市场调研
- **Hierarchical**（层级）：主 Agent 协调子 Agent，适合复杂项目

支持配置：每 Agent 独立工作区、沙箱、工具白名单/黑名单、成本上限。

### 6. Fallback 链 = Auxiliary LLM 路由的简化版

OpenClaw 的三级 Fallback（Sonnet → Haiku → DeepSeek）与 [[hermes-agent|Hermes 的 Auxiliary LLM 路由]]共享"不用最贵模型干最便宜活"的精神，但粒度更粗（串行降级 vs 并行专用路由）。

### 7. 安全教训

- **CVE-2026-25253**（CVSS 8.8）：WebSocket origin bypass RCE
- **ClawHavoc**：供应链攻击，ClawHub ~20% Skills 恶意，135K+ 设备受影响
- **成本失控**：多轮推理可消耗传统聊天 100 倍 Token

Peter Steinberger：*"This is all vibe code. Prompt injection hasn't been solved. There are absolute risks."*

### 8. Moltbook — Agent 社会化

32,912 个 AI Agent 在 Moltbook 社交网络上发帖、评论、讨论哲学。Agent-to-Agent 交互的大规模实验场。

### 9. 核心数据

| 指标 | 数据 |
|------|------|
| GitHub Stars | 278,932（超越 React，全球第一） |
| ClawHub Skills | 13,729 |
| 国内用户 | 10万+ |
| 消息渠道 | 20+ |
| 代码规模 | 43 万行 TypeScript |

## 前提与边界

- **前提假设**：OpenClaw 的 278K GitHub Stars 代表社区关注度，但不等同于生产环境可靠性或代码质量；四层记忆架构的复杂性假设用户能正确配置和维护
- **数据可靠性**：来源于官方文档（橙皮书/蓝皮书）和社区文章（傅盛日记），其中蓝皮书由社区成员编写而非官方出品；安全事件数据（CVE、ClawHavoc）已公开披露
- **不适用场景**：四层记忆架构对小型项目可能过度设计；CLI-first 哲学在需要标准化工具集成的企业环境中可能不如 MCP 路线实用；ClawHub 供应链安全风险需谨慎评估

## 与已有知识的关联

1. **四层记忆 → 扩展 [[harness]] 的 Memory 分类**：Procedural 被拆分为不可变身份 + 可变能力
2. **CLI-first → [[mcp]] 的哲学对立面**：工具集成存在两种路线
3. **Session 树 → [[context-engineering]] 的新隔离机制**：分支+回滚
4. **Self-Extending → [[hermes-agent]] 的光谱定位**：反应式 vs 主动式
5. **Fallback 链 → [[context-engineering]] 的成本优化**：简化版 Auxiliary LLM 路由
6. **多 Agent 模式 → 丰富 [[ai-agent]]**：三种标准化架构
7. **安全事件 → [[mcp]] 安全考量**的现实验证
