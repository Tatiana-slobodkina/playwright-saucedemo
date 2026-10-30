// @ts-check
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  static path = '/';

  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.username = page.getByTestId('user-name');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.error = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('[data-test="error-button"]');
  }

  async open() {
    await this.page.goto(LoginPage.path);
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async closeError() {
    await this.errorCloseButton.click();
  }
}

module.exports = { LoginPage };
