export interface Lead {
  id: number
  full_name: string
  email: string
  contact_number: string
  form_type: 'partner' | 'landlord' | 'contact'
  status?: string
  property_address?: string
  tenancy_status?: 'tenanted' | 'untenanted'
  business_name?: string
  partner_type?: string
  message?: string
  source_page: string
  created_at: string
  updated_at?: string
  source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  events?: any[]
}

export interface LeadEvent {
  id: number
  lead_id: number
  event_type: string
  event_data: string | null
  created_at: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface SiteSettings {
  calendly_url: string
  ai_provider: 'openai' | 'anthropic' | 'tidio' | 'intercom' | 'mock'
  recaptcha_site_key: string
  ai_api_key?: string
}

export interface PartnerFormData {
  first_name: string
  last_name: string
  email: string
  phone: string
  company_name: string
  partner_type: string
  referral_count_per_month?: string
  message?: string
  consent: boolean
  recaptcha_token?: string
}

export interface LandlordFormData {
  first_name: string
  last_name: string
  email: string
  phone: string
  property_address: string
  property_type: string
  bedrooms: string
  rental_status: string
  estimated_value?: string
  preferred_contact_method?: string
  preferred_contact_time?: string
  message?: string
  consent: boolean
  recaptcha_token?: string
}

export interface ContactFormData {
  first_name: string
  last_name: string
  email: string
  phone?: string
  subject?: string
  message: string
  consent: boolean
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  meta?: {
    page: number
    per_page: number
    total: number
  }
  error?: {
    code: string
    message: string
    details?: Record<string, string>
  }
}

export interface ChatResponse {
  reply: string
  session_id: string
}

export interface AppraisalResponse {
  routed_to: string
  scheduling_url: string
  message: string
}
