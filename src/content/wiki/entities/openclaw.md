---
type: entity
category: tool
aliases: [OpenClaw, openclaw, 小龙虾, 龙虾]
tags: [agent, tool, self-hosted, open-source, skills, memory, multi-agent]
sources: "[[openclaw-books]]"
created: 2026-04-12
updated: 2026-04-12
---

# OpenClaw

## 简介

开源自托管 AI Agent 平台，2026 年 3 月以 278,932 GitHub Stars 成为全球第一开源项目。核心理念：将 AI 从"聊天工具"变为"能自主执行任务的数字员工"。吉祥物为龙虾，中文社区称使用 OpenClaw 为"养虾"。

**创始人**：Peter Steinberger（奥地利开发者），2026 年 2 月加入 OpenAI，项目移交开源基金会运营。

## 核心数据

| 指标 | 数据 |
|------|------|
| GitHub Stars | 278,932（超越 React） |
| 代码规模 | 43 万行 TypeScript |
| ClawHub Skills | 13,729 |
| 支持渠道 | 20+（WhatsApp/Telegram/Discord/飞书/钉钉/QQ...） |
| 国内用户 | 10万+ |
| 内存占用 | ~1GB |

## 架构：Gateway-Node-Channel 三层

```
Channel（20+ 消息平台）→ Gateway（中央控制平面）→ Node（设备端执行）
```

- **Gateway**：WebSocket 服务，维护 Session，调度 Agent。默认绑定 localhost（安全优先）
- **Node**：本地执行节点（摄像头、录屏、系统命令等）
- **Channel**：消息平台接入层，统一三步接入模式

## 四层记忆架构

| 层级 | 存储 | 生命周期 | 说明 |
|------|------|---------|------|
| **SOUL** | SOUL.md | 永久不可变 | Agent 人格和核心身份 |
| **TOOLS** | Skills/ | 按需加载 | 当前可用的工具和技能 |
| **USER** | MEMORY.md + SQLite-vec | 持久化 | 用户偏好、历史事实（向量搜索） |
| **Session** | 内存 + sessions.json | 会话级 | 实时上下文（树形结构） |

**与 Chase Memory 分类的对映**：SOUL = 不可变 Procedural，Skills = 可变 Procedural，MEMORY.md = Semantic，Session = Episodic。详见 [[harness]]。

**Pre-Compaction**：Session 接近 token 上限时自动触发静默 turn，将重要信息写入文件，然后压缩上下文。是 [[harness|Chase 的 Compaction]] 的生产实现。

**向量搜索**：SQLite-vec + BM25 混合检索，兼顾语义匹配和精确关键词。

## 设计哲学

### Unix 哲学（CLI-first）
- "CLI 才是智能体连接世界的终极接口"
- Agent 通过 Bash 直接调用 CLI 程序，不需要中间协议层
- **明确拒绝 [[mcp]] 作为主要集成方式**（通过 mcporter 技能兼容）
- 与 Anthropic 的 MCP 标准化路线形成哲学对立

### 极简设计
- System prompt 是所有 Agent 框架中最短的
- 核心工具只有 4 个：Read、Write、Bash、Search

### Self-Extending Agent
- Agent 可在运行时写、重载、测试自己的 Skills
- 遇到不会的操作 → 写 skill → 修改 → 重载
- 是 [[harness|Procedural Memory]] 的自我修改实现

### Session 树形结构
- 非线性的树形 Session，支持分支和回滚
- Side-quest 不消耗主 Session 上下文
- 完成后回滚到主分支，只带回一句总结

## Skills 系统

- **ClawHub 市场**：13,729 个 Skills（20% 存在问题/恶意）
- **自建 Skill**：SKILL.md 定义 + index.js 入口 + tools/ 目录
- **安全风险**：ClawHavoc 供应链攻击曾影响 135K+ 设备

## 多 Agent 架构

蓝皮书定义三种标准模式：

| 模式 | 结构 | 适用场景 |
|------|------|---------|
| Pipeline | A→B→C | 内容生产流水线 |
| Parallel | 分发→多路并行→汇总 | 市场调研 |
| Hierarchical | 主Agent协调子Agent | 复杂项目管理 |

每 Agent 可配置：独立工作区、沙箱、工具白/黑名单、成本上限。

## 与 Claude Code 的互补

> "Claude Code 管代码，OpenClaw 管生活。"

| 维度 | OpenClaw | Claude Code |
|------|----------|-------------|
| 定位 | 通用 AI 生活助手 / Life OS | 专业编程 Agent |
| 运行方式 | 自托管 24/7 服务 | 按需 CLI |
| 记忆 | 四层持久化 | 会话级 + CLAUDE.md |
| 模型支持 | 多模型 | 仅 Claude |

通过 `openclaw-claude-code-skill` 桥接，OpenClaw 可调用 Claude Code 的全部工具。

## 安全事件

| 事件 | 详情 |
|------|------|
| CVE-2026-25253 | RCE（CVSS 8.8），WebSocket origin bypass |
| ClawHavoc | 供应链攻击，~20% ClawHub Skills 恶意 |
| 谷歌封号 | 大规模封禁使用 Google API 的 OpenClaw 用户 |
| 30K+ 未认证实例 | 暴露在公网无认证的 OpenClaw 部署 |

Peter Steinberger：*"This is all vibe code. Prompt injection hasn't been solved. There are absolute risks."*

## 作为 Harness 实例

OpenClaw 是 [[harness]] 四原语的大规模生产验证：

| Harness 原语 | OpenClaw 实现 |
|-------------|-------------|
| System Prompt | SOUL.md + AGENTS.md |
| Planning Tool | Session 树形结构 + HEARTBEAT.md 定时任务 |
| Sub-Agent | Agent Pool + 路由规则 |
| File System | workspace/ 目录（所有配置纯文本） |

**与 [[hermes-agent|Hermes]] 的对比**：
- 两者都是 Harness 的产品化实现
- OpenClaw：更成熟的生态（278K Stars, 20+ 渠道），但更重（43 万行代码）
- Hermes：更聚焦自我进化（agentskills.io, Auxiliary LLM），但更轻量
- OpenClaw 的记忆四层比 Hermes 的七种 Memory 框架更结构化

## 出自

- [[openclaw-books|OpenClaw 三份文档编译]]
