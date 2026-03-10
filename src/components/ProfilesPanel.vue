<script setup lang="ts">
import type { Profile } from '../utils/types'

defineProps<{
  id?: string
  profiles: Profile[]
}>()
</script>

<template>
  <section :id="id" class="snap-panel panel-profiles">
    <div class="panel-card panel-stack panel-stack-center">
      <div class="section-title-wrap">
        <span class="section-emoji">🌍</span>
        <h2>地球上已知的338个体</h2>
      </div>

      <div class="profile-rail-wrap">
        <ul class="profile-rail">
          <li v-for="profile in profiles" :key="profile.name" class="profile-slide">
            <article class="profile-card profile-card-large">
              <img :src="profile.avatar" :alt="profile.name" class="profile-avatar profile-avatar-large" />
              <div class="profile-copy profile-copy-center">
                <strong>{{ profile.name }}</strong>
                <span>{{ profile.date }}</span>
              </div>
            </article>
          </li>
        </ul>
      </div>

      <p class="body-copy body-copy-center body-copy-muted">
        📮 持续监测中，发现新个体请立即上报马户研究院。
      </p>
    </div>
  </section>
</template>
