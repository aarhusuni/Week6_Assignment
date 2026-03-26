import { test, expect } from '@playwright/test';
//importing object that opens random product menue
import { HomePage} from '../../pages/HomePage';

test.describe('products-test', () => {
  let Homepage:HomePage;

  test.beforeEach(async ({page}) => {
  Homepage = new HomePage(page);
    await Homepage.goto();
});

//testing if product card is visible
test('productcards', async ({page}) => {
  await expect(Homepage.productCards().first()).toBeVisible();
})

//testing if product image is visible
test('productimages', async ({page}) => {
    await expect(Homepage.productImages().first()).toBeVisible();
})
    });