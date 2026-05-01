import axios, { type AxiosError } from 'axios'
import type {
  ApiResponse,
  Lead,
  PartnerFormData,
  LandlordFormData,
  ContactFormData,
  SiteSettings,
  ChatResponse,
  AppraisalResponse,
} from '@/types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse>) => {
    if (error.response?.status === 429) {
      console.warn('Rate limited — please wait before trying again')
    }
    return Promise.reject(error)
  }
)

// --- Lead CRUD ---

export const getLeads = (page = 1, search?: string) =>
  api.get<ApiResponse<Lead[]>>('/leads', { params: { page, search } }).then(r => r.data)

export const getLead = (id: number) =>
  api.get<ApiResponse<Lead & { events: unknown[] }>>(`/leads/${id}`).then(r => r.data)

export const updateLead = (id: number, data: Partial<Lead>) =>
  api.patch<ApiResponse<Lead>>(`/leads/${id}`, data).then(r => r.data)

export const deleteLead = (id: number) =>
  api.delete<ApiResponse<void>>(`/leads/${id}`).then(r => r.data)

// --- Form Submissions ---

export const submitPartnerForm = (data: PartnerFormData) =>
  api.post<ApiResponse<{ lead_id: number }>>('/forms/partner', data).then(r => r.data)

export const submitLandlordForm = (data: LandlordFormData) =>
  api.post<ApiResponse<{ lead_id: number }>>('/forms/landlord', data).then(r => r.data)

export const submitContactForm = (data: ContactFormData) =>
  api.post<ApiResponse<{ lead_id: number }>>('/forms/contact', data).then(r => r.data)

// --- AI Chat ---

export const chatWithAi = (message: string, sessionId?: string) =>
  api.post<ApiResponse<ChatResponse>>('/ai/chat', { message, session_id: sessionId }).then(r => r.data)

export const streamAi = (message: string, sessionId: string) =>
  `${import.meta.env.VITE_API_BASE_URL}/ai/stream/${sessionId}?message=${encodeURIComponent(message)}`

// --- Analytics ---

export const trackAnalyticsEvent = (event: string, properties?: Record<string, unknown>) =>
  api.post('/analytics/event', { event, properties }).then(r => r.data)

// --- Settings ---

export const getSettings = () =>
  api.get<ApiResponse<SiteSettings>>('/settings').then(r => r.data)

export const updateSettings = (data: Partial<SiteSettings>) =>
  api.put<ApiResponse<void>>('/settings', data).then(r => r.data)

// --- Appraisal ---

export const routeAppraisal = (propertyAddress: string) =>
  api.post<ApiResponse<AppraisalResponse>>('/appraisal/route', { property_address: propertyAddress }).then(r => r.data)

// Aliases for form components and chat widget
export const postPartnerLead = submitPartnerForm
export const postLandlordLead = submitLandlordForm
export const postContactLead = submitContactForm
export const postAiChat = chatWithAi

export default api
