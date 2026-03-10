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
        <div class="core-frame" aria-hidden="true">
          <div class="core-frame-line" />
          <div class="core-frame-value">185 / 90 / 45 / 18</div>
          <div class="core-frame-line" />
        </div>
        <p class="core-lead">
          由<span class="highlight">{{ core.founder }}</span
          >首创的量化择偶体系，以人体工程学、质感判断与模糊玄学共同构成一道筛选剖面。
        </p>
        <p class="body-copy body-copy-muted body-copy-left">
          它并不只是一组数字，更像一种由比例、体量、支撑与隐性气质叠加出的轮廓感。
        </p>
        <a class="inline-link" :href="core.link" target="_blank" rel="noreferrer">
          👀 {{ core.linkText }}
        </a>
      </article>
    </div>
  </section>
</template>
