---
type: entity
category: organization
aliases: [DeepSeek, 深度求索]
related: "[[context-engineering]], [[ai-agent]], [[harness]]"
tags: [organization, llm, open-source, deepseek, model-provider]
sources: "[[deepseek-v4-announcement]], [[deepseek-v4-technical-report]]"
created: 2026-04-25
updated: 2026-04-25
---

# DeepSeek（深度求索）

## 简介

中国 AI 公司，以开源 LLM 系列模型闻名。V4 系列（2026-04-24 发布）包含 V4-Pro（1.6T 参数）和 V4-Flash（284B 参数），均标配 1M 上下文。核心策略：通过架构创新持续降低推理成本——从 V2 的 MLA 开始，每一代"删 KV cache、删激活参数、删注意力计算量"。

## 核心技术路线

| 代际 | 核心创新 | 效率收益 |
|------|----------|----------|
| V2 | MLA（多头潜在注意力） | 降低 KV cache |
| V3 | MoE + DualPipe | 降低激活参数 |
| V3.2 | DSA（稀疏注意力） | 降低注意力计算量 |
| V4 | mHC + CSA/HCA + Muon | FLOPs 降至 27%，KV cache 降至 10% |

## V4 关键技术

### mHC（流形约束超连接）
解决超大规模模型残差连接的数值不稳定。将残差流扩展为多条并行通道，约束混合矩阵为双随机矩阵（谱范数 ≤ 1）。Sinkhorn-Knopp 迭代实现，开销 6.7%。

### CSA + HCA 混合注意力
V4 实现 1M 上下文高效推理的核心。CSA（温和压缩 + 稀疏选择）做精细检索，1M token 只需 attend 1024 个压缩块。HCA（激进压缩 + dense）做全局信号汇总。两者交替叠加。

### Muon 优化器
替代 AdamW 用于绝大多数参数优化。基于矩阵正交化。混合 Newton-Schulz 迭代。与 Kimi 的 MuonClip 路线形成跨团队演化。

### On-Policy Distillation
替代传统混合 RL。先训多个领域专家，再通过 on-policy distillation 合并为统一 student。反向 KL 对齐。

## 性能定位

- **Agentic Coding**：开源最佳。内部使用优于 Sonnet 4.5，接近 Opus 4.6 非思考模式
- **Codeforces**：3206（超过 GPT-5.4 的 3168）
- **SimpleQA**：57.9（领先开源 20+ 百分点）
- **与闭源差距**：3-6 个月（HLE 上仍落后 Gemini-3.1-Pro 和 Claude-Opus-4.6-Max）

## 与本 Wiki 的关联

- DeepSeek V4 的 1M 上下文标配直接影响 [[context-engineering]] 的实践策略——当上下文不再稀缺，管理策略需要重新评估
- V4 针对 Claude Code、OpenClaw 等做 Agent 专项优化，验证了 [[harness]] 是模型厂商认可的"系统 API"
- "一直在删"的架构哲学与 [[harness]] "脚手架应随模型变强而变薄"指向同一趋势

## 出自

- [[deepseek-v4-announcement|DeepSeek-V4 预览版公告]]（2026-04-24）
- [[deepseek-v4-technical-report|DeepSeek V4 技术报告解读]]（量子位, 2026-04-25）
