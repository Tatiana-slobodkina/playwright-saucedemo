// @ts-check

/** UI texts of saucedemo.com. */
const TITLES = {
  PRODUCTS: 'Products',
  ORDER_COMPLETE: 'Thank you for your order!',
};

const BUTTONS = {
  ADD_TO_CART: 'Add to cart',
  REMOVE: 'Remove',
};

const LOGIN_ERRORS = {
  USERNAME_REQUIRED: 'Epic sadface: Username is required',
  PASSWORD_REQUIRED: 'Epic sadface: Password is required',
  WRONG_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
  LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
};

const CHECKOUT_ERRORS = {
  FIRST_NAME_REQUIRED: 'Error: First Name is required',
  LAST_NAME_REQUIRED: 'Error: Last Name is required',
  POSTAL_CODE_REQUIRED: 'Error: Postal Code is required',
};

module.exports = { TITLES, BUTTONS, LOGIN_ERRORS, CHECKOUT_ERRORS };
