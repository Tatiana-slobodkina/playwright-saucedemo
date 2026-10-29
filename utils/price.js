// @ts-check

/**
 * Extracts a dollar amount from text: "$29.99" -> 29.99, "Item total: $47.97" -> 47.97.
 * @param {string} text
 */
function parsePrice(text) {
  const match = text.match(/\$(\d+(?:\.\d+)?)/);
  if (!match) throw new Error(`No price found in "${text}"`);
  return Number(match[1]);
}

/** @param {number[]} values */
function sum(values) {
  return Math.round(values.reduce((acc, v) => acc + v, 0) * 100) / 100;
}

module.exports = { parsePrice, sum };
