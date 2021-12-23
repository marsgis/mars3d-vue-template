module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "@vue/standard"],
  parserOptions: {
    ecmaVersion: 2020
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly"
  },
  rules: {
    // require 必须在全局作用域下
    "global-require": "off",
    // 强制一致的缩进风格
    indent: "off",
    // 不允许出现console语句
    "no-console": "off",
    // 强制驼峰命名规则
    camelcase: "off",
    // 块内行首行尾是否空行
    "padded-blocks": "off",
    // 不能有声明后未被使用的变量或参数
    "no-unused-vars": "off",
    // 一行最后不允许有空格
    "no-trailing-spaces": "off",
    "comma-dangle": "error",
    // 强制使用有效的 JSDoc 注释
    "valid-jsdoc": "off",
    // @fixable 禁止使用 var
    "no-var": "off",
    // 不允许Object.prototype
    "no-prototype-builtins": "off",
    // 使用 === 替代 ==
    eqeqeq: "off",
    // 关闭${xxx}检测
    "no-template-curly-in-string": "off",

    // 不允许混用tab和空格
    "no-mixed-spaces-and-tabs": "error",
    // 禁止在非赋值或条件语句中使用 new 操作符
    "no-new": "error",
    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    "no-new-wrappers": "error",
    // 要求 return 语句要么总是指定返回的值，要么不指定
    "consistent-return": "off",
    // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
    "default-case": "off",
    // 禁止自我赋值
    "no-self-assign": "error",
    // 禁止自身比较
    "no-self-compare": "error",
    // 将 var 定义的变量视为块作用域，禁止在块外使用
    "block-scoped-var": "error",
    // for in 内部必须有 hasOwnProperty
    "guard-for-in": "off",
    // switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
    "no-case-declarations": "error",
    // 禁止修改原生对象
    "no-extend-native": "error",
    // @fixable 禁止出现没必要的 bind
    "no-extra-bind": "error",
    // @fixable 禁止出现没必要的 label
    "no-extra-label": "error",
    // switch 的 case 内必须有 break, return 或 throw
    "no-fallthrough": "error",
    // @fixable 表示小数时，禁止省略 0，比如 .5
    "no-floating-decimal": "error",
    // 禁止对全局变量赋值
    "no-global-assign": "error",
    // 禁止使用 \ 来换行字符串
    "no-multi-str": "error",
    // constructor 中必须有 super
    "constructor-super": "error",
    // 禁止对使用 const 定义的常量重新赋值
    "no-const-assign": "error",
    // 禁止重复定义类
    "no-dupe-class-members": "error",
    // 禁止重复 import 模块
    "no-duplicate-imports": "off",
    // 禁止出现没必要的 constructor，比如 constructor(value) { super(value) }
    "no-useless-constructor": "error",
    // 可以使用\转义
    "no-useless-escape": "off",
    // 关闭eslint标准模式callback回调报错
    "no-callback-literal": "off",

    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        ignoreDeclarationSort: true
      }
    ],
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    // 允许在标签中写 HTML 注释。
    "vue/comment-directive": [
      "off",
      {
        reportUnusedDisableDirectives: false
      }
    ],

    // 强制所有控制语句使用一致的括号风格
    // @fixable if 后面必须要有 {，除非是单行 if
    curly: ["error", "all"],
    // @fixable 链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
    "dot-location": ["off", "property"],
    // 控制逗号在行尾出现还是在行首出现 (默认行尾)
    // http://eslint.org/docs/rules/comma-style
    "comma-style": ["error", "last"],
    // 函数定义时括号前的空格
    "space-before-function-paren": ["off", "always"],
    // 空行最多不能超过两行
    "no-multiple-empty-lines": [
      "error",
      {
        max: 3
      }
    ],

    // @fixable 大括号内的首尾必须有换行
    "object-curly-newline": [
      "error",
      {
        multiline: true,
        consistent: true
      }
    ],
    // "SwitchCase" (默认：0) 强制 switch 语句中的 case 子句的缩进水平
    // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
    "computed-property-spacing": ["error", "never"]
  }
}
