module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭名称校验
    'vue/multi-word-component-names': 'off',
    // 要求或禁止函数圆括号之前有一个空格
    "space-before-function-paren": ["warn", "never"],
    // 忽略行尾注释的空格
    "no-multi-spaces": ["error", { ignoreEOLComments: true }],
    // 关闭驼峰命名规范
    'camelcase': [0, { properties: 'always' }]
  }
}
