const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
};
