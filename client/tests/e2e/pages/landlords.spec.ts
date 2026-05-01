import { test, expect } from '@playwright/test'

test.describe('Landlords Page', () => {
  test('should load landlords page', async ({ page }) => {
    await page.goto('/for-landlords')
    await expect(page.locator('h1')).toContainText('Property Management')
  })

  test('should display landlord appraisal form', async ({ page }) => {
    await page.goto('/for-landlords')
    const form = page.locator('#landlord-form')
    await expect(form).toBeVisible()
  })

  test('should display pricing plans', async ({ page }) => {
    await page.goto('/for-landlords')
    await expect(page.locator('text=Standard')).toBeVisible()
    await expect(page.locator('text=Premium')).toBeVisible()
  })
})
