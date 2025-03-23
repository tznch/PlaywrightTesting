import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../page-objects/inventory-page';
import { CartPage } from '../../page-objects/cart-page';
import { CheckoutStepOnePage } from '../../page-objects/checkout-step-one-page';
import { CheckoutStepTwoPage } from '../../page-objects/checkout-step-two-page';
import { CheckoutCompletePage } from '../../page-objects/checkout-complete-page';
import { loadTestData } from '../../utils/test-helpers.js';

// Load test data
const userData = loadTestData<any>('./test-data/users.json');

// This test uses the authenticated state from auth.setup.ts
test.describe('Checkout Process', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  // Use authentication state
  test.use({ storageState: 'playwright/.auth/user.json' });
  test.beforeAll(async ({ browser }) => {
    // Создаем новый контекст
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Входим в систему
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Сохраняем состояние
    await page.context().storageState({ path: 'playwright/.auth/user.json' });
    await context.close();
  });
  
  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
    
    // Start from inventory page and add a product to cart
    await inventoryPage.goto();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
  });

  test('should complete checkout process successfully', async ({ page }) => {
    // Get customer info from test data
    const { firstName, lastName, postalCode } = userData.customerInfo.valid;
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill customer information
    await checkoutStepOnePage.fillCustomerInfo(firstName, lastName, postalCode);
    await checkoutStepOnePage.continue();
    
    // Verify redirect to checkout step two
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    
    // Verify item in checkout
    await expect(checkoutStepTwoPage.getCartItemByName('Sauce Labs Backpack')).toBeVisible();
    
    // Verify price calculations exist
    expect(await checkoutStepTwoPage.getSubtotal()).toBeGreaterThan(0);
    expect(await checkoutStepTwoPage.getTax()).toBeGreaterThan(0);
    expect(await checkoutStepTwoPage.getTotal()).toBeGreaterThan(0);
    
    // Complete checkout
    await checkoutStepTwoPage.finishCheckout();
    
    // Verify redirect to checkout complete
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    
    // Verify success message
    const headerText = await checkoutCompletePage.getCompleteHeaderText();
    expect(headerText).toBe('Thank you for your order!');
    
    // Return to products
    await checkoutCompletePage.backToProducts();
    
    // Verify redirect to inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('should show error with empty first name', async () => {
    // Get invalid customer info from test data
    const { firstName, lastName, postalCode, errorMessage } = userData.customerInfo.invalid.emptyFirstName;
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill customer information with empty first name
    await checkoutStepOnePage.fillCustomerInfo(firstName, lastName, postalCode);
    await checkoutStepOnePage.continue();
    
    // Verify error message
    const actualError = await checkoutStepOnePage.getErrorMessage();
    expect(actualError).toBe(errorMessage);
  });

  test('should show error with empty last name', async () => {
    // Get invalid customer info from test data
    const { firstName, lastName, postalCode, errorMessage } = userData.customerInfo.invalid.emptyLastName;
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill customer information with empty last name
    await checkoutStepOnePage.fillCustomerInfo(firstName, lastName, postalCode);
    await checkoutStepOnePage.continue();
    
    // Verify error message
    const actualError = await checkoutStepOnePage.getErrorMessage();
    expect(actualError).toBe(errorMessage);
  });

  test('should show error with empty postal code', async () => {
    // Get invalid customer info from test data
    const { firstName, lastName, postalCode, errorMessage } = userData.customerInfo.invalid.emptyPostalCode;
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill customer information with empty postal code
    await checkoutStepOnePage.fillCustomerInfo(firstName, lastName, postalCode);
    await checkoutStepOnePage.continue();
    
    // Verify error message
    const actualError = await checkoutStepOnePage.getErrorMessage();
    expect(actualError).toBe(errorMessage);
  });

  test('should cancel checkout and return to cart', async ({ page }) => {
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Cancel checkout
    await checkoutStepOnePage.cancel();
    
    // Verify redirect back to cart page
    await expect(page).toHaveURL(/.*cart.html/);
  });
});
