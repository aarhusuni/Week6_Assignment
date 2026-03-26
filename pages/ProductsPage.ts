//Object Page for clicking a random product list and then a random product page
import { expect, Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

    async goto() {
    await this.page.goto('https://raider-test-site.onrender.com/');
    const categories = this.page.locator('nav ul li a');
    const count = await categories.count();
    expect(count).toBeGreaterThan(0);
    const randomIndex = Math.floor(Math.random() * count);
    await categories.nth(randomIndex).click(); 
//waiting until the product list page is loded, so we wont get fauls error that the code cant find a product card
    await this.page.waitForLoadState('networkidle'); 
}
//clicking a random product from the product list  
async clickRandomProduct() {
    const products = this.page.locator('.product-card a');
//checking if any product is present
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
//clicking a random product
    const randomIndex = Math.floor(Math.random() * count);
    await products.nth(randomIndex).click();
  }
productImage() {
  return this.page.locator('.product-detail img');
}
}