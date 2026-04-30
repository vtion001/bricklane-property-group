export interface Lead {
  id: number
  full_name: string
  email: string
  contact_number: string
  form_type: 'partner' | 'landlord' | 'contact'
  property_address?: string
  tenancy_status?: 'tenanted' | 'untenanted'
  business_name?: string
  partner_type?: string
  message?: string
  source_page: string
  created_at: string
  updated_at?: string
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
  timestamp: Date
}

export interface SiteSettings {
  calendly_url: string
  ai_provider: 'openai' | 'anthropic' | 'tidio' | 'intercom' | 'mock'
  recaptcha_site_key: string
}

export interface PartnerFormData {
  full_name: string
  contact_number: string
  email: string
  business_name: string
  partner_type: string
  message?: string
  website_url: string
  source_page: string
}

export interface LandlordFormData {
  full_name: string
  contact_number: string
  email: string
  property_address: string
  tenancy_status?: string
  message?: string
  website_url: string
  source_page: string
}

export interface ContactFormData {
  full_name: string
  contact_number: string
  email: string
  message?: string
  website_url: string
  source_page: string
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
