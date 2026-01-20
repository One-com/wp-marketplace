const js = require('@eslint/js');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const eslintConfigPrettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'build/**',
      'standalone/**',
      'webpack.wp.js',
      'vite.config.js',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
        module: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        btoa: 'readonly',
        setImmediate: 'readonly',
        console: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-console': 'off',
      'no-undef': 'error',
      semi: 'error',
      'semi-spacing': 'error',
      'arrow-spacing': 'error',
      'no-confusing-arrow': ['error', {allowParens: true}],
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'object-shorthand': 'off',
      'prefer-const': 'error',
      eqeqeq: 'warn',
      'no-invalid-this': 'error',
      'no-return-assign': 'error',
      'no-unused-expressions': ['error', {allowTernary: true}],
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'no-constant-condition': 'warn',
      'no-unused-vars': 'off',
    },
  },
];
