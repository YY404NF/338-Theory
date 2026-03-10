<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import HeroPanel from './components/HeroPanel.vue'
import CorePanel from './components/CorePanel.vue'
import FactorPanel from './components/FactorPanel.vue'
import ProfilesPanel from './components/ProfilesPanel.vue'
import NotesPanel from './components/NotesPanel.vue'
import QuizOverlay from './components/QuizOverlay.vue'
import profiles from './data/profiles.json'
import theoryData from './data/theory.json'
import { buildQuizSummary, quizQuestions } from './utils/quiz'
import type { Profile, QuizKey } from './utils/types'

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
  theoryData.factors.map((factor) => ({
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
      :core="theoryData.core"
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
