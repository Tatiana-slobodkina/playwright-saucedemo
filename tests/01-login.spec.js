// @ts-check
const { test, expect } = require('../fixtures/pages.fixture');
const { LoginPage, InventoryPage } = require('../pages');
const { STANDARD_USER, LOCKED_OUT_USER, INVALID_LOGINS } = require('../test-data/users');

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('TC-01 successful login', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);

    await expect(page).toHaveURL(InventoryPage.urlPattern);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('TC-02 locked out user cannot log in', async ({ page, loginPage }) => {
    await loginPage.login(LOCKED_OUT_USER.username, LOCKED_OUT_USER.password);

    await expect(loginPage.error).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page).toHaveURL(LoginPage.urlPattern);
  });

  for (const { title, username, password, message } of INVALID_LOGINS) {
    test(`TC-03 shows error for ${title}`, async ({ page, loginPage }) => {
      await loginPage.login(username, password);

      await expect(loginPage.error).toHaveText(message);
      await expect(page).toHaveURL(LoginPage.urlPattern);

      await loginPage.closeError();
      await expect(loginPage.error).toBeHidden();
    });
  }
});
