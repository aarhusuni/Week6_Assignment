import { test, expect } from '@playwright/test';
import { AccessibilityPage } from '../../pages/wcag';

test.describe('Accessibility Scan - WCAG 2.1 A & AA', () => {
  let accessibilityPage: AccessibilityPage;

  test.beforeEach(async ({ page }) => {
    accessibilityPage = new AccessibilityPage(page);
    await accessibilityPage.goto();
  });

  test('should not have accessibility violations', async () => {
    const results = await accessibilityPage.analyzeAccessibility();

    if (results.violations.length > 0) {
      console.log(JSON.stringify(results.violations, null, 2));
    }

    expect(results.violations).toEqual([]);
  });
});