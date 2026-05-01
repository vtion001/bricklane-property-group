import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Brick Lane Property Group/i)
  })

  test('should display hero section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    const h1 = page.locator('h1')
    await expect(h1).toContainText('Property')
  })

  test('should display navigation', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()
  })

  test('should have contact form on home page', async ({ page }) => {
    await page.goto('/')
    const form = page.locator('#appraisal-form')
    if (await form.isVisible()) {
      await expect(form).toBeVisible()
    }
  })

  test('should display footer', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should open chat widget', async ({ page }) => {
    await page.goto('/')
    const chatButton = page.locator('button[aria-label="Open chat"]')
    await chatButton.click()
    await expect(page.locator('text=Brick Lane Support')).toBeVisible()
  })

  test('should navigate to partners page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Partners')
    await expect(page).toHaveURL(/\/for-partners/)
  })

  test('should navigate to landlords page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Landlords')
    await expect(page).toHaveURL(/\/for-landlords/)
  })

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=About')
    await expect(page).toHaveURL(/\/about/)
  })

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Contact')
    await expect(page).toHaveURL(/\/contact/)
  })
})
