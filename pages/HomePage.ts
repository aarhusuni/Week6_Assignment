//Object Page for clicking a random product list
import { expect, Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

    async goto() {
    await this.page.goto('https://raider-test-site.onrender.com/');
    const categories = this.page.locator('nav ul li a');
    const count = await categories.count();
    expect(count).toBeGreaterThan(0);
    const randomIndex = Math.floor(Math.random() * count);
    await categories.nth(randomIndex).click();

  //the selector must be in the pageObject, no raw selectors

  //looking for an element matching product card, choosing the first one of them, wait until it loads, existc in the DOM
   await this.page.locator('.product-card').first().waitFor();
  }
  //creating a function productCards
  productCards() {
  //calling all product cards to be the function, its a "list"
    return this.page.locator('.product-card');
  }
  //calling all product images to be the function, its a "list"
   productImages() {
    return this.page.locator('.product-image');
  }
  }
