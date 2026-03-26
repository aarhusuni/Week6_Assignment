import { test, expect } from '@playwright/test';
//creating the login test but useing Page Object
//importing page object, e.g.: we have a certain part of the test in a separate file 
//so we can refer to it insted of always copying that code
import { LoginPage } from '../../pages/LoginPage';


test.describe('Login test', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('aguspe', '12341234');
  })

test('forURL', async ({page}) => {
  await expect(page).toHaveURL(/account/);
})

test('forWelcomemessge', async ({page}) => {
    await expect(page.getByText("Welcome to your account dashboard")).toBeVisible();
});
    });