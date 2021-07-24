module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    jest: true,
    node: true,
  },
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    "plugin:markdown/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-namespace": "off",
  },
};
