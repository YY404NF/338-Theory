<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import HeroPanel from './components/HeroPanel.vue'
import CorePanel from './components/CorePanel.vue'
import FactorPanel from './components/FactorPanel.vue'
import ProfilesPanel from './components/ProfilesPanel.vue'
import NotesPanel from './components/NotesPanel.vue'
import QuizOverlay from './components/QuizOverlay.vue'
import { buildQuizSummary, quizQuestions } from './utils/quiz'
import type { Profile, QuizKey } from './utils/types'

const profiles: Profile[] = [
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
]

const core = {
  title: '185 + 90 + 45 + 18',
  founder: '马户',
  link: 'https://space.bilibili.com/228105707',
  linkText: '查看原典来源',
}

const factors = [
  {
    key: 'height',
    title: '📏 垂直基线',
    description: '男性垂直维度的第一道门槛，强调轮廓、站姿与第一眼的空间占有率。',
  },
  {
    key: 'weight',
    title: '⚖️ 质量密度',
    descriptionPrefix: '围绕 BMI 黄金比例推导出的',
    highlight: '理想质量参数',
    descriptionSuffix: '，强调稳定感、厚度与存在感。',
  },
  {
    key: 'shoeSize',
    title: '👞 支撑幅面',
    description: '关于底盘与支撑系统的象征性指标，代表重心、步态与整体落点。',
  },
  {
    key: 'factor18',
    title: '🔮 隐性变量',
    description: '更难被量化的部分通常被归入这一层面：',
    speculations: [
      '时间维度：个体生存时长达到某条心理阈值',
      '代际特征：与某一时间切片有关的集体印象',
      '特殊参数：关于 18 的全部神秘联想与误读',
    ] as const,
  },
] as const

const isQuizOpen = ref(false)
const activeField = ref<QuizKey>('height')
const hasSubmittedQuiz = ref(false)

const quizForm = reactive<Record<QuizKey, string>>({
  height: '',
  weight: '',
  shoeSize: '',
  factor18: '',
})

const sortedProfiles = computed(() =>
  [...(profiles as Profile[])].sort((left, right) => {
    const [leftDatePart = ''] = left.date.split(' ')
    const [rightDatePart = ''] = right.date.split(' ')
    const leftDate = new Date(leftDatePart.replace(/\./g, '-')).getTime()
    const rightDate = new Date(rightDatePart.replace(/\./g, '-')).getTime()
    return rightDate - leftDate
  }),
)

const quizSummary = computed(() => buildQuizSummary(quizForm))

const factorCards = computed(() =>
  factors.map((factor) => ({
    ...factor,
    result: hasSubmittedQuiz.value ? quizSummary.value.dimensions[factor.key as QuizKey] : null,
  })),
)

const canSubmitQuiz = computed(() => quizQuestions.every((question) => quizForm[question.key].length > 0))

const scrollToPanel = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const openQuiz = () => {
  activeField.value = 'height'
  isQuizOpen.value = true
}

const closeQuiz = () => {
  isQuizOpen.value = false
}

const selectField = (key: QuizKey) => {
  activeField.value = key
}

const appendDigit = (digit: string) => {
  const current = quizForm[activeField.value]
  if (current.length >= 3) return
  quizForm[activeField.value] = current === '0' ? digit : `${current}${digit}`
}

const removeDigit = () => {
  quizForm[activeField.value] = quizForm[activeField.value].slice(0, -1)
}

const clearActiveField = () => {
  quizForm[activeField.value] = ''
}

const submitQuiz = () => {
  if (!canSubmitQuiz.value) return
  hasSubmittedQuiz.value = true
  isQuizOpen.value = false
  scrollToPanel('factors-panel')
}
</script>

<template>
  <main class="snap-shell">
    <HeroPanel
      @open-quiz="openQuiz"
      @view-theory="scrollToPanel('core-panel')"
    />
    <CorePanel
      id="core-panel"
      :core="core"
    />
    <FactorPanel
      id="factors-panel"
      :factors="factorCards"
      :global-messages="hasSubmittedQuiz ? quizSummary.globalMessages : []"
      :matched-count="hasSubmittedQuiz ? quizSummary.matchedCount : null"
      :show-results="hasSubmittedQuiz"
    />
    <ProfilesPanel
      id="profiles-panel"
      :profiles="sortedProfiles"
    />
    <NotesPanel id="notes-panel" />
  </main>

  <QuizOverlay
    :active-field="activeField"
    :form="quizForm"
    :is-open="isQuizOpen"
    :questions="quizQuestions"
    :can-submit="canSubmitQuiz"
    @close="closeQuiz"
    @select-field="selectField"
    @append-digit="appendDigit"
    @remove-digit="removeDigit"
    @clear-field="clearActiveField"
    @submit="submitQuiz"
  />
</template>
