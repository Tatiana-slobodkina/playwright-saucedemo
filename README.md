# playwright-saucedemo

[![Playwright Tests](https://github.com/Tatiana-slobodkina/playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/Tatiana-slobodkina/playwright-saucedemo/actions/workflows/playwright.yml)

End-to-end tests for [saucedemo.com](https://www.saucedemo.com) written with [Playwright](https://playwright.dev/) using the Page Object pattern.

## Coverage

| Area | Cases |
|---|---|
| Login | TC-01 successful login · TC-02 locked out user · TC-03 invalid credentials (data-driven) |
| Inventory | TC-04 product list · TC-05 sort by name · TC-06 sort by price · TC-07 work inside a product card · TC-08 add all products to cart |
| Cart | TC-09 cart contents · TC-10 remove products |
| Checkout | TC-11 item total, tax and total · TC-12 form validation · TC-13 full order |

## Project structure

```
pages/          Page Objects (BasePage, LoginPage, InventoryPage, CartPage, Checkout*) and shared components
fixtures/       Custom Playwright fixtures that provide page objects and a logged-in state
test-data/      Users, products and checkout data
utils/          Helpers (price parsing)
tests/          Spec files
```

## Getting started

Requires Node.js 18+.

```bash
npm install
npx playwright install chromium
```

## Running tests

```bash
npm test               # headless run
npm run test:headed    # run in a visible browser
npm run test:ui        # Playwright UI mode
npm run report         # open the last HTML report
```

## CI

Tests run on GitHub Actions on every push and pull request to `main` (and can be started manually from the Actions tab). The HTML report is uploaded as a build artifact.
