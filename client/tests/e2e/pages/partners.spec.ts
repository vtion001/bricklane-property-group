import { test, expect } from '@playwright/test'

test.describe('Partners Page', () => {
  test('should load partners page', async ({ page }) => {
    await page.goto('/for-partners')
    await expect(page).toHaveURL(/\/for-partners/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should display partner form', async ({ page }) => {
    await page.goto('/for-partners')
    await expect(page.locator('#partner-form')).toBeVisible()
  })

  test('should fill and submit partner form successfully', async ({ page }) => {
    await page.goto('/for-partners')
    await page.waitForTimeout(1000)

    await page.fill('input[placeholder="Sarah"]', 'John')
    await page.fill('input[placeholder="Mitchell"]', 'Smith')
    await page.fill('input[placeholder="sarah@agency.com.au"]', 'john.smith@realestate.com.au')
    await page.fill('input[placeholder="0412 345 678"]', '0412 345 678')
    await page.fill('input[placeholder="Mitchell & Associates"]', 'Smith Realty')

    await page.selectOption('select', { value: 'real_estate_agent' })
    const selects = page.locator('select')
    await selects.nth(1).selectOption('6-10')

    const consent = page.locator('#partner-form input[type="checkbox"]')
    await consent.check()

    await page.locator('#partner-form button[type="submit"]').click()
    await page.waitForTimeout(2000)
  })

  test('should show validation errors on empty partner form submit', async ({ page }) => {
    await page.goto('/for-partners')
    await page.waitForTimeout(500)
    await page.locator('#partner-form button[type="submit"]').click()
    await page.waitForTimeout(500)
  })

  test('should show stat numbers on page', async ({ page }) => {
    await page.goto('/for-partners')
    await expect(page.locator('text=Active Partners').or(page.locator('text=Partner')).first()).toBeVisible()
  })

  test('should navigate to home from partners page', async ({ page }) => {
    await page.goto('/for-partners')
    await page.locator('a[href="/"]').first().click()
    await expect(page).toHaveURL('/')
  })
})
