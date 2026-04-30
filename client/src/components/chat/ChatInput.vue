<template>
  <form @submit.prevent="submit" class="flex items-end gap-2">
    <textarea
      v-model="input"
      ref="inputRef"
      rows="1"
      placeholder="Type your message..."
      class="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white"
      :disabled="disabled"
      @input="autoResize"
      @keydown.enter.exact.prevent="submit"
    />
    <button
      type="submit"
      :disabled="!input.trim() || disabled"
      class="shrink-0 w-10 h-10 bg-primary rounded-xl flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      aria-label="Send message">
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ submit: [text: string] }>()

const input = ref('')
const inputRef = ref<HTMLTextAreaElement | null>(null)
const props = defineProps<{ disabled?: boolean }>()

const submit = () => {
  const text = input.value.trim()
  if (!text || props.disabled) return
  emit('submit', text)
  input.value = ''
  if (inputRef.value) {
    inputRef.value.style.height = 'auto'
  }
}

const autoResize = () => {
  const el = inputRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}
</script>
