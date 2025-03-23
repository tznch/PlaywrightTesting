import fs from 'fs';
import path from 'path';

/**
 * Custom reporter implementation
 */
class CustomReporter {
  onBegin(config, suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
    
    // Create directory for test run report
    if (!fs.existsSync('./test-results/run-report')) {
      fs.mkdirSync('./test-results/run-report', { recursive: true });
    }
  }

  onTestBegin(test) {
    console.log(`Starting test: ${test.title}`);
  }

  onTestEnd(test, result) {
    console.log(`Finished test: ${test.title} with status ${result.status}`);
  }

  onEnd(result) {
    console.log(`Finished the run: ${result.status}`);
    
    // Generate summary report
    const summary = {
      totalTests: result.totalTests || 0,
      passed: result.passed || 0,
      failed: result.failed || 0,
      skipped: result.skipped || 0,
      timestamp: new Date().toISOString(),
      duration: result.duration || 0
    };
    
    fs.writeFileSync(
      path.join('./test-results/run-report', 'summary.json'),
      JSON.stringify(summary, null, 2)
    );
  }
}

export default CustomReporter;