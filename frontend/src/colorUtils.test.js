const { validateHexColor } = require('./colorUtils');

describe('validateHexColor', () => {
  it('normalizes 3-digit shorthand to lowercase #rrggbb', () => {
    expect(validateHexColor('#0aF')).toEqual({
      valid: true,
      normalized: '#00aaff',
    });
  });

  it('accepts 6-digit hex with or without hash', () => {
    expect(validateHexColor('1A2b3C')).toEqual({
      valid: true,
      normalized: '#1a2b3c',
    });
    expect(validateHexColor('#FFFFFF')).toEqual({
      valid: true,
      normalized: '#ffffff',
    });
  });

  it('rejects invalid patterns with a clear error', () => {
    expect(validateHexColor('nope')).toEqual({
      valid: false,
      error: 'Invalid hex color (use #RGB or #RRGGBB)',
    });
    expect(validateHexColor('#12')).toEqual({
      valid: false,
      error: 'Invalid hex color (use #RGB or #RRGGBB)',
    });
  });

  it('rejects empty and non-string values', () => {
    expect(validateHexColor('   ')).toEqual({
      valid: false,
      error: 'Color cannot be empty',
    });
    expect(validateHexColor(null)).toEqual({
      valid: false,
      error: 'Color must be a string',
    });
  });
});
