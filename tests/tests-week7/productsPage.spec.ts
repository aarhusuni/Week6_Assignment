import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
//navigating to products page with POM, check product card and image appears
test.describe('products-test', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.navigateTo('Makeup'); 
  });

  // testing if product cards are visible
  test('productcards', async () => {
    await expect(homePage.productCards().first()).toBeVisible();
  });

  // testing if product images are visible
  test('productimages', async () => {
    await expect(homePage.productImages().first()).toBeVisible();
  });
});