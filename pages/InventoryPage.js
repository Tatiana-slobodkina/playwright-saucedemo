// @ts-check
const { BasePage } = require('./BasePage');
const { Header } = require('./components/Header');
const { parsePrice } = require('../utils/price');

/** Option labels of the product-sort-container select. */
const SORT = {
  NAME_ASC: 'Name (A to Z)',
  NAME_DESC: 'Name (Z to A)',
  PRICE_ASC: 'Price (low to high)',
  PRICE_DESC: 'Price (high to low)',
};

class InventoryPage extends BasePage {
  static path = '/inventory.html';
  static urlPattern = /\/inventory\.html$/;

  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.title = page.locator('[data-test="title"]');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async open() {
    await this.goto(InventoryPage.path);
  }

  /** @param {string} name */
  item(name) {
    return this.items.filter({ hasText: name });
  }

  /** @param {import('@playwright/test').Locator} item */
  itemButton(item) {
    // Image and title links also carry role="button", so match the <button> tag itself.
    return item.locator('button');
  }

  /** @param {import('@playwright/test').Locator} item */
  itemPrice(item) {
    return item.locator('[data-test="inventory-item-price"]');
  }

  /** @param {string} name */
  async addToCart(name) {
    await this.item(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  /** @param {string[]} names */
  async addManyToCart(names) {
    for (const name of names) {
      await this.addToCart(name);
    }
  }

  async addAllToCart() {
    await this.items.first().waitFor();
    for (const item of await this.items.all()) {
      await item.getByRole('button', { name: 'Add to cart' }).click();
    }
  }

  /** @param {string} label one of SORT values */
  async sortBy(label) {
    await this.sortSelect.selectOption({ label });
  }

  /** @returns {Promise<string[]>} */
  async getNames() {
    await this.itemNames.first().waitFor();
    return this.itemNames.allTextContents();
  }

  /** @returns {Promise<number[]>} */
  async getPrices() {
    await this.itemPrices.first().waitFor();
    return (await this.itemPrices.allTextContents()).map(parsePrice);
  }
}

module.exports = { InventoryPage, SORT };
