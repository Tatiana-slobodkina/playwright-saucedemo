// @ts-check
const { CHECKOUT_ERRORS } = require('./texts');

const CUSTOMER = { firstName: 'John', lastName: 'Doe', postalCode: '12345' };

const INVALID_CUSTOMERS = [
  { title: 'all fields empty', firstName: '', lastName: '', postalCode: '', message: CHECKOUT_ERRORS.FIRST_NAME_REQUIRED },
  { title: 'last name and zip empty', firstName: 'John', lastName: '', postalCode: '', message: CHECKOUT_ERRORS.LAST_NAME_REQUIRED },
  { title: 'zip empty', firstName: 'John', lastName: 'Doe', postalCode: '', message: CHECKOUT_ERRORS.POSTAL_CODE_REQUIRED },
];

module.exports = { CUSTOMER, INVALID_CUSTOMERS };
