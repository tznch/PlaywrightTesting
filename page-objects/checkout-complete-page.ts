import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckoutCompletePage extends BasePage {
  // Selectors
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/checkout-complete.html');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('#back-to-products');
  }

  /**
   * Get complete header text
   * @returns The complete header text
   */
  async getCompleteHeaderText(): Promise<string | null> {
    return await this.completeHeader.textContent();
  }

  /**
   * Get complete text
   * @returns The complete text
   */
  async getCompleteText(): Promise<string | null> {
    return await this.completeText.textContent();
  }

  /**
   * Go back to products page
   */
  async backToProducts() {
    await this.backHomeButton.click();
  }
}
