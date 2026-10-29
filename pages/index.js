// @ts-check
const { BasePage } = require('./BasePage');
const { Header } = require('./components/Header');
const { LoginPage } = require('./LoginPage');
const { InventoryPage, SORT } = require('./InventoryPage');
const { CartPage } = require('./CartPage');
const { CheckoutInfoPage } = require('./CheckoutInfoPage');
const { CheckoutOverviewPage } = require('./CheckoutOverviewPage');
const { CheckoutCompletePage } = require('./CheckoutCompletePage');

module.exports = {
  BasePage,
  Header,
  LoginPage,
  InventoryPage,
  SORT,
  CartPage,
  CheckoutInfoPage,
  CheckoutOverviewPage,
  CheckoutCompletePage,
};
