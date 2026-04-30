import { defineStore } from 'pinia'
import { ref } from 'vue'
import { chatWithAi } from '@/services/api'
import type { ChatMessage } from '@/types'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  const sessionId = ref('')
  const isTyping = ref(false)
  const isOpen = ref(false)
  let msgCounter = 1

  const welcomeMessage: ChatMessage = {
    id: 'welcome',
    role: 'assistant',
    content: "Hi! I'm your BPG assistant. How can I help you today? I can answer questions about property management, landlord services, partner programs, or put you in touch with our team.",
    timestamp: new Date(),
  }

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    messages.value.push({
      id: `msg-${Date.now()}-${msgCounter++}`,
      role,
      content,
      timestamp: new Date(),
    })
  }

  const init = () => {
    if (messages.value.length === 0) {
      messages.value.push({ ...welcomeMessage, timestamp: new Date() })
    }
  }

  const sendMessage = async (text: string) => {
    addMessage('user', text)
    isTyping.value = true

    try {
      const result = await chatWithAi(text, sessionId.value || undefined)
      if (result.data?.session_id) {
        sessionId.value = result.data.session_id
      }
      addMessage('assistant', result.data?.reply || "Thanks for your message! Our team will get back to you shortly.")
    } catch {
      addMessage('assistant', "I'm having trouble connecting right now. Please try again or contact us directly at info@bricklanepropertygroup.com.au")
    } finally {
      isTyping.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
    sessionId.value = ''
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) init()
  }

  const open = () => {
    isOpen.value = true
    init()
  }

  const close = () => {
    isOpen.value = false
  }

  return { messages, sessionId, isTyping, isOpen, sendMessage, clearMessages, toggle, open, close }
})
