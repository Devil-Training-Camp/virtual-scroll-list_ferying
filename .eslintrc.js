module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true, // 不配置的话，其他文件会报错：'module' is not defined.
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    'react/react-in-jsx-scope': 'off',
    // "react/jsx-uses-react": "off",
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '!.*', // ??
  ],
};
