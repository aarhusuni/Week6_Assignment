import { test, expect } from '@playwright/test';
//5. In products.spec.ts: test navigating to products page, check product list appears
test('navigate to Makeup and verify product cards', async ({ page }) => {
  //go to homepage
  await page.goto('https://raider-test-site.onrender.com/');

  //click "Makeup" in navigation
  const makeupLink = page.locator('nav').getByRole('link', { name: 'Makeup' });
  await expect(makeupLink).toBeVisible();
  await makeupLink.click();

  //wait for products to load
  const productCards = page.locator('.product-card');
  await productCards.first().waitFor();

  //assert product cards are visible
  await expect(productCards.first()).toBeVisible();
});