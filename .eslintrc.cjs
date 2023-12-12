module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      files: [".eslintrc.js", ".eslintrc.cjs"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    // You can add specific rules here based on your preferences
  },
};
