import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should display hero section with correct heading', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1')
    await expect(h1).toContainText('Maximize Your Property Returns')
  })

  test('should display navigation header', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()
  })

  test('should display home appraisal form', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => document.getElementById('appraisal-form')?.scrollIntoView())
    await page.waitForTimeout(500)
    await expect(page.locator('#appraisal-form')).toBeVisible()
  })

  test('should fill and submit home appraisal form', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => document.getElementById('appraisal-form')?.scrollIntoView())
    await page.waitForTimeout(500)

    await page.fill('input[placeholder="James"]', 'Michael')
    await page.fill('input[placeholder="james@example.com.au"]', 'michael.chen@example.com.au')
    await page.fill('input[placeholder="0412 345 678"]', '0415 123 456')
    await page.fill('input[placeholder="12 Smith Street, Sydney NSW 2000"]', '12 Ocean View Drive, Bondi NSW 2026')

    const selects = page.locator('#appraisal-form select')
    await selects.nth(0).selectOption('house')
    await selects.nth(1).selectOption('3')
    await selects.nth(2).selectOption('owner_occupied')

    const consent = page.locator('#appraisal-form input[type="checkbox"]')
    await consent.check()

    await page.locator('#appraisal-form button[type="submit"]').click()
    await page.waitForTimeout(2000)
  })

  test('should display CTA buttons', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Get Free Appraisal')).toBeVisible()
    await expect(page.locator('text=Partner With Us')).toBeVisible()
  })

  test('should display stats bar', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Properties Managed')).toBeVisible()
  })

  test('should scroll to appraisal form via CTA', async ({ page }) => {
    await page.goto('/')
    const ctaBtn = page.locator('button:has-text("Get Free Appraisal")')
    await expect(ctaBtn).toBeVisible()
    await ctaBtn.click()
    await page.waitForTimeout(500)
    await expect(page.locator('#appraisal-form')).toBeVisible()
  })

  test('should display footer', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toBeVisible()
  })
})
