// @ts-check
const { test, expect } = require('../fixtures/pages.fixture');
const { CheckoutInfoPage, CheckoutOverviewPage, CheckoutCompletePage, InventoryPage } = require('../pages');
const { PRODUCTS, TAX_RATE } = require('../test-data/products');
const { CUSTOMER, INVALID_CUSTOMERS } = require('../test-data/checkout');
const { sum } = require('../utils/price');

test.describe('Checkout', () => {
  test('TC-11 calculates item total, tax and total', async ({ page, loggedIn: inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage }) => {
    await inventoryPage.addManyToCart([PRODUCTS.backpack.name, PRODUCTS.bikeLight.name, PRODUCTS.onesie.name]);
    await inventoryPage.header.openCart();
    await cartPage.checkout();
    await checkoutInfoPage.submit(CUSTOMER);
    await expect(page).toHaveURL(CheckoutOverviewPage.urlPattern);

    const prices = await checkoutOverviewPage.getItemPrices();
    expect(prices).toHaveLength(3);
    const itemTotal = sum(prices);

    await expect(checkoutOverviewPage.subtotalLabel).toHaveText(`Item total: $${itemTotal.toFixed(2)}`);

    const tax = await checkoutOverviewPage.getTax();
    expect(tax).toBeCloseTo(itemTotal * TAX_RATE, 2);

    const total = await checkoutOverviewPage.getTotal();
    expect(total).toBeCloseTo(itemTotal + tax, 2);
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
        await expect(page).toHaveURL(CheckoutInfoPage.urlPattern);
      });
    }
  });

  test('TC-13 completes a full order', async ({ page, loggedIn: inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, checkoutCompletePage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack.name);
    await inventoryPage.header.openCart();
    await cartPage.checkout();
    await checkoutInfoPage.submit(CUSTOMER);
    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(CheckoutCompletePage.urlPattern);
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.header.cartBadge).toHaveCount(0);

    await checkoutCompletePage.backToProducts();
    await expect(page).toHaveURL(InventoryPage.urlPattern);
  });
});
