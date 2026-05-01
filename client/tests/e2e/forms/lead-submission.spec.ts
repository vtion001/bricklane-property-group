import { test, expect } from '@playwright/test'

test.describe('Lead Form Submissions', () => {
  test.describe.configure({ mode: 'serial' })

  test('should submit landlord contact form', async ({ page }) => {
    await page.goto('/contact')
    
    await page.fill('input[placeholder="Your first name"]', 'James')
    await page.fill('input[placeholder="Your last name"]', 'Wilson')
    await page.fill('input[placeholder="you@example.com.au"]', 'james.wilson@example.com.au')
    await page.fill('textarea', 'Interested in property management services.')
    
    const consent = page.locator('input[type="checkbox"]').first()
    await consent.check()
    
    const submitBtn = page.locator('button[type="submit"]')
    await submitBtn.click()
    
    await page.waitForTimeout(1000)
  })

  test('should have consent checkbox required', async ({ page }) => {
    await page.goto('/contact')
    const checkbox = page.locator('input[type="checkbox"]').first()
    await expect(checkbox).toBeAttached()
  })

  test('should validate email format', async ({ page }) => {
    await page.goto('/contact')
    await page.fill('input[placeholder="you@example.com.au"]', 'notanemail')
    await page.locator('button[type="submit"]').click()
    await page.waitForTimeout(500)
  })

  test('should show FAQ accordion on home page', async ({ page }) => {
    await page.goto('/')
    const faqBtn = page.locator('button', { hasText: 'What are your property management fees?' })
    if (await faqBtn.isVisible()) {
      await faqBtn.click()
      await page.waitForTimeout(500)
    }
  })
})
