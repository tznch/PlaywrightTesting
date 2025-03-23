import { test as setup } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// User credentials from environment variables
const USERNAME = process.env.USER_NAME || 'standard_user';
const PASSWORD = process.env.PASSWORD || 'secret_sauce';

// Set up the authentication state
setup('authenticate', async ({ page }) => {
  // Create a new LoginPage instance
  const loginPage = new LoginPage(page);
  
  // Navigate to the login page
  await loginPage.goto();
  
  // Login with the provided credentials
  await loginPage.login(USERNAME, PASSWORD);
  
  // Check if login was successful
  if (!await loginPage.isLoginSuccessful()) {
    throw new Error('Login failed!');
  }
  
  // Store the authenticated state
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});