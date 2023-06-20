const OFF = 0
const WARN = 1
const ERROR = 2

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  root: true,
  parserOptions: {},
  rules: {
    '@typescript-eslint/no-explicit-any': WARN,
    '@typescript-eslint/no-var-requires': OFF,
  },
}
