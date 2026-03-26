// tests/login-with-fixtures.spec.ts

// Import from YOUR fixture file, not from @playwright/test!
import { test, expect } from '../../fixtures/LoginFixture';

// loginPage is automatically created and navigated!
test('valid login redirects to dashboard', async ({ loginPage, page }) => {
  await loginPage.login('aguspe', '12341234');
  await expect(page).toHaveURL(/account/);
});

test('invalid password shows error', async ({ loginPage }) => {
  await loginPage.login('aguspe', 'wrong');
  await expect(loginPage.errorMessage).toBeVisible();
});

test('navigation works', async ({ homePage, page }) => {
 await expect(homePage.productCards().first()).toBeVisible();

});