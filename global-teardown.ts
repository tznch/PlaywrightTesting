/**
 * Global teardown function that runs after all tests
 */
async function globalTeardown() {
  console.log('Starting global teardown...');
  
  // Clean up or post-test operations can be done here
  
  console.log('Global teardown completed');
}

export default globalTeardown;
