<script setup lang="ts">
defineProps<{
  id?: string
}>()
</script>

<template>
  <section :id="id" class="snap-panel panel-notes">
    <div class="panel-card panel-stack panel-stack-center">
      <div class="section-title-wrap">
        <span class="section-emoji">📜</span>
        <h2>执行条款与附记</h2>
      </div>

      <article class="feature-card feature-card-rose">
        <p class="body-copy body-copy-left">▶ 达标者自动进入「马户人才池」，需参加季度选拔大会。</p>
        <p class="body-copy body-copy-left">
          ▶ 未成年人依《未保法》享参赛豁免权，但需<span class="highlight">服马户役</span>（详见附件3.3.8）。
        </p>
      </article>

      <p class="legal-copy">
        * 本理论体系已通过 ISO 338 认证
        <br />
        最终解释权归马户研究院所有 ©2026
      </p>
    </div>
  </section>
</template>
