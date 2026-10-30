// @ts-check
const { test, expect } = require('../fixtures/pages.fixture');
const { URL_PATTERNS } = require('../test-data/urls');
const { TITLES, LOGIN_ERRORS } = require('../test-data/texts');
const { STANDARD_USER, LOCKED_OUT_USER, INVALID_LOGINS } = require('../test-data/users');

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('TC-01 successful login', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);

    await expect(page).toHaveURL(URL_PATTERNS.INVENTORY);
    await expect(inventoryPage.title).toHaveText(TITLES.PRODUCTS);
  });

  test('TC-02 locked out user cannot log in', async ({ page, loginPage }) => {
    await loginPage.login(LOCKED_OUT_USER.username, LOCKED_OUT_USER.password);

    await expect(loginPage.error).toHaveText(LOGIN_ERRORS.LOCKED_OUT);
    await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
  });

  for (const { title, username, password, message } of INVALID_LOGINS) {
    test(`TC-03 shows error for ${title}`, async ({ page, loginPage }) => {
      await loginPage.login(username, password);

      await expect(loginPage.error).toHaveText(message);
      await expect(page).toHaveURL(URL_PATTERNS.LOGIN);

      await loginPage.closeError();
      await expect(loginPage.error).toBeHidden();
    });
  }
});
