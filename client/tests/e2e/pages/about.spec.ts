import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test('should load the about page', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveURL(/\/about/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should display hero section with heading', async ({ page }) => {
    await page.goto('/about')
    const h1 = page.locator('h1')
    await expect(h1).toContainText('Building Stronger Communities')
  })

  test('should display our story section', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=Our Story').or(page.locator('text=From Local Experts')).first()).toBeVisible()
  })

  test('should display our values section with 3 value cards', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=Integrity First')).toBeVisible()
    await expect(page.locator('text=Results Driven')).toBeVisible()
    await expect(page.locator('text=People Centric')).toBeVisible()
  })

  test('should display stats section', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=Properties Managed')).toBeVisible()
    await expect(page.locator('text=Team Members')).toBeVisible()
  })

  test('should display CTA section with contact button', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=Ready to Work With Us')).toBeVisible()
    await expect(page.locator('a[href="/contact"]').or(page.locator('text=Get in Touch')).first()).toBeVisible()
  })

  test('should navigate to contact page via CTA button', async ({ page }) => {
    await page.goto('/about')
    const ctaBtn = page.locator('a[href="/contact"], a:has-text("Get in Touch")').first()
    await ctaBtn.click()
    await expect(page).toHaveURL(/\/contact/)
  })

  test('should navigate to home page via nav', async ({ page }) => {
    await page.goto('/about')
    const homeLink = page.locator('a[href="/"], nav a').first()
    await homeLink.click()
    await page.waitForTimeout(500)
  })
})
