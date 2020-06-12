module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      '@babel/plugin-transform-modules-commonjs',
      {
        allowTopLevelThis: true
      }
    ],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
};
