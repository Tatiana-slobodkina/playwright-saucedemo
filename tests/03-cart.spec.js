// @ts-check
const { test, expect } = require('../fixtures/pages.fixture');
const { URL_PATTERNS } = require('../test-data/urls');
const { PRODUCTS, DEFAULT_QUANTITY } = require('../test-data/products');

test.describe('Cart', () => {
  test('TC-09 cart contains the added products', async ({ page, loggedIn: inventoryPage, cartPage }) => {
    const added = [PRODUCTS.backpack, PRODUCTS.bikeLight, PRODUCTS.onesie].map((p) => p.name);

    await inventoryPage.addManyToCart(added);
    await inventoryPage.header.openCart();
    await expect(page).toHaveURL(URL_PATTERNS.CART);

    await expect(cartPage.items).toHaveCount(added.length);
    expect((await cartPage.getNames()).sort()).toEqual([...added].sort());
    await expect(cartPage.itemQuantities).toHaveText(added.map(() => String(DEFAULT_QUANTITY)));
  });

  test('TC-10 removes products from the cart', async ({ loggedIn: inventoryPage, cartPage }) => {
    await inventoryPage.addManyToCart([PRODUCTS.backpack.name, PRODUCTS.bikeLight.name]);
    await inventoryPage.header.openCart();

    await cartPage.remove(PRODUCTS.backpack.id);

    const remaining = [PRODUCTS.bikeLight.name];
    await expect(cartPage.items).toHaveCount(remaining.length);
    await expect(cartPage.itemNames).toHaveText(remaining);
    await expect(cartPage.header.cartBadge).toHaveText(String(remaining.length));

    await cartPage.remove(PRODUCTS.bikeLight.id);

    await expect(cartPage.items).toHaveCount(0);
    // The badge element is removed entirely, not rendered as "0".
    await expect(cartPage.header.cartBadge).toBeHidden();
  });
});
