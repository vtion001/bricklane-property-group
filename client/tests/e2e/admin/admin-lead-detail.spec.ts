import { test, expect } from '@playwright/test'
import { mockApiRoutes } from '../utils/mockData'

test.describe('Admin Lead Detail', () => {
  test.beforeEach(async ({ page }) => {
    mockApiRoutes(page)
    await page.goto('/admin/leads/1')
    await page.waitForTimeout(2000)
  })

  test('should load lead detail page', async ({ page }) => {
    await expect(page).toHaveURL(/\/admin\/leads\/\d+/)
    await expect(page.locator('aside')).toBeVisible()
  })

  test('should display lead name in heading', async ({ page }) => {
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('Sarah Mitchell')
  })

  test('should display contact information section', async ({ page }) => {
    await expect(page.locator('h3:has-text("Contact Information")')).toBeVisible()
    await expect(page.locator('text=sarah.mitchell@example.com')).toBeVisible()
  })

  test('should display activity timeline', async ({ page }) => {
    await expect(page.locator('h3:has-text("Activity Timeline")')).toBeVisible()
  })

  test('should display lead details sidebar', async ({ page }) => {
    await expect(page.locator('h3:has-text("Details")')).toBeVisible()
    await expect(page.locator('text=Created').nth(1)).toBeVisible()
  })

  test('should display quick actions', async ({ page }) => {
    await expect(page.locator('h3:has-text("Quick Actions")')).toBeVisible()
  })

  test('should have back to leads button', async ({ page }) => {
    await page.goto('/admin/leads')
    await page.waitForTimeout(1000)
    const firstRow = page.locator('table tbody tr').first()
    await firstRow.click()
    await page.waitForTimeout(2000)
    await expect(page).toHaveURL(/\/admin\/leads\/\d+/)
    const backBtn = page.locator('button:has-text("Back to Leads")')
    await expect(backBtn).toBeVisible()
    await backBtn.click()
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/\/admin\/leads/)
  })

  test('should display status badge', async ({ page }) => {
    const statusBadge = page.locator('.inline-flex.rounded-full >> text=new').first()
    await expect(statusBadge).toBeVisible()
  })

  test('should display source info', async ({ page }) => {
    await expect(page.locator('text=Source:')).toBeVisible()
  })

  test('should change lead status via dropdown', async ({ page }) => {
    const statusSelect = page.locator('select').first()
    await expect(statusSelect).toBeVisible()
    await statusSelect.selectOption('contacted')
    await page.waitForTimeout(1000)
  })

  test('should display email and phone in contact info', async ({ page }) => {
    await expect(page.locator('text=sarah.mitchell@example.com')).toBeVisible()
    await expect(page.locator('text=0412 345 678')).toBeVisible()
  })
})
