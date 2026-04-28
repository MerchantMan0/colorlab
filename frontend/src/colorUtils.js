/**
 * Validates a CSS hex color string and returns a normalized #rrggbb value.
 *
 * @param {unknown} input
 * @returns {{ valid: true, normalized: string } | { valid: false, error: string }}
 */
function validateHexColor(input) {
  if (typeof input !== 'string') {
    return { valid: false, error: 'Color must be a string' };
  }

  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: false, error: 'Color cannot be empty' };
  }

  let hex = trimmed.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((ch) => ch + ch)
      .join('');
  }

  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    return { valid: false, error: 'Invalid hex color (use #RGB or #RRGGBB)' };
  }

  return { valid: true, normalized: `#${hex.toLowerCase()}` };
}

module.exports = { validateHexColor };
