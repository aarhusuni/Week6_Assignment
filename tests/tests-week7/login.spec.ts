import { test, expect } from '@playwright/test';

//creating hook/ group
test.describe('Login Page', () => {

//3. In login.spec.ts: test valid login AND invalid login
//these lines will run before every test
test.beforeEach('loginweek7', async ({page}) => {
    await page.goto('https://raider-test-site.onrender.com/');
    await page.getByRole("link", { name: 'Login or register' }).click();
    await page.getByLabel("Login name").fill("aguspe");
    await page.getByLabel("Password").fill("12341234");
    await page.getByRole('button', { name: 'Login' }).click();
    })

test('forURL', async ({page}) => {
  await expect(page).toHaveURL(/account/);
})

test('forWelcomemessge', async ({page}) => {
    await expect(page.getByText("Welcome to your account dashboard")).toBeVisible();
})
    })

    
test('loginfailweek7', async ({page}) => {
    await page.goto('https://raider-test-site.onrender.com/');
 await page.getByRole("link", { name: 'Login or register' }).click();
    const startURL = page.url();
    await page.getByLabel("Login name").fill("aguspe123");
    await page.getByLabel("Password").fill("12341234abc");
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(startURL);
    await expect(page.getByText("Error: Incorrect login or password provided.")).toBeVisible();
    })
