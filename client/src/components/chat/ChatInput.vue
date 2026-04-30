<template>
  <div class="p-3 border-t border-gray-100 bg-white">
    <form @submit.prevent="handleSend" class="flex items-center gap-2">
      <input
        v-model="input"
        type="text"
        placeholder="Type a message..."
        class="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full font-body text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
      />
      <button
        type="submit"
        :disabled="!input.trim()"
        class="w-10 h-10 bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors flex-shrink-0"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ send: [text: string] }>()
const input = ref('')

const handleSend = () => {
  if (!input.value.trim()) return
  emit('send', input.value.trim())
  input.value = ''
}
</script>
