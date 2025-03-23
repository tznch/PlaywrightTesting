import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../page-objects/inventory-page';
import { CartPage } from '../../page-objects/cart-page';

// This test uses the authenticated state from auth.setup.ts
test.describe('Cart Functionality', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  // Use authentication state
  test.use({ storageState: 'playwright/.auth/user.json' });

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    
    // Start from inventory page
    await inventoryPage.goto();
  });

  test('should add multiple products to cart', async () => {
    // Add products to cart
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    
    // Navigate to cart
    await inventoryPage.goToCart();
    
    // Verify cart item count
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(2);
    
    // Verify specific items
    await expect(cartPage.getCartItemByName('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.getCartItemByName('Sauce Labs Bike Light')).toBeVisible();
  });

  test('should remove product from cart', async () => {
    // Add products to cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    
    // Navigate to cart
    await inventoryPage.goToCart();
    
    // Verify initial cart item count
    let itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(2);
    
    // Remove one item
    await cartPage.removeItem('Sauce Labs Backpack');
    
    // Verify updated cart item count
    itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(1);
    
    // Verify removed item is gone and remaining item is still there
    await expect(cartPage.getCartItemByName('Sauce Labs Backpack')).toHaveCount(0);
    await expect(cartPage.getCartItemByName('Sauce Labs Bike Light')).toBeVisible();
  });

  test('should continue shopping from cart', async ({ page }) => {
    // Add product to cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    
    // Navigate to cart
    await inventoryPage.goToCart();
    
    // Continue shopping
    await cartPage.continueShopping();
    
    // Verify redirection back to inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('should proceed to checkout', async ({ page }) => {
    // Add product to cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    
    // Navigate to cart
    await inventoryPage.goToCart();
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Verify redirection to checkout step one page
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });
});
