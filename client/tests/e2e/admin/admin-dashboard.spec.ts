import { test, expect } from '@playwright/test'
import { mockApiRoutes } from '../utils/mockData'

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    mockApiRoutes(page)
    await page.goto('/admin')
    await page.waitForTimeout(2000)
  })

  test('should load admin dashboard', async ({ page }) => {
    await expect(page).toHaveURL(/\/admin/)
  })

  test('should display sidebar navigation', async ({ page }) => {
    await expect(page.locator('aside')).toBeVisible()
    await expect(page.locator('text=Dashboard').first()).toBeVisible()
    await expect(page.locator('aside >> text=Leads').first()).toBeVisible()
    await expect(page.locator('text=Analytics')).toBeVisible()
    await expect(page.locator('aside >> text=Settings').first()).toBeVisible()
  })

  test('should display admin logo', async ({ page }) => {
    await expect(page.locator('text=Brick Lane').first()).toBeVisible()
  })

  test('should display stat cards with values', async ({ page }) => {
    await expect(page.locator('text=Total Leads')).toBeVisible()
    await expect(page.locator('text=This Month')).toBeVisible()
    await expect(page.locator('text=Conversion Rate')).toBeVisible()
    await expect(page.locator('text=Avg Response Time')).toBeVisible()
  })

  test('should display recent leads section', async ({ page }) => {
    await expect(page.locator('h3:has-text("Recent Leads")')).toBeVisible()
  })

  test('should display quick actions section', async ({ page }) => {
    await expect(page.locator('h3:has-text("Quick Actions")')).toBeVisible()
    await expect(page.locator('text=View All Leads').first()).toBeVisible()
    await expect(page.locator('text=Settings').first()).toBeVisible()
  })

  test('should navigate to leads page via sidebar', async ({ page }) => {
    await page.locator('aside a:has-text("Leads")').click()
    await expect(page).toHaveURL(/\/admin\/leads/)
  })

  test('should navigate to analytics page via sidebar', async ({ page }) => {
    await page.locator('aside a:has-text("Analytics")').click()
    await expect(page).toHaveURL(/\/admin\/analytics/)
  })

  test('should navigate to settings page via sidebar', async ({ page }) => {
    await page.locator('aside a:has-text("Settings")').click()
    await expect(page).toHaveURL(/\/admin\/settings/)
  })

  test('should navigate to leads page via View All link', async ({ page }) => {
    const viewAllLink = page.locator('a:has-text("View All")').first()
    await expect(viewAllLink).toBeVisible()
    await viewAllLink.click()
    await expect(page).toHaveURL(/\/admin\/leads/)
  })

  test('should display leads by status breakdown', async ({ page }) => {
    await expect(page.locator('h3:has-text("Leads by Status")')).toBeVisible()
  })
})
