module.exports = {
  dist: "build",
  webpack(config) {
    config.devtool = "#source-map";
    config.output.publicPath = "/md-date-range-picker/";
    return config;
  }
};
