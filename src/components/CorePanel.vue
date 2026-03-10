<script setup lang="ts">
defineProps<{
  id?: string
  core: {
    title: string
    founder: string
    link: string
    linkText: string
  }
}>()
</script>

<template>
  <section :id="id" class="snap-panel panel-core">
    <div class="panel-card panel-stack panel-stack-center">
      <div class="section-title-wrap">
        <span class="section-emoji">📐</span>
        <h2>核心标准</h2>
      </div>

      <article class="feature-card feature-card-warm">
        <div class="core-numbers" aria-hidden="true">
          <span>185</span>
          <span>90</span>
          <span>45</span>
          <span>18</span>
        </div>
        <p class="body-copy">
          由<span class="highlight">{{ core.founder }}</span
          >首创的量化择偶体系，以人体工程学、质感判断与模糊玄学共同构成一道筛选剖面。
        </p>
        <p class="body-copy body-copy-muted body-copy-left">
          {{ core.title }}
        </p>
        <a class="inline-link" :href="core.link" target="_blank" rel="noreferrer">
          👀 {{ core.linkText }}
        </a>
      </article>
    </div>
  </section>
</template>
