<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { Profile } from '../utils/types'

const props = defineProps<{
  id?: string
  profiles: Profile[]
}>()

const activeIndex = ref(0)
const railRef = ref<HTMLElement | null>(null)

const updateActiveIndex = () => {
  const rail = railRef.value
  if (!rail) return

  const children = Array.from(rail.children) as HTMLElement[]
  if (!children.length) return

  const railCenter = rail.scrollLeft + rail.clientWidth / 2
  let nextIndex = 0
  let minDistance = Number.POSITIVE_INFINITY

  children.forEach((child, index) => {
    const childCenter = child.offsetLeft + child.clientWidth / 2
    const distance = Math.abs(childCenter - railCenter)

    if (distance < minDistance) {
      minDistance = distance
      nextIndex = index
    }
  })

  activeIndex.value = nextIndex
}

onMounted(() => {
  updateActiveIndex()
  railRef.value?.addEventListener('scroll', updateActiveIndex, { passive: true })
})

onBeforeUnmount(() => {
  railRef.value?.removeEventListener('scroll', updateActiveIndex)
})
</script>

<template>
  <section :id="id" class="snap-panel panel-profiles">
    <div class="panel-card panel-stack panel-stack-center">
      <div class="section-title-wrap">
        <span class="section-emoji">🌍</span>
        <h2>地球上已知的338个体</h2>
      </div>

      <div class="profile-rail-wrap">
        <ul ref="railRef" class="profile-rail">
          <li
            v-for="(profile, index) in props.profiles"
            :key="profile.name"
            class="profile-slide"
            :class="{ 'profile-slide-active': activeIndex === index }"
          >
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
