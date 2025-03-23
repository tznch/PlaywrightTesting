import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Load JSON test data from file
 * @param filePath Path to the JSON file
 * @returns Parsed JSON data
 */
export function loadTestData<T>(filePath: string): T {
  const resolvedPath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
  return JSON.parse(fileContent) as T;
}

/**
 * Takes a screenshot with timestamp
 * @param page Playwright page
 * @param name Screenshot name
 */
export async function takeScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = path.join(process.cwd(), 'test-results', 'screenshots');
  
  // Ensure directory exists
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath, { recursive: true });
  }
  
  await page.screenshot({ 
    path: path.join(screenshotPath, `${name}-${timestamp}.png`),
    fullPage: true 
  });
}