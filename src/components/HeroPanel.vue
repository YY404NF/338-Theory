<script setup lang="ts">
import GitHubButton from './GitHubButton.vue'

defineEmits<{
  openQuiz: []
  viewTheory: []
}>()
</script>

<template>
  <section class="snap-panel panel-cover">
    <div class="panel-card panel-card-cover">
      <div class="panel-topbar">
        <span class="topbar-spacer" />
        <GitHubButton />
      </div>

      <div class="hero-center">
        <div class="hero-badges">
          <span>✨</span>
          <span>🪞</span>
          <span>🌙</span>
        </div>
        <h1>338理论体系</h1>
        <p class="hero-subtitle">
          一份被重新整理的民间参数档案，用更克制的视觉秩序记录核心标准、隐性变量与已知样本。
        </p>
        <div class="hero-actions">
          <button class="primary-button" type="button" @click="$emit('openQuiz')">
            测测我是不是338
          </button>
          <button class="secondary-button" type="button" @click="$emit('viewTheory')">
            直接查看理论
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
