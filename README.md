# SauceDemo Automation Project

End-to-end test automation for [SauceDemo](https://www.saucedemo.com/) website using Playwright with TypeScript.

## 🛠️ Technologies

* Playwright with TypeScript
* Page Object Model (POM) architecture
* Custom getByTestId locators
* Fixtures for shared state
* GitHub Actions for CI/CD pipeline
* Environment variables
* JSON test data
* Gherkin-style step definitions

## 📁 Project Structure

```
/
├── .env                      # Environment variables
├── .github/workflows/        # GitHub Actions workflows
├── fixtures/                 # Fixtures for test setup
├── page-objects/             # Page object classes
├── tests/                    # Test files
│   ├── e2e/                  # End-to-end tests
│   └── step-definitions/     # Gherkin step definitions
├── test-data/                # Test data files
├── utils/                    # Helper utilities
├── playwright.config.ts      # Playwright configuration
└── package.json              # Project dependencies
```

## ▶️ Getting Started

### Prerequisites

- Node.js 14 or higher
- npm 6 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd saucedemo-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

4. Create a `.env` file with your configuration (see `.env.example` for reference)

### Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test file:
```bash
npx playwright test tests/e2e/login.spec.ts
```

Run tests with UI Mode:
```bash
npx playwright test --ui
```

Run tests with headed browsers:
```bash
npx playwright test --headed
```

### Report Generation

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## 🔄 CI/CD Integration

This project includes GitHub Actions workflow for continuous integration. The workflow:

- Runs on push to main branch
- Runs on pull requests to main branch
- Runs daily at midnight
- Runs tests in parallel
- Uploads test results as artifacts

## 📊 Test Coverage

- Login functionality with various scenarios
- Product inventory browsing and sorting
- Shopping cart operations
- Checkout process workflow

## 🧪 Test Data Management

Test data is stored in JSON files in the `test-data` directory. Environment variables can be used to override test data.

## 🔐 Authentication

Tests use a shared authentication state to improve performance. The authentication setup is handled in the `fixtures/auth.setup.ts` file.
