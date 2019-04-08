const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: path.join(__dirname, "src/js/app/index.js"),
  output: {
    path: path.join(__dirname, "public/js"),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      jquery: path.join(__dirname,"src/js/lib/jquery-3.3.1.min.js"),
      mod: path.join(__dirname,"src/js/mod"),
      less: path.join(__dirname,"src/less")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery"
    })
  ]
}