import fs from 'fs';
import path from 'path';

/**
 * Global setup function that runs before all tests
 */
async function globalSetup() {
  console.log('Starting global setup...');
  
  // Create necessary directories
  const dirs = [
    'playwright/.auth',
    'test-results',
    'test-results/screenshots',
    'test-results/videos',
    'snapshots'
  ];
  
  for (const dir of dirs) {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
    }
  }
  
  console.log('Global setup completed');
}

export default globalSetup;
