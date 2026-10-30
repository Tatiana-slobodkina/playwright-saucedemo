// @ts-check
const { BasePage } = require('./BasePage');
const { Header } = require('./components/Header');

class CartPage extends BasePage {
  static path = '/cart.html';

  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.cartList = page.locator('[data-test="cart-list"]');
    this.items = this.cartList.locator('[data-test="inventory-item"]');
    this.itemNames = this.cartList.locator('[data-test="inventory-item-name"]');
    this.itemQuantities = this.cartList.locator('[data-test="item-quantity"]');
    this.checkoutButton = page.getByTestId('checkout');
  }

  /** @param {string} productId e.g. "sauce-labs-backpack" */
  removeButton(productId) {
    return this.page.getByTestId(`remove-${productId}`);
  }

  /** @param {string} productId */
  async remove(productId) {
    await this.removeButton(productId).click();
  }

  /** @returns {Promise<string[]>} */
  async getNames() {
    await this.itemNames.first().waitFor();
    return this.itemNames.allTextContents();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
