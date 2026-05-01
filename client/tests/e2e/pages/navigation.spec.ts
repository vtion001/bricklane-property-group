import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should have header with logo', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()
  })

  test('should navigate to home page via logo', async ({ page }) => {
    await page.goto('/contact')
    await page.locator('a[href="/"]').first().click()
    await expect(page).toHaveURL('/')
  })

  test('should have navigation links', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[href="/about"]').or(page.locator('text=About')).first()).toBeVisible()
    await expect(page.locator('a[href="/contact"]').or(page.locator('text=Contact')).first()).toBeVisible()
  })

  test('should navigate to about page from nav', async ({ page }) => {
    await page.goto('/')
    const aboutLink = page.locator('a[href="/about"]').first()
    await aboutLink.click()
    await expect(page).toHaveURL(/\/about/)
  })

  test('should navigate to contact page from nav', async ({ page }) => {
    await page.goto('/')
    const contactLink = page.locator('a[href="/contact"]').first()
    await contactLink.click()
    await expect(page).toHaveURL(/\/contact/)
  })

  test('should navigate to partners page from nav', async ({ page }) => {
    await page.goto('/')
    const partnersLink = page.locator('a[href="/for-partners"]').first()
    await partnersLink.click()
    await expect(page).toHaveURL(/\/for-partners/)
  })

  test('should navigate to landlords page from nav', async ({ page }) => {
    await page.goto('/')
    const landlordsLink = page.locator('a[href="/for-landlords"]').first()
    await landlordsLink.click()
    await expect(page).toHaveURL(/\/for-landlords/)
  })

  test('should navigate to admin portal from nav', async ({ page }) => {
    await page.goto('/')
    const adminLink = page.locator('a[href="/admin"]').first()
    await adminLink.click()
    await expect(page).toHaveURL(/\/admin/)
  })

  test('should have working footer links', async ({ page }) => {
    await page.goto('/')
    const footerLinks = page.locator('footer a')
    const count = await footerLinks.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should display CTA buttons visible on home', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Get Free Appraisal').first()).toBeVisible()
  })

  test('should scroll page smoothly', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(500)
    await expect(page.locator('header')).toBeVisible()
  })

  test('should have mobile menu toggle', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 375, height: 812 })
    const menuBtn = page.locator('button[aria-label*="menu" i], button:has-text("Menu"), svg').first()
    await expect(menuBtn).toBeVisible()
  })

  test('should navigate through all main pages without 404', async ({ page }) => {
    const pages = ['/', '/about', '/contact', '/for-partners', '/for-landlords']
    for (const path of pages) {
      const response = await page.goto(path)
      expect(response?.status()).toBeLessThan(400)
      await expect(page.locator('body')).toBeVisible()
    }
  })
})
