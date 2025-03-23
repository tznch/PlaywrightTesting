/**
 * Test data generator utility
 * Provides methods to generate various types of test data
 */

/**
 * Generate a random username
 * @returns Random username
 */
export function generateUsername(): string {
  const prefix = 'user';
  const randomNumber = Math.floor(Math.random() * 10000);
  return `${prefix}${randomNumber}`;
}

/**
 * Generate a random email
 * @param domain Optional domain name
 * @returns Random email address
 */
export function generateEmail(domain: string = 'example.com'): string {
  const username = generateUsername();
  return `${username}@${domain}`;
}

/**
 * Generate a random password
 * @param length Password length
 * @returns Random password
 */
export function generatePassword(length: number = 10): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

/**
 * Generate random customer information
 * @returns Customer info object
 */
export function generateCustomerInfo(): {
  firstName: string;
  lastName: string;
  postalCode: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
} {
  const firstNames = ['John', 'Jane', 'Michael', 'Emma', 'William', 'Olivia', 'James', 'Sophia'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA'];
  
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const cityIndex = Math.floor(Math.random() * cities.length);
  
  return {
    firstName: randomFirstName,
    lastName: randomLastName,
    postalCode: String(10000 + Math.floor(Math.random() * 90000)),
    address: `${100 + Math.floor(Math.random() * 9000)} Main St`,
    city: cities[cityIndex],
    state: states[cityIndex],
    country: 'United States',
    phone: `(${100 + Math.floor(Math.random() * 900)}) ${100 + Math.floor(Math.random() * 900)}-${1000 + Math.floor(Math.random() * 9000)}`
  };
}

/**
 * Generate a random credit card number (for test purposes only)
 * @returns Fake credit card number
 */
export function generateCreditCardNumber(): string {
  // This is a FAKE number format, not a real credit card algorithm
  const prefix = '4111';
  let number = prefix;
  
  for (let i = 0; i < 12; i++) {
    number += Math.floor(Math.random() * 10);
  }
  
  return number;
}

// Define Product interface for better type checking
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

/**
 * Generate product data
 * @param count Number of products to generate
 * @returns Array of product objects
 */
export function generateProducts(count: number = 5): Product[] {
  const products: Product[] = [];
  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
  const productNames = [
    'Smartphone', 'Laptop', 'Headphones', 'T-shirt', 'Jeans',
    'Novel', 'Cookbook', 'Lamp', 'Pillow', 'Basketball',
    'Soccer Ball', 'Tablet', 'Monitor', 'Sweater', 'Shorts'
  ];
  
  for (let i = 0; i < count; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const nameIndex = Math.floor(Math.random() * productNames.length);
    
    products.push({
      id: 1000 + i,
      name: `${productNames[nameIndex]} ${1000 + i}`,
      description: `This is a ${productNames[nameIndex]} description.`,
      price: parseFloat((10 + Math.random() * 90).toFixed(2)),
      category: categories[categoryIndex]
    });
  }
  
  return products;
}