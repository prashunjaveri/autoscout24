const path = require('path');

module.exports = {
  'settings': {
    'import/resolver': {
      'eslint-import-resolver-lerna': {
        packages: path.resolve(__dirname, 'packages')
      }
    }
  },
  'env': {
    'es6': true,
    'node': true,
    "jest": true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'quotes': ['warn', 'single'],
    'semi': ['error', 'always'],
    'indent': ['warn', 2],
    'object-curly-spacing': ['warn', 'always', {
      'objectsInObjects': true
    }],
    'max-len': ['warn', { 'code': 105 }],
    'max-lines': ['error', {
      'max': 300,
      'skipBlankLines': true,
      'skipComments': true,
    }],
    'no-prototype-builtins': ['off'],
    'no-case-declarations': ['off']
  },
  'overrides': [
    {
      'files': ['*.ts'],
    },
  ],
};
