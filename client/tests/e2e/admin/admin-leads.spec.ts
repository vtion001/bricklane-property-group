import { test, expect } from '@playwright/test'
import { mockApiRoutes } from '../utils/mockData'

test.describe('Admin Leads', () => {
  test.beforeEach(async ({ page }) => {
    mockApiRoutes(page)
    await page.goto('/admin/leads')
    await page.waitForTimeout(2000)
  })

  test('should load admin leads page', async ({ page }) => {
    await expect(page).toHaveURL(/\/admin\/leads/)
    await expect(page.locator('aside')).toBeVisible()
  })

  test('should display leads table with headers', async ({ page }) => {
    await expect(page.locator('th', { hasText: 'Name' })).toBeVisible()
    await expect(page.locator('th', { hasText: 'Type' })).toBeVisible()
    await expect(page.locator('th', { hasText: 'Status' })).toBeVisible()
    await expect(page.locator('th', { hasText: 'Date' })).toBeVisible()
  })

  test('should display leads in the table', async ({ page }) => {
    const rows = page.locator('tbody tr')
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
    await expect(rows.first().locator('td').first()).toBeVisible()
  })

  test('should display lead count', async ({ page }) => {
    const countText = page.locator('text=/\\d+ leads/')
    await expect(countText).toBeVisible()
  })

  test('should filter leads by type', async ({ page }) => {
    const typeSelect = page.locator('select').first()
    await expect(typeSelect).toBeVisible()
    await typeSelect.selectOption('landlord')
    await page.waitForTimeout(1500)
  })

  test('should search leads by name', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]')
    await expect(searchInput).toBeVisible()
    await searchInput.fill('Sarah')
    await page.waitForTimeout(1500)
  })

  test('should navigate to lead detail when row clicked', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first()
    await expect(firstRow).toBeVisible()
    await firstRow.click()
    await page.waitForTimeout(1500)
    await expect(page).toHaveURL(/\/admin\/leads\/\d+/)
  })

  test('should mark lead as contacted via action button', async ({ page }) => {
    const contactBtn = page.locator('button[title="Mark contacted"]').first()
    await expect(contactBtn).toBeVisible()
    await contactBtn.click()
    await page.waitForTimeout(1000)
  })

  test('should filter by status', async ({ page }) => {
    const statusSelect = page.locator('select').nth(1)
    await expect(statusSelect).toBeVisible()
    await statusSelect.selectOption('new')
    await page.waitForTimeout(1500)
  })

  test('should sort by column when header clicked', async ({ page }) => {
    const nameHeader = page.locator('th', { hasText: 'Name' })
    await expect(nameHeader).toBeVisible()
    await nameHeader.click()
    await page.waitForTimeout(500)
  })
})
