import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class CartPage extends BasePage {
  // Selectors
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/cart.html');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
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
   * Remove item from cart by name
   * @param itemName Name of the item
   */
  async removeItem(itemName: string) {
    const item = this.getCartItemByName(itemName);
    await item.locator('button').click();
  }

  /**
   * Get total number of items in cart
   * @returns Number of items in cart
   */
  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Continue shopping
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
