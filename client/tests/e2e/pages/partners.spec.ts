import { test, expect } from '@playwright/test'

test.describe('Partners Page', () => {
  test('should load partners page', async ({ page }) => {
    await page.goto('/for-partners')
    await expect(page.locator('h1')).toContainText('Partnership')
  })

  test('should display partner form', async ({ page }) => {
    await page.goto('/for-partners')
    const form = page.locator('#partner-form')
    await expect(form).toBeVisible()
  })

  test('should validate partner form fields', async ({ page }) => {
    await page.goto('/for-partners')
    const submitBtn = page.locator('#partner-form button[type="submit"]')
    await submitBtn.click()
    const firstNameInput = page.locator('input[type="text"]').first()
    await expect(firstNameInput).toBeVisible()
  })

  test('should show stat numbers', async ({ page }) => {
    await page.goto('/for-partners')
    await expect(page.locator('text=Active Partners')).toBeVisible()
    await expect(page.locator('text=Commissions Paid')).toBeVisible()
  })
})
