import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

  // Shared setup only: open site + go to login page
  test.beforeEach(async ({ page }) => {
    await page.goto('https://raider-test-site.onrender.com/');
    await page.getByRole('link', { name: 'Login or register' }).click();
  });

  // testing if login works with valid credencials
  test('valid login redirects to dashboard', async ({ page }) => {
    await page.getByLabel('Login name').fill('aguspe');
    await page.getByLabel('Password').fill('12341234');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/account/);
    await expect(
      page.getByText('Welcome to your account dashboard')
    ).toBeVisible();
  });

  // testing invalid login
  test('invalid login shows error message', async ({ page }) => {
    const startURL = page.url();

    await page.getByLabel('Login name').fill('aguspe123');
    await page.getByLabel('Password').fill('12341234abc');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(startURL);
    await expect(
      page.getByText('Error: Incorrect login or password provided.')
    ).toBeVisible();
  });

});
