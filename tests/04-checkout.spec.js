// @ts-check
const { test, expect } = require('../fixtures/pages.fixture');
const { URL_PATTERNS } = require('../test-data/urls');
const { TITLES } = require('../test-data/texts');
const { PRODUCTS, TAX_RATE } = require('../test-data/products');
const { CUSTOMER, INVALID_CUSTOMERS } = require('../test-data/checkout');
const { PRICE_DECIMALS, formatPrice, sum } = require('../utils/priceParser');

test.describe('Checkout', () => {
  test('TC-11 calculates item total, tax and total', async ({ page, loggedIn: inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage }) => {
    const added = [PRODUCTS.backpack.name, PRODUCTS.bikeLight.name, PRODUCTS.onesie.name];
    await inventoryPage.addManyToCart(added);
    await inventoryPage.header.openCart();
    await cartPage.checkout();
    await checkoutInfoPage.submit(CUSTOMER);
    await expect(page).toHaveURL(URL_PATTERNS.CHECKOUT_OVERVIEW);

    const prices = await checkoutOverviewPage.getItemPrices();
    expect(prices).toHaveLength(added.length);
    const itemTotal = sum(prices);

    await expect(checkoutOverviewPage.subtotalLabel).toHaveText(`Item total: ${formatPrice(itemTotal)}`);

    const tax = await checkoutOverviewPage.getTax();
    expect(tax).toBeCloseTo(itemTotal * TAX_RATE, PRICE_DECIMALS);

    const total = await checkoutOverviewPage.getTotal();
    expect(total).toBeCloseTo(itemTotal + tax, PRICE_DECIMALS);
  });

  test.describe('TC-12 checkout form validation', () => {
    test.beforeEach(async ({ loggedIn: inventoryPage, cartPage }) => {
      await inventoryPage.addToCart(PRODUCTS.backpack.name);
      await inventoryPage.header.openCart();
      await cartPage.checkout();
    });

    for (const { title, message, ...customer } of INVALID_CUSTOMERS) {
      test(`shows error for ${title}`, async ({ page, checkoutInfoPage }) => {
        await checkoutInfoPage.submit(customer);

        await expect(checkoutInfoPage.error).toHaveText(message);
        await expect(page).toHaveURL(URL_PATTERNS.CHECKOUT_INFO);
      });
    }
  });

  test('TC-13 completes a full order', async ({ page, loggedIn: inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, checkoutCompletePage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack.name);
    await inventoryPage.header.openCart();
    await cartPage.checkout();
    await checkoutInfoPage.submit(CUSTOMER);
    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(URL_PATTERNS.CHECKOUT_COMPLETE);
    await expect(checkoutCompletePage.completeHeader).toHaveText(TITLES.ORDER_COMPLETE);
    await expect(checkoutCompletePage.header.cartBadge).toBeHidden();

    await checkoutCompletePage.backToProducts();
    await expect(page).toHaveURL(URL_PATTERNS.INVENTORY);
  });
});
