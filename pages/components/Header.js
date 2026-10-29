// @ts-check

class Header {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { Header };
