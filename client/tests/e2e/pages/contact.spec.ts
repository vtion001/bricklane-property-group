import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test('should load contact page with heading', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should display contact form', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('input[type="email"]').first()).toBeVisible()
  })

  test('should fill and submit contact form successfully', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForTimeout(1000)

    await page.fill('input[placeholder="Your first name"]', 'Alex')
    await page.fill('input[placeholder="Your last name"]', 'Johnson')
    await page.fill('input[placeholder="you@example.com.au"]', 'alex.johnson@example.com.au')
    await page.fill('input[placeholder="0412 345 678"]', '0412 987 654')

    const subjectSelect = page.locator('select').first()
    await subjectSelect.selectOption('property_management')

    await page.fill('textarea', 'I would like to learn more about your property management services.')
    await page.locator('input[type="checkbox"]').check()

    await page.locator('button[type="submit"]').click()
    await page.waitForTimeout(2000)
  })

  test('should display office information', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('h4:has-text("Sydney (HQ)")').first()).toBeVisible()
  })

  test('should validate email format on submit', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForTimeout(500)
    await page.fill('input[placeholder="you@example.com.au"]', 'not-an-email')
    await page.locator('button[type="submit"]').click()
    await page.waitForTimeout(500)
  })
})
