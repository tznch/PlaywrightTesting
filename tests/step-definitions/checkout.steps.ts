import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/login-page.js';
import { InventoryPage } from '../../page-objects/inventory-page.js';
import { CartPage } from '../../page-objects/cart-page.js';
import { CheckoutStepOnePage } from '../../page-objects/checkout-step-one-page.js';
import { CheckoutStepTwoPage } from '../../page-objects/checkout-step-two-page.js';
import { CheckoutCompletePage } from '../../page-objects/checkout-complete-page.js';

/**
 * This file implements Gherkin-style step definitions for the checkout process
 * Usage:
 * 
 * Feature: Checkout process
 *   Scenario: User completes checkout successfully
 *     Given user logs in with "standard_user" and "secret_sauce"
 *     When user adds "Sauce Labs Backpack" to cart
 *     And user goes to cart
 *     And user proceeds to checkout
 *     And user fills checkout info with "John", "Doe", "12345"
 *     And user continues to checkout overview
 *     Then user should see "Sauce Labs Backpack" in checkout
 *     When user finishes checkout
 *     Then user should see order confirmation
 */

// Page objects
let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutStepOnePage: CheckoutStepOnePage;
let checkoutStepTwoPage: CheckoutStepTwoPage;
let checkoutCompletePage: CheckoutCompletePage;

test.describe('Checkout Process Steps', () => {
  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test('Complete checkout process (Gherkin style)', async ({ page }) => {
    // Given user logs in with "standard_user" and "secret_sauce"
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // When user adds "Sauce Labs Backpack" to cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    
    // And user goes to cart
    await inventoryPage.goToCart();
    
    // And user proceeds to checkout
    await cartPage.proceedToCheckout();
    
    // And user fills checkout info with "John", "Doe", "12345"
    await checkoutStepOnePage.fillCustomerInfo('John', 'Doe', '12345');
    
    // And user continues to checkout overview
    await checkoutStepOnePage.continue();
    
    // Then user should see "Sauce Labs Backpack" in checkout
    await expect(checkoutStepTwoPage.getCartItemByName('Sauce Labs Backpack')).toBeVisible();
    
    // When user finishes checkout
    await checkoutStepTwoPage.finishCheckout();
    
    // Then user should see order confirmation
    const headerText = await checkoutCompletePage.getCompleteHeaderText();
    expect(headerText).toBe('Thank you for your order!');
  });
});
