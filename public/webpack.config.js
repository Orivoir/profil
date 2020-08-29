const path = require('path');

module.exports = {

  entry: {
    index: "./index.js",
    admin: "./admin.js"
  },

  output: {
    filename: '[name].js',
    path: path.join( __dirname, "./dist" )
  },

  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: "url-loader"
      }
    ]
  }

};
