// @ts-check

/** Prices on the site are shown with cents: $29.99. */
const PRICE_DECIMALS = 2;

/**
 * Extracts a dollar amount from text: "$29.99" -> 29.99, "Item total: $47.97" -> 47.97.
 * @param {string} text
 */
function parsePrice(text) {
  const match = text.match(/\$(\d+(?:\.\d+)?)/);
  if (!match) throw new Error(`No price found in "${text}"`);
  return Number(match[1]);
}

/**
 * Formats a number the way the site shows prices: 29.99 -> "$29.99".
 * @param {number} value
 */
function formatPrice(value) {
  return `$${value.toFixed(PRICE_DECIMALS)}`;
}

/** @param {number[]} values */
function sum(values) {
  const factor = 10 ** PRICE_DECIMALS;
  return Math.round(values.reduce((acc, v) => acc + v, 0) * factor) / factor;
}

module.exports = { PRICE_DECIMALS, parsePrice, formatPrice, sum };
