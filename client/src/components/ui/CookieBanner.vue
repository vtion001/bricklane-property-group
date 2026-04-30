<template>
  <Transition name="slide-up">
    <div v-if="visible"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div class="section-container flex flex-col md:flex-row items-center gap-4">
        <p class="text-sm text-text-main font-body flex-1">
          We use cookies to enhance your experience. By continuing, you agree to our
          <a href="#" class="text-primary hover:underline cursor-pointer">Cookie Policy</a>.
        </p>
        <div class="flex gap-3">
          <button class="text-sm text-text-muted hover:text-text-main transition-colors cursor-pointer"
            @click="decline">Decline</button>
          <button class="btn-primary text-sm py-2 px-4" @click="accept">Accept All</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  const consent = localStorage.getItem('cookie-consent')
  if (!consent) {
    visible.value = true
  }
})

const accept = () => {
  localStorage.setItem('cookie-consent', 'accepted')
  visible.value = false
}

const decline = () => {
  localStorage.setItem('cookie-consent', 'declined')
  visible.value = false
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(100%); }
</style>
