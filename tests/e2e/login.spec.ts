import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/login-page';
import { InventoryPage } from '../../page-objects/inventory-page';
import { loadTestData } from '../../utils/test-helpers';

// Load test data
const userData = loadTestData<any>('./test-data/users.json');

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

// В login.spec.ts
// В login.spec.ts
test('should login successfully with valid credentials', async ({ page }) => {
  const { username, password } = userData.validUsers.standard;
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  const loginSuccess = await loginPage.login(username, password);
  expect(loginSuccess).toBe(true);
  
  try {
        // Проверяем заголовок страницы или другой уникальный элемент
    const pageTitle = page.locator('.title');
    const isTitleVisible = await pageTitle.isVisible();
    expect(isTitleVisible).toBe(true);
  } catch (error) {
    console.log('Ошибка при проверке инвентаря:', error);
    await page.screenshot({ path: 'debug-inventory.png' });
    throw error;
  }
});

  test('should show error with locked out user', async () => {
    // Get test data
    const { username, password, errorMessage } = userData.invalidUsers.locked;
    
    // Login
    await loginPage.login(username, password);
    
    // Verify error message
    const actualError = await loginPage.getErrorMessage();
    expect(actualError).toBe(errorMessage);
  });

  test('should show error with invalid credentials', async () => {
    // Get test data
    const { username, password, errorMessage } = userData.invalidUsers.invalidCredentials;
    
    // Login
    await loginPage.login(username, password);
    
    // Verify error message
    const actualError = await loginPage.getErrorMessage();
    expect(actualError).toBe(errorMessage);
  });

  test('should show error with empty username', async () => {
    // Get test data
    const { username, password, errorMessage } = userData.invalidUsers.emptyUsername;
    
    // Login
    await loginPage.login(username, password);
    
    // Verify error message
    const actualError = await loginPage.getErrorMessage();
    expect(actualError).toBe(errorMessage);
  });

  test('should show error with empty password', async () => {
    // Get test data
    const { username, password, errorMessage } = userData.invalidUsers.emptyPassword;
    
    // Login
    await loginPage.login(username, password);
    
    // Verify error message
    const actualError = await loginPage.getErrorMessage();
    expect(actualError).toBe(errorMessage);
  });
});
