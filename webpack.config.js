const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    "order-builder": path.resolve(__dirname, 'dist', "Client", "WebSocketManager.js"),
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist', "Client"),
    filename: './index.main.js',
    libraryTarget: 'this'
  },
  plugins: [
  ],
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: [/node_modules/,] }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  }
}