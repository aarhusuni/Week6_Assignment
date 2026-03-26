import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://raider-test-site.onrender.com/');
  await page.getByRole('link', { name: 'Skinsheen Bronzer Stick' }).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByRole('link', { name: 'Cart: 1 item(s)' }).click();
  await page.getByRole('link', { name: 'Continue Shopping' }).click();
});