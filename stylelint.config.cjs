module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recommended'
  ],
  rules: {
    'unit-allowed-list': ['em', 'rem', '%', 's'],
    'alpha-value-notation': [
      'percentage',
      {
        exceptProperties: ['opacity']
      }
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind']
      }
    ],
    'block-opening-brace-space-after': ['error', 'always'],
    'block-opening-brace-space-before': ['error', 'always']
  }
}
