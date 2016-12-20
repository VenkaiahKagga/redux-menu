var path = require('path');
var webpack = require('webpack');

var baseConfig = require('./webpack.config.development');

module.exports = Object.assign(baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: __dirname + '/index.js',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
  ]
});
