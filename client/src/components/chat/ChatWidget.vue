<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <Transition name="panel">
      <div v-if="chat.isOpen" class="w-[360px] h-[520px] bg-bg rounded-2xl shadow-2xl border border-primary/10 flex flex-col overflow-hidden">
        <header class="bg-primary px-5 py-4 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-sm font-heading font-semibold text-white leading-none">BPG Assistant</h2>
              <p class="text-[11px] text-white/70 mt-0.5">Brick Lane Property Group</p>
            </div>
          </div>
          <button @click="chat.close()" class="text-white/70 hover:text-white transition-colors" aria-label="Close chat">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div ref="scrollEl" class="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-gray-50/50">
          <ChatMessage v-for="msg in chat.messages" :key="msg.id" :message="msg" />
          <div v-if="chat.isTyping" class="flex gap-3">
            <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
              <span class="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>

        <div class="px-4 py-3 border-t border-gray-100 bg-white shrink-0">
          <ChatInput :disabled="chat.isTyping" @submit="handleSend" />
        </div>
      </div>
    </Transition>

    <Transition name="fab">
      <button v-if="!chat.isOpen" @click="chat.open()"
        class="w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"
        aria-label="Open chat">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useChatStore } from '@/stores/chat'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'

const chat = useChatStore()
const scrollEl = ref<HTMLElement | null>(null)

watch(() => chat.messages.length, async () => {
  await nextTick()
  if (scrollEl.value) {
    scrollEl.value.scrollTop = scrollEl.value.scrollHeight
  }
})

const handleSend = (text: string) => {
  chat.sendMessage(text)
}
</script>

<style scoped>
.panel-enter-active, .panel-leave-active { transition: all 0.3s ease; }
.panel-enter-from, .panel-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }

.fab-enter-active, .fab-leave-active { transition: all 0.3s ease; }
.fab-enter-from, .fab-leave-to { opacity: 0; transform: scale(0.8); }
</style>
