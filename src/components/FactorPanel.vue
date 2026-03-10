<script setup lang="ts">
import type { QuizDimensionResult, QuizKey } from '../utils/types'

defineProps<{
  id?: string
  results: Record<QuizKey, QuizDimensionResult> | null
  globalMessages: string[]
  matchedCount: number | null
  showResults: boolean
}>()
</script>

<template>
  <section :id="id" class="snap-panel panel-factors">
    <div class="panel-card panel-stack">
      <div class="section-title-wrap">
        <span class="section-emoji">🜂</span>
        <h2>四维剖面</h2>
      </div>

      <article v-if="showResults" class="feature-card feature-card-blue result-summary-card">
        <div class="result-summary-main">
          <h3>参数剖面回响</h3>
          <p class="body-copy">
            当前共有 <span class="highlight-accent">{{ matchedCount }}</span> 个维度落入标准区间。
          </p>
        </div>
        <div class="global-result-list">
          <p v-for="message in globalMessages" :key="message" class="body-copy body-copy-compact">
            {{ message }}
          </p>
        </div>
      </article>

      <div class="factor-list">
        <article class="factor-card">
          <h3>📏 185 cm - 垂直海拔</h3>
          <p class="body-copy">男性垂直维度基准线，误差范围 ≤±2cm（需提供专业机构测量证明）</p>
          <div v-if="showResults && results?.height" class="factor-result">
            <div class="factor-result-head">
              <span>你的数值</span>
              <strong>{{ results.height.value }}{{ results.height.unit }}</strong>
            </div>
            <div class="result-bar">
              <span class="result-bar-fill" :style="{ width: `${results.height.ratio}%` }" />
            </div>
            <p class="body-copy body-copy-left body-copy-compact">{{ results.height.description }}</p>
          </div>
        </article>

        <article class="factor-card">
          <h3>⚖️ 90 kg - 质量规范</h3>
          <p class="body-copy">
            基于BMI黄金比例公式推算的<span class="highlight">理想质量参数</span>，建议季度动态核查
          </p>
          <div v-if="showResults && results?.weight" class="factor-result">
            <div class="factor-result-head">
              <span>你的数值</span>
              <strong>{{ results.weight.value }}{{ results.weight.unit }}</strong>
            </div>
            <div class="result-bar">
              <span class="result-bar-fill" :style="{ width: `${results.weight.ratio}%` }" />
            </div>
            <p class="body-copy body-copy-left body-copy-compact">{{ results.weight.description }}</p>
          </div>
        </article>

        <article class="factor-card">
          <h3>👞 45 码 - 支撑系统</h3>
          <p class="body-copy">足部承载体系规格标准（注：该参数与XP系统无直接关联）</p>
          <div v-if="showResults && results?.shoeSize" class="factor-result">
            <div class="factor-result-head">
              <span>你的数值</span>
              <strong>{{ results.shoeSize.value }}{{ results.shoeSize.unit }}</strong>
            </div>
            <div class="result-bar">
              <span class="result-bar-fill" :style="{ width: `${results.shoeSize.ratio}%` }" />
            </div>
            <p class="body-copy body-copy-left body-copy-compact">{{ results.shoeSize.description }}</p>
          </div>
        </article>

        <article class="factor-card">
          <h3>🕵️ 18 ?? - 神秘因子</h3>
          <div class="body-copy body-copy-left speculation">
            <p>学界主要假说：</p>
            <p class="body-copy-compact">• 时间维度：个体生存时长 ≥18太阳年</p>
            <p class="body-copy-compact">• 代际特征：公元2018年出生队列</p>
            <p class="body-copy-compact">• 特殊参数：18cm生理指标（待验证）</p>
          </div>
          <div v-if="showResults && results?.factor18" class="factor-result">
            <div class="factor-result-head">
              <span>你的数值</span>
              <strong>{{ results.factor18.value }}{{ results.factor18.unit }}</strong>
            </div>
            <div class="result-bar">
              <span class="result-bar-fill" :style="{ width: `${results.factor18.ratio}%` }" />
            </div>
            <p class="body-copy body-copy-left body-copy-compact">{{ results.factor18.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
