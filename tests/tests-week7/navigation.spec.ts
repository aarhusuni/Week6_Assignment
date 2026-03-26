import { test, expect } from '@playwright/test';

 test('navigationt',async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name: 'Apparel & Accessories' }).click();
    await expect.soft(page).toHaveURL(/Apparel/);
    await page.getByRole("link", { name: 'Makeup' }).click();
    await expect.soft(page).toHaveURL(/Makeup/);
    await page.getByRole("link", { name: 'Skincare' }).click();
    await expect.soft(page).toHaveURL(/Skincare/);
  
})