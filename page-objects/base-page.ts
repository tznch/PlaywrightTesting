import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly pageUrl: string;

  constructor(page: Page, pageUrl: string = '') {
    this.page = page;
    this.pageUrl = pageUrl;
  }

  /**
   * Navigate to the page
   */
  async goto() {
    await this.page.goto(this.pageUrl);
  }

  /**
   * Get element by test id
   * @param testId The test id attribute
   * @returns Locator for the element
   */
  getByTestId(testId: string): Locator {
    return this.page.locator(`[data-test="${testId}"]`);
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if element is visible
   * @param locator Locator for the element
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Expect element to be visible
   * @param locator Locator for the element
   */
  async expectToBeVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  /**
   * Expect element to contain text
   * @param locator Locator for the element
   * @param text Text to check for
   */
  async expectToContainText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }

  /**
   * Expect to be on specific URL
   * @param url URL to check for
   */
  async expectToBeOnUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }
}
