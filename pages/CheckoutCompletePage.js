// @ts-check
const { BasePage } = require('./BasePage');
const { Header } = require('./components/Header');

class CheckoutCompletePage extends BasePage {
  static urlPattern = /\/checkout-complete\.html$/;

  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.completeHeader = page.getByTestId('complete-header');
    this.backToProductsButton = page.getByTestId('back-to-products');
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}

module.exports = { CheckoutCompletePage };
