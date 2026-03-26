//import playwright tools
import { test, expect } from '@playwright/test';

//6.1: create test useing getByLabel
test('6.1.A.successful login', async ({page}) => {
    //go to page
    await page.goto('https://raider-test-site.onrender.com/');
    //open 'Login or register, its a link because the element is: "<a href="/index.php?rt=account/login" class="welcome-msg">Login or register</a>" and "<a ...>" tag tels its a link
    await page.getByRole("link", { name: 'Login or register' }).click();
    //finding a input field, and filling it 
    await page.getByLabel("Login name").fill("aguspe");
     //finding a input field, and filling it 
    await page.getByLabel("Password").fill("12341234");
    //clicking button, its a button because the element is: "<button type="submit" title="Login" class="btn btn-primary">Login</button>" and "<button...>" means it a button:)
    await page.getByRole('button', { name: 'Login' }).click();
    //assertion, expecting the URL changes and contains "acount"
    await expect(page).toHaveURL(/account/);
    //assertion expecting a text to be visible
    await expect(page.getByText("Welcome to your account dashboard")).toBeVisible();
})

//6.1extra: create test useing getByRole
test('6.1.B.successful login', async ({page}) => {
  await page.goto('https://raider-test-site.onrender.com/');
  await page.getByRole('link', { name: 'Login or register' }).click();
  await page.getByRole('textbox', { name: 'Login name' }).click();
  await page.getByRole('textbox', { name: 'Login name' }).fill("aguspe");
  await page.getByRole('textbox', { name: 'Password'}).click();
  await page.getByRole('textbox', { name: 'Password'}).fill("12341234");
  await page.getByRole('button', { name: 'Login'}).click();
  await expect(page).toHaveURL(/account/);
})

//6.2: create test for failed login
test('6.2failedlogin',async ({page}) => {
    await page.goto('https://raider-test-site.onrender.com/');
    await page.getByRole("link", { name: 'Login or register' }).click();
    //defining startURL
    const startURL = page.url();
    await page.getByLabel("Login name").fill("aguspe");
    await page.getByLabel("Password").fill("12341234A");
    await page.getByRole('button', { name: 'Login' }).click();
    //expecting that the URL dosent change, we can skip this assertion the "getByText("Error: Incorrect login or password provided.")" is enought assertion
    await expect(page).toHaveURL(startURL);
    await expect(page.getByText("Error: Incorrect login or password provided.")).toBeVisible();
})

//6.3: create test for empty form
test('6.3emptyform',async ({page}) => {
    await page.goto('https://raider-test-site.onrender.com/');
    await page.getByRole("link", { name: 'Login or register' }).click();
    const startURL = page.url();
    await page.getByLabel("Login name").fill("");
    await page.getByLabel("Password").fill("");
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(startURL);
    //after checking Yianna`s homework I was looking for other wazs to test for this:
    await expect(page.locator('#loginFrm_loginname')).toHaveAttribute('required', '');
    await expect(page.locator('#loginFrm_password')).toHaveAttribute('required', '');
})



//listing all links, its just a helper not a test
test('list all links on page', async ({ page }) => {
    await page.goto('https://raider-test-site.onrender.com/');
    // Get all link texts
    const links = await page.getByRole('link').allTextContents();
    // Print them in the terminal
    console.log('Links found on page:');
    for (const link of links) {
        console.log(link);
    }
})