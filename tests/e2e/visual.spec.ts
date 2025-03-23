import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/login-page';
import { InventoryPage } from '../../page-objects/inventory-page';

test.describe('Visual Testing', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  // Use authentication state for some tests
  test.describe('Authenticated views', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });

    test.beforeEach(async ({ page }) => {
      inventoryPage = new InventoryPage(page);
    });

    test('inventory page visual comparison', async ({ page }) => {
      await inventoryPage.goto();
      await expect(page).toHaveScreenshot('inventory-page.png', {
        mask: [page.locator('.shopping_cart_badge')], // Mask dynamic elements
        maxDiffPixelRatio: 0.01
      });
    });
  });

  // Unauthenticated tests
  test.describe('Unauthenticated views', () => {
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
    });

    test('login page visual comparison', async ({ page }) => {
      await loginPage.goto();
      await expect(page).toHaveScreenshot('login-page.png');
    });

    test('login error visual comparison', async ({ page }) => {
      await loginPage.goto();
      await loginPage.login('locked_out_user', 'secret_sauce');
      await expect(page).toHaveScreenshot('login-error.png');
    });
  });
});
