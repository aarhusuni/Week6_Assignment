//import playwright tools
import { test, expect } from '@playwright/test';

//6.1: create test useing getByLabel
test('6.1.A.successful login', async ({page}) => {
    //go to page
    await page.goto('/');
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

//6.1extra:create test useing getByRole
test('6.1.B.successful login', async ({page}) => {
  await page.goto('/');
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
    await page.goto('/');
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
    await page.goto('/');
    await page.getByRole("link", { name: 'Login or register' }).click();
    const startURL = page.url();
    await page.getByLabel("Login name").fill("");
    await page.getByLabel("Password").fill("");
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(startURL);
    //after checking Yianna`s homework I was looking for other wazs to test for this:
    await expect(page.locator('#loginFrm_loginname')).toHaveValue('');
    await expect(page.locator('#loginFrm_password')).toHaveValue('');
})

//7.2.B: create test for verifying if any product is listed after selecting a menue
test('verify if any product is listed',async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name: 'Apparel & Accessories' }).click();
    await expect(page.getByText('DCasual 3/4 Sleeve Baseball T-Shirt')).toBeVisible
    //counting the number of product images and checking if its more then zero
    const products = page.locator('.product-image'); 
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
})

//7.2.B extra: create test for verifying if any product is listed after selecting a menue, menue selection is random
test('verify if any product is listed extra',async ({page}) => {
    await page.goto('/');
    //select random menue
    //finding every menue items, selector was found: #shopify-section-header > div > nav > ul > li:nth-child(3) > a  ==> nav ul li a, chat GPT helped top generalise the selector:)   
    const categories = page.locator('nav ul li a');
    //counting how many elements been found
    const count = await categories.count();
    //checking if at least one exist
    expect(count).toBeGreaterThan(0);
    //indexing the elements, giving them an index/reference number
    const randomIndex = Math.floor(Math.random() * count);
    //clicking random one of these indexed menu elements
    await categories.nth(randomIndex).click();
    //checking if any "product card" is visible in this randomly selected menue
    await expect(page.locator('.product-card')).toBeVisible();
});

//checking is the selector lists all menue items
test('llisting menue',async ({page}) => {
    await page.goto('/');
    const menuItems = page.locator('nav ul li a');
    console.log(await menuItems.allTextContents());
});




//7.2.B: create test for verifying if any product detail is loading after selecting a product
test('verify if product detail page loads',async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name:'Home'}).first().click();
    // Ensure at least one product exists
    const products = page.locator('.product-card');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
    // Click a random product
    const randomIndex = Math.floor(Math.random() * count);
    await products.nth(randomIndex).click();
    //first assertion checking if any detail picture of product appears
    const productcounter = page.locator('.product-detail-image'); 
    const count2 = await productcounter.count();
    expect(count2).toBeGreaterThan(0);
    //second assertion checking if "product" appears in URL, better assertion
    await expect(page).toHaveURL(/product/);
})

//7.2.B: create test if navigation menue work, useing soft assertion, the test can continue even if one of the menues dosent work
test('navigate menue to visit each pages',async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name: 'Apparel & Accessories' }).click();
    await expect.soft(page).toHaveURL(/Apparel/);
    await page.getByRole("link", { name: 'Makeup' }).click();
    await expect.soft(page).toHaveURL(/Makeup/);
    await page.getByRole("link", { name: 'Skincare' }).click();
    await expect.soft(page).toHaveURL(/Skincare/);
    await page.getByRole("link", { name: 'Fragrance' }).click();
    await expect.soft(page).toHaveURL(/Fragrance/);
    await page.getByRole("link", { name: 'Men' }).click();
    await expect.soft(page).toHaveURL(/Men/);
    await page.getByRole("link", { name: 'Hair Care' }).click();
    await expect.soft(page).toHaveURL(/Hair%20Care/);
    await page.getByRole("link", { name: 'Book' }).click();
    await expect.soft(page).toHaveURL(/Book/);
})

//7.2.C: intentionaly breaking a test
test('breaking the test',async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name: 'Apparel & Accessories' }).click();
    await expect.soft(page).toHaveURL(/Apparel123/);
    await page.getByRole("link", { name: 'Makeup' }).click();
    await expect.soft(page).toHaveURL(/Makeup/);
    await page.getByRole("link", { name: 'Skincare' }).click();
    await expect.soft(page).toHaveURL(/Skincare/);
    await page.getByRole("link", { name: 'Fragrance' }).click();
    await expect.soft(page).toHaveURL(/Fragrance/);
    await page.getByRole("link", { name: 'Men' }).click();
    await expect.soft(page).toHaveURL(/Men/);
    await page.getByRole("link", { name: 'Hair Care' }).click();
    await expect.soft(page).toHaveURL(/Hair%20Care/);
    await page.getByRole("link", { name: 'Book' }).click();
    await expect.soft(page).toHaveURL(/Book/);
})
