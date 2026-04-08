import { Page } from '@playwright/test';
//connecting to c-core, the accessibility tester tool
import AxeBuilder from '@axe-core/playwright';

//exporting to make it a usable in other files
export class AccessibilityPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
//navigating to the website
  async goto() {
    await this.page.goto('https://www.dengamleby.dk/', {
      //wait until HTML loads, faster better for testing, no wait until images etc. load
        waitUntil: 'domcontentloaded',
    });
  }
//analizing the page
  async analyzeAccessibility() {
    const results = await new AxeBuilder({ page: this.page })
      .withTags([
       //WCAG standards
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
      ])
      .analyze();

    return results;
  }
}