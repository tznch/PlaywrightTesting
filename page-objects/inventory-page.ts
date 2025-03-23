import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class InventoryPage extends BasePage {
  [x: string]: any;
  // Селекторы
  readonly productsList: Locator;
  readonly shoppingCartLink: Locator;
  readonly productSortContainer: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/inventory.html');
    this.productsList = page.locator('.inventory_item');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.productSortContainer = page.locator('[data-test="product_sort_container"]');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  /**
   * Добавить товар "Sauce Labs Backpack" в корзину
   * Этот метод непосредственно кликает по кнопке первого товара
   */
  async addBackpackToCart() {
    // Используем прямой селектор по классу и тексту
    await this.page.locator('.btn_inventory:has-text("Add to cart")').first().click();
  }

  /**
   * Добавить товар в корзину по названию
   */
  async addProductToCart(productName: string) {
    // Сначала дождемся загрузки страницы
    await this.page.waitForLoadState('networkidle');
    
    // Найдем кнопку по data-test атрибуту
    const productIdMap = {
      'Sauce Labs Backpack': 'add-to-cart-sauce-labs-backpack',
      'Sauce Labs Bike Light': 'add-to-cart-sauce-labs-bike-light',
      'Sauce Labs Bolt T-Shirt': 'add-to-cart-sauce-labs-bolt-t-shirt',
      'Sauce Labs Fleece Jacket': 'add-to-cart-sauce-labs-fleece-jacket',
      'Sauce Labs Onesie': 'add-to-cart-sauce-labs-onesie',
      'Test.allTheThings() T-Shirt (Red)': 'add-to-cart-test.allthethings()-t-shirt-(red)'
    };
    
    const buttonId = productIdMap[productName];
    await this.page.waitForSelector(`#${buttonId}`, { state: 'visible', timeout: 10000 });
    await this.page.click(`#${buttonId}`);
  }

  /**
   * Получить количество товаров в корзине
   */
  async getCartItemCount(): Promise<number> {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    if (await cartBadge.isVisible()) {
      const countText = await cartBadge.textContent();
      return countText ? parseInt(countText) : 0;
    }
    return 0;
  }

  /**
   * Перейти в корзину
   */
  async goToCart() {
    await this.shoppingCartLink.click();
  }

  /**
   * Сортировать товары
   */
  async sortProducts(sortOption: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.waitForSelector('.product_sort_container', { state: 'visible' });
    await this.page.selectOption('.product_sort_container', sortOption);
    // Дождитесь обновления списка
    await this.page.waitForTimeout(500);
  }

  /**
   * Выйти из системы
   */
  async logout() {
    await this.burgerMenuButton.click();
    await this.logoutLink.click();
  }
  
  // В inventory-page.ts
async removeProductFromCart(productName: string) {
  // Сначала товар должен быть добавлен в корзину, что меняет ID кнопки
  const productIdMap = {
    'Sauce Labs Backpack': 'remove-sauce-labs-backpack',
    'Sauce Labs Bike Light': 'remove-sauce-labs-bike-light',
    // ...и т.д.
  };
  
  const buttonId = productIdMap[productName];
  await this.page.waitForSelector(`#${buttonId}`, { state: 'visible', timeout: 10000 });
  await this.page.click(`#${buttonId}`);
}
}
  