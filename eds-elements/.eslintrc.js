module.exports = {
  extends: "@experian/eds",
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: "espree",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  globals: {
    EDSElement: false,
    LitElement: false,
  },
  // Project specific
  rules: {
    "semi": [
      "error",
      "never"
    ],
    "no-unused-vars": "off",
    "no-console": "off",
  },
}