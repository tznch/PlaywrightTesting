import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../page-objects/inventory-page';

// This test uses the authenticated state from auth.setup.ts
test.describe('Inventory Page Functionality', () => {
  let inventoryPage: InventoryPage;

  // Use authentication state
  test.use({ storageState: 'playwright/.auth/user.json' });

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
  });

  test('should display products', async () => {
    // Verify products are displayed
    await expect(inventoryPage.productsList).toHaveCount(6);
  });

  test('should add product to cart', async () => {
    // Add a product to cart
    await inventoryPage.addBackpackToCart();
    
    // Verify cart count
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });

  test('should remove product from cart', async () => {
    // Add a product to cart
await inventoryPage.addBackpackToCart();    
    // Verify cart count
    let cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
    
    // Remove the product from cart
    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    
    // Verify cart count is updated
    cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(0);
  });

  test('should sort products by name (A to Z)', async () => {
    // Sort products
    await inventoryPage.sortProducts('az');
    
    // Get the first product name
    const firstProduct = inventoryPage.productsList.first().locator('.inventory_item_name');
    const firstProductName = await firstProduct.textContent();
    
    // Verify the first product is "Sauce Labs Backpack" (alphabetically first)
    expect(firstProductName).toBe('Sauce Labs Backpack');
  });

  test('should sort products by name (Z to A)', async () => {
    // Sort products
    await inventoryPage.sortProducts('za');
    
    // Get the first product name
    const firstProduct = inventoryPage.productsList.first().locator('.inventory_item_name');
    const firstProductName = await firstProduct.textContent();
    
    // Verify the first product is "Test.allTheThings() T-Shirt (Red)" (alphabetically last)
    expect(firstProductName).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('should sort products by price (low to high)', async () => {
    // Sort products
    await inventoryPage.sortProducts('lohi');
    
    // Get the first product price
    const firstProduct = inventoryPage.productsList.first().locator('.inventory_item_price');
    const firstProductPrice = await firstProduct.textContent();
    
    // Verify the first product has the lowest price
    expect(firstProductPrice).toBe('$7.99');
  });

  test('should sort products by price (high to low)', async () => {
    // Sort products
    await inventoryPage.sortProducts('hilo');
    
    // Get the first product price
    const firstProduct = inventoryPage.productsList.first().locator('.inventory_item_price');
    const firstProductPrice = await firstProduct.textContent();
    
    // Verify the first product has the highest price
    expect(firstProductPrice).toBe('$49.99');
  });

  test('should navigate to cart page', async ({ page }) => {
    // Click on cart icon
    await inventoryPage.goToCart();
    
    // Verify redirect to cart page
    await expect(page).toHaveURL(/.*cart.html/);
  });
});
