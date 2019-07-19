module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    'generator-star-spacing': 'off',
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    'linebreak-style': ['error', 'unix'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'no-tabs': 'error',
    'no-mixed-operators': 0,
    'no-mixed-spaces-and-tabs': 'error',
    'no-trailing-spaces': 'error',
    'space-before-function-paren': 0,
    'no-template-curly-in-string': 'off',
    'no-multiple-empty-lines': 'off'
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint'
  },
  extends: ['plugin:vue/essential', '@vue/prettier', 'plugin:prettier/recommended', 'eslint:recommended']
}
