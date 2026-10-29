// @ts-check
const { BasePage } = require('./BasePage');
const { parsePrice } = require('../utils/price');

class CheckoutOverviewPage extends BasePage {
  static urlPattern = /\/checkout-step-two\.html$/;

  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.getByTestId('finish');
  }

  /** @returns {Promise<number[]>} */
  async getItemPrices() {
    await this.itemPrices.first().waitFor();
    return (await this.itemPrices.allTextContents()).map(parsePrice);
  }

  async getSubtotal() {
    return parsePrice(await this.subtotalLabel.innerText());
  }

  async getTax() {
    return parsePrice(await this.taxLabel.innerText());
  }

  async getTotal() {
    return parsePrice(await this.totalLabel.innerText());
  }

  async finish() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutOverviewPage };
