/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: [],
  customSyntax: '',
  ignoreFiles: ['/dist', '*.md', '*.ts', '*.tsx', '*.js'],
  rules: {},
}
