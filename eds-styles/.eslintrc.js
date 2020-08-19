module.exports = {
  "extends": "@experian/eds",
  env: {
    es6: true,
    node: true,
  },
  parser: "espree",
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-console": "off",
  },
};
