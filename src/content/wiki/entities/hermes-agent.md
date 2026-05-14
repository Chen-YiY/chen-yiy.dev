---
type: entity
category: tool
aliases: [Hermes Agent, Hermes, 赫尔墨斯]
tags: [agent, tool, self-evolving, nous-research, open-source]
sources: "[[hermes-agent-articles]], [[zhangmengfei-hermes-windows-deploy]]"
created: 2026-04-12
updated: 2026-04-19
---

# Hermes Agent

## 简介

Nous Research 开发的**开源自我进化 AI Agent 框架**。核心差异：内置学习循环——能从经验中创建技能，使用中不断改进，主动记住重要信息。是 Chase 提出的 Harness 架构（[[harness]]）和 Procedural Memory 的**首个大规模产品化实现**。

## 核心特性

### 自我进化 Skills
- Agent 从任务经验中**自动提取技能**并保存到 `~/.hermes/skills/`
- Skills 按分类组织（vs [[obsidian]] 的 flat 结构）
- 使用中持续优化已有 Skills
- = Chase 的 **Procedural Memory** 产品化实现（详见 [[harness]]）

### agentskills.io 技能市场
- 开放标准的技能市场
- Agent 发现能力不足时**自主搜索、安装、学习**
- 按评分/下载量自动选择最优技能
- 经验自动沉淀回 Skills

### SOUL.md（System Prompt）
- Agent 人格/行为定义文件 = [[harness]] 的 **System Prompt 原语**
- 独特实践：从对话历史中**自动总结生成**（Episodic → Procedural 转化）
- 支持预置 Personality（14 种风格）和自定义

### Auxiliary LLM 路由
- 主模型专注思考，便宜副模型处理搜索/压缩/视觉
- 新的 [[context-engineering]] 模式：优化上下文的**获取成本**
- 支持按任务类型指定独立模型和提供商

### 记忆系统
内置记忆（markdown + JSON/JSONL + SQLite）+ 7 种外接 Memory 框架：

| 系统 | 类型 | 适合场景 |
|------|------|---------|
| Holographic | Semantic ≈ | 本地结构化事实 |
| ByteRover | Semantic ≈ | 项目知识沉淀 |
| Honcho | Episodic ≈ | 长期理解用户 |
| Mem0 | Episodic ≈ | 自动提炼 |
| RetainDB | Semantic ≈ | 云端记忆后端 |
| Hindsight | Semantic ≈ | 复杂关系图谱 |
| OpenViking | Semantic ≈ | 大体量分层上下文 |

### 自验证原则
- 先验证后回答
- 先计划后执行
- 交付即验证
- **失败即沉淀**（失败时自动创建/改进 Skill）

### 其他特性
- **多平台**：CLI / Telegram / Discord / WhatsApp / Slack / Signal / 飞书
- **模型自由**：一键切换 OpenRouter / OpenAI / Anthropic / GLM / Kimi
- **YOLO 模式**：/yolo 启动自动运行（无需手动 /approve）
- **定时任务**：自然语言设置自动化
- **TUI 皮肤**：7 套内置 + YAML 自定义
- **浏览器反爬**：Camofox 集成

## 作为 Harness 实例

Hermes Agent 是 [[harness]] 四原语的精确实现：

| Harness 原语 | Hermes 实现 |
|-------------|------------|
| System Prompt | `SOUL.md`（+ Personality 预置） |
| Planning Tool | 技能分类 + 索引（按需发现） |
| Sub-Agent | 子任务/技能调用 |
| File System | `~/.hermes/` 目录（skills/、memory/、config） |

**独特贡献**：
- **Procedural Memory 活体化**：Skills 可被 Agent 自行创建/修改/优化 = Chase 理论的"Agent 可在运行中更新自己的配置"
- **自主 Tool 发现**：agentskills.io 将"让 Agent 自己找上下文"扩展到"让 Agent 自己找工具"

## 与本 Wiki 的关系

本 LLM Wiki 和 Hermes Agent 共享同一组 Harness 原语：
- `WIKI.md` ↔ `SOUL.md`（System Prompt）
- `index.md` ↔ Skills 分类索引（Planning Tool）
- 子 Agent 搜索 ↔ agentskills.io（自主发现）
- `wiki/` 文件系统 ↔ `~/.hermes/` 文件系统（File System）

关键差异：本 Wiki 的"进化"通过人类指令驱动（ingest），Hermes 的"进化"通过 Agent 自主驱动（self-evolving skills）。详见 [[wiki-as-harness]]。

**与 [[openclaw|OpenClaw]] 的对比**：同为 Harness 实现，但路线不同——Hermes 聚焦自我进化（proactive），OpenClaw 聚焦全平台覆盖（self-hosted, 20+ 渠道, 24/7）。Hermes 更轻量，OpenClaw 更成熟（278K Stars）。

### Windows 部署

Hermes Agent 不原生支持 Windows，需通过以下方式部署：

| 方案 | 复杂度 | 功能覆盖 | 适合人群 |
|------|--------|----------|----------|
| 一键部署（PowerShell） | 低（3 步） | 90% | 小白体验 |
| WSL 原生部署 | 高（10+ 步） | 100%（满血版） | 开发者 |

一键部署：`irm https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.ps1 | iex`

WSL 部署需：WSL2 + Ubuntu 22.04 + uv + Node.js 24 + Chromium。国内用户需全面配置镜像源（apt/pip/npm/uv）。网络是最大障碍，可能需要 VPN+TUN 通道。

支持的 LLM provider 包括 Z.AI（智谱），Base URL 区分 Coding Plan 端点和通用端点。

### 命令参考（30+ 条）

| 分类 | 代表命令 |
|------|----------|
| 基础对话 | `hermes`、`hermes chat`、`hermes chat --continue`、`hermes model` |
| 会话管理 | `hermes sessions list/export/delete/prune/stats/rename/browse` |
| 配置 | `hermes setup`、`hermes config edit`、`hermes tools` |
| Gateway | `hermes gateway setup/start/stop/restart` |
| Profile | `hermes profile list/create/use/show/delete` |
| 诊断 | `hermes doctor`、`hermes doctor --fix` |

### 飞书集成

1. 选择飞书平台 → 扫描二维码创建机器人
2. 配对验证授权：`hermes pairing approve feishu <配对码>`
3. 设置 Home chat：`/sethome` 用于自动通知、定时消息、报错提醒

## 出自

- [[hermes-agent-articles|Hermes Agent 三篇实践指南]]
- [[zhangmengfei-hermes-windows-deploy|Hermes Agent Win 系统部署教程]]
