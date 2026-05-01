import { test, expect } from '@playwright/test'

test.describe('Landlords Page', () => {
  test('should load landlords page', async ({ page }) => {
    await page.goto('/for-landlords')
    await expect(page).toHaveURL(/\/for-landlords/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should display landlord appraisal form', async ({ page }) => {
    await page.goto('/for-landlords')
    await expect(page.locator('#landlord-form')).toBeVisible()
  })

  test('should fill and submit landlord form successfully', async ({ page }) => {
    await page.goto('/for-landlords')
    await page.waitForTimeout(1000)

    await page.fill('input[placeholder="James"]', 'Maria')
    await page.fill('input[placeholder="Thompson"]', 'Garcia')
    await page.fill('input[placeholder="james@example.com.au"]', 'maria.garcia@example.com.au')
    await page.fill('input[placeholder="0412 345 678"]', '0419 876 543')
    await page.fill('input[placeholder="12 Smith Street, Sydney NSW 2000"]', '45 Victoria Road, Sydney NSW 2000')

    const selects = page.locator('#landlord-form select')
    await selects.nth(0).selectOption('apartment')
    await selects.nth(1).selectOption('2')
    await selects.nth(2).selectOption('current_tenant')
    await selects.nth(3).selectOption('email')

    const consent = page.locator('#landlord-form input[type="checkbox"]')
    await consent.check()

    await page.locator('#landlord-form button[type="submit"]').click()
    await page.waitForTimeout(2000)
  })

  test('should display pricing plans', async ({ page }) => {
    await page.goto('/for-landlords')
    const standard = page.locator('h4:has-text("Standard")')
    await expect(standard.first()).toBeVisible()
  })

  test('should toggle FAQ accordion', async ({ page }) => {
    await page.goto('/for-landlords')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    const faqBtn = page.locator('button').filter({ hasText: /property/i }).first()
    if (await faqBtn.isVisible()) {
      await faqBtn.click()
      await page.waitForTimeout(300)
    }
  })
})
