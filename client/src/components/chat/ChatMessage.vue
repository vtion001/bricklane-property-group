<template>
  <div :class="['flex gap-2', message.role === 'user' ? 'flex-row-reverse' : 'flex-row']">
    <div :class="['w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
      message.role === 'user' ? 'bg-primary' : 'bg-gray-200']">
      <span class="text-xs font-bold" :class="message.role === 'user' ? 'text-white' : 'text-text-muted'">
        {{ message.role === 'user' ? 'Y' : 'B' }}
      </span>
    </div>
    <div :class="['max-w-[75%] rounded-2xl px-4 py-2.5',
      message.role === 'user'
        ? 'bg-primary text-white rounded-tr-sm'
        : 'bg-white text-text-main border border-gray-100 rounded-tl-sm shadow-sm']">
      <p class="font-body text-sm whitespace-pre-wrap break-words">{{ message.content }}</p>
      <span class="text-xs mt-1 block" :class="message.role === 'user' ? 'text-white/60' : 'text-text-muted'">
        {{ formatTime(message.timestamp) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/types'

defineProps<{ message: ChatMessage }>()

const formatTime = (ts: string) => {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>
