#!/usr/bin/env node
const path = require('path');
const commander = require('commander');
commander
  .version('0.0.1')
  .option('-w, --watch', 'starts the webpack dev server')
  .parse(process.argv);

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

function webpackServer(compiler) {
  new WebpackDevServer(compiler, {
    contentBase: path.resolve(__dirname, 'build'),
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    inline: true,
    historyApiFallback: true,
  }).listen(3000, 'localhost', err => {
    if (err) {
      return console.warn(err);
    }
    return null;
  });
}

const compiler = webpack(webpackConfig);
if (commander.watch) {
  webpackServer(compiler);
} else {
  console.log('run the build...');
  compiler.run((err) => {
    if (err) {
      console.error('error: ', err);
    } else {
      console.log('done!!');
    }
  });
}
