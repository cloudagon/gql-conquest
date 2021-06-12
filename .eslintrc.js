module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // doesn't work with ts - use @typescript-eslint version
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-use-before-define': 'error',

    // override airbnb
    'import/extensions': [
      'error',
      'always',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],

    'no-param-reassign': [
      'error',
      // for Array.reduce
      { ignorePropertyModificationsFor: ['accu'] },
    ],

    'import/prefer-default-export': 'off',

    // easier to scan
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      },
    ],

    'prettier/prettier': [
      'error',
      { semi: false, singleQuote: true, trailingComma: 'all' },
    ],
  },

  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
