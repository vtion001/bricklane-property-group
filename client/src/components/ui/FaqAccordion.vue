<template>
  <div class="divide-y divide-gray-200 border-y border-gray-200">
    <div v-for="(item, i) in items" :key="i">
      <button
        class="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        @click="toggle(i)"
        :aria-expanded="openIndex === i"
      >
        <span class="font-body font-semibold text-text-main pr-4 group-hover:text-primary transition-colors">
          {{ item.question }}
        </span>
        <svg class="w-5 h-5 flex-shrink-0 text-primary transition-transform duration-200"
          :class="{ 'rotate-180': openIndex === i }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <Transition name="accordion">
        <div v-if="openIndex === i" class="pb-5">
          <p class="font-body text-text-muted leading-relaxed">{{ item.answer }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ items: { question: string; answer: string }[] }>()

const openIndex = ref<number | null>(null)

const toggle = (i: number) => {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<style scoped>
.accordion-enter-active, .accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.accordion-enter-from, .accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
.accordion-enter-to, .accordion-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
