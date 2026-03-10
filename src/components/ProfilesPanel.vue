<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Profile } from '../utils/types'

defineProps<{
  id?: string
}>()

const profiles = computed<Profile[]>(() =>
  [
    {
      name: '墨龙辞',
      date: '2025.05.04 上海',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=424076534&s=640',
    },
    {
      name: '南殇',
      date: '2024.01.22 北京',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3489424615&s=640',
    },
  ].sort((left, right) => {
    const [leftDatePart = ''] = left.date.split(' ')
    const [rightDatePart = ''] = right.date.split(' ')
    return new Date(rightDatePart.replace(/\./g, '-')).getTime() - new Date(leftDatePart.replace(/\./g, '-')).getTime()
  }),
)

const railRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

const centerSlide = (index: number, behavior: ScrollBehavior = 'smooth') => {
  const rail = railRef.value
  if (!rail) return

  const child = rail.children[index] as HTMLElement | undefined
  if (!child) return

  const targetLeft = child.offsetLeft - (rail.clientWidth - child.clientWidth) / 2
  rail.scrollTo({
    left: Math.max(0, targetLeft),
    behavior,
  })
}

const updateActiveIndex = () => {
  const rail = railRef.value
  if (!rail) return

  const children = Array.from(rail.children) as HTMLElement[]
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

const handleResize = () => {
  centerSlide(activeIndex.value, 'auto')
  updateActiveIndex()
}

onMounted(() => {
  nextTick(() => {
    centerSlide(0, 'auto')
    updateActiveIndex()
  })
  railRef.value?.addEventListener('scroll', updateActiveIndex, { passive: true })
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  railRef.value?.removeEventListener('scroll', updateActiveIndex)
  window.removeEventListener('resize', handleResize)
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
            v-for="(profile, index) in profiles"
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
