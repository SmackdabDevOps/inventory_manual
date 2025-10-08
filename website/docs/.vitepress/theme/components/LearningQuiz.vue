<template>
  <section class="quiz-card">
    <header class="quiz-card__header">
      <span class="quiz-card__eyebrow">{{ heading }}</span>
      <p class="quiz-card__question">{{ question }}</p>
    </header>

    <ul class="quiz-card__options" role="list">
      <li v-for="(option, index) in options" :key="option" class="quiz-card__option">
        <button
          type="button"
          class="quiz-card__button"
          :class="{
            'quiz-card__button--selected': selectedIndex === index,
            'quiz-card__button--correct': reveal && index === answerIndex,
            'quiz-card__button--incorrect': reveal && selectedIndex === index && index !== answerIndex
          }"
          @click="selectOption(index)"
        >
          <span class="quiz-card__bullet">{{ String.fromCharCode(65 + index) }}.</span>
          <span class="quiz-card__label">{{ option }}</span>
        </button>
      </li>
    </ul>

    <div v-if="reveal" class="quiz-card__feedback" role="status">
      <strong class="quiz-card__feedback-title">
        {{ isCorrect ? 'Nice! That is right.' : 'Not quite. Try to remember:' }}
      </strong>
      <p v-if="activeExplanation" class="quiz-card__explanation">
        {{ activeExplanation }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  question: string
  options: string[]
  answerIndex: number
  explanations?: string[]
  heading?: string
}>()

const selectedIndex = ref<number | null>(null)
const reveal = computed(() => selectedIndex.value !== null)
const isCorrect = computed(() => selectedIndex.value === props.answerIndex)

const activeExplanation = computed(() => {
  if (selectedIndex.value === null) return ''
  const idx = selectedIndex.value
  const pool = props.explanations ?? []
  if (pool[idx]) return pool[idx]
  if (pool[props.answerIndex]) return pool[props.answerIndex]
  return ''
})

const heading = computed(() => props.heading ?? 'Quick Check')

function selectOption(index: number) {
  selectedIndex.value = index
}
</script>
