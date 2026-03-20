import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://raider-test-site.onrender.com/');
  await page.getByRole('link', { name: 'Login or register' }).click();
  await page.getByRole('textbox', { name: 'Login name' }).click();
  await page.getByRole('textbox', { name: 'Login name' }).fill('aguspe');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('12341234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'Add to Cart' }).nth(3).click();
  await page.locator('div').nth(5).click();
  await page.getByRole('link', { name: 'Account' }).click();
  await page.getByText('Account Details Name: Agustin').click();
});