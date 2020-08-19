const path = require("path");

module.exports = components => mode => ({
  entry: components
    .map(component => ({ [component]: `./src/${component}/index.js` }))
    .reduce((entries, entry) => Object.assign({}, entries, entry), {}),
  output: {
    path: path.join(__dirname, "dist"),
    filename: `[name]${mode === "production" ? ".min" : ""}.js`,
  },
  resolve: {
    extensions: [".js"],
  },
  mode,
  devtool: mode === "production" ? "source-map" : false,
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ["raw-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        use: ["raw-loader"],
      },
    ],
  },
  externals: {
    "eds-core": "EDSCore",
    "@popper/core": "Popper",
  },
});
