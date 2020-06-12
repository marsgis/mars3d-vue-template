module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'key-spacing': [0, { 'beforeColon': false, 'afterColon': true }], // 对象字面量中冒号的前后空格
    'no-trailing-spaces': 'error', // 禁止行尾空格
    'comma-dangle': ['error', 'never'], // 禁止行尾逗号
    'no-extra-semi': 'error', // 禁止出现多余的分号
    'arrow-parens': 0, // 箭头函数用小括号括起来
    'max-len': ['error', {code: 200}], // 每行200个字符
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          exceptions: ['*'],
          balanced: true
        }
      }
    ] // 注释的斜线或 * 后必须有空格
  }
};
