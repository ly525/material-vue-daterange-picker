module.exports = {
  banner: true,
  // TODO module name 与 name 的关系？(difference between module name and name ??)
  // https://github.com/ly525/v-md-date-range-picker/issues/2
  moduleName: "VMdDateRangePicker",
  name: "v-md-date-range-picker",
  format: ["umd", "umd-min", "cjs", "es"],
  plugins: ["vue"],
  vue: {
    css: "dist/v-md-date-range-picker.css"
  },
  external: ["vue", "moment"],
  globals: {
    Vue: "vue"
  }
};
