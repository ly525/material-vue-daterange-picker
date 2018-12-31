module.exports = {
  banner: true,
  moduleName: "mdDaterangePicker",
  name: "md-daterange-picker",
  format: ["umd", "umd-min", "cjs", "es"],
  plugins: ["vue"],
  vue: {
    css: "dist/md-daterange-picker.css"
  },
  external: ["vue", "moment"],
  globals: {
    Vue: "vue"
  }
};
