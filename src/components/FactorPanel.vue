<script setup lang="ts">
import { computed } from 'vue'
import type { QuizDimensionResult, QuizKey } from '../utils/types'

type FactorResult = {
  value: number
  unit: string
  description: string
  ratio: number
}

type FactorCard = {
  key: string
  title: string
  description?: string
  descriptionPrefix?: string
  descriptionSuffix?: string
  highlight?: string
  speculations?: readonly string[]
  result: FactorResult | null
}

const props = defineProps<{
  id?: string
  results: Record<QuizKey, QuizDimensionResult> | null
  globalMessages: string[]
  matchedCount: number | null
  showResults: boolean
}>()

const factors = computed<FactorCard[]>(() => [
  {
    key: 'height',
    title: '📏 垂直基线',
    description: '男性垂直维度的第一道门槛，强调轮廓、站姿与第一眼的空间占有率。',
    result: props.results?.height ?? null,
  },
  {
    key: 'weight',
    title: '⚖️ 质量密度',
    descriptionPrefix: '围绕 BMI 黄金比例推导出的',
    highlight: '理想质量参数',
    descriptionSuffix: '，强调稳定感、厚度与存在感。',
    result: props.results?.weight ?? null,
  },
  {
    key: 'shoeSize',
    title: '👞 支撑幅面',
    description: '关于底盘与支撑系统的象征性指标，代表重心、步态与整体落点。',
    result: props.results?.shoeSize ?? null,
  },
  {
    key: 'factor18',
    title: '🔮 18 ??-神秘因子',
    description: '更难被量化的部分通常被归入这一层面：',
    speculations: [
      '时间维度：个体生存时长达到某条心理阈值',
      '代际特征：与某一时间切片有关的集体印象',
      '特殊参数：关于 18 的全部神秘联想与误读',
    ] as const,
    result: props.results?.factor18 ?? null,
  },
])
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
        <article
          v-for="factor in factors"
          :key="factor.key"
          class="factor-card"
        >
          <h3>{{ factor.title }}</h3>

          <p v-if="factor.highlight" class="body-copy">
            {{ factor.descriptionPrefix }}<span class="highlight">{{ factor.highlight }}</span
            >{{ factor.descriptionSuffix }}
          </p>

          <template v-else-if="factor.speculations?.length">
            <div class="body-copy body-copy-left">
              <p>{{ factor.description }}</p>
              <p v-for="speculation in factor.speculations" :key="speculation" class="body-copy-compact">
                • {{ speculation }}
              </p>
            </div>
          </template>

          <p v-else class="body-copy">{{ factor.description }}</p>

          <div v-if="showResults && factor.result" class="factor-result">
            <div class="factor-result-head">
              <span>你的数值</span>
              <strong>{{ factor.result.value }}{{ factor.result.unit }}</strong>
            </div>
            <div class="result-bar">
              <span class="result-bar-fill" :style="{ width: `${factor.result.ratio}%` }" />
            </div>
            <p class="body-copy body-copy-left body-copy-compact">{{ factor.result.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
