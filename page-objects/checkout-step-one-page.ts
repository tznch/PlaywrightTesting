import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckoutStepOnePage extends BasePage {
  // Selectors
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/checkout-step-one.html');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Fill customer information
   * @param firstName First name
   * @param lastName Last name
   * @param postalCode Postal code
   */
  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Continue to next step
   */
  async continue() {
    await this.continueButton.click();
  }

  /**
   * Cancel checkout
   */
  async cancel() {
    await this.cancelButton.click();
  }

  /**
   * Get the error message text
   * @returns The error message text
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }
}
