const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export const initGA = () => {
  if (!GA_ID) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { page_path: window.location.pathname })
}

export const trackEvent = (event: string, params?: Record<string, unknown>) => {
  if (window.gtag && GA_ID) {
    window.gtag('event', event, params)
  }
  if (import.meta.env.DEV) {
    console.log('[GA4]', event, params)
  }
}

export const trackPageView = (path: string, title?: string) => {
  if (window.gtag && GA_ID) {
    window.gtag('event', 'page_view', { page_path: path, page_title: title })
  }
}
