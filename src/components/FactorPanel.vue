<script setup lang="ts">
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
  speculations?: string[]
  result: FactorResult | null
}

defineProps<{
  id?: string
  factors: FactorCard[]
  globalMessages: string[]
  matchedCount: number | null
  showResults: boolean
}>()
</script>

<template>
  <section :id="id" class="snap-panel panel-factors">
    <div class="panel-card panel-stack">
      <div class="section-title-wrap">
        <span class="section-emoji">🧩</span>
        <h2>四个因子块</h2>
      </div>

      <article v-if="showResults" class="feature-card feature-card-blue result-summary-card">
        <div class="result-summary-main">
          <h3>你的 338 映射结果</h3>
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
