// @ts-check

class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  /** @param {string} path */
  async goto(path) {
    await this.page.goto(path);
  }
}

module.exports = { BasePage };
