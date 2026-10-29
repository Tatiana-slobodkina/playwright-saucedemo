// @ts-check

const CUSTOMER = { firstName: 'John', lastName: 'Doe', postalCode: '12345' };

const INVALID_CUSTOMERS = [
  { title: 'all fields empty', firstName: '', lastName: '', postalCode: '', message: 'Error: First Name is required' },
  { title: 'last name and zip empty', firstName: 'John', lastName: '', postalCode: '', message: 'Error: Last Name is required' },
  { title: 'zip empty', firstName: 'John', lastName: 'Doe', postalCode: '', message: 'Error: Postal Code is required' },
];

module.exports = { CUSTOMER, INVALID_CUSTOMERS };
