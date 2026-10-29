// @ts-check
const { test, expect } = require('../fixtures/pages.fixture');
const { SORT } = require('../pages');
const { PRODUCTS, PRODUCT_NAMES, PRICES_LOW_TO_HIGH } = require('../test-data/products');

test.describe('Inventory', () => {
  test('TC-04 shows the full list of product names', async ({ loggedIn: inventoryPage }) => {
    await expect(inventoryPage.itemNames).toHaveCount(6);
    await expect(inventoryPage.itemNames).toHaveText(PRODUCT_NAMES);
  });

  test('TC-05 sorts by name A to Z and Z to A', async ({ loggedIn: inventoryPage }) => {
    const initialNames = await inventoryPage.getNames();
    expect(initialNames).toEqual([...initialNames].sort());

    await inventoryPage.sortBy(SORT.NAME_DESC);

    await expect(inventoryPage.itemNames).toHaveText([...initialNames].reverse());
  });

  test('TC-06 sorts by price', async ({ loggedIn: inventoryPage }) => {
    await inventoryPage.sortBy(SORT.PRICE_ASC);

    await expect.poll(() => inventoryPage.getPrices()).toEqual(PRICES_LOW_TO_HIGH);
    const ascending = await inventoryPage.getPrices();
    for (let i = 1; i < ascending.length; i++) {
      expect(ascending[i]).toBeGreaterThanOrEqual(ascending[i - 1]);
    }

    await inventoryPage.sortBy(SORT.PRICE_DESC);

    await expect.poll(() => inventoryPage.getPrices()).toEqual([...PRICES_LOW_TO_HIGH].reverse());
    const descending = await inventoryPage.getPrices();
    for (let i = 1; i < descending.length; i++) {
      expect(descending[i]).toBeLessThanOrEqual(descending[i - 1]);
    }
  });

  test('TC-07 finds a card by name and works inside it', async ({ loggedIn: inventoryPage }) => {
    const card = inventoryPage.item(PRODUCTS.fleeceJacket.name);
    const button = inventoryPage.itemButton(card);

    await expect(inventoryPage.itemPrice(card)).toHaveText('$49.99');
    await button.click();

    await expect(button).toHaveText('Remove');
    await expect(inventoryPage.header.cartBadge).toHaveText('1');
  });

  test('TC-08 adds all products to the cart in a loop', async ({ loggedIn: inventoryPage }) => {
    await inventoryPage.addAllToCart();

    await expect(inventoryPage.header.cartBadge).toHaveText('6');
    for (const card of await inventoryPage.items.all()) {
      await expect(inventoryPage.itemButton(card)).toHaveText('Remove');
    }
  });
});
