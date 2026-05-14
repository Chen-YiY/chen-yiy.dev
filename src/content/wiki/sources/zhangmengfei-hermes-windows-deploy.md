---
type: source
title: "Hermes Agent 在 Win 系统本地部署保姆级教程"
author: "张梦飞i / 李琛（梦飞 AI）"
date: 2026-04
source_url: https://mp.weixin.qq.com/s/-Vptsp_tSOlbOWaeDDK8KA
source_path: raw/articles/zhangmengfei-hermes-windows-deploy-2026-04.md
tags: [hermes-agent, deployment, windows, wsl, feishu, tutorial]
ingested: 2026-04-19
updated: 2026-04-25
---

# Hermes Agent 在 Win 系统本地部署保姆级教程

## 摘要

提供两种在 Windows 系统上部署 Hermes Agent 的方案：一键部署（PowerShell 脚本，90% 功能，适合小白）和 WSL 原生部署（完整功能，适合开发者）。包含完整的模型配置（以 Z.AI/智谱为例）、飞书消息平台集成、以及 30+ 条 Hermes 命令参考。

## 关键要点

### 两种部署方案对比

| 维度 | 一键部署 | WSL 原生部署 |
|------|---------|-------------|
| 复杂度 | 低（3 步完成） | 高（10+ 步） |
| 功能覆盖 | 90% | 100%（满血版） |
| 适合人群 | 小白体验 | 开发者 |
| 环境要求 | 仅 PowerShell 管理员权限 | WSL2 + uv + Node.js + Chromium |
| 消息平台 | 需额外配置 | 完整支持 |

### 核心配置

- **模型**：支持 Z.AI（智谱）、Custom endpoint 等。Base URL 区分 Coding Plan 端点和通用端点
- **消息平台**：飞书集成——扫描二维码创建机器人 + 配对验证授权
- **Home chat**：`/sethome` 命令设置通知目标，用于自动通知、定时消息、报错提醒

### WSL 部署关键步骤

1. 安装 WSL2 + Ubuntu 22.04
2. 清华镜像源（apt + pip + npm + uv）
3. 安装 uv（Python 包管理器）、nvm + Node.js 24、Chromium
4. 国内镜像克隆项目：`gitcode.com/GitHub_Trending/he/hermes-agent.git`

### 命令参考（30+ 条）

覆盖：基础对话、会话管理（list/export/delete/prune/stats/rename/browse）、配置（setup/config/edit/tools）、Gateway（setup/start/stop/restart）、Profile（list/create/use/show/delete）、诊断（doctor/doctor --fix）

### 实际部署踩坑

- 网络是最大障碍：需要 VPN+TUN 通道才能较快安装
- 安装过程中可能因网络问题卡死在下载依赖步骤（10+ 分钟无反应则考虑切换代理）
- 国内用户需要全面配置镜像源（apt/pip/npm/uv）

## 重要引用

> "Hermes Agent 是当前最前沿的开源 AI 智能体框架之一，其最大亮点是具备'自我进化'能力，相比 OpenClaw，Hermes Agent 得到了更精细的优化。"

## 前提与边界

- **前提假设**：教程基于特定版本的 Hermes Agent 和 WSL2（Ubuntu 22.04）环境，软件版本更新后步骤可能失效
- **数据可靠性**：实践教程，步骤经过作者验证，但环境差异（Windows 版本、网络条件、已安装软件）可能导致步骤需要调整
- **不适用场景**：网络环境差异大，VPN 需求是最大的不确定因素——国内用户需自行解决 GitHub 克隆、npm/pip 依赖下载的网络问题；一键部署方案仅覆盖 90% 功能，需要完整功能（如全部消息平台支持）仍需走 WSL 路线

## 与现有知识的关联

| 本源内容 | Wiki 已有概念 | 关系 |
|----------|-------------|------|
| Hermes Agent 部署实操 | [[hermes-agent]] | 补充 Windows 部署方案和完整命令参考 |
| 自我进化能力 | [[harness]] Procedural Memory | 实践验证——Hermes Agent 的自我进化能力需要在完整部署后才能体验 |
| 飞书集成 | [[ai-tooling-and-protocols]] | 新增 Hermes Agent 的消息平台集成实践 |
| Z.AI/智谱作为 LLM provider | [[ai-tooling-and-protocols]] | 新增国内 LLM provider 的具体使用案例 |
