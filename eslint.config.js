const eslint = require("@eslint/js");
const prettier = require("eslint-config-prettier");
const globals = require("globals");
const typescriptEslint = require("typescript-eslint");

module.exports = typescriptEslint.config(
  {
    ignores: [
      "coverage/**",
      "demos/**",
      "dist/**",
      "jest.setup.js",
      "node_modules/**",
      "out-ts/**",
    ],
  },
  eslint.configs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  prettier
);
