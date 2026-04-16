import { expect, Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  // Open homepage
  async goto() {
    await this.page.goto('https://raider-test-site.onrender.com/');
  }

  // Navigate to ANY category (Makeup, Skincare, etc.)
  async navigateTo(category: string) {
    const categoryLink = this.page.locator('nav').getByRole('link', { name: category });

    await expect(categoryLink).toBeVisible();
    await categoryLink.click();

    // Wait for products to load
    await this.productCards().first().waitFor();
  }

  // Locator for product cards (list of products)
  productCards() {
    return this.page.locator('.product-card');ss
  }

  // Locator for product images
  productImages() {
    return this.page.locator('.product-image');
  }
}