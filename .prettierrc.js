/**
 * @type {import('prettier').RequiredOptions}
 * npx prettier --check .
 * npx prettier --write .
 * https://www.prettier.cn/docs/options.html
 */
module.exports = {
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  semi: false,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
  plugins: [],
}
