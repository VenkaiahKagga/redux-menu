'use strict';

var webpack = require('webpack');
var baseConfig = require('./webpack.config.development');

var config = Object.assign(baseConfig, {
  devtool: "cheap-module-source-map",
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
config.output.filename = 'redux-menu.min.js';

module.exports = config;

