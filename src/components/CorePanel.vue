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
        <h3>{{ core.title }}</h3>
        <p class="body-copy">
          由<span class="highlight">{{ core.founder }}</span
          >首创的量化择偶体系，基于人体工程学与地域文化特征建立的综合选拔标准。
        </p>
        <a class="inline-link" :href="core.link" target="_blank" rel="noreferrer">
          👀 {{ core.linkText }}
        </a>
      </article>
    </div>
  </section>
</template>
