// @ts-check
const { BasePage } = require('./BasePage');

class CheckoutInfoPage extends BasePage {
  static urlPattern = /\/checkout-step-one\.html$/;

  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.firstName = page.getByTestId('first-name');
    this.lastName = page.getByTestId('last-name');
    this.postalCode = page.getByTestId('postal-code');
    this.continueButton = page.getByTestId('continue');
    this.error = page.locator('[data-test="error"]');
  }

  /** @param {{ firstName: string, lastName: string, postalCode: string }} customer */
  async fill({ firstName, lastName, postalCode }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  /** @param {{ firstName: string, lastName: string, postalCode: string }} customer */
  async submit(customer) {
    await this.fill(customer);
    await this.continueButton.click();
  }
}

module.exports = { CheckoutInfoPage };
