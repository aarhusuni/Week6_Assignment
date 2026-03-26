//3.6. BONUS: Create a ProductsPage.ts and refactor products tests too
import { test, expect } from '@playwright/test';
//importing object that opens random product menue
import { ProductPage } from '../../pages/ProductsPage';

test.describe('products-test-new', () => {
  let productPage:ProductPage;

  test.beforeEach(async ({page}) => {
  productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.clickRandomProduct();
});

//testing if product image is visible
test('productimage', async () => {
    await expect(productPage.productImage()).toBeVisible();
  });
    });