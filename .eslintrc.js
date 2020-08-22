module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that
    // would conflict with prettier.
    'plugin:react-hooks/recommended',
    'prettier/@typescript-eslint',
    // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors
    // as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
  },
}
