// @ts-check
const { test, expect } = require('../fixtures/pages.fixture');
const { CartPage } = require('../pages');
const { PRODUCTS } = require('../test-data/products');

test.describe('Cart', () => {
  test('TC-09 cart contains the added products', async ({ page, loggedIn: inventoryPage, cartPage }) => {
    const added = [PRODUCTS.backpack, PRODUCTS.bikeLight, PRODUCTS.onesie].map((p) => p.name);

    await inventoryPage.addManyToCart(added);
    await inventoryPage.header.openCart();
    await expect(page).toHaveURL(CartPage.urlPattern);

    await expect(cartPage.items).toHaveCount(added.length);
    expect((await cartPage.getNames()).sort()).toEqual([...added].sort());
    await expect(cartPage.itemQuantities).toHaveText(added.map(() => '1'));
  });

  test('TC-10 removes products from the cart', async ({ loggedIn: inventoryPage, cartPage }) => {
    await inventoryPage.addManyToCart([PRODUCTS.backpack.name, PRODUCTS.bikeLight.name]);
    await inventoryPage.header.openCart();

    await cartPage.remove(PRODUCTS.backpack.id);

    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemNames).toHaveText([PRODUCTS.bikeLight.name]);
    await expect(cartPage.header.cartBadge).toHaveText('1');

    await cartPage.remove(PRODUCTS.bikeLight.id);

    await expect(cartPage.items).toHaveCount(0);
    // The badge element is removed entirely, not rendered as "0".
    await expect(cartPage.header.cartBadge).toHaveCount(0);
  });
});
