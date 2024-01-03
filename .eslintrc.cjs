module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: 'tsconfig.eslint.json',
  },
  plugins: [
    'react-refresh',
    'react',
    'import',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    indent: ['error', 2],
    'multiline-ternary': 'off',
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/indent': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'operator-linebreak': ['error', 'before'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/method-signature-style': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

