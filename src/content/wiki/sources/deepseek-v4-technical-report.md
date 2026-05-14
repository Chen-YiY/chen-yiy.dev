---
type: source
title: DeepSeek V4 报告太详尽了！484 天换代之路全公开
author: 量子位 (henry)
date: 2026-04-25
source_url: https://www.bestblogs.dev/article/1d95c0b8
source_path: raw/articles/DeepSeek-V4-报告太详尽了！484-天换代之路全公开-2026-04-25.md
tags: [deepseek, v4, mhc, csa, hca, muon, 1m-context, architecture, sparse-attention, agent]
ingested: 2026-04-25
updated: 2026-04-25
---

# DeepSeek V4 报告太详尽了！484 天换代之路全公开（量子位, 2026-04-25）

## 摘要

6,258 字技术深度解读。量子位详细拆解 DeepSeek V4 技术报告，覆盖三大架构革新：mHC（流形约束超连接）解决残差连接数值不稳定、CSA+HCA 混合注意力实现百万 token 高效推理、Muon 优化器替代 AdamW。V4-Pro-Max 在多项基准匹敌甚至超越 GPT-5.4，开源模型首次真正追平闭源头部。后训练阶段用 On-Policy Distillation 替代传统混合 RL。484 天研发历程中的技术取舍与工程智慧。

## 关键要点

- **mHC（流形约束超连接）**：将残差流扩展为多条并行通道，约束混合矩阵为双随机矩阵（谱范数 ≤ 1），从根本上防止梯度爆炸。使 1.6T MoE 模型训练成为可能。Sinkhorn-Knopp 迭代 20 次收敛，wall-time 开销仅 6.7%
- **CSA + HCA 混合注意力**：核心创新。CSA（温和压缩 + 稀疏选择）做 token 级精细检索，1M token 只需 attend 1024 个压缩块；HCA（激进压缩 + dense）做长距离全局信号汇总。两者交替叠加，既不漏细节也不被细节拖住
- **KV cache 压到 10%**：V4-Pro 在 1M 场景下单 token FLOPs 仅为 V3.2 的 27%，KV cache 仅为 10%。亚马逊硬件师称可能解决 HBM 短缺问题
- **Muon 优化器大规模验证**：替代 AdamW 用于绝大多数参数优化。混合 Newton-Schulz 迭代（前 8 步激进 + 后 2 步精确），与 Kimi 的 QK-Clip 路线形成跨团队技术共享与各自演化
- **On-Policy Distillation 替代混合 RL**：先训多个领域专家（数学/代码/Agent/指令跟随），再通过 on-policy distillation 合并到统一 student。反向 KL 对齐。工程上需 teacher 权重 offload 到分布式存储按需加载
- **开源追平闭源**：Codeforces rating 3206 超过 GPT-5.4（3168）；SimpleQA 57.9 领先所有开源模型 20 个百分点。但 HLE 上仍落后 Gemini-3.1-Pro 和 Claude-Opus-4.6-Max，差距 3-6 个月
- **Flash-Max 被低估**：仅激活 13B 参数，推理任务打平 GPT-5.2 和 Gemini-3.0-Pro，代码和数学超过 K2.6-Thinking。效率极致
- **DeepSeek 的底层策略**：从 V2 的 MLA 开始，每一代都在"删"——删 KV cache、删激活参数、删注意力计算量。V4 将单 token FLOPs 砍到 1/4，KV cache 砍到 1/10。"百万token不是一个新的能力，是同一个上下文窗口被压到可以承担的成本"

## 重要引用

> "百万 token 不是一个新的能力，是同一个上下文窗口被压到可以承担的成本。"

> "DeepSeek 这几年做的事，底层动作很清晰，一直在删。从 V2 的 MLA 开始，每一代都在删 KV cache、删激活参数、删注意力计算量。"

> "一个训练了两个万亿参数 MoE 的团队公开承认'我们不知道为什么这两个 trick 管用'，在 2026 年已经是一件挺稀罕的事。"

> "V4-Pro-Max 在标准推理 benchmark 上优于 GPT-5.2 和 Gemini-3.0-Pro，但略落后于 GPT-5.4 和 Gemini-3.1-Pro。这表明其发展轨迹大约落后最前沿闭源模型 3 到 6 个月。"

## 前提与边界

- **前提假设**：CSA+HCA 的效率优势基于 DeepSeek 自有硬件环境，其他部署条件下的性能特征可能不同。mHC 的稳定性保证（双随机矩阵谱范数 ≤ 1）是理论上的，实际训练中仍需 Anticipatory Routing 和 SwiGLU Clamping 两个"不知道为什么管用"的 trick
- **数据可靠性**：量子位二次解读非一手数据，技术细节基于 V4 技术报告。Benchmark 来自 DeepSeek 自家报告，K2.6 和 GLM-5.1 因"API 太忙"部分缺失，公平性存疑。484 天时间线只涵盖 V3→V4，不含前置研究
- **不适用场景**：架构创新（mHC/CSA/HCA）的具体工程实现细节高度依赖 DeepSeek 的训练基础设施（DualPipe pipeline、H800 集群），中小团队难以复现。On-Policy Distillation 需"十几个万亿级 teacher"，仅超大团队可行。"全塞进去"策略在本地部署场景（显存有限）不适用

## 与现有知识的关联

- **KV cache 压缩 90%** ↔ [[context-engineering]] — 当上下文窗口从"昂贵稀缺"变为"廉价充足"，Context Engineering 的策略重心可能从"精心压缩筛选"转向"全塞进去再管理"
- **"一直在删"的架构哲学** ↔ [[harness]] "脚手架隐喻" — DeepSeek 每一代删复杂性，Harness 应随模型变强而变薄。两者指向同一趋势：效率 > 累积
- **Agent 产品专项优化** ↔ [[ai-agent]] + [[harness]] — V4 针对 Claude Code/OpenClaw/OpenCode/CodeBuddy 做 adapter，验证了 Harness 概念的现实影响力。模型厂商认 Agent 框架为"系统 API"
- **CSA 稀疏选择** ↔ [[context-engineering]] "即时上下文策略" — CSA 的 top-k 压缩块选择类似于 Agent 从 index.md 定位相关页面的过程：不是全量加载而是按需检索
- **On-Policy Distillation** ↔ [[agentic-skill-design]] — 多领域专家蒸馏为统一模型，类似于 Skill 的"参数化调用"：一个框架，不同上下文 = 不同行为
- **Muon 跨团队演化** ↔ [[harness]] 五框架对比 — DeepSeek 和 Kimi 用同一优化器但走不同路线解决同一问题（QK-Clip vs RMSNorm），类似 Harness 设计中的哲学分歧
