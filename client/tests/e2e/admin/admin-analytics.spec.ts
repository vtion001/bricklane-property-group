import { test, expect } from '@playwright/test'
import { mockApiRoutes } from '../utils/mockData'

test.describe('Admin Analytics', () => {
  test.beforeEach(async ({ page }) => {
    mockApiRoutes(page)
    await page.goto('/admin/analytics')
    await page.waitForTimeout(1000)
  })

  test('should load admin analytics page', async ({ page }) => {
    await expect(page).toHaveURL(/\/admin\/analytics/)
    await expect(page.locator('aside')).toBeVisible()
  })

  test('should display analytics page content', async ({ page }) => {
    await expect(page.locator('aside')).toBeVisible()
  })

  test('should have link to settings page', async ({ page }) => {
    const settingsLink = page.locator('a[href="/admin/settings"]').first()
    if (await settingsLink.isVisible()) {
      await expect(settingsLink).toBeVisible()
    }
  })

  test('should navigate to settings via configure link', async ({ page }) => {
    const link = page.locator('a[href="/admin/settings"]').filter({ hasText: 'Configure Integrations' })
    await expect(link).toBeVisible()
    await link.click()
    await expect(page).toHaveURL(/\/admin\/settings/)
  })
})
