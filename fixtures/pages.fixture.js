// @ts-check
const base = require('@playwright/test');
const {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutInfoPage,
  CheckoutOverviewPage,
  CheckoutCompletePage,
} = require('../pages');
const { STANDARD_USER } = require('../test-data/users');
const { URL_PATTERNS } = require('../test-data/urls');

/**
 * @typedef {{
 *   loginPage: LoginPage,
 *   inventoryPage: InventoryPage,
 *   cartPage: CartPage,
 *   checkoutInfoPage: CheckoutInfoPage,
 *   checkoutOverviewPage: CheckoutOverviewPage,
 *   checkoutCompletePage: CheckoutCompletePage,
 *   loggedIn: InventoryPage,
 * }} PageFixtures
 */

/**
 * @type {base.TestType<
 *   base.PlaywrightTestArgs & base.PlaywrightTestOptions & PageFixtures,
 *   base.PlaywrightWorkerArgs & base.PlaywrightWorkerOptions
 * >}
 */
const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutInfoPage: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  // Logs in as standard_user and lands on the inventory page.
  loggedIn: async ({ page, loginPage, inventoryPage }, use) => {
    await loginPage.open();
    await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);
    await base.expect(page).toHaveURL(URL_PATTERNS.INVENTORY);
    await use(inventoryPage);
  },
});

module.exports = { test, expect: base.expect };
