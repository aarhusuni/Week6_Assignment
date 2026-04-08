import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export class AccessibilityPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.dengamleby.dk/', {
      waitUntil: 'domcontentloaded',
    });
  }

  async analyzeAccessibility() {
    const results = await new AxeBuilder({ page: this.page })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
      ])
      .analyze();

    return results;
  }
}