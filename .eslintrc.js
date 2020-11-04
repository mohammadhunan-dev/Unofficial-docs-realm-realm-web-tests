module.exports = {
  env: {
    node: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["jest", "prettier"],
  rules: {
    "no-unused-vars": "warn"
  },
  overrides: [
    {
      files: ["__tests__/**/*.js"],
      "env": {
        "mocha": true,
      }
    },
    {
      "files": ["__tests__/**/*.ts"],
      "parser": "@typescript-eslint/parser",
      "plugins": [
        "@typescript-eslint"
      ],
      rules: {
        "@typescript-eslint/ban-ts-comment": "warn",
      },
      "extends": ["eslint:recommended", "plugin:prettier/recommended", "plugin:@typescript-eslint/recommended"]
    }
  ]
};
