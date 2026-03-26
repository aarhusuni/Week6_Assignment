import { test, expect } from '@playwright/test';

//5. In products.spec.ts: test navigating to products page, check product list appears
test('productsweek7', async ({page}) => {
    //go to page
    await page.goto('https://raider-test-site.onrender.com/');
    const categories = page.locator('nav ul li a');
    const count = await categories.count();
    expect(count).toBeGreaterThan(0);
    const randomIndex = Math.floor(Math.random() * count);
    await categories.nth(randomIndex).click();
    await expect(page.locator('.product-card').first()).toBeVisible();
    })