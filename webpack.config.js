const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: path.join(__dirname, "src/js/app/index.js"),
  output: {
    path: path.join(__dirname, "public/js"),
    filename: 'index.js'
  }
}