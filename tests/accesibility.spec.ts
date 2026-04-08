import { test, expect } from '@playwright/test';
import { AccessibilityPage } from '../pages/wcag'; // adjust path if needed

//test suit, help with creating an organized repost
test.describe('Accessibility Scan - WCAG 2.1 A & AA', () => {
  let accessibilityPage: AccessibilityPage;

  //opening a new page before each test
  test.beforeEach(async ({ page }) => {
    accessibilityPage = new AccessibilityPage(page);
    await accessibilityPage.goto();
  });

  //the actual test
  test('should not have accessibility violations', async () => {
    const results = await accessibilityPage.analyzeAccessibility();

    if (results.violations.length > 0) {
      console.log(JSON.stringify(results.violations, null, 2));
    }

    //assertoion
    expect(results.violations).toEqual([]);
  });
});