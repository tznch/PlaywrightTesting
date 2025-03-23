import { request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class ApiHelper {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || (process.env.API_BASE_URL as string);
  }

  /**
   * Helper method to get authentication token (example)
   */
  async getAuthToken(username: string, password: string): Promise<string> {
    const context = await request.newContext({
      baseURL: this.baseUrl,
    });

    const response = await context.post('/api/auth', {
      data: {
        username,
        password
      }
    });

    if (response.ok()) {
      const body = await response.json();
      return body.token;
    } else {
      throw new Error(`Failed to get auth token: ${response.statusText()}`);
    }
  }

  /**
   * Get products via API
   */
  async getProducts(token: string): Promise<any[]> {
    const context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });

    const response = await context.get('/api/products');
    
    if (response.ok()) {
      const body = await response.json();
      return body.products;
    } else {
      throw new Error(`Failed to get products: ${response.statusText()}`);
    }
  }

  /**
   * Create cart via API (example)
   */
  async createCart(token: string): Promise<string> {
    const context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });

    const response = await context.post('/api/cart');
    
    if (response.ok()) {
      const body = await response.json();
      return body.cartId;
    } else {
      throw new Error(`Failed to create cart: ${response.statusText()}`);
    }
  }

  /**
   * Add product to cart via API (example)
   */
  async addProductToCart(token: string, cartId: string, productId: string, quantity: number = 1): Promise<void> {
    const context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });

    const response = await context.post(`/api/cart/${cartId}/items`, {
      data: {
        productId,
        quantity
      }
    });
    
    if (!response.ok()) {
      throw new Error(`Failed to add product to cart: ${response.statusText()}`);
    }
  }
}