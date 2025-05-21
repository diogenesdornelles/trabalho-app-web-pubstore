// eslint.config.js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    ignores: ['dist/*'],
    rules: {
      // Suas regras personalizadas aqui
      'prettier/prettier': 'warn',
    },
  },
]);
