import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckoutStepTwoPage extends BasePage {
  // Selectors
  readonly cartItems: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/checkout-step-two.html');
    this.cartItems = page.locator('.cart_item');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
  }

  /**
   * Get cart item by name
   * @param itemName Name of the item
   * @returns Locator for the cart item
   */
  getCartItemByName(itemName: string): Locator {
    return this.cartItems.filter({ hasText: itemName });
  }

  /**
   * Get item count
   * @returns Number of items in the checkout
   */
  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get subtotal amount
   * @returns Subtotal amount as a number
   */
  async getSubtotal(): Promise<number> {
    const subtotalText = await this.subtotalLabel.textContent();
    if (subtotalText) {
      return parseFloat(subtotalText.replace('Item total: $', ''));
    }
    return 0;
  }

  /**
   * Get tax amount
   * @returns Tax amount as a number
   */
  async getTax(): Promise<number> {
    const taxText = await this.taxLabel.textContent();
    if (taxText) {
      return parseFloat(taxText.replace('Tax: $', ''));
    }
    return 0;
  }

  /**
   * Get total amount
   * @returns Total amount as a number
   */
  async getTotal(): Promise<number> {
    const totalText = await this.totalLabel.textContent();
    if (totalText) {
      return parseFloat(totalText.replace('Total: $', ''));
    }
    return 0;
  }

  /**
   * Finish checkout
   */
  async finishCheckout() {
    await this.finishButton.click();
  }

  /**
   * Cancel checkout
   */
  async cancelCheckout() {
    await this.cancelButton.click();
  }
}
