import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  // Selectors
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/');
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Login with the provided username and password
   * @param username Username
   * @param password Password
   */
  // В login-page.ts
async login(username: string, password: string) {
  try {
    // Заполняем поля и жмём кнопку
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    
    // Используем простую паузу вместо сложных ожиданий
    await this.page.waitForTimeout(3000);
    
    // Проверим, есть ли ошибка входа
    const errorVisible = await this.errorMessage.isVisible();
    if (errorVisible) {
      console.log('Ошибка входа:', await this.errorMessage.textContent());
      return false;
    }
    
    return true;
  } catch (error) {
    console.log('Исключение при входе:', error);
    return false;
  }
}

  /**
   * Get the error message text
   * @returns The error message text
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }

  /**
   * Check if login was successful
   * @returns Whether login was successful
   */
  async isLoginSuccessful(): Promise<boolean> {
    return await this.page.url().includes('/inventory.html');
  }
}
