import { type Page } from '@playwright/test'

export const MOCK_LEADS = [
  {
    id: 1,
    first_name: 'Sarah',
    last_name: 'Mitchell',
    email: 'sarah.mitchell@example.com',
    phone: '0412 345 678',
    type: 'partner',
    status: 'new',
    source: '/for-partners',
    company_name: 'Mitchell & Associates',
    message: 'Interested in partnership opportunities.',
    created_at: '2026-04-28T10:30:00Z',
    updated_at: '2026-04-28T10:30:00Z',
  },
  {
    id: 2,
    first_name: 'James',
    last_name: 'Thompson',
    email: 'james.thompson@example.com',
    phone: '0421 987 654',
    type: 'landlord',
    status: 'contacted',
    source: '/for-landlords',
    property_address: '12 Smith Street, Sydney NSW 2000',
    message: 'Need rental appraisal for my investment property.',
    created_at: '2026-04-27T14:15:00Z',
    updated_at: '2026-04-28T09:00:00Z',
  },
  {
    id: 3,
    first_name: 'Emily',
    last_name: 'Chen',
    email: 'emily.chen@example.com',
    phone: '0403 111 222',
    type: 'contact',
    status: 'qualified',
    source: '/contact',
    message: 'General inquiry about property management fees.',
    created_at: '2026-04-26T11:00:00Z',
    updated_at: '2026-04-27T16:30:00Z',
  },
  {
    id: 4,
    first_name: 'Robert',
    last_name: 'Williams',
    email: 'r.williams@example.com',
    phone: '0432 555 666',
    type: 'partner',
    status: 'converted',
    source: '/for-partners',
    company_name: 'Williams Financial',
    message: 'Mortgage broker looking to partner.',
    created_at: '2026-04-20T09:45:00Z',
    updated_at: '2026-04-25T14:00:00Z',
  },
  {
    id: 5,
    first_name: 'Lisa',
    last_name: 'Brown',
    email: 'lisa.brown@example.com',
    phone: '0444 777 888',
    type: 'landlord',
    status: 'lost',
    source: '/for-landlords',
    property_address: '88 Harbour St, Sydney NSW 2000',
    message: 'Requesting info but decided not to proceed.',
    created_at: '2026-04-15T13:20:00Z',
    updated_at: '2026-04-22T10:00:00Z',
  },
]

export const MOCK_LEAD_EVENTS = [
  { id: 1, lead_id: 1, event: 'Lead created', event_data: null, created_at: '2026-04-28T10:30:00Z', bg: 'bg-primary/10', color: 'text-primary' },
  { id: 2, lead_id: 1, event: 'Status changed to contacted', event_data: '{"status":"contacted"}', created_at: '2026-04-28T11:00:00Z', bg: 'bg-secondary/10', color: 'text-secondary' },
  { id: 3, lead_id: 1, event: 'Status changed to qualified', event_data: '{"status":"qualified"}', created_at: '2026-04-29T09:15:00Z', bg: 'bg-green-50', color: 'text-green-600' },
]

export function mockApiRoutes(page: Page) {
  page.route('**/api/v1/leads*', async (route) => {
    const url = new URL(route.request().url())
    const search = url.searchParams.get('search') || ''
    const filtered = search
      ? MOCK_LEADS.filter(l =>
          l.first_name.toLowerCase().includes(search.toLowerCase()) ||
          l.last_name.toLowerCase().includes(search.toLowerCase()) ||
          l.email.toLowerCase().includes(search.toLowerCase())
        )
      : MOCK_LEADS
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: {
        success: true,
        data: filtered,
        meta: { page: 1, per_page: 20, total: filtered.length },
      },
    })
  })

  page.route(/\/api\/v1\/leads\/\d+/, async (route) => {
    const url = route.request().url()
    const id = parseInt(url.split('/').pop() || '1', 10)
    const lead = MOCK_LEADS.find(l => l.id === id) || MOCK_LEADS[0]
    const events = id === 1 ? MOCK_LEAD_EVENTS : []
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: { success: true, data: { ...lead, events } },
    })
  })

  page.route('**/api/v1/settings', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: {
          success: true,
          data: {
            calendly_url: 'https://calendly.com/bpg',
            ai_provider: 'mock',
            recaptcha_site_key: '',
            ai_api_key: '',
          },
        },
      })
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: { success: true },
      })
    }
  })

  page.route('**/api/v1/ai/chat', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: {
        success: true,
        data: {
          reply: 'Thanks for reaching out! Our team will get back to you shortly.',
          session_id: 'mock-session-123',
        },
      },
    })
  })

  page.route(/\/api\/v1\/forms\/(partner|landlord|contact)/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: { success: true, data: { lead_id: Math.floor(Math.random() * 1000) + 100 } },
    })
  })
}
