import { defineStore } from 'pinia'
import { ref } from 'vue'
import { chatWithAi } from '@/services/api'
import type { ChatMessage } from '@/types'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  const sessionId = ref('')
  const loading = ref(false)
  const isOpen = ref(false)

  const welcomeMessage: ChatMessage = {
    id: 'welcome',
    role: 'assistant',
    content: "Hi there! Welcome to Brick Lane Property Group. How can I help you today? Feel free to ask about our landlord services, partnership programs, or book a free consultation.",
    timestamp: new Date(),
  }

  function init() {
    if (messages.value.length === 0) {
      messages.value.push(welcomeMessage)
    }
  }

  async function sendMessage(content: string) {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    }
    messages.value.push(userMsg)
    loading.value = true

    try {
      const result = await chatWithAi(content, sessionId.value || undefined)
      if (result.data?.session_id) {
        sessionId.value = result.data.session_id
      }
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: result.data?.reply || "I'm here to help!",
        timestamp: new Date(),
      }
      messages.value.push(assistantMsg)
    } catch {
      messages.value.push({
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please call us at (02) 9123 4567 or email info@bricklanepropertygroup.com.au.",
        timestamp: new Date(),
      })
    } finally {
      loading.value = false
    }
  }

  function toggle() {
    isOpen.value = !isOpen.value
    if (isOpen.value) init()
  }

  function open() {
    isOpen.value = true
    init()
  }

  function close() {
    isOpen.value = false
  }

  function reset() {
    messages.value = []
    sessionId.value = ''
  }

  return { messages, sessionId, loading, isOpen, sendMessage, toggle, open, close, reset }
})
