import { test, expect } from '@playwright/test'

test.describe('Admin Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to admin dashboard
        await page.goto('/admin')
    })

    test('loads admin dashboard successfully', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Admin Dashboard')
        await expect(page.locator('text=User Management')).toBeVisible()
        await expect(page.locator('text=Coupon Management')).toBeVisible()
        await expect(page.locator('text=License Management')).toBeVisible()
    })

    test('can create a new user', async ({ page }) => {
        // Click Add User button
        await page.click('text=+ Add User')

        // Fill in user details
        await page.fill('[placeholder="Name"]', 'E2E Test User')
        await page.fill('[placeholder="Email"]', 'e2e@example.com')
        await page.check('[name="unlimitedAccess"]')

        // Submit form
        await page.click('text=Add User')

        // Verify user appears in list
        await expect(page.locator('text=E2E Test User')).toBeVisible()
        await expect(page.locator('text=e2e@example.com')).toBeVisible()
        await expect(page.locator('text=Unlimited')).toBeVisible()
    })

    test('can create a coupon', async ({ page }) => {
        // Click Add Coupon button
        await page.click('text=+ Add Coupon')

        // Fill in coupon details
        await page.fill('[placeholder="Code"]', 'TEST20')
        await page.selectOption('[name="type"]', 'percent')
        await page.fill('[placeholder="Value"]', '20')
        await page.fill('[placeholder="Max Uses"]', '100')

        // Submit form
        await page.click('text=Create Coupon')

        // Verify coupon appears in list
        await expect(page.locator('text=TEST20')).toBeVisible()
        await expect(page.locator('text=20%')).toBeVisible()
    })

    test('can create a license', async ({ page }) => {
        // Click Add License button
        await page.click('text=+ Add License')

        // Fill in license details
        await page.fill('[placeholder="License Key"]', 'LICENSE-E2E-TEST-123')
        await page.fill('[placeholder="Type"]', 'pro')

        // Submit form
        await page.click('text=Create License')

        // Verify license appears in list
        await expect(page.locator('text=LICENSE-E2E-TEST-123')).toBeVisible()
        await expect(page.locator('text=pro')).toBeVisible()
    })

    test('can toggle unlimited access', async ({ page }) => {
        // Wait for users to load
        await page.waitForSelector('text=User Management')

        // Find first user toggle button
        const toggleButton = page.locator('button:has-text("Toggle")').first()
        await toggleButton.click()

        // Verify status changed
        await expect(page.locator('text=Unlimited').first()).toBeVisible()
    })
})

test.describe('Marketing Website', () => {
    test('homepage loads correctly', async ({ page }) => {
        await page.goto('/')
        await expect(page.locator('h1')).toContainText('Thin Air')
        await expect(page.locator('text=Start Building')).toBeVisible()
    })

    test('pricing page displays credit information', async ({ page }) => {
        await page.goto('/pricing')
        await expect(page.locator('text=1 Credit = $9 AUD')).toBeVisible()
        await expect(page.locator('text=Credits expire after 12 months')).toBeVisible()
    })

    test('contact form is accessible', async ({ page }) => {
        await page.goto('/contact')
        await expect(page.locator('form')).toBeVisible()
        await expect(page.locator('[name="email"]')).toBeVisible()
        await expect(page.locator('[name="message"]')).toBeVisible()
    })

    test('FAQ page loads', async ({ page }) => {
        await page.goto('/faq')
        await expect(page.locator('h1')).toContainText('FAQ')
    })
})

test.describe('Web App (Vapour)', () => {
    test('vapour page loads with instructions', async ({ page }) => {
        await page.goto('http://localhost:5173')

        await expect(page.locator('text=Phase 1: Vapour')).toBeVisible()
        await expect(page.locator('text=Step 1 of 5')).toBeVisible()
        await expect(page.locator('text=Share Your Requirements')).toBeVisible()
    })

    test('can switch between input types', async ({ page }) => {
        await page.goto('http://localhost:5173')

        // Click Voice tab
        await page.click('text=🎙️ Voice')
        await expect(page.locator('text=Click to start recording')).toBeVisible()

        // Click Image tab
        await page.click('text=🖼️ Image')
        await expect(page.locator('[placeholder*="image"]')).toBeVisible()

        // Click Text tab
        await page.click('text=✍️ Text')
        await expect(page.locator('[placeholder*="requirements"]')).toBeVisible()
    })

    test('can capture text input', async ({ page }) => {
        await page.goto('http://localhost:5173')

        const textarea = page.locator('textarea')
        await textarea.fill('I want to build a CRM for dentists')

        await page.click('text=Capture Input')

        // Verify success message
        await expect(page.locator('text=Input captured successfully')).toBeVisible()
    })
})
