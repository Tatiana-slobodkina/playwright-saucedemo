// @ts-check

const PRODUCTS = {
  backpack: { id: 'sauce-labs-backpack', name: 'Sauce Labs Backpack', price: 29.99 },
  bikeLight: { id: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light', price: 9.99 },
  boltTShirt: { id: 'sauce-labs-bolt-t-shirt', name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  fleeceJacket: { id: 'sauce-labs-fleece-jacket', name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  onesie: { id: 'sauce-labs-onesie', name: 'Sauce Labs Onesie', price: 7.99 },
  redTShirt: { id: 'test.allthethings()-t-shirt-(red)', name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 },
};

/** Default catalog order (Name A to Z). */
const PRODUCT_NAMES = Object.values(PRODUCTS).map((p) => p.name);

const PRICES_LOW_TO_HIGH = [7.99, 9.99, 15.99, 15.99, 29.99, 49.99];

const TAX_RATE = 0.08;

module.exports = { PRODUCTS, PRODUCT_NAMES, PRICES_LOW_TO_HIGH, TAX_RATE };
