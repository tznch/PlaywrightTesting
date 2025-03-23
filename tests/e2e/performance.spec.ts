import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/login-page';
import { InventoryPage } from '../../page-objects/inventory-page';
import { loadTestData } from '../../utils/test-helpers';

// Load test data
const userData = loadTestData<any>('./test-data/users.json');

test.describe('Performance Tests', () => {
  test('should measure login performance for standard user', async ({ page }) => {
    // Get test data
    const { username, password } = userData.validUsers.standard;
    
    const loginPage = new LoginPage(page);
    
    // Start performance measurement
    await page.evaluate(() => window.performance.mark('loginStart'));
    
    // Perform login
    await loginPage.goto();
    await loginPage.login(username, password);
    
    // Wait for inventory page to load
    await page.waitForURL(/.*inventory.html/);
    
    // End performance measurement
    const timing = await page.evaluate(() => {
      window.performance.mark('loginEnd');
      window.performance.measure('loginDuration', 'loginStart', 'loginEnd');
      const measure = window.performance.getEntriesByName('loginDuration')[0];
      return measure.duration;
    });
    
    console.log(`Login duration: ${timing}ms`);
    
    // Assert login performance is within acceptable range
    expect(timing).toBeLessThan(3000); // 3 seconds threshold
  });

  test('should measure performance of regular user vs performance_glitch_user', async ({ page }) => {
    // Test with standard user first
    const standardLoginPage = new LoginPage(page);
    await standardLoginPage.goto();
    
    // Start measurement for standard user
    await page.evaluate(() => window.performance.mark('standardStart'));
    
    // Login with standard user
    await standardLoginPage.login(userData.validUsers.standard.username, userData.validUsers.standard.password);
    
    // Wait for inventory page to load and capture timing
    await page.waitForURL(/.*inventory.html/);
    const standardTiming = await page.evaluate(() => {
      window.performance.mark('standardEnd');
      window.performance.measure('standardDuration', 'standardStart', 'standardEnd');
      return window.performance.getEntriesByName('standardDuration')[0].duration;
    });
    
    console.log(`Standard user login duration: ${standardTiming}ms`);
    
    // Clear state and test with performance_glitch_user
    await page.context().clearCookies();
    
    const glitchLoginPage = new LoginPage(page);
    await glitchLoginPage.goto();
    
    // Start measurement for glitch user
    await page.evaluate(() => window.performance.mark('glitchStart'));
    
    // Login with glitch user
    await glitchLoginPage.login(userData.validUsers.performance.username, userData.validUsers.performance.password);
    
    // Wait for inventory page to load and capture timing
    await page.waitForURL(/.*inventory.html/);
    const glitchTiming = await page.evaluate(() => {
      window.performance.mark('glitchEnd');
      window.performance.measure('glitchDuration', 'glitchStart', 'glitchEnd');
      return window.performance.getEntriesByName('glitchDuration')[0].duration;
    });
    
    console.log(`Glitch user login duration: ${glitchTiming}ms`);
    
    // The performance_glitch_user should be slower than standard user
    expect(glitchTiming).toBeGreaterThan(standardTiming);
  });
});
