import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test('should load contact page', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('h1')).toContainText('Conversation')
  })

  test('should display contact form', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('input[type="email"]')).toBeVisible()
  })

  test('should display office information', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('text=Sydney')).toBeVisible()
    await expect(page.locator('text=(02) 9123 4568')).toBeVisible()
  })
})
