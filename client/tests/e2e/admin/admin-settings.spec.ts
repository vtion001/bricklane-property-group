import { test, expect } from '@playwright/test'
import { mockApiRoutes } from '../utils/mockData'

test.describe('Admin Settings', () => {
  test.beforeEach(async ({ page }) => {
    mockApiRoutes(page)
    await page.goto('/admin/settings')
    await page.waitForTimeout(1500)
  })

  test('should load admin settings page', async ({ page }) => {
    await expect(page).toHaveURL(/\/admin\/settings/)
    await expect(page.locator('aside')).toBeVisible()
  })

  test('should display settings sections', async ({ page }) => {
    await expect(page.locator('text=General Settings')).toBeVisible()
    await expect(page.locator('text=Integrations')).toBeVisible()
    await expect(page.locator('text=CRM Integration')).toBeVisible()
    await expect(page.locator('text=Email Settings')).toBeVisible()
  })

  test('should display company name field', async ({ page }) => {
    await expect(page.locator('label:has-text("Company Name")')).toBeVisible()
    await expect(page.locator('input[type="text"]').first()).toHaveValue('Brick Lane Property Group')
  })

  test('should display contact email and phone fields', async ({ page }) => {
    await expect(page.locator('label:has-text("Contact Email")')).toBeVisible()
    await expect(page.locator('label:has-text("Contact Phone")')).toBeVisible()
  })

  test('should display integrations fields', async ({ page }) => {
    await expect(page.locator('label:has-text("Calendly URL")')).toBeVisible()
    await expect(page.locator('label:has-text("reCAPTCHA Site Key")')).toBeVisible()
    await expect(page.locator('label:has-text("AI Provider")')).toBeVisible()
    await expect(page.locator('label:has-text("AI API Key")')).toBeVisible()
  })

  test('should display CRM webhook URL', async ({ page }) => {
    await expect(page.locator('label:has-text("CRM Webhook URL")')).toBeVisible()
    await expect(page.locator('button:has-text("Copy")')).toBeVisible()
  })

  test('should display SMTP fields', async ({ page }) => {
    await expect(page.locator('label:has-text("SMTP Host")')).toBeVisible()
    await expect(page.locator('label:has-text("SMTP Port")')).toBeVisible()
  })

  test('should display save button', async ({ page }) => {
    await expect(page.locator('button:has-text("Save Settings")')).toBeVisible()
  })

  test('should update company name and save', async ({ page }) => {
    const input = page.locator('input[type="text"]').first()
    await input.clear()
    await input.fill('Test Property Group')
    await page.locator('button:has-text("Save Settings")').click()
    await page.waitForTimeout(2000)
    await expect(page.locator('text=Settings saved!')).toBeVisible({ timeout: 5000 })
  })

  test('should copy webhook URL', async ({ page }) => {
    await page.locator('button:has-text("Copy")').click()
    await page.waitForTimeout(500)
  })

  test('should navigate between settings sections by scrolling', async ({ page }) => {
    await expect(page.locator('text=General Settings')).toBeVisible()
    await expect(page.locator('text=Email Settings')).toBeVisible()
  })
})
