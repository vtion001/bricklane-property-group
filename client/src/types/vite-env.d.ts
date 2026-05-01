/// <reference types="vite/client" />

declare module 'motion-vue' {
  import type { DefineComponent } from 'vue'
  interface MotionProps {
    initial?: Record<string, unknown>
    enter?: Record<string, unknown>
    leave?: Record<string, unknown>
    visible?: Record<string, unknown>
    hovered?: Record<string, unknown>
    pressed?: Record<string, unknown>
    class?: string
  }
  export const Motion: DefineComponent<MotionProps>
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_RECAPTCHA_SITE_KEY: string
  readonly VITE_GA_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
