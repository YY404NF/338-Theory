<script setup lang="ts">
import type { QuizKey, QuizQuestion } from '../utils/types'

defineProps<{
  isOpen: boolean
  activeField: QuizKey
  form: Record<QuizKey, string>
  questions: QuizQuestion[]
  canSubmit: boolean
}>()

defineEmits<{
  close: []
  selectField: [key: QuizKey]
  appendDigit: [digit: string]
  removeDigit: []
  clearField: []
  submit: []
}>()

const keypadRows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['清空', '0', '删除'],
]
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="quiz-overlay" @click.self="$emit('close')">
      <section class="quiz-sheet">
        <div class="quiz-header quiz-header-center">
          <h2 class="quiz-title">测测我是不是338</h2>
        </div>

        <div class="quiz-box-grid">
          <button
            v-for="question in questions"
            :key="question.key"
            class="quiz-box"
            :class="{ 'quiz-box-active': activeField === question.key }"
            type="button"
            @click="$emit('selectField', question.key)"
          >
            <span class="quiz-box-label">{{ question.emoji }} {{ question.label }}</span>
            <strong class="quiz-box-value">
              {{ form[question.key] || '--' }} {{ question.unit }}
            </strong>
          </button>
        </div>

        <div class="keypad">
          <div v-for="row in keypadRows" :key="row.join('-')" class="keypad-row">
            <button
              v-for="key in row"
              :key="key"
              class="keypad-key"
              :class="{ 'keypad-key-action': key === '清空' || key === '删除' }"
              type="button"
              @click="
                key === '删除'
                  ? $emit('removeDigit')
                  : key === '清空'
                    ? $emit('clearField')
                    : $emit('appendDigit', key)
              "
            >
              {{ key }}
            </button>
          </div>
        </div>

        <button
          class="primary-button primary-button-full"
          :disabled="!canSubmit"
          type="button"
          @click="$emit('submit')"
        >
          测一测
        </button>
      </section>
    </div>
  </Teleport>
</template>
