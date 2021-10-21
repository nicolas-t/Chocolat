module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "> 0.5%, ie >= 11"
        },
        spec: true,
        useBuiltIns: "usage",
        forceAllTransforms: true,
        corejs: {
          version: 3,
          proposals: false
        }
      }
    ]
  ]
};